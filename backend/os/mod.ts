import { storage } from "../local-storage.ts";

interface DiskInfo {
  DeviceID: string;
  VolumeName: string | null;
  Size: number;
  FreeSpace: number;
}

interface HardwareInfo {
  CPU: string;
  Cores: number;
  BaseClock: string;
  RAM: string;
  GPU: string;
  VRAM: string;
}

interface BatteryInfo {
  isCharging: boolean;
  chargeLevel: number;
  timeRemaining: number;
}

const decoder = new TextDecoder();
const parse = JSON.parse;

export const OSKeys = {
  disk: "os.data.disks",
  hardware: "os.data.hardware",
};

export async function getAllDisks(
  force = false
): Promise<DiskInfo[] | DiskInfo> {
  if (force || storage.getItem(OSKeys.disk) === null) {
    const command = `
    & {
      Get-WmiObject Win32_LogicalDisk |
      Select-Object DeviceID, VolumeName,
      @{Name="Size";Expression={[math]::Round($_.Size / 1GB, 2)}},
      @{Name="FreeSpace";Expression={[math]::Round($_.FreeSpace / 1GB, 2)}} |
      ConvertTo-Json
    }
  `;

    const cmd = new Deno.Command("powershell", {
      args: ["-Command", command],
    });

    const { code, stdout, stderr } = await cmd.output();

    if (code) {
      const errorString = decoder.decode(stderr);
      throw new Error(`Failed to execute PowerShell command: ${errorString}`);
    }

    const output = decoder.decode(stdout);
    const disks: DiskInfo[] = parse(output);

    storage.setItem(OSKeys.disk, output);

    return disks;
  }

  const output = storage.getItem(OSKeys.disk);
  const disks: DiskInfo[] = parse(output!);

  return disks;
}

export async function getHardWareInfo(force = false): Promise<HardwareInfo> {
  if (force || storage.getItem(OSKeys.hardware) === null) {
    const command = `
    & {
      $cpu = (Get-WmiObject Win32_Processor).Name
      $cores = (Get-WmiObject Win32_Processor).NumberOfCores
      $baseClock = [math]::Round((Get-WmiObject Win32_Processor).MaxClockSpeed / 1000, 2)
      $ram = [math]::Round((Get-WmiObject Win32_ComputerSystem).TotalPhysicalMemory / 1GB, 2)
      $gpu = (Get-WmiObject Win32_VideoController).Name
      $vram = [math]::Round((Get-WmiObject Win32_VideoController).AdapterRAM / 1GB, 2)

      @{
        CPU = $cpu
        Cores = $cores
        BaseClock = "$baseClock GHz"
        RAM = "$ram GB"
        GPU = $gpu
        VRAM = "$vram GB"
      } | ConvertTo-Json
    }
  `;

    const cmd = new Deno.Command("powershell", {
      args: ["-Command", command],
    });

    const { code, stdout, stderr } = await cmd.output();

    if (code) {
      const errorString = decoder.decode(stderr);
      throw new Error(`Failed to execute PowerShell command: ${errorString}`);
    }

    const output = decoder.decode(stdout);
    const info: HardwareInfo = parse(output);

    storage.setItem(OSKeys.hardware, output);

    return info;
  }

  const output = storage.getItem(OSKeys.hardware);
  const info: HardwareInfo = parse(output!);

  return info;
}

export async function getBatteryInfo(): Promise<BatteryInfo> {
  const command = `
    & {
      $battery = Get-WmiObject Win32_Battery
      if ($battery) {
        $output = @{
          isCharging = $battery.BatteryStatus -eq 2
          chargeLevel = $battery.EstimatedChargeRemaining
          timeRemaining = $battery.EstimatedRunTime
        }
        $output | ConvertTo-Json
      } else {
        Write-Output "null"
      }
    }`;

  const abort = new AbortController();

  const cmd = new Deno.Command("powershell", {
    args: ["-Command", command],
    signal: abort.signal,
  });

  const { code, stdout, stderr } = await cmd.output();

  if (code) {
    const errorString = decoder.decode(stderr);
    throw new Error(`Failed to execute PowerShell command: ${errorString}`);
  }

  const output = decoder.decode(stdout);
  const stats: BatteryInfo = parse(output);

  abort.abort();

  return stats;
}

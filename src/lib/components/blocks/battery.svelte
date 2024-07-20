<script lang="ts">
  import { PUBLIC_BACKEND_URL } from "$env/static/public";
  import { onMount } from "svelte";
  import {
    BatteryChargingIcon,
    BatteryFullIcon,
    BatteryLowIcon,
    BatteryMediumIcon,
    BatteryWarningIcon,
  } from "lucide-svelte";

  let batteryLevel = 0;
  let chargingStatus = false;

  let BatteryIcon = getBatteryIcon(batteryLevel, chargingStatus);

  function getBatteryIcon(level: number, charging: boolean) {
    if (charging) {
      return BatteryChargingIcon;
    } else if (level > 80) {
      return BatteryFullIcon;
    } else if (level > 40) {
      return BatteryMediumIcon;
    } else if (level > 30) {
      return BatteryLowIcon;
    } else {
      return BatteryWarningIcon;
    }
  }

  async function updateBatteryInfo() {
    const evtSource = new EventSource(
      `${PUBLIC_BACKEND_URL}/api/os/battery-info`
    );

    evtSource.addEventListener("message", ({ data }) => {
      const { chargeLevel, isCharging } = JSON.parse(data);

      batteryLevel = chargeLevel;

      BatteryIcon = getBatteryIcon(Number(chargeLevel), isCharging);
    });
  }

  onMount(async () => {
    try {
      updateBatteryInfo();
    } catch (error) {
      BatteryIcon = BatteryWarningIcon;
    }
  });
</script>

{#key chargingStatus || chargingStatus || BatteryIcon}
  <div class="flex space-x-1 items-center justify-center">
    <BatteryIcon class="mt-[1px]" />
    <span>
      {batteryLevel}%
    </span>
  </div>
{/key}

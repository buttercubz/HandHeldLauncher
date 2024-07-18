<script lang="ts">
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

  onMount(async () => {
    try {
      //@ts-ignore
      const battery = await window.navigator.getBattery();

      async function updateBatteryInfo() {
        const level = (battery.level * 100).toFixed(0);
        const isCharging = battery.charging;

        chargingStatus = isCharging;
        batteryLevel = Number(level);

        BatteryIcon = getBatteryIcon(batteryLevel, chargingStatus);
      }

      battery.addEventListener("levelchange", updateBatteryInfo);
      battery.addEventListener("chargingchange", updateBatteryInfo);

      // Initial update

      updateBatteryInfo();
    } catch (error) {
      BatteryIcon = BatteryWarningIcon;
      // console.error("error", error);
    }
  });
</script>

{#key chargingStatus || chargingStatus || BatteryIcon}
  <BatteryIcon />
{/key}

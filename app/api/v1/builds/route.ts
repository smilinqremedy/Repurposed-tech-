import { NextResponse } from "next/server";
import {
  DEVICES,
  SHELLS,
  DISPLAYS,
  POWERS,
  BUTTONS,
  AUDIOS,
  EXTRAS,
} from "@/lib/buildOptions";

export async function POST(request: Request) {
  try {
    const config = await request.json();
    const {
      deviceId,
      shellId,
      displayId,
      powerId,
      buttonId,
      audioId,
      selectedExtraIds = [],
    } = config;

    const device = DEVICES.find((d) => d.id === deviceId) || DEVICES[0];
    const shell = SHELLS.find((s) => s.id === shellId) || SHELLS[0];
    const display = DISPLAYS.find((d) => d.id === displayId) || DISPLAYS[0];
    const power = POWERS.find((p) => p.id === powerId) || POWERS[0];
    const button = BUTTONS.find((b) => b.id === buttonId) || BUTTONS[0];
    const audio = AUDIOS.find((a) => a.id === audioId) || AUDIOS[0];

    const extrasBreakdown: Record<string, number> = {};
    let extrasTotal = 0;

    for (const extraId of selectedExtraIds) {
      const extra = EXTRAS.find((e) => e.id === extraId);
      if (extra) {
        extrasBreakdown[extra.name] = extra.priceModifier;
        extrasTotal += extra.priceModifier;
      }
    }

    const totalPrice =
      device.basePrice +
      shell.priceModifier +
      display.priceModifier +
      power.priceModifier +
      button.priceModifier +
      audio.priceModifier +
      extrasTotal;

    return NextResponse.json({
      totalPrice,
      breakdown: {
        device: { name: device.name, price: device.basePrice },
        shell: { name: shell.name, price: shell.priceModifier },
        display: { name: display.name, price: display.priceModifier },
        power: { name: power.name, price: power.priceModifier },
        button: { name: button.name, price: button.priceModifier },
        audio: { name: audio.name, price: audio.priceModifier },
        extras: extrasBreakdown,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Invalid build configuration", details: error.message },
      { status: 400 }
    );
  }
}

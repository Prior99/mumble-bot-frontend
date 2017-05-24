import { create as createRand } from "random-seed";

export function colorize(text: string, saturation = 1, lightness = 0.875): string {
    const rand = createRand(text);
    const hue = rand.range(360);
    return `hsl(${hue},${saturation * 100}%,${lightness * 100}%)`;
}

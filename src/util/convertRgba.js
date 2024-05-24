import colorName from "color-name";
import colorString from "color-string";

export function convertRgbaToColorName(rgba) {
  // Parse the RGBA string to an array
  const rgbaArray = colorString.get.rgb(rgba);

  if (!rgbaArray) {
    return "unknown color";
  }

  const [r, g, b, a] = rgbaArray;

  // Convert RGBA to RGB (ignoring alpha for named color matching)
  const rgbArray = [r, g, b];

  let closestColorName = "white";
  let closestDistance = Infinity;

  // Function to calculate color distance
  function colorDistance(color1, color2) {
    return Math.sqrt(
      Math.pow(color1[0] - color2[0], 2) +
        Math.pow(color1[1] - color2[1], 2) +
        Math.pow(color1[2] - color2[2], 2)
    );
  }

  // Iterate over all named colors to find the closest match
  for (const [name, value] of Object.entries(colorName)) {
    const distance = colorDistance(rgbArray, value);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestColorName = name;
    }
  }

  return closestColorName;
}

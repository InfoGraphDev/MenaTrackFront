export const ChartColor = [
  "#E0E622",
  "#E0E622",
  "#E0E622",
  "#E0E622",
  "#E0E622",
  "#E0E622",
  "#E0E622",
  "#E0E622",
  "#E0E622",
  "#E0E622",
  "#E0E622",
  "#E0E622",
  "#E0E622",
  "#E0E622",
  "#E0E622",
  "#E0E622",
  "#E0E622",
  "#E0E622",
  "#E0E622",
  "#E0E622",
  "#E0E622",
  "#E0E622",
  "#E0E622",
];

const createColorRecord = (r, g, b, a = 0.4) => ({
  background: [r, g, b, a],
  outline: [r, g, b],
});

export const ColorMapLayerShow = Array.from({ length: 100 }, (_, index) => {
  const baseColors = [
    [255, 102, 102], [255, 153, 102], [255, 204, 102], [255, 255, 102],
    [204, 255, 102], [153, 255, 102], [102, 255, 102], [102, 255, 153],
    [102, 255, 204], [102, 255, 255], [102, 204, 255], [102, 153, 255],
    [102, 102, 255], [153, 102, 255], [204, 102, 255], [192, 192, 192],
  ];
  const color = baseColors[index % baseColors.length];
  return [index.toString(), createColorRecord(...color)];
}).reduce((acc, [key, value]) => {
  acc[key] = value;
  return acc;
}, {});

export const ColorBuffurMapLayerShow = Array.from({ length: 100 }, (_, index) => {
  const baseColors = [
    [34, 139, 34], [32, 178, 170], [70, 130, 180], [100, 149, 237],
    [123, 104, 238], [186, 85, 211], [238, 130, 238], [255, 69, 0],
    [255, 99, 71], [255, 165, 0], [240, 230, 140], [154, 205, 50],
    [46, 139, 87], [96, 96, 96],
  ];
  const color = baseColors[index % baseColors.length];
  return [index.toString(), createColorRecord(...color)];
}).reduce((acc, [key, value]) => {
  acc[key] = value;
  return acc;
}, {});

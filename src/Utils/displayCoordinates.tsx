export const DisplayCoordinates = (Xpoint,Ypoint) => {
    const x = parseFloat(Xpoint || 0).toFixed(4);
    const y = parseFloat(Ypoint || 0).toFixed(4);
    return `Y: ${y} - X: ${x}`;
};

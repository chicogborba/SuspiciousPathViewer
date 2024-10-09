function generateColorsFromBlueToRed(numColors) {
  const colors = [];

  for (let i = 0; i < numColors; i++) {
    const r = Math.floor((255 * i) / (numColors - 1)); // Red increases from 0 to 255
    const g = 0; // Green remains 0
    const b = 255 - Math.floor((255 * i) / (numColors - 1)); // Blue decreases from 255 to 0

    // Convert RGB to hex
    const hexColor = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    colors.push(hexColor);
  }

  return colors;
}

function drawArrowPointer(ctx, startX, startY, endX, endY, color) {
  const headLength = 5; // Length of the arrow head
  const angle = Math.atan2(endY - startY, endX - startX);

  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;

  // Draw the line
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();

  // Draw the arrow head
  ctx.beginPath();
  ctx.moveTo(endX, endY);
  ctx.lineTo(
    endX - headLength * Math.cos(angle - Math.PI / 6),
    endY - headLength * Math.sin(angle - Math.PI / 6),
  );
  ctx.lineTo(
    endX - headLength * Math.cos(angle + Math.PI / 6),
    endY - headLength * Math.sin(angle + Math.PI / 6),
  );
  ctx.lineTo(endX, endY);
  ctx.lineTo(
    endX - headLength * Math.cos(angle - Math.PI / 6),
    endY - headLength * Math.sin(angle - Math.PI / 6),
  );
  ctx.stroke();
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
}

const colorsFromBlueToRed = generateColorsFromBlueToRed(5);

let zoomLevel = 1; // Nível de zoom inicial
const zoomStep = 0.1; // Passo de zoom

function zoomIn() {
  zoomLevel += zoomStep;
  drawGrid(); // Re-desenhar a grade com o novo nível de zoom
}

function zoomOut() {
  zoomLevel = Math.max(zoomLevel - zoomStep, 0.1); // Impedir zoom negativo
  drawGrid(); // Re-desenhar a grade com o novo nível de zoom
}

function drawGrid() {
  const ctx = canvas.getContext("2d");
  
  const numRows = Math.sqrt(nodes.length);
  const numCols = numRows;

  const spacing = 30; // Espaço entre os quadrados

  // Tamanho do quadrado com base no nível de zoom
  const squareSize =
    ((canvas.width * (numRows / 30) - spacing * (numCols + 1)) / numCols / 2) *
    zoomLevel;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save(); // Salvar o estado atual do contexto

  // Aplicar zoom
  ctx.scale(zoomLevel, zoomLevel);

  const adjustedSquareSize = squareSize / zoomLevel; // Ajustar o tamanho do quadrado para o zoom

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const node = nodes[row * numRows + col];

      const x = col * (adjustedSquareSize + spacing) + spacing; // Ajustar posição horizontal
      const y = row * (adjustedSquareSize + spacing) + spacing; // Ajustar posição vertical

      // Desenhar quadrado

      if(showValues) {
        ctx.fillStyle = "black";
        ctx.strokeRect(x, y, adjustedSquareSize, adjustedSquareSize);
        ctx.fillText(
          node.south,
          x + (adjustedSquareSize / 2 ) - 3,
          y + adjustedSquareSize - 3,
        );
        ctx.fillText(
          node.east,
          x + adjustedSquareSize - 10,
          (y + adjustedSquareSize / 2) + 3,
        );
        ctx.fillText(node.west, x + 3, y + (adjustedSquareSize / 2) + 3);
        ctx.fillText(node.north, x + (adjustedSquareSize / 2) - 3, y + 10);
        
        if (row !== numRows - 1) {
          drawArrowPointer(
            ctx,
            x + adjustedSquareSize / 2 + 15,
            y + adjustedSquareSize,
            x + adjustedSquareSize / 2 + 15,
            y + adjustedSquareSize + 30,
            colorsFromBlueToRed[node.south],
            zoomLevel,
          );
        }
      } else if(showDirections) {
        ctx.fillStyle = "black";
        ctx.strokeRect(x, y, adjustedSquareSize, adjustedSquareSize);
        ctx.fillText(
          "S",
          x + (adjustedSquareSize / 2 ) - 3,
          y + adjustedSquareSize - 3,
        );
        ctx.fillText(
          "E",
          x + adjustedSquareSize - 10,
          (y + adjustedSquareSize / 2) + 3,
        );
        ctx.fillText("W", x + 3, y + (adjustedSquareSize / 2) + 3);
        ctx.fillText("N", x + (adjustedSquareSize / 2) - 3, y + 10);
        
        if (row !== numRows - 1) {
          drawArrowPointer(
            ctx,
            x + adjustedSquareSize / 2 + 15,
            y + adjustedSquareSize,
            x + adjustedSquareSize / 2 + 15,
            y + adjustedSquareSize + 30,
            colorsFromBlueToRed[node.south],
            zoomLevel,
          );
        }
      } else {
        ctx.fillStyle = "black";
        ctx.strokeRect(x, y, adjustedSquareSize, adjustedSquareSize);
        if (row !== numRows - 1) {
          drawArrowPointer(
            ctx,
            x + adjustedSquareSize / 2 + 15,
            y + adjustedSquareSize,
            x + adjustedSquareSize / 2 + 15,
            y + adjustedSquareSize + 30,
            colorsFromBlueToRed[node.south],
            zoomLevel,
          );
        }
      }

      // NORTH LINE
      if (row !== 0) {
        drawArrowPointer(
          ctx,
          x + adjustedSquareSize / 2 - 15,
          y,
          x + adjustedSquareSize / 2 - 15,
          y - 30,
          colorsFromBlueToRed[node.north],
          zoomLevel,
        );
      }

      // EAST LINE
      if (col !== numCols - 1) {
        drawArrowPointer(
          ctx,
          x + adjustedSquareSize,
          y + adjustedSquareSize / 2 - 15,
          x + adjustedSquareSize + 30,
          y + adjustedSquareSize / 2 - 15,
          colorsFromBlueToRed[node.east],
          zoomLevel,
        );
      }

      // WEST LINE
      if (col !== 0) {
        drawArrowPointer(
          ctx,
          x,
          y + adjustedSquareSize / 2 + 15,
          x - 30,
          y + adjustedSquareSize / 2 + 15,
          colorsFromBlueToRed[node.west],
          zoomLevel,
        );
      }
    }
  }

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.restore(); // Restaurar o estado anterior do contexto
}

document.getElementById("zoom+").addEventListener("click", zoomIn);
document.getElementById("zoom-").addEventListener("click", zoomOut);

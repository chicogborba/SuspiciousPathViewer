const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const dpi = window.devicePixelRatio * 3; // Use o DPI do dispositivo
canvas.width = 600 * dpi;  // Largura do canvas em pixels
canvas.height = 600 * dpi; // Altura do canvas em pixels
canvas.style.width = '600px';  // Largura visível do canvas
canvas.style.height = '600px'; // Altura visível do canvas

// Escala o contexto do canvas para que os gráficos fiquem nítidos
ctx.scale(dpi, dpi);

let showValues = false;
let showDirections = false;
// checkboc with id showValues and checkbox with id showDirections
// the user can oly chose one of them or none

document.getElementById("showValues").addEventListener("change", (event) => {
  showValues = event.target.checked;
  if (showValues) {
    showDirections = false;
    document.getElementById("showDirections").checked = false;
  }
  drawGrid();
})

document.getElementById("showDirections").addEventListener("change", (event) => {
  showDirections = event.target.checked;
  if (showDirections) {
    showValues = false;
    document.getElementById("showValues").checked = false;
  }
  drawGrid();
})


 ctx.save();
  ctx.globalCompositeOperation = 'destination-over';
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);


let nodes;

document
  .getElementById("importFile")
  .addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const inputData = e.target.result; // Conteúdo do arquivo
        const dataObject = parseGridData(inputData); // Passa o conteúdo para a função
        console.log(dataObject); // Exibe o objeto resultante
        nodes = dataObject;
        drawGrid(); // Desenha o grid
      };
      reader.readAsText(file); // Lê o arquivo como texto
    }
  });

// Função que processa os dados e cria os objetos dos nós
function parseGridData(input) {
  // Função para processar uma string em uma matriz de inteiros
  function parseMatrix(section) {
    return section
      .trim()
      .split("\n")
      .map((row) => row.trim().split(" ").map(Number));
  }

  // Extraímos as seções EAST, WEST, NORTH, SOUTH
  const sections = input
    .split(/EAST:|WEST:|NORTH:|SOUTH:/)
    .map((str) => str.trim());
  const [eastSection, westSection, northSection, southSection] =
    sections.slice(1);

  // Transformar cada seção em uma matriz
  const east = parseMatrix(eastSection);
  const west = parseMatrix(westSection);
  const north = parseMatrix(northSection);
  const south = parseMatrix(southSection);

  // Inicializar um array para armazenar os nós
  const nodes = [];

  // Percorrer a matriz e criar o objeto para cada posição
  const numRows = east.length;
  const numCols = east[0].length;

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      nodes.push({
        id: `(${col},${numRows - 1 - row})`, // Ajuste para o (0,0) ser no canto inferior esquerdo
        east: east[row][col],
        west: west[row][col],
        north: north[row][col],
        south: south[row][col],
      });
    }
  }

  return nodes;
}

const saveCanvasToImg = () => {  
  const img = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = img;
  a.download = "grid.png";
  a.click();

  return img;
}

document.getElementById("save").addEventListener("click", saveCanvasToImg);
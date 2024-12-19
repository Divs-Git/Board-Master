let pencilColorEle = document.querySelectorAll('.pencil-color');
let pencilWidthEle = document.querySelector('.pencil-width');
let eraserWidthEle = document.querySelector('.eraser-width');

let pencilColor = 'red';
let eraserColor = 'white';
let pencilWidth = pencilWidthEle.value;
let eraserWidth = eraserWidthEle.value;

let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// browser canvas api
let tool = canvas.getContext('2d');
tool.fillStyle = 'white';
tool.fillRect(0, 0, canvas.width, canvas.height);
// default value
tool.strokeStyle = pencilColor;
tool.lineWidth = pencilWidth;

/*
mousedown -> start new path
 mousemove -> file the path (graphics)
*/
let mousedown = false;
canvas.addEventListener('mousedown', (e) => {
  mousedown = true;
  beginPath({
    x: e.clientX,
    y: e.clientY,
  });
});

canvas.addEventListener('mousemove', (e) => {
  if (mousedown) {
    drawStroke({
      x: e.clientX,
      y: e.clientY,
      color: eraserFlag ? eraserColor : pencilColor,
      width: eraserFlag ? eraserWidth : pencilWidth,
    });
  }
});

canvas.addEventListener('mouseup', (e) => {
  mousedown = false;
});

function beginPath(strokeObj) {
  tool.beginPath();
  tool.moveTo(strokeObj.x, strokeObj.y);
}

function drawStroke(strokeObj) {
  tool.lineTo(strokeObj.x, strokeObj.y);
  tool.strokeStyle = strokeObj.color;
  tool.lineWidth = strokeObj.width;
  tool.stroke();
}

pencilColorEle.forEach((colorEle) => {
  colorEle.addEventListener('click', () => {
    let color = colorEle.classList[0];
    pencilColor = color;
    tool.strokeStyle = pencilColor;
  });
});

pencilWidthEle.addEventListener('change', (event) => {
  pencilWidth = pencilWidthEle.value;
  tool.lineWidth = pencilWidth;
});

eraserWidthEle.addEventListener('change', () => {
  eraserWidth = eraserWidthEle.value;
  tool.lineWidth = eraserWidth;
});

eraser.addEventListener('click', (e) => {
  if (eraserFlag) {
    tool.strokeStyle = eraserColor;
    tool.lineWidth = eraserWidth;
  } else {
    tool.strokeStyle = pencilColor;
    tool.lineWidth = pencilWidth;
  }
});

// download
download.addEventListener('click', (event) => {
  let url = canvas.toDataURL();
  let element = document.createElement('a');
  element.href = url;
  element.download = 'board-master.jpg';
  element.click();
});

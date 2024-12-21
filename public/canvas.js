let pencilColorEle = document.querySelectorAll('.pencil-color');
let pencilWidthEle = document.querySelector('.pencil-width');
let eraserWidthEle = document.querySelector('.eraser-width');
let redo = document.querySelector('.redo');
let undo = document.querySelector('.undo');

let pencilColor = 'red';
let eraserColor = 'white';
let pencilWidth = pencilWidthEle.value;
let eraserWidth = eraserWidthEle.value;

let undoRedoTracker = []; // data
let track = 0; // represet which action to perform from tracker array

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
  let data = {
    x: e.clientX,
    y: e.clientY,
  };
  socket.emit('beginPath', data);
});

canvas.addEventListener('mousemove', (e) => {
  if (mousedown) {
    let data = {
      x: e.clientX,
      y: e.clientY,
      color: eraserFlag ? eraserColor : pencilColor,
      width: eraserFlag ? eraserWidth : pencilWidth,
    };
    socket.emit('drawStroke', data);
  }
});

canvas.addEventListener('mouseup', (e) => {
  mousedown = false;

  let url = canvas.toDataURL();
  undoRedoTracker.push(url);
  track = undoRedoTracker.length - 1;
});

// undo
undo.addEventListener('click', (event) => {
  if (track > 0) {
    track--;
    // track operation
    let data = {
      undoRedoTracker,
      track,
    };
    socket.emit('undoRedo', data);
  }
});

// redo
redo.addEventListener('click', (event) => {
  if (track < undoRedoTracker.length - 1) {
    track++;
    // track operation
    let data = {
      undoRedoTracker,
      track,
    };
    socket.emit('undoRedo', data);
  }
});

function undoRedoCanvas({ track, undoRedoTracker }) {
  let url = undoRedoTracker[track];
  let image = new Image(); // new image reference element
  image.src = url;
  image.onload = (event) => {
    tool.drawImage(image, 0, 0, canvas.width, canvas.height);
  };
}

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

// Recieved from server
socket.on('beginPath', (data) => {
  beginPath(data);
});

socket.on('drawStroke', (data) => {
  drawStroke(data);
});

socket.on('undoRedo', (data) => {
  undoRedoCanvas(data);
});

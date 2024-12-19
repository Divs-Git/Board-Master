let optionsContainer = document.querySelector('.options-container');
let toolsContainer = document.querySelector('.tools-container');
let optionsFlag = false;

let pencilToolContainer = document.querySelector('.pencil-tool-container');
let eraserToolContainer = document.querySelector('.eraser-tool-container');
let pencil = document.querySelector('.pencil');
let eraser = document.querySelector('.eraser');
let sticky = document.querySelector('.sticky');
let upload = document.querySelector('.upload');

let pencilFlag = false;
let eraserFlag = false;

/**
 * true -> show tools
 * false -> hide tools
 */
optionsContainer.addEventListener('click', (e) => {
  optionsFlag = !optionsFlag;
  optionsFlag ? openTools() : closeTools();
});

function openTools() {
  let iconElement = optionsContainer.children[0];
  iconElement.classList.remove('fa-bars');
  iconElement.classList.add('fa-xmark');

  toolsContainer.classList.remove('scale-down');
  toolsContainer.classList.add('scale-up');

  toolsContainer.style.display = 'flex';
}

function closeTools() {
  let iconElement = optionsContainer.children[0];
  iconElement.classList.remove('fa-xmark');
  iconElement.classList.add('fa-bars');

  toolsContainer.classList.remove('scale-up');
  toolsContainer.classList.add('scale-down');

  toolsContainer.style.display = 'none';

  // Always hide the tools also when tools container is closed
  pencilToolContainer.style.display = 'none';
  eraserToolContainer.style.display = 'none';
}

/**
 * true -> show pencil tool
 * false -> hide pencil tool
 */
pencil.addEventListener('click', () => {
  pencilFlag = !pencilFlag;
  pencilFlag
    ? (pencilToolContainer.style.display = 'block')
    : (pencilToolContainer.style.display = 'none');
});

/**
 * true -> show eraser tool
 * false -> hide eraser tool
 */
eraser.addEventListener('click', () => {
  eraserFlag = !eraserFlag;
  eraserFlag
    ? (eraserToolContainer.style.display = 'flex')
    : (eraserToolContainer.style.display = 'none');
});

sticky.addEventListener('click', (e) => {
  let stickyTemplateHTML = ` 
      <div class="header-container">
        <div class="minimize"></div>
        <div class="remove"></div>
      </div>
      <div class="note-container">
        <textarea spellcheck="false"></textarea>
      </div>
      `;
  createSticky(stickyTemplateHTML);
});

function stickyNoteActions(stickyContainer, minimize, remove) {
  remove.addEventListener('click', () => {
    stickyContainer.remove();
  });

  minimize.addEventListener('click', () => {
    let noteContainer = stickyContainer.querySelector('.note-container');
    let display = getComputedStyle(noteContainer).getPropertyValue('display');

    if (display === 'none') {
      noteContainer.style.display = 'block';
    } else {
      noteContainer.style.display = 'none';
    }
  });
}

function dragAndDrop(element, event) {
  let shiftX = event.clientX - element.getBoundingClientRect().left;
  let shiftY = event.clientY - element.getBoundingClientRect().top;

  element.style.position = 'absolute';
  element.style.zIndex = 1000;

  moveAt(event.pageX, event.pageY);

  // moves the sticky at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    element.style.left = pageX - shiftX + 'px';
    element.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // move the sticky on mousemove
  document.addEventListener('mousemove', onMouseMove);

  // drop the sticky, remove unneeded handlers
  element.onmouseup = function () {
    document.removeEventListener('mousemove', onMouseMove);
    element.onmouseup = null;
  };
}

function createSticky(stickyTemplateHTML) {
  let stickyContainer = document.createElement('div');
  stickyContainer.setAttribute('class', 'sticky-container');
  stickyContainer.innerHTML = stickyTemplateHTML;

  document.body.appendChild(stickyContainer);

  let minimize = stickyContainer.querySelector('.minimize');
  let remove = stickyContainer.querySelector('.remove');
  stickyNoteActions(stickyContainer, minimize, remove);

  stickyContainer.onmousedown = function (event) {
    dragAndDrop(stickyContainer, event);
  };

  stickyContainer.ondragstart = function () {
    return false;
  };
}

upload.addEventListener('click', () => {
  // Open file explorer
  let input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.click();
  input.addEventListener('change', (event) => {
    let file = input.files[0];
    let url = URL.createObjectURL(file);

    let stickyTemplateHTML = ` 
      <div class="header-container">
        <div class="minimize"></div>
        <div class="remove"></div>
      </div>
      <div class="note-container">
        <img src="${url}"/>
      </div>
      `;
    createSticky(stickyTemplateHTML);
  });
});

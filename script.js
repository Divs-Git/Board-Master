let optionsContainer = document.querySelector('.options-container')
let toolsContainer = document.querySelector('.tools-container')
let optionsFlag = false

let pencilToolContainer = document.querySelector('.pencil-tool-container')
let eraserToolContainer = document.querySelector('.eraser-tool-container')
let pencil = document.querySelector('.pencil')
let eraser = document.querySelector('.eraser')
let sticky = document.querySelector('.sticky')

let pencilFlag = false
let eraserFlag = false

/**
 * true -> show tools
 * false -> hide tools
 */
optionsContainer.addEventListener('click', (e) => {
  optionsFlag = !optionsFlag
  optionsFlag ? openTools() : closeTools()
})

function openTools() {
  let iconElement = optionsContainer.children[0]
  iconElement.classList.remove('fa-bars')
  iconElement.classList.add('fa-xmark')

  toolsContainer.classList.remove('scale-down')
  toolsContainer.classList.add('scale-up')

  toolsContainer.style.display = 'flex'
}

function closeTools() {
  let iconElement = optionsContainer.children[0]
  iconElement.classList.remove('fa-xmark')
  iconElement.classList.add('fa-bars')

  toolsContainer.classList.remove('scale-up')
  toolsContainer.classList.add('scale-down')

  toolsContainer.style.display = 'none'

  // Always hide the tools also when tools container is closed
  pencilToolContainer.style.display = 'none'
  eraserToolContainer.style.display = 'none'
}

/**
 * true -> show pencil tool
 * false -> hide pencil tool
 */
pencil.addEventListener('click', () => {
  pencilFlag = !pencilFlag
  pencilFlag
    ? (pencilToolContainer.style.display = 'block')
    : (pencilToolContainer.style.display = 'none')
})

/**
 * true -> show eraser tool
 * false -> hide eraser tool
 */
eraser.addEventListener('click', () => {
  eraserFlag = !eraserFlag
  eraserFlag
    ? (eraserToolContainer.style.display = 'flex')
    : (eraserToolContainer.style.display = 'none')
})

sticky.addEventListener('click', (e) => {
  let stickyContainer = document.createElement('div')
  stickyContainer.setAttribute('class', 'sticky-container')
  stickyContainer.innerHTML = ` 
      <div class="header-container">
        <div class="minimize"></div>
        <div class="remove"></div>
      </div>
      <div class="note-container">
        <textarea></textarea>
      </div>
      `

  document.body.appendChild(stickyContainer)
})

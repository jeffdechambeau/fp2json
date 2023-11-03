const canvas = document.getElementById('canvas'); // Replace 'canvas-id' with your actual canvas id
const ctx = canvas.getContext('2d');

let rectangles = [];
let isDragging = false;
let isResizing = false; // This was missing
let selectedRectangleIndex = -1;
let resizeEdge = ''; // This was missing
let edgeProximity = 10; // Adjust as needed for edge detection

// Your canvas setup and interaction code here, making use of imported functions.
function handleMouseMove(event) {
  const x = event.pageX - canvas.offsetLeft;
  const y = event.pageY - canvas.offsetTop;
  const hoveredRect = findHoveredRectangle(x, y);

  if (hoveredRect.index >= 0) {
    const edge = cursorOnEdge(x, y, hoveredRect.rect);
    if (edge.isNearEdge) {
      canvas.style.cursor = 'crosshair'; // Change cursor style to indicate edge hovering
      if (isDragging) {
        resizeRectangle(x, y, hoveredRect.rect, edge.edge);
        return;
      }
    } else {
      canvas.style.cursor = 'default';
    }
  } else {
    canvas.style.cursor = 'default';
  }

  if (isDragging) {
    const selectedRect = rectangles[selectedRectangleIndex];
    selectedRect.width = x - selectedRect.x;
    selectedRect.height = y - selectedRect.y;
  }

  drawRectangles(ctx, rectangles);
}

function handleMouseDown(event) {
  const x = event.pageX - canvas.offsetLeft;
  const y = event.pageY - canvas.offsetTop;
  const edge = cursorOnEdge(x, y);

  if (edge.isNearEdge) {
    selectedRectangleIndex = edge.rectIndex;
    isResizing = true;
    resizeEdge = edge.edge;
  } else {
    if (!isDragging) {
      isDragging = true;
      rectangles.push({ x, y, width: 0, height: 0, strokeColor: 'blue' });
      selectedRectangleIndex = rectangles.length - 1;
    }
  }
}

function handleMouseUp() {
  isDragging = false;
  isResizing = false;
  selectedRectangleIndex = -1;
  resizeEdge = '';
  drawRectangles(ctx, rectangles); // Redraw to clear any intermediate states
}

canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('mousedown', handleMouseDown);
window.addEventListener('mouseup', handleMouseUp);

drawRectangles(ctx, rectangles);

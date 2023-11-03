class Rectangle {
  constructor(x, y, width, height, strokeColor) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.strokeColor = strokeColor;
    this.hover = false;
    this.active = false;
  }
}

function findHoveredRectangle(rectangles, x, y) {
  for (let i = rectangles.length - 1; i >= 0; i--) {
    const rect = rectangles[i];
    if (x > rect.x && x < rect.x + rect.width && y > rect.y && y < rect.y + rect.height) {
      return { rect, index: i };
    }
  }
  return { rect: null, index: -1 };
}

function cursorOnEdge(x, y, rect, edgeProximity) {
  if (!rect) return { isNearEdge: false, edge: null };
  if (x >= rect.x - edgeProximity && x <= rect.x + edgeProximity) return { isNearEdge: true, edge: 'left' };
  if (x >= rect.x + rect.width - edgeProximity && x <= rect.x + rect.width + edgeProximity)
    return { isNearEdge: true, edge: 'right' };
  if (y >= rect.y - edgeProximity && y <= rect.y + edgeProximity) return { isNearEdge: true, edge: 'top' };
  if (y >= rect.y + rect.height - edgeProximity && y <= rect.y + rect.height + edgeProximity)
    return { isNearEdge: true, edge: 'bottom' };

  return { isNearEdge: false, edge: null };
}

function resizeRectangle(rect, x, y, edge) {
  switch (edge) {
    case 'left':
      rect.width += rect.x - x;
      rect.x = x;
      break;
    case 'right':
      rect.width = x - rect.x;
      break;
    case 'top':
      rect.height += rect.y - y;
      rect.y = y;
      break;
    case 'bottom':
      rect.height = y - rect.y;
      break;
  }
}

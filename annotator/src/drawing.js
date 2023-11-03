function drawRectangles(ctx, rectangles) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  rectangles.forEach(rect => {
    ctx.beginPath();
    ctx.rect(rect.x, rect.y, rect.width, rect.height);
    ctx.strokeStyle = rect.strokeColor;
    ctx.lineWidth = 2;
    if (rect.hover) {
      ctx.strokeStyle = 'lime';
    }
    if (rect.active) {
      ctx.strokeStyle = 'pink';
    }
    ctx.stroke();
  });
}

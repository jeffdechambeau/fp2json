/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_rectangle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/rectangle.js */ \"./src/rectangle.js\");\n/* harmony import */ var _src_drawing_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/drawing.js */ \"./src/drawing.js\");\n// main.js\n\n\n// Add canvas and context definitions\nconst canvas = document.getElementById('canvas'); // Replace 'canvas-id' with your actual canvas id\nconst ctx = canvas.getContext('2d');\n\nlet rectangles = [];\nlet isDragging = false;\nlet isResizing = false; // This was missing\nlet selectedRectangleIndex = -1;\nlet resizeEdge = ''; // This was missing\nlet edgeProximity = 10; // Adjust as needed for edge detection\n\n// Your canvas setup and interaction code here, making use of imported functions.\nfunction handleMouseMove(event) {\n  const x = event.pageX - canvas.offsetLeft;\n  const y = event.pageY - canvas.offsetTop;\n  const hoveredRect = (0,_src_rectangle_js__WEBPACK_IMPORTED_MODULE_0__.findHoveredRectangle)(x, y);\n\n  if (hoveredRect.index >= 0) {\n    const edge = (0,_src_rectangle_js__WEBPACK_IMPORTED_MODULE_0__.cursorOnEdge)(x, y, hoveredRect.rect);\n    if (edge.isNearEdge) {\n      canvas.style.cursor = 'crosshair'; // Change cursor style to indicate edge hovering\n      if (isDragging) {\n        (0,_src_rectangle_js__WEBPACK_IMPORTED_MODULE_0__.resizeRectangle)(x, y, hoveredRect.rect, edge.edge);\n        return;\n      }\n    } else {\n      canvas.style.cursor = 'default';\n    }\n  } else {\n    canvas.style.cursor = 'default';\n  }\n\n  if (isDragging) {\n    const selectedRect = rectangles[selectedRectangleIndex];\n    selectedRect.width = x - selectedRect.x;\n    selectedRect.height = y - selectedRect.y;\n  }\n\n  (0,_src_drawing_js__WEBPACK_IMPORTED_MODULE_1__.drawRectangles)(ctx, rectangles);\n}\nfunction handleMouseDown(event) {\n  const x = event.pageX - canvas.offsetLeft;\n  const y = event.pageY - canvas.offsetTop;\n  const edge = (0,_src_rectangle_js__WEBPACK_IMPORTED_MODULE_0__.cursorOnEdge)(x, y);\n\n  if (edge.isNearEdge) {\n    selectedRectangleIndex = edge.rectIndex;\n    isResizing = true;\n    resizeEdge = edge.edge;\n  } else {\n    if (!isDragging) {\n      isDragging = true;\n      rectangles.push({ x, y, width: 0, height: 0, strokeColor: 'blue' });\n      selectedRectangleIndex = rectangles.length - 1;\n    }\n  }\n}\n\nfunction handleMouseUp() {\n  isDragging = false;\n  isResizing = false;\n  selectedRectangleIndex = -1;\n  resizeEdge = '';\n  (0,_src_drawing_js__WEBPACK_IMPORTED_MODULE_1__.drawRectangles)(ctx, rectangles); // Redraw to clear any intermediate states\n}\n\n// Add event listeners\ncanvas.addEventListener('mousemove', handleMouseMove);\ncanvas.addEventListener('mousedown', handleMouseDown);\nwindow.addEventListener('mouseup', handleMouseUp);\n\n// Initial drawing of the canvas\n(0,_src_drawing_js__WEBPACK_IMPORTED_MODULE_1__.drawRectangles)(ctx, rectangles);\n\n\n//# sourceURL=webpack://fp2json/./main.js?");

/***/ }),

/***/ "./src/drawing.js":
/*!************************!*\
  !*** ./src/drawing.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   drawRectangles: () => (/* binding */ drawRectangles)\n/* harmony export */ });\nfunction drawRectangles(ctx, rectangles) {\n  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);\n  rectangles.forEach(rect => {\n    ctx.beginPath();\n    ctx.rect(rect.x, rect.y, rect.width, rect.height);\n    ctx.strokeStyle = rect.strokeColor;\n    ctx.lineWidth = 2;\n    if (rect.hover) {\n      ctx.strokeStyle = 'lime';\n    }\n    if (rect.active) {\n      ctx.strokeStyle = 'pink';\n    }\n    ctx.stroke();\n  });\n}\n\n\n//# sourceURL=webpack://fp2json/./src/drawing.js?");

/***/ }),

/***/ "./src/rectangle.js":
/*!**************************!*\
  !*** ./src/rectangle.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Rectangle: () => (/* binding */ Rectangle),\n/* harmony export */   cursorOnEdge: () => (/* binding */ cursorOnEdge),\n/* harmony export */   findHoveredRectangle: () => (/* binding */ findHoveredRectangle),\n/* harmony export */   resizeRectangle: () => (/* binding */ resizeRectangle)\n/* harmony export */ });\n// rectangle.js\nclass Rectangle {\n  constructor(x, y, width, height, strokeColor) {\n    this.x = x;\n    this.y = y;\n    this.width = width;\n    this.height = height;\n    this.strokeColor = strokeColor;\n    this.hover = false;\n    this.active = false;\n  }\n}\n\nfunction findHoveredRectangle(rectangles, x, y) {\n  for (let i = rectangles.length - 1; i >= 0; i--) {\n    const rect = rectangles[i];\n    if (x > rect.x && x < rect.x + rect.width && y > rect.y && y < rect.y + rect.height) {\n      return { rect, index: i };\n    }\n  }\n  return { rect: null, index: -1 };\n}\n\nfunction cursorOnEdge(x, y, rect, edgeProximity) {\n  if (!rect) return { isNearEdge: false, edge: null };\n  if (x >= rect.x - edgeProximity && x <= rect.x + edgeProximity) return { isNearEdge: true, edge: 'left' };\n  if (x >= rect.x + rect.width - edgeProximity && x <= rect.x + rect.width + edgeProximity)\n    return { isNearEdge: true, edge: 'right' };\n  if (y >= rect.y - edgeProximity && y <= rect.y + edgeProximity) return { isNearEdge: true, edge: 'top' };\n  if (y >= rect.y + rect.height - edgeProximity && y <= rect.y + rect.height + edgeProximity)\n    return { isNearEdge: true, edge: 'bottom' };\n\n  return { isNearEdge: false, edge: null };\n}\n\nfunction resizeRectangle(rect, x, y, edge) {\n  switch (edge) {\n    case 'left':\n      rect.width += rect.x - x;\n      rect.x = x;\n      break;\n    case 'right':\n      rect.width = x - rect.x;\n      break;\n    case 'top':\n      rect.height += rect.y - y;\n      rect.y = y;\n      break;\n    case 'bottom':\n      rect.height = y - rect.y;\n      break;\n  }\n}\n\n\n//# sourceURL=webpack://fp2json/./src/rectangle.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./main.js");
/******/ 	
/******/ })()
;
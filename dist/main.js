/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function() {

eval("const canvasEl = document.getElementById(\"canvas\");\nconsole.log(canvasEl);\nlet context = canvasEl.getContext(\"2d\");\ncontext.fillStyle = \"#336600\";\ncontext.fillRect(200, 0, 800, 300);\ncontext.fillStyle = \"#336600\";\ncontext.fillRect(200, 450, 800, 300);\ncontext.fillStyle = \"#000000\";\ncontext.fillRect(200, 150, 400, 150);\ncontext.fillStyle = \"#000000\";\ncontext.fillRect(200, 450, 400, 150);\nconst card = new Image();\ncard.src = \"images/Cards/Medium/Clubs_1.png\";\ncard.onload = () => {\n  context.drawImage(card, 0, 0, 55, 80);\n};\n// context.fillStyle = \"#000000\";\n// context.fillRect(0,0,100,100);\nconsole.log(card);\n// context.drawImage(document.getElementsByTagName(\"img\")[0],0,0,100,100);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJuYW1lcyI6WyJjYW52YXNFbCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjb25zb2xlIiwibG9nIiwiY29udGV4dCIsImdldENvbnRleHQiLCJmaWxsU3R5bGUiLCJmaWxsUmVjdCIsImNhcmQiLCJJbWFnZSIsInNyYyIsIm9ubG9hZCIsImRyYXdJbWFnZSJdLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2Fybml2YWxwb2tlci8uL3NyYy9pbmRleC5qcz9iNjM1Il0sInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuXHJcbmNvbnN0IGNhbnZhc0VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIik7XHJcbmNvbnNvbGUubG9nKGNhbnZhc0VsKTtcclxubGV0IGNvbnRleHQgPSBjYW52YXNFbC5nZXRDb250ZXh0KFwiMmRcIik7XHJcbmNvbnRleHQuZmlsbFN0eWxlID0gXCIjMzM2NjAwXCI7XHJcbmNvbnRleHQuZmlsbFJlY3QoMjAwLDAsODAwLDMwMCk7XHJcbmNvbnRleHQuZmlsbFN0eWxlID0gXCIjMzM2NjAwXCI7XHJcbmNvbnRleHQuZmlsbFJlY3QoMjAwLDQ1MCw4MDAsMzAwKTtcclxuY29udGV4dC5maWxsU3R5bGUgPSBcIiMwMDAwMDBcIjtcclxuY29udGV4dC5maWxsUmVjdCgyMDAsMTUwLDQwMCwxNTApO1xyXG5jb250ZXh0LmZpbGxTdHlsZSA9IFwiIzAwMDAwMFwiO1xyXG5jb250ZXh0LmZpbGxSZWN0KDIwMCw0NTAsNDAwLDE1MCk7XHJcbiBcclxuY29uc3QgY2FyZCA9IG5ldyBJbWFnZSgpO1xyXG5jYXJkLnNyYyA9IFwiaW1hZ2VzL0NhcmRzL01lZGl1bS9DbHVic18xLnBuZ1wiO1xyXG5jYXJkLm9ubG9hZCA9ICgpPT57XHJcbiAgICBjb250ZXh0LmRyYXdJbWFnZShjYXJkLDAsMCw1NSw4MCk7XHJcbn1cclxuLy8gY29udGV4dC5maWxsU3R5bGUgPSBcIiMwMDAwMDBcIjtcclxuLy8gY29udGV4dC5maWxsUmVjdCgwLDAsMTAwLDEwMCk7XHJcbmNvbnNvbGUubG9nKGNhcmQpO1xyXG4vLyBjb250ZXh0LmRyYXdJbWFnZShkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImltZ1wiKVswXSwwLDAsMTAwLDEwMCk7XHJcblxyXG4iXSwibWFwcGluZ3MiOiJBQUdBLE1BQU1BLFFBQVEsR0FBR0MsUUFBUSxDQUFDQyxjQUFjLENBQUMsUUFBUSxDQUFDO0FBQ2xEQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0osUUFBUSxDQUFDO0FBQ3JCLElBQUlLLE9BQU8sR0FBR0wsUUFBUSxDQUFDTSxVQUFVLENBQUMsSUFBSSxDQUFDO0FBQ3ZDRCxPQUFPLENBQUNFLFNBQVMsR0FBRyxTQUFTO0FBQzdCRixPQUFPLENBQUNHLFFBQVEsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUM7QUFDL0JILE9BQU8sQ0FBQ0UsU0FBUyxHQUFHLFNBQVM7QUFDN0JGLE9BQU8sQ0FBQ0csUUFBUSxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQztBQUNqQ0gsT0FBTyxDQUFDRSxTQUFTLEdBQUcsU0FBUztBQUM3QkYsT0FBTyxDQUFDRyxRQUFRLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDO0FBQ2pDSCxPQUFPLENBQUNFLFNBQVMsR0FBRyxTQUFTO0FBQzdCRixPQUFPLENBQUNHLFFBQVEsQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUM7QUFFakMsTUFBTUMsSUFBSSxHQUFHLElBQUlDLEtBQUssRUFBRTtBQUN4QkQsSUFBSSxDQUFDRSxHQUFHLEdBQUcsaUNBQWlDO0FBQzVDRixJQUFJLENBQUNHLE1BQU0sR0FBRyxNQUFJO0VBQ2RQLE9BQU8sQ0FBQ1EsU0FBUyxDQUFDSixJQUFJLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDO0FBQ3JDLENBQUM7QUFDRDtBQUNBO0FBQ0FOLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDSyxJQUFJLENBQUM7QUFDakIifQ==\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguc2Nzcy5qcyIsIm1hcHBpbmdzIjoiO0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYXJuaXZhbHBva2VyLy4vc3JjL2luZGV4LnNjc3M/OTc0NSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.scss\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	__webpack_modules__["./src/index.js"](0, {}, __webpack_require__);
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.scss"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;
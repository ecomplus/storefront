(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[16],{

/***/ "./template/js/lib/photoswipe.js":
/*!***************************************!*\
  !*** ./template/js/lib/photoswipe.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var photoswipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! photoswipe */ "./node_modules/photoswipe/dist/photoswipe.js");
/* harmony import */ var photoswipe__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(photoswipe__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var photoswipe_dist_photoswipe_ui_default__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! photoswipe/dist/photoswipe-ui-default */ "./node_modules/photoswipe/dist/photoswipe-ui-default.js");
/* harmony import */ var photoswipe_dist_photoswipe_ui_default__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(photoswipe_dist_photoswipe_ui_default__WEBPACK_IMPORTED_MODULE_1__);


var $pswp = document.getElementsByClassName('pswp')[0];

if ($pswp) {
  window.storefront.photoswipe = function (psImages, index) {
    var photoswipe = new photoswipe__WEBPACK_IMPORTED_MODULE_0__($pswp, photoswipe_dist_photoswipe_ui_default__WEBPACK_IMPORTED_MODULE_1__, psImages, {
      index: index
    });
    photoswipe.init();
  };
}

/***/ })

}]);
//# sourceMappingURL=9145d5f2df5fffab538f.js.map
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[12],{

/***/ "../widget-truxtvox/src/index.js":
/*!***************************************!*\
  !*** ../widget-truxtvox/src/index.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ "../../../node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_rating_products__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/rating-products */ "../widget-truxtvox/src/lib/rating-products.js");
/* harmony import */ var _lib_comments_products__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/comments-products */ "../widget-truxtvox/src/lib/comments-products.js");
/* harmony import */ var _lib_rating_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/rating-search */ "../widget-truxtvox/src/lib/rating-search.js");




/* harmony default export */ __webpack_exports__["default"] = (function (options) {
  if (options && options.trustvoxStoreId) {
    ;
    ['//static.trustvox.com.br/assets/widget.js', '//s3-sa-east-1.amazonaws.com/trustvox-rate-widget-js/widget.js'].forEach(function (script) {
      var scriptEl = document.createElement('script');
      scriptEl.src = script;
      document.body.appendChild(scriptEl);
    });
    Object(_lib_rating_products__WEBPACK_IMPORTED_MODULE_1__["default"])(options);
    Object(_lib_rating_search__WEBPACK_IMPORTED_MODULE_3__["default"])(options);
    Object(_lib_comments_products__WEBPACK_IMPORTED_MODULE_2__["default"])(options);
  } else {
    console.error(new Error('Can\'t setup Trustvox widget without `trustvoxStoreId` option'));
  }
});

/***/ }),

/***/ "../widget-truxtvox/src/lib/comments-products.js":
/*!*******************************************************!*\
  !*** ../widget-truxtvox/src/lib/comments-products.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ "../../../node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "../../../node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ __webpack_exports__["default"] = (function (options) {
  var $productBlock = document.getElementById('product');
  var context = window._context.body;
  var moConfig = {
    childList: false,
    attributes: true,
    characterData: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true
  };

  if ($productBlock) {
    (function () {
      var ratingLink = function ratingLink() {
        var $link = document.createElement('a');
        $link.className = 'trustvox-fluid-jump trustvox-widget-rating product-widget-rating';
        $link.id = 'trustvox-widget-rating';
        $link.href = '#_trustvox_widget';
        $link.title = 'Veja as opiniões de quem comprou esse produto!';
        var $shelfContainer = document.createElement('div');
        $shelfContainer.className = 'trustvox-shelf-container';
        $shelfContainer.setAttribute('data-trustvox-product-code', context.sku);
        $link.appendChild($shelfContainer);
        var $ratingClickHere = document.createElement('span');
        $ratingClickHere.className = 'rating-click-here';
        $link.appendChild($ratingClickHere);
        return $link;
      };

      var $ratingProduct = ratingLink();
      $ratingProduct.style.display = 'none';
      document.body.appendChild($ratingProduct);
      var widgetIsRended = false;
      var mo = null;
      var $shelfProduct = $productBlock.parentElement;

      var _loop = function _loop(i) {
        if ($shelfProduct.childNodes[i].id === 'product') {
          var callback = function callback() {
            for (var j = 0; j < $shelfProduct.childNodes[i].childNodes.length; j++) {
              var $productBlockNode = $shelfProduct.childNodes[i].childNodes[j];

              if ($productBlockNode.id === 'product-block') {
                var toRender = $productBlockNode.dataset.toRender;

                if (!toRender) {
                  var $productName = document.getElementsByClassName('ec-product__name')[0];

                  if (!widgetIsRended && typeof $productName !== 'undefined') {
                    $productName.parentNode.insertBefore($ratingProduct, $productName.nextSibling);
                    $ratingProduct.style.display = 'inherit';
                    widgetIsRended = true;
                  }
                }
              }
            }
          };

          mo = new window.MutationObserver(callback);
          mo.observe($shelfProduct.childNodes[i], moConfig);
        }
      };

      for (var i = 0; i < $shelfProduct.childNodes.length; i++) {
        _loop(i);
      }

      var pictures = [];
      context.pictures.forEach(function (picture) {
        if (picture.normal) {
          pictures.push(picture.normal.url);
        }
      });
      window._trustvox = window._trustvox || [];

      window._trustvox.push(['_storeId', options.trustvoxStoreId]);

      window._trustvox.push(['_productId', context.sku]);

      window._trustvox.push(['_productName', context.name]);

      window._trustvox.push(['_productPhotos', pictures]);

      var $trustvoxWidget = document.createElement('div');
      $trustvoxWidget.id = '_trustvox_widget';
      document.getElementById('product').appendChild($trustvoxWidget);
      var interval = setInterval(function () {
        if (widgetIsRended) {
          mo.disconnect();
          clearInterval(interval);
        }
      }, 1000);
    })();
  }
});

/***/ }),

/***/ "../widget-truxtvox/src/lib/observer.js":
/*!**********************************************!*\
  !*** ../widget-truxtvox/src/lib/observer.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (el, callback) {
  var config = {
    childList: false,
    attributes: true,
    characterData: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true
  };
  var observer = new window.MutationObserver(callback);
  observer.observe(el, config);
});

/***/ }),

/***/ "../widget-truxtvox/src/lib/rating-products.js":
/*!*****************************************************!*\
  !*** ../widget-truxtvox/src/lib/rating-products.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.index-of */ "../../../node_modules/core-js/modules/es.array.index-of.js");
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _observer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./observer */ "../widget-truxtvox/src/lib/observer.js");
/* harmony import */ var _rating_widget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rating-widget */ "../widget-truxtvox/src/lib/rating-widget.js");



/* harmony default export */ __webpack_exports__["default"] = (function (options) {
  var elClass = 'product-card';
  var $productCards = document.getElementsByClassName(elClass);

  if ($productCards) {
    (function () {
      var skus = [];
      var $ratingsBySku = {};

      for (var i = 0; i < $productCards.length; i++) {
        var $productCard = $productCards[i];

        if ($productCard && $productCard.dataset) {
          (function () {
            var sku = $productCard.dataset.sku;

            if (skus.indexOf(sku) === -1) {
              var $rating = Object(_rating_widget__WEBPACK_IMPORTED_MODULE_2__["default"])(sku);
              $rating.style.display = 'none';
              skus.push(sku);
              $ratingsBySku[sku] = $rating;
              document.body.appendChild($rating);
            }

            var $shelf = $productCard.parentElement;
            Object(_observer__WEBPACK_IMPORTED_MODULE_1__["default"])($shelf, function () {
              for (var _i = 0; _i < $shelf.childNodes.length; _i++) {
                var _$productCard = $shelf.childNodes[_i];
                var _$productCard$dataset = _$productCard.dataset,
                    _sku = _$productCard$dataset.sku,
                    toRender = _$productCard$dataset.toRender;

                if (!toRender) {
                  if (skus.indexOf(_sku) > -1) {
                    var _$rating = $ratingsBySku[_sku];
                    var $productCardLink = document.querySelectorAll("[data-sku=\"".concat(_sku, "\"] .ec-product-card__link"));

                    if ($productCardLink.length) {
                      for (var j = 0; j < $productCardLink.length; j++) {
                        $productCardLink[j].appendChild(_$rating);
                      }

                      _$rating.style.display = 'inherit';
                    }
                  }
                }
              }
            });
          })();
        }
      }

      window._trustvox_shelf_rate = window._trustvox_shelf_rate || [];

      window._trustvox_shelf_rate.push(['_storeId', options.trustvoxStoreId]);
    })();
  }
});

/***/ }),

/***/ "../widget-truxtvox/src/lib/rating-search.js":
/*!***************************************************!*\
  !*** ../widget-truxtvox/src/lib/rating-search.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _observer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./observer */ "../widget-truxtvox/src/lib/observer.js");
/* harmony import */ var _rating_widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rating-widget */ "../widget-truxtvox/src/lib/rating-widget.js");


/* harmony default export */ __webpack_exports__["default"] = (function () {
  var $search = document.getElementById('search');

  if ($search) {
    Object(_observer__WEBPACK_IMPORTED_MODULE_0__["default"])($search, function () {
      var $productCards = document.querySelectorAll('#search-engine .product-card');

      for (var i = 0; i < $productCards.length; i++) {
        var $productCard = $productCards[i];
        var sku = $productCard.dataset.sku;
        var $productCardLink = document.querySelectorAll("[data-sku=\"".concat(sku, "\"] .ec-product-card__link"));

        if ($productCardLink.length) {
          var $rating = Object(_rating_widget__WEBPACK_IMPORTED_MODULE_1__["default"])(sku);

          for (var j = 0; j < $productCardLink.length; j++) {
            $productCardLink[j].appendChild($rating);
          }
        }
      }

      window._trustvox_shelf_rate.push(['_productContainer', '#search']);
    });
  }
});

/***/ }),

/***/ "../widget-truxtvox/src/lib/rating-widget.js":
/*!***************************************************!*\
  !*** ../widget-truxtvox/src/lib/rating-widget.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (productId) {
  var $div = document.createElement('div');
  $div.setAttribute('data-trustvox-product-code', productId);
  return $div;
});

/***/ })

}]);
//# sourceMappingURL=3ed487d724690aa25273.js.map
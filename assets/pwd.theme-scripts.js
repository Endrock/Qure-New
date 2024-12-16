/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/components/lifestyle-tips.js":
/*!*********************************************!*\
  !*** ./src/js/components/lifestyle-tips.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
var lifestyleInit = function lifestyleInit() {
  window.addEventListener("load", function () {
    if (!window.customElements.get('cards-tips')) {
      var CardsTips = /*#__PURE__*/function (_HTMLElement) {
        function CardsTips() {
          var _this;
          _classCallCheck(this, CardsTips);
          _this = _callSuper(this, CardsTips);
          _this.cards = [];
          return _this;
        }
        _inherits(CardsTips, _HTMLElement);
        return _createClass(CardsTips, [{
          key: "connectedCallback",
          value: function connectedCallback() {
            this.updateCards();
            this.paginationClick();
            this.arrowsClick();
          }
        }, {
          key: "attributeChangedCallback",
          value: function attributeChangedCallback(name, oldValue, newValue) {
            if (name === 'active-card') {
              this.changeCard(oldValue, newValue);
            }
          }
        }, {
          key: "updateCards",
          value: function updateCards() {
            this.cards = Array.from(this.querySelectorAll('.card'));
          }
        }, {
          key: "paginationClick",
          value: function paginationClick() {
            var _this2 = this;
            var btnsCards = this.querySelectorAll('.pagination .num');
            if (btnsCards.length < 1) return;
            btnsCards.forEach(function (btn) {
              btn.addEventListener('click', function () {
                _this2.setAttribute('active-card', btn.dataset.card);
              });
            });
          }
        }, {
          key: "arrowsClick",
          value: function arrowsClick() {
            var _this3 = this;
            var btnsNext = this.querySelectorAll('.next');
            var btnsPrevieus = this.querySelectorAll('.previous');
            if (btnsNext.length < 1 && btnsPrevieus < 1) return;
            btnsNext.forEach(function (btn) {
              btn.addEventListener('click', function () {
                var nextCard = parseInt(_this3.getAttribute('active-card')) + 1;
                if (nextCard > _this3.cards.length) return;
                _this3.setAttribute('active-card', nextCard);
              });
            });
            btnsPrevieus.forEach(function (btn) {
              btn.addEventListener('click', function () {
                var previousCard = parseInt(_this3.getAttribute('active-card')) - 1;
                if (previousCard < 1) return;
                _this3.setAttribute('active-card', previousCard);
              });
            });
          }
        }, {
          key: "changeCard",
          value: function changeCard(oldValue, newValue) {
            if (!newValue || !oldValue || newValue === oldValue) return;
            if (!this.cards.length) this.updateCards();
            var activatedCard = this.querySelector(".card[index=\"".concat(newValue, "\"]"));
            var desactivatedCard = this.querySelector(".card[index=\"".concat(oldValue, "\"]"));
            if (activatedCard === desactivatedCard) return;
            if (!activatedCard) return;
            if (!desactivatedCard) {
              this.cards.forEach(function (card) {
                card.classList.remove('active');
              });
            } else {
              desactivatedCard.classList.remove('active');
            }
            if (activatedCard) {
              activatedCard.classList.add('active');
            }
          }
        }], [{
          key: "observedAttributes",
          get: function get() {
            return ['active-card'];
          }
        }]);
      }(/*#__PURE__*/_wrapNativeSuper(HTMLElement));
      window.customElements.define('cards-tips', CardsTips);
    }
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lifestyleInit);

/***/ }),

/***/ "./src/js/components/regimen-steps.js":
/*!********************************************!*\
  !*** ./src/js/components/regimen-steps.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
var regimenInit = function regimenInit() {
  window.addEventListener("load", function () {
    if (!window.customElements.get('regimen-steps')) {
      var RegimenSteps = /*#__PURE__*/function (_HTMLElement) {
        function RegimenSteps() {
          var _this;
          _classCallCheck(this, RegimenSteps);
          _this = _callSuper(this, RegimenSteps);
          _this.steps = [];
          _this.tabs = [];
          return _this;
        }
        _inherits(RegimenSteps, _HTMLElement);
        return _createClass(RegimenSteps, [{
          key: "connectedCallback",
          value: function connectedCallback() {
            this.updateSteps();
            this.paginationClick();
          }
        }, {
          key: "attributeChangedCallback",
          value: function attributeChangedCallback(name, oldValue, newValue) {
            if (name === 'active-step') {
              this.changeStep(oldValue, newValue);
            }
          }
        }, {
          key: "updateSteps",
          value: function updateSteps() {
            this.steps = Array.from(this.querySelectorAll('.step'));
            this.tabs = Array.from(this.querySelectorAll('.tab'));
          }
        }, {
          key: "paginationClick",
          value: function paginationClick() {
            var _this2 = this;
            if (this.tabs.length < 1) return;
            this.tabs.forEach(function (tab) {
              tab.addEventListener('click', function () {
                console.log('click', tab.getAttribute('index'));
                _this2.setAttribute('active-step', tab.getAttribute('index'));
              });
            });
          }
        }, {
          key: "changeStep",
          value: function changeStep(oldValue, newValue) {
            if (!newValue || !oldValue || newValue === oldValue) return;
            if (!this.steps.length && !this.tabs.length) this.updateSteps();
            var activatedStep = this.querySelector(".step[index=\"".concat(newValue, "\"]"));
            var desactivatedStep = this.querySelector(".step[index=\"".concat(oldValue, "\"]"));
            var activatedTab = this.querySelector(".tab[index=\"".concat(newValue, "\"]"));
            var desactivatedTab = this.querySelector(".tab[index=\"".concat(oldValue, "\"]"));
            if (activatedStep === desactivatedStep) return;
            if (!activatedStep) return;
            if (activatedTab === desactivatedTab) return;
            if (!activatedTab) return;
            if (!desactivatedStep) {
              this.steps.forEach(function (step) {
                step.classList.remove('active');
              });
            } else {
              desactivatedStep.classList.remove('active');
            }
            if (!desactivatedTab) {
              this.tabs.forEach(function (tab) {
                tab.classList.remove('active');
              });
            } else {
              desactivatedTab.classList.remove('active');
            }
            if (activatedStep) {
              activatedStep.classList.add('active');
            }
            if (activatedTab) {
              activatedTab.classList.add('active');
            }
          }
        }], [{
          key: "observedAttributes",
          get: function get() {
            return ['active-step'];
          }
        }]);
      }(/*#__PURE__*/_wrapNativeSuper(HTMLElement));
      window.customElements.define('regimen-steps', RegimenSteps);
    }
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (regimenInit);

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
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/js/theme.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_lifestyle_tips_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/lifestyle-tips.js */ "./src/js/components/lifestyle-tips.js");
/* harmony import */ var _components_regimen_steps_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/regimen-steps.js */ "./src/js/components/regimen-steps.js");


(0,_components_lifestyle_tips_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
(0,_components_regimen_steps_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=pwd.theme-scripts.js.map
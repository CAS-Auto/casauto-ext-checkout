/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/helpers/helper.js":
/*!*******************************!*\
  !*** ./src/helpers/helper.js ***!
  \*******************************/
/*! exports provided: fillContainers, amountItems, getCombinations, formatCombinationsResult, generateRecomendations */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fillContainers", function() { return fillContainers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "amountItems", function() { return amountItems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCombinations", function() { return getCombinations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatCombinationsResult", function() { return formatCombinationsResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateRecomendations", function() { return generateRecomendations; });
const fillContainers = (data, totalAmount, totalLenght) => {
  let containerA = {
    "qty": 0,
    "maxLenght": 609.9,
    "isFull": false,
    "maxQty": 2
  };
  let containerB = {
    "qty": 0,
    "maxLenght": 914.4,
    "isFull": false,
    "maxQty": 3
  };
  let containerC = {
    "qty": 0,
    "maxLenght": 1219.2,
    "isFull": false,
    "maxQty": 4
  };
  let containerArray = [];
  let tempArray = [];
  data.forEach((item, idx) => {
    const {
      id,
      lenght
    } = item.itemData;

    if (totalAmount === 1) {
      let itemToSave = {
        "itemId": id,
        "type": "Roro"
      };
      containerArray = [...containerArray, itemToSave];
    }

    if (totalAmount == 2) {
      let itemToSave = {
        "itemId": id,
        "type": "A"
      };
      tempArray = [...tempArray, itemToSave];

      if (containerA.maxQty === tempArray.length) {
        containerArray = [...containerArray, tempArray];
        totalAmount = totalAmount - tempArray.length;
        tempArray = [];
      }
    }

    if (totalAmount === 3) {
      let itemToSave = {
        "itemId": id,
        "type": "B"
      };
      tempArray = [...tempArray, itemToSave];

      if (containerB.maxQty === tempArray.length) {
        containerArray = [...containerArray, tempArray];
        totalAmount = totalAmount - tempArray.length;
        tempArray = [];
      }
    }

    if (totalAmount >= 4) {
      let itemToSave = {
        "itemId": id,
        "type": "C"
      };
      tempArray = [...tempArray, itemToSave];

      if (containerC.maxQty === tempArray.length) {
        containerArray = [...containerArray, tempArray];
        totalAmount = totalAmount - tempArray.length;
        tempArray = [];
      }
    }
  });
  return containerArray;
};
const amountItems = arrayData => {
  console.log(arrayData);
  let containerType = {
    "typeA": 0,
    "typeB": 0,
    "typeC": 0,
    "roro": 0
  };
  arrayData.forEach(item => {
    if (Array.isArray(item)) {
      if (item.length == 2) {
        containerType.typeA = containerType.typeA + 1;
      }

      if (item.length == 3) {
        containerType.typeB = containerType.typeB + 1;
      }

      if (item.length == 4) {
        containerType.typeC = containerType.typeC + 1;
      }
    } else {
      containerType.roro = containerType.roro + 1;
    }
  });
  return containerType;
};
const getCombinations = (value, idx, arrayResult = []) => {
  if (value === 1) {
    value = value - 1;
    return [...arrayResult, {
      "roro": 1
    }];
  }

  if (value == 2) {
    value = value - 2;
    let combinations = [{
      "20ft": 1
    }, {
      "roro": 2
    }]; //   let idxCombinations = Math.floor(Math.random() * 2);

    if (combinations[idx]) {
      return [...arrayResult, combinations[idx]];
    } else {
      return [...arrayResult];
    }
  }

  if (value === 3) {
    value = value - 3;
    let combinations = [{
      "30ft": 1
    }, {
      "20ft": 1,
      "roro": 1
    }, {
      "roro": 3
    }]; //  let idxCombinations = Math.floor(Math.random() * 2);

    if (combinations[idx]) {
      return [...arrayResult, combinations[idx]];
    } else {
      return [...arrayResult];
    }
  }

  if (value === 4) {
    value = value - 4;
    let combinations = [{
      "40ft": 1
    }, {
      "20ft": 2
    }, {
      "30ft": 1,
      "roro": 1
    }, {
      "roro": 4
    }]; //  let idxCombinations = Math.floor(Math.random() * 2);

    if (combinations[idx]) {
      return [...arrayResult, combinations[idx]];
    } else {
      return [...arrayResult];
    }
  }

  if (value > 4) {
    arrayResult = [...arrayResult, {
      "40ft": 1
    }];
    return getCombinations(value - 4, idx, arrayResult);
  }
};
const formatCombinationsResult = arrayResult => {
  let responFormat = {
    "20ft": 0,
    "30ft": 0,
    "40ft": 0,
    "roro": 0,
    "price": 0
  };

  if (arrayResult) {
    arrayResult.forEach(item => {
      let keys = Object.keys(item);

      if (keys) {
        keys.forEach(keyItem => {
          if (keyItem == "20ft") {
            responFormat['20ft'] = responFormat['20ft'] + item['20ft'];
          }

          if (keyItem == "30ft") {
            responFormat['30ft'] = responFormat['30ft'] + item['30ft'];
          }

          if (keyItem == "40ft") {
            responFormat['40ft'] = responFormat['40ft'] + item['40ft'];
          }

          if (keyItem == "roro") {
            responFormat['roro'] = responFormat['roro'] + item['roro'];
          }
        });
      }
    });
  }

  let price = 0;

  for (const property in responFormat) {
    if (responFormat[property] !== 0) {
      switch (property) {
        case '20ft':
          price = price + responFormat[property] * 920;
          break;

        case '30ft':
          price = price + responFormat[property] * 920;
          break;

        case '40ft':
          price = price + responFormat[property] * 920;
          break;

        case 'roro':
          price = price + responFormat[property] * 850;
          break;

        default:
          break;
      }
    }
  }

  responFormat.price = price;
  return responFormat;
};
const generateRecomendations = totalAmount => {
  let result = [];
  let maxValue = 3;

  if (totalAmount === 2) {
    maxValue = 2;
  }

  if (totalAmount === 1) {
    maxValue = 1;
  }

  for (let i = 0; i < maxValue; i++) {
    let resultCombinations = getCombinations(totalAmount, i);
    let cheKIsOn = false;

    if (result.length === 0) {
      result = [...result, formatCombinationsResult(resultCombinations)];
    } else {
      result.forEach(item => {
        if (isEqual(item, formatCombinationsResult(resultCombinations))) {
          cheKIsOn = isEqual(item, formatCombinationsResult(resultCombinations));
        }
      });

      if (!cheKIsOn) {
        result = [...result, formatCombinationsResult(resultCombinations)];
      }
    }
  }

  return result;
};

const isEqual = (...objects) => objects.every(obj => JSON.stringify(obj) === JSON.stringify(objects[0]));

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _helpers_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers/helper */ "./src/helpers/helper.js");
/* harmony import */ var _shipping_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shipping.scss */ "./src/shipping.scss");





document.addEventListener('DOMContentLoaded', function () {
  const divAll = document.querySelectorAll('.checkout-shipping-shortcode');
  const dataToAdd = document.getElementById('shipping_data').textContent;

  if (divAll) {
    divAll.forEach(divToUpdate => {
      react_dom__WEBPACK_IMPORTED_MODULE_2___default.a.render(Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(ShippingComponent, {
        data: JSON.parse(dataToAdd)
      }), divToUpdate);
    });
  }
});

const calculateShipping = data => {
  const containerAlenght = 609.9;
  const containerBlenght = 914.4;
  const containerCcaplenght = 1219.2;
  let totalAmount = 0;
  let totalLenght = 0;
  let heightArray = [];
  let itemsArray = [];
  data.forEach(item => {
    const {
      id,
      width,
      height,
      lenght,
      qty
    } = item.itemData;
    totalLenght = totalLenght + lenght * qty;
    totalAmount = totalAmount + qty;
    heightArray = [...heightArray, height];

    for (let i = 0; i < qty; i++) {
      itemsArray = [...itemsArray, item];
    }
  });
  return Object(_helpers_helper__WEBPACK_IMPORTED_MODULE_3__["generateRecomendations"])(totalAmount); // console.log(generateRecomendations(totalAmount));
  // return fillContainers(itemsArray, totalAmount, totalLenght);
};

const ShippingComponent = ({
  data
}) => {
  const result = calculateShipping(data);
  console.log(result);
  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "casauto-shipping-box"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("h5", null, "Your Shipping Options"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", null, "Prices are estimates and subject to change"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "shipping-list-wrapper"
  }, result.map(item => Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "shipping-list-item"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "shipping-list-item-radio"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("input", {
    type: "radio",
    name: "recommendation",
    value: "other"
  })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "shipping-list-item-value"
  }, item['roro'] !== 0 && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", null, item['roro'] + ' roro'), item['20ft'] !== 0 && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", null, item['20ft'] + ' Container 20ft'), item['30ft'] !== 0 && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", null, item['30ft'] + ' Container 30ft'), item['40ft'] !== 0 && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", null, item['40ft'] + ' Container 40ft')), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "shipping-list-item-price"
  }, "$", item.price))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "shipping-list-item-last"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "shipping-list-item-radio"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("input", {
    type: "radio",
    name: "recommendation",
    value: "other"
  })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "shipping-list-item-input"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("label", null, "Other"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("input", {
    type: "text",
    name: "custom_value",
    value: ""
  }))))));
};

/***/ }),

/***/ "./src/shipping.scss":
/*!***************************!*\
  !*** ./src/shipping.scss ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["element"]; }());

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["React"]; }());

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["ReactDOM"]; }());

/***/ })

/******/ });
//# sourceMappingURL=index.js.map
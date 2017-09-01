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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * ユーティリティクラス
 */
var Util = function () {

  //コンストラクタ
  function Util() {
    _classCallCheck(this, Util);
  }

  /**
   * 指定されたサイズ表記文字列を、 px 単位の数値に変換します。
   * @param {String} direction サイズ表記文字列 (10px, 10em など)
   * @return px単位の値に変換された数値 (例:10)
   */


  _createClass(Util, null, [{
    key: "toPixel",
    value: function toPixel(direction) {
      //TODO:一旦これ
      return parseInt(direction);
    }
  }, {
    key: "Test",
    value: function Test() {}
  }]);

  return Util;
}();

exports.default = Util;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * マスク設定保持クラス
 */
var MaskConfig = function () {
  _createClass(MaskConfig, null, [{
    key: "MASK_YEAR",


    /** マクス-年 */
    get: function get() {
      return "y";
    }
    /** マクス-月 */

  }, {
    key: "MASK_MONTH",
    get: function get() {
      return "M";
    }
    /** マクス-日 */

  }, {
    key: "MASK_DAY",
    get: function get() {
      return "d";
    }
    /** マクス-英字(小文字) */

  }, {
    key: "MASK_L_ALPHA",
    get: function get() {
      return "a";
    }
    /** マクス-英字(大文字) */

  }, {
    key: "MASK_U_ALPHA",
    get: function get() {
      return "A";
    }
    /** マクス-英字(数字) */

  }, {
    key: "MASK_NUM",
    get: function get() {
      return "#";
    }

    /**
     * 入力マスク文字のリストを取得
     */

  }, {
    key: "INPUT_MASK_CHARS",
    get: function get() {
      return MaskConfig.MASK_YEAR + MaskConfig.MASK_MONTH + MaskConfig.MASK_DAY + MaskConfig.MASK_L_ALPHA + MaskConfig.MASK_U_ALPHA + MaskConfig.MASK_NUM;
    }

    //コンストラクタ

  }]);

  function MaskConfig(fmt) {
    _classCallCheck(this, MaskConfig);

    this.format = fmt;
  }

  /**
   * 入力桁数を取得する(get property)
   */


  _createClass(MaskConfig, [{
    key: "isValid",


    /**
     * 有効なマスク設定かどうかを取得します。
     * @return 有効なマスク設定の場合 true
     */
    value: function isValid() {
      if (this.length == 0) {
        return false;
      }
      return true;
    }

    /**
     * 指定した位置が入力文字か固定文字かの判定を行う
     * @param {Number} position　検査を行う入力位置（０から始まるインデックル）
     * @return 入力文字の場合 true 
     */

  }, {
    key: "isInput",
    value: function isInput(position) {
      //無効なマスク、位置不正
      if (!this.isValid() || position < 0 || this.length <= position) {
        return false;
      }

      //指定された位置のマスク文字が入力マスクか判定
      var msk = this.format.substr(position, 1);
      return MaskConfig.INPUT_MASK_CHARS.indexOf(msk) >= 0;
    }

    /**
     * 画面表示用のマスク文字列を取得
     * @return 画面表示用のマスク文字列
     */

  }, {
    key: "getDisplayMask",
    value: function getDisplayMask() {
      if (!this.isValid()) return "";

      var result = "";

      for (var i = 0; i < this.length; i++) {
        var c = this.format.substr(i, 1);

        if (c == MaskConfig.MASK_NUM || c == MaskConfig.MASK_L_ALPHA || c == MaskConfig.MASK_U_ALPHA) {
          //数値・英字入力は "_"で表示
          result += "_";
        } else if (c == MaskConfig.MASK_YEAR || c == MaskConfig.MASK_DAY) {
          //年・日は、大文字に変換する
          result += this.format.substr(i, 1).toUpperCase();
        } else {
          //固定文字
          result += this.format.substr(i, 1);
        }
      }

      return result;
    }
  }, {
    key: "length",
    get: function get() {
      if (this.format) {
        return this.format.length;
      } else {
        return 0;
      }
    }
  }], [{
    key: "Test",
    value: function Test() {}
  }]);

  return MaskConfig;
}();

exports.default = MaskConfig;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _maskconfig = __webpack_require__(1);

var _maskconfig2 = _interopRequireDefault(_maskconfig);

var _draw = __webpack_require__(3);

var _draw2 = _interopRequireDefault(_draw);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas;

$(function () {

  //お絵描き用のキャンパス作成
  if ($("#jq-maskinput-canvas").length == 0) {
    $("body").append("<canvas id='jq-maskinput-canvas' ></canvas>");
  }
  canvas = $("#jq-maskinput-canvas").get(0);
});

//プラグイン処理
jQuery.fn.maskInput = function () {
  var _this = this;

  //対象要素分のループ
  return this.each(function (index, el) {

    //設定されたマスク文字列で、設定クラス生成
    var config = new _maskconfig2.default($(el).data("mask-format"));

    //キーアップイベント。キーボード入力で値が変更されたタイミングをハンドリング
    $(_this).keyup(function () {

      _draw2.default.drawBackground(canvas, el, config);
    });

    //初回のマスク背景色の描画処理
    setTimeout(function () {
      _draw2.default.drawBackground(canvas, el, config);
    }, 1);
  });
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _maskconfig = __webpack_require__(1);

var _maskconfig2 = _interopRequireDefault(_maskconfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 描画クラス
 */
var Draw = function () {

  /**
   * コンストラクタ
   */
  function Draw() {
    _classCallCheck(this, Draw);
  }

  /**
   * 
   * @param {Object} canvas  canvas要素
   * @param {Object} el      描画要素
   * @param {MaskConfig} config マスク設定 
   */


  _createClass(Draw, null, [{
    key: 'drawBackground',
    value: function drawBackground(canvas, el, config) {

      var target$ = $(el);

      //表示用のマスク文字列
      var mask = config.getDisplayMask();

      //入力済の桁数分、マスク文字列を左側からカット
      var value = $(el).val();

      //コンテキスト取得
      var ctx = canvas.getContext('2d');

      //クリア
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      //入力済みの文字は、マクスを描画しないようにする為、マスク文字をカットする
      if (value && value.length > 0) {
        //全桁入力済み
        if (value.length >= config.length) {
          target$.css("background-image", "none");
          return;
        }
        //未入力 or 部分入力
        mask = mask.substr(value.length);
      }

      //描画
      var font = target$.css("font-size") + ' ' + target$.css("font-family");
      var pos = { x: 0, y: 0 };
      var borderTopWidth = parseInt(target$.css("border-top-width"), 10);
      var borderLeftWidth = parseInt(target$.css("border-left-width"), 10);

      pos.y = parseInt(target$.css("padding-top"), 10) + borderTopWidth;
      pos.x = parseInt(target$.css("padding-left"), 10) + borderLeftWidth;

      //１文字以上入力がある場合、入力文字の最後尾の位置からマスク文字を描画する
      if (value && value.length > 0) {
        var textMetrics = ctx.measureText(value); // TextMetrics オブジェクト
        pos.x += textMetrics.width;
      }

      ctx.textBaseline = "top";
      ctx.font = font;
      ctx.fillStyle = "#999";
      ctx.fillText(mask, pos.x, pos.y);

      var dataUrl = canvas.toDataURL();
      target$.css("background-image", "url(" + dataUrl + ")");
    }
  }]);

  return Draw;
}();

exports.default = Draw;

/***/ })
/******/ ]);
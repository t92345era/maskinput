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

    /**
     * 指定されたキーコードに対応する文字を取得する
     * @param {Number} keyCode 
     */

  }, {
    key: "keyCodeToChar",
    value: function keyCodeToChar(keyCode) {
      return String.fromCharCode(keyCode);
    }

    /**
     * 指定した要素の現在のキャレット位置を取得する。
     * @param {Element} el 
     */

  }, {
    key: "getCaretPosition",
    value: function getCaretPosition(el) {
      if (el.selectionStart !== undefined) {
        return el.selectionStart;
      } else if (document.selection) {
        el.focus();
        var r = document.selection.createRange();
        if (r == null) {
          return 0;
        }
        var re = el.createTextRange(),
            rc = re.duplicate();
        re.moveToBookmark(r.getBookmark());
        rc.setEndPoint('EndToStart', re);
        return rc.text.length;
      }
      return 0;
    }

    /**
     * 
     * @param {Element} el テキストボックスで現在選択されているテキストを取得する
     */

  }, {
    key: "getInputSelectionText",
    value: function getInputSelectionText(el) {

      if (el.selectionStart !== undefined) {
        if (el.selectionStart < el.selectionEnd) {
          return $(el).val().substring(el.selectionStart, el.selectionEnd);
        } else {
          return "";
        }
      } else {
        el.focus();
        var r = document.selection.createRange();
        if (r == null) {
          return "";
        }
        return r.text;
      }
    }

    /**
     * 指定した要素のキャレット位置を設定する。
     * @param {Element} el 
     * @param {Number} position 
     * @return なし
     */

  }, {
    key: "setCaretPosition",
    value: function setCaretPosition(el, position) {
      if (el.selectionStart) {
        el.selectionStart = position;
        el.selectionEnd = position;
      }
    }

    /**
     * 指定した文字列の前後の空白を取り除いた文字列を取得する。
     * @param {String} target 対象文字列
     * @return 前後の空白を取り除いた文字列
     */

  }, {
    key: "trim",
    value: function trim(target) {
      if (typeof target !== "string") return target;
      return target.replace(/(^\s+)|(\s+$)/g, "");
    }

    /**
     * 指定した文字列の右端の空白を取り除いた文字列を取得する。
     * @param {String} target 対象文字列
     * @return 右端の空白を取り除いた文字列
     */

  }, {
    key: "rtrim",
    value: function rtrim(target) {
      if (typeof target !== "string") return target;
      return target.replace(/\s+$/, "");
    }

    /**
     * 指定した文字列の左端の空白を取り除いた文字列を取得する。
     * @param {String} target 対象文字列
     * @return 左端の空白を取り除いた文字列
     */

  }, {
    key: "ltrim",
    value: function ltrim(target) {
      if (typeof target !== "string") return target;
      return target.replace(/^\s+/, "");
    }

    //static replac

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
     * 指定位置のマスク文字を取得する。
     * @param {Number} position 
     * @return 指定位置のマスク文字。位置が不正な場合は空文字。
     */

  }, {
    key: "getMaskChar",
    value: function getMaskChar(position) {
      //無効なマスク、位置不正
      if (!this.isValid() || position < 0 || this.length <= position) {
        return "";
      }
      //指定位置のマスクを返す
      var msk = this.format.substr(position, 1);
      return msk;
    }

    /**
     * 指定した位置が入力文字か入力文字かの判定を行う
     * @param {Number} position　検査を行う入力位置（０から始まるインデックス）
     * @return 入力文字の場合 true 
     */

  }, {
    key: "isInput",
    value: function isInput(position) {
      //マスク文字取得
      var msk = this.getMaskChar(position);
      if (msk == "") return false;

      //指定された位置のマスク文字が入力マスクか判定
      return MaskConfig.INPUT_MASK_CHARS.indexOf(msk) >= 0;
    }

    /**
     * 指定した位置が入力文字か固定文字かの判定を行う
     * @param {Number} position　検査を行う入力位置（０から始まるインデックス）
     * @return 固定文字の場合 true 
     */

  }, {
    key: "isFixChar",
    value: function isFixChar(position) {
      //マスク文字取得
      var msk = this.getMaskChar(position);
      if (msk == "") return false;

      //固定文字か判定
      return MaskConfig.INPUT_MASK_CHARS.indexOf(msk) < 0;
    }

    /**
     * 指定位置に、指定した文字が入力可能かを検証します。
     * @param {入力位置} position 
     * @param {検証する文字} char 
     * @return true：入力可、false：入力不可
     */

  }, {
    key: "testInput",
    value: function testInput(position, char) {

      if (!this.isInput(position)) {
        //指定した位置が入力文字でない場合、入力不可として返却
        return false;
      }

      var mask = this.getMaskChar(position);
      var result;

      if (mask == MaskConfig.MASK_YEAR || mask == MaskConfig.MASK_MONTH || mask == MaskConfig.MASK_DAY || mask == MaskConfig.MASK_NUM) {
        //数字入力
        result = /[0-9]/gi.test(char);
      } else if (mask == MaskConfig.MASK_L_ALPHA) {
        //小文字の英字入力
        result = /[a-z]/g.test(char);
      } else if (mask == MaskConfig.MASK_U_ALPHA) {
        //大文字の英字入力
        result = /[A-Z]/g.test(char);
      }

      return result;
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

  //対象要素分のループ
  return this.each(function (index, el) {

    //設定されたマスク文字列で、設定クラス生成
    var config = new _maskconfig2.default($(el).data("mask-format"));

    /**
     * キーダウン
     */
    $(el).keydown(function (e) {

      var move = moveDirection.None;
      var result = true;

      if (e.keyCode == keyCode.BackSpace) {
        move = moveDirection.Back;

        //現在のキャレット位置と、選択テキストの文字数を取得する
        var caretIndex = _util2.default.getCaretPosition(this);
        var selectionLength = _util2.default.getInputSelectionText(this).length;

        //左端で backspaceキーが押下された場合は何もしない
        if (caretIndex == 0 && selectionLength == 0) return;

        //削除開始位置・削除文字数
        var start = selectionLength == 0 ? caretIndex - 1 : caretIndex;
        var removeLength = Math.max(1, selectionLength);

        if (selectionLength == 0 && config.isFixChar(start)) {
          //固定文字で backspaceキーが押下された場合、前の入力を消す
          while (start > 0) {
            if (config.isInput(start)) break;
            start--;
          }
        }

        //削除文字をスペースで置換
        var afterText = replaceSpace($(this).val(), start, removeLength, config);

        //文字の入れ替えを行い、キャレット位置をもとに戻す
        $(this).val(afterText);
        _util2.default.setCaretPosition(this, caretIndex);
      } else if (e.keyCode == keyCode.Left) {
        move = moveDirection.Back;
      } else if (e.keyCode == keyCode.Right) {
        move = moveDirection.Forward;
      }

      //キャレット位置移動
      moveCaretPosition(this, config, move);

      return move == moveDirection.None;
    });

    /**
     * 入力抑止用のキープレスイベント
     */
    $(el).keypress(function (e) {

      console.log("key press:" + _util2.default.keyCodeToChar(e.charCode));

      //入力位置、入力文字を取得する
      var caretIndex = _util2.default.getCaretPosition(this);
      var selectionLength = _util2.default.getInputSelectionText(this).length;
      var inputChar = _util2.default.keyCodeToChar(e.charCode);

      //入力可能文字か判定する
      var result = config.testInput(caretIndex, inputChar);
      var returnValue = result;

      //テキストが選択されている場合は、選択範囲の文字をクリア
      if (result && selectionLength > 0) {
        var clearText = replaceSpace($(this).val(), caretIndex, selectionLength, config);
        $(this).val(clearText);
        _util2.default.setCaretPosition(this, caretIndex);
      }

      //固定文字は入力補完
      if (result && config.isFixChar(caretIndex + 1)) {

        var index = caretIndex + 1;
        var hokanMoji = "";
        while (true) {
          if (!config.isFixChar(index)) break;
          hokanMoji += config.getMaskChar(index);
          index++;
        }

        //入力補完文字を後ろに足す
        setTimeout(function () {
          return $(el).val($(el).val() + hokanMoji);
        }, 0);
      }

      //入力可能文字の場合、trueを返却
      return result;
    });

    //キーアップイベント。キーボード入力で値が変更されたタイミングをハンドリング
    $(el).keyup(function () {

      setTimeout(function () {
        return _draw2.default.drawBackground(canvas, el, config);
      }, 0);
    });

    //初回のマスク背景色の描画処理
    setTimeout(function () {
      _draw2.default.drawBackground(canvas, el, config);
    }, 1);
  });
};

/**
 * 
 * @param {Element} el        処理対象の要素
 * @param {MaskConfig} config マスク設定 
 * @param {Number} move       移動方向(-1：前方向に移動、1：後方向に移動)
 * @return 移動後のキャレット位置
 */
function moveCaretPosition(el, config, move) {

  if (move != moveDirection.Back && move != moveDirection.Forward) return;

  var caretIndex = _util2.default.getCaretPosition(el);
  while (move != 0) {
    caretIndex = caretIndex + move;

    if (config.isInput(caretIndex)) {
      //入力位置までキャレットを移動する
      _util2.default.setCaretPosition(el, caretIndex);
      break;
    } else if (caretIndex <= 0) {
      //先頭位置
      _util2.default.setCaretPosition(el, 0);
      break;
    } else if (caretIndex >= $(el).val().length) {
      //最終位置
      _util2.default.setCaretPosition(el, caretIndex);
      break;
    }
  }

  //移動後のキャレット位置を返す
  return caretIndex;
}

/**
 * 開始位置から指定された文字数をスペース文字で置き換える、
 * 但し、固定文字の位置には、固定文字を設定する
 * @param {string} target      処理対象文字列
 * @param {number} start       開始文字位置
 * @param {number} length      開始位置からスペースで置き換える文字数
 * @param {MaskConfig} config  マスク設定
 */
function replaceSpace(target, start, length, config) {
  if (typeof target !== "string") return target;

  var afterText = target.substring(0, start);
  for (var i = 0; i < length; i++) {
    if (config.isFixChar(start + i)) {
      afterText += config.getMaskChar(start + i);
    } else {
      afterText += " ";
    }
  }
  afterText += target.substring(start + length);
  return afterText;
}

/**
 * キーコード一覧
 */
var keyCode = {
  BackSpace: 8,
  Tab: 9,
  Left: 37,
  Up: 38,
  Right: 39,
  Down: 40,
  Delete: 46
};

/**
 * キャレットの移動方向
 */
var moveDirection = {
  None: 0,
  Back: -1,
  Forward: 1
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
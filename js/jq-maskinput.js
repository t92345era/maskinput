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
     * @param {Element} el      キャレット位置を設定する要素
     * @param {Number} position 設定するキャレット位置
     * @return なし
     */

  }, {
    key: "setCaretPosition",
    value: function setCaretPosition(el, position) {
      if (el.selectionStart !== undefined) {
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

    /**
     * ペースとイベント発生時のみ呼び出し可。
     * クリップボードに格納されているテキストデータを取り出します。
     * @param {ClipbordEvent} event クリップボードイベント
     */

  }, {
    key: "getClipboardText",
    value: function getClipboardText(event) {
      var clipboardData, pastedData;

      // Get pasted data via clipboard API
      clipboardData = event.clipboardData || window.clipboardData;
      if (typeof clipboardData === "undefined") return null;
      pastedData = clipboardData.getData('Text');
      return pastedData;
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
     * basePosition で指定された位置から、次の入力文字の位置を取得します。
     * @param {number} basePosition 次の入力文字を検索する為の、基準位置
     * @return 基準位置からの次の入力文字の位置。次の入力文字が存在しない場合は -1。
     */

  }, {
    key: "getNextInputPosition",
    value: function getNextInputPosition(basePosition) {
      return this._findInputPosition(basePosition, 1);
    }

    /**
     * basePosition で指定された位置から、前の入力文字の位置を取得します。
     * @param {number} basePosition 前の入力文字を検索する為の、基準位置
     * @return 基準位置からの前の入力文字の位置。前の入力文字が存在しない場合は -1。
     */

  }, {
    key: "getPrevInputPosition",
    value: function getPrevInputPosition(basePosition) {
      return this._findInputPosition(basePosition, -1);
    }

    /**
     * 内部用 (basePosition で指定された位置から、前後の入力文字の位置を取得します。)
     * @param {number} basePosition 基準位置
     * @param {number} move         -1:前方向、1:後方向
     * @return 前後の入力文字の位置。入力文字が存在しない場合は、-1。
     */

  }, {
    key: "_findInputPosition",
    value: function _findInputPosition(basePosition, move) {
      var pos = basePosition + move;
      var result = -1;

      while (pos >= 0 && pos < this.length) {
        if (this.isInput(pos)) {
          result = pos;
          break;
        }
        pos += move;
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
        result += this.getDisplayMaskChar(i);
      }

      return result;
    }

    /**
     * 指定した入力位置の画面表示用のマスク文字列を取得
     * @param {number} position 表示用マスクを取得する入力位置
     * @return 画面表示用のマスク文字列
     */

  }, {
    key: "getDisplayMaskChar",
    value: function getDisplayMaskChar(position) {
      if (!this.isValid()) return "";

      var c = this.getMaskChar(position);
      if (c == "") return "";

      var result = "";

      if (c == MaskConfig.MASK_NUM) {
        //数値・英字入力は "_"で表示
        result = "_";
      } else if (c == MaskConfig.MASK_L_ALPHA) {
        //英字小文字
        result = "a";
      } else if (c == MaskConfig.MASK_U_ALPHA) {
        //英字大文字
        result = "A";
      } else if (c == MaskConfig.MASK_YEAR || c == MaskConfig.MASK_DAY) {
        //年・日は、大文字に変換する
        result += c.toUpperCase();
      } else {
        //上記以外
        result += c;
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
    $("body").append("<canvas id='jq-maskinput-canvas' style='display:none' ></canvas>");
  }
  canvas = $("#jq-maskinput-canvas").get(0);
});

//プラグイン処理
jQuery.fn.maskInput = function () {

  //対象要素分のループ
  return this.each(function (index, el) {

    //設定されたマスク文字列で、設定クラス生成
    var config = new _maskconfig2.default($(el).data("mask-format"));

    //CSS
    $(el).css({
      'ime-mode': "disabled",
      'font-family': "Consolas, 'Courier New', Courier, Monaco, monospace"
    });

    ///////////////////////////////////////////////////////////////////////

    var enterFlg = false;

    /**
     * キーダウン
     */
    $(el).keydown(function (e) {
      var _this = this;

      console.log("keydown : " + e.keyCode);
      enterFlg = false;
      var move = moveDirection.None;

      if (e.keyCode == keyCode.BackSpace || e.keyCode == keyCode.Delete) {
        // backspace or delete キーが押下された場合の、文字削除処理

        //deleteキーが押されたか判定するようのフラグ
        var isDelete = e.keyCode == keyCode.Delete;

        //現在のキャレット位置と、選択テキストの文字数を取得する
        var caretIndex = _util2.default.getCaretPosition(this);
        var selectionLength = _util2.default.getInputSelectionText(this).length;

        //左端で backspaceキーが押下された場合は何もしない
        if (!isDelete && caretIndex == 0 && selectionLength == 0) {
          return;
        }

        //削除開始位置・削除文字数
        var start = selectionLength > 0 || isDelete ? caretIndex : caretIndex - 1;
        var removeLength = Math.max(1, selectionLength);

        if (selectionLength == 0 && config.isFixChar(start)) {
          //固定文字で backspaceキーが押下された場合、前の入力を消す
          start = config.getPrevInputPosition(start);
          if (start < 0) start = 0;
        }

        //削除文字をスペースで置換
        var afterText = overrideSpace($(this).val(), start, removeLength, config, isDelete);
        afterText = cleanUp(afterText, config);

        //削除後のキャレット位置検索
        var moveCaretIndex = isDelete ? caretIndex : findInputCaretPosition(this, config, moveDirection.Back);

        //文字の入れ替えを行い、キャレット位置をもとに戻す
        $(this).val(afterText);
        _util2.default.setCaretPosition(this, moveCaretIndex);

        //背景再描画
        setTimeout(function () {
          return _draw2.default.drawBackground(canvas, _this, config);
        }, 0);

        return false;
      } else if (e.keyCode == keyCode.Left) {
        move = moveDirection.Back;
      } else if (e.keyCode == keyCode.Right) {
        move = moveDirection.Forward;
      }

      //キャレット位置移動
      moveCaretPosition(this, config, move);

      return move == moveDirection.None;
    });

    ///////////////////////////////////////////////////////////////////////

    /**
     * 入力抑止用のキープレスイベント
     */
    $(el).keypress(function (e) {
      var _this2 = this;

      if (e.keyCode == keyCode.Enter) {
        console.log("keypress : enter!");
        enterFlg = true;
        return;
      }

      //入力位置、入力文字を取得する
      var caretIndex = _util2.default.getCaretPosition(this);
      var selectionLength = _util2.default.getInputSelectionText(this).length;
      var keybordChar = autoConvInput(caretIndex, _util2.default.keyCodeToChar(e.charCode), config);

      //固定文字の入力値でキーが押下された場合、キャレット位置を次の入力位置まで進める
      // * 次の入力位置でキーが押下された事にする
      if (config.isFixChar(caretIndex)) {
        caretIndex = config.getNextInputPosition(caretIndex);
      }

      //入力可能文字か判定する
      var result = config.testInput(caretIndex, keybordChar);
      if (!result) {
        //入力禁止文字の場合は、入力抑制を行うため、falseを返却する
        return false;
      }

      //変更後の value 値を入れる変数
      var newValue = $(this).val();

      //テキストが選択されている場合は、選択範囲の文字をクリア
      if (selectionLength > 0) {
        newValue = overrideSpace(newValue, caretIndex, selectionLength, config);
      }

      //キーボード入力された文字
      var input = keybordChar;

      //次の文字が固定文字の場合、固定文字を補完する
      input += getHokanChar(caretIndex, config);

      //入力文字＋補完文字を対象要素の value 値に設定
      newValue = overrideChar(newValue, caretIndex, input, config);
      $(this).val(newValue);

      //キャレット位置の設定
      _util2.default.setCaretPosition(this, caretIndex);
      setTimeout(function () {
        moveCaretPosition(_this2, config, moveDirection.Forward);
      }, 0);

      //背景再描画
      setTimeout(function () {
        return _draw2.default.drawBackground(canvas, _this2, config);
      }, 0);

      //入力可能文字の場合、trueを返却
      return false;
    });

    ///////////////////////////////////////////////////////////////////////

    //キーアップイベント。キーボード入力で値が変更されたタイミングをハンドリング
    $(el).keyup(function (e) {
      console.log("keyup : " + e.keyCode);
      if (e.keyCode == keyCode.Enter || e.keyCode == keyCode.ImeInput) {
        console.log("keyup : enter!");
        return;
      }
    });

    ///////////////////////////////////////////////////////////////////////

    /**
     * クリップボードからのペースト
     */
    $(el).on("paste", function (e) {
      var _this3 = this;

      //クリップボードのテキストデータ取り出し
      var pastedData = _util2.default.getClipboardText(e.originalEvent);

      if (typeof pastedData !== "string") return false;

      //現在のキャレット位置・選択文字数を取得
      var caretIndex = _util2.default.getCaretPosition(this);
      var selectionLength = _util2.default.getInputSelectionText(this).length;

      //変更後の value 値を入れる変数
      var newValue = $(this).val();

      //テキストが選択されている場合は、選択範囲の文字をクリア
      if (selectionLength > 0) {
        newValue = overrideSpace(newValue, caretIndex, selectionLength, config);
      }

      //コピー文字列を作成する
      var copyText = "";
      var clipIndex = 0,
          i = 0;

      //自動変換できる文字があれば変換
      pastedData = autoConvInput(caretIndex, pastedData, config);
      //console.log("pastedData:" + pastedData);

      while (clipIndex < pastedData.length) {
        var position = caretIndex + i;

        if (config.isFixChar(position)) {
          //固定文字の位置には、ペースト文字ではなく、固定文字をセット
          var msk = config.getMaskChar(position);
          copyText += msk;
          if (pastedData.substr(clipIndex, 1) == msk) clipIndex++;
        } else if (config.isInput(position)) {
          //入力文字の位置で、ペーストされた文字が入力可能文字の場合は、ペースト文字を使用
          if (config.testInput(position, pastedData.substr(clipIndex, 1))) {
            //入力可能文字
            copyText += pastedData.substr(clipIndex, 1);
          } else {
            //入力不可文字
            copyText += " ";
          }
          clipIndex++;
        } else {
          //最大入力可能文字を超えた
          break;
        }
        i++;
      }

      //ペースト文字を反映
      newValue = overrideChar(newValue, caretIndex, copyText, config);
      newValue = cleanUp(newValue, config);

      //新しい値を設定
      $(this).val(newValue);

      //キャレット位置をもとに戻す
      _util2.default.setCaretPosition(this, caretIndex);

      //背景再描画
      setTimeout(function () {
        return _draw2.default.drawBackground(canvas, _this3, config);
      }, 0);

      return false;
    });

    ///////////////////////////////////////////////////////////////////////

    //初回のマスク背景色の描画処理
    setTimeout(function () {
      _draw2.default.drawBackground(canvas, el, config);
    }, 1);
  });
};

/**
 * 前後の入力文字のキャレット位置を検索する。
 * @param {Element} el        処理対象の要素
 * @param {MaskConfig} config マスク設定 
 * @param {number} move       移動方向(-1：前方向に移動、1：後方向に移動)
 * @param {number} count      移動する桁数 (省略した場合は、1)
 */
function findInputCaretPosition(el, config, move, count) {

  //現在のキャレット位置を取得
  var caretIndex = _util2.default.getCaretPosition(el);

  var cnt = 1;
  if (count !== undefined && typeof count === "number") {
    cnt = count;
  }

  while (move != moveDirection.None) {
    caretIndex = caretIndex + move;

    if (config.isInput(caretIndex)) {
      //入力位置までキャレットを移動する
      if (--cnt <= 0) {
        break;
      }
    } else if (caretIndex <= 0) {
      //先頭位置
      break;
    } else if (caretIndex >= $(el).val().length) {
      //最終位置
      break;
    }
  }

  //検索したキャレット位置を返す
  return caretIndex;
}

/**
 * テキストボックスのキャレット位置を、前後に移動する
 * @param {Element} el        処理対象の要素
 * @param {MaskConfig} config マスク設定 
 * @param {number} move       移動方向(-1：前方向に移動、1：後方向に移動)
 * @param {number} count      移動する桁数 (省略した場合は、1)
 * @return 移動後のキャレット位置
 */
function moveCaretPosition(el, config, move, count) {

  //移動後のキャレット位置を検索
  var caretIndex = findInputCaretPosition(el, config, move, count);

  //キャレット位置設定
  _util2.default.setCaretPosition(el, caretIndex);

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
 * @param {boolean} trim       トリムする場合 true
 * @return 置き換え後の文字列
 */
function overrideSpace(target, start, length, config, trim) {

  var isTrim = typeof trim === "boolean" && trim ? true : false;

  if (isTrim) {
    //トリムする場合

    //削除文字前までの文字を設定
    var trimText = target.substring(0, start);
    var pos = start + length;

    //削除文字以降の文字を、詰めながら trimText変数に結合していく
    while (pos < config.length && pos < target.length) {
      if (config.isInput(pos)) {
        var c = target.substr(pos, 1);
        if (config.isFixChar(trimText.length)) {
          trimText += target.substr(trimText.length, 1);
          continue;
        }
        trimText += c;
      }
      pos++;
    }
    return trimText;
  } else {
    //スペース文字で上書きする場合

    //置き換え文字数分のスペースを作成
    var spaceChar = "";
    for (var i = 0; i < length; i++) {
      spaceChar += " ";
    } //指定文字での置き換え関数を呼ぶ
    var ret = overrideChar(target, start, spaceChar, config);

    //console.log("end overrideSpace:result=" + ret);
    return ret;
  }
}

/**
 * 開始位置から指定された文字数を、引数で指定された overrideCharで置き換える。
 * 但し、固定文字の位置には、固定文字を設定する
 * @param {string} target        処理対象文字列
 * @param {number} start         開始文字位置
 * @param {string} overrideChar  置き換え文字(複数文字可)
 * @param {MaskConfig} config    マスク設定
 * @return 置き換え後の文字列
 */
function overrideChar(target, start, overrideChar, config) {

  if (typeof target !== "string") return target;
  if (typeof overrideChar !== "string") return target;
  if (overrideChar.length == 0) return target;

  var length = overrideChar.length;
  var work = target;
  if (work.length < start + length) {
    //文字数が不足している場合、スペースで補完
    for (var i = 0; i < start + length - work.length; i++) {
      work += " ";
    }
  }

  //先頭文字から、置き換え開始直前の文字までを切り取り
  var afterText = work.substring(0, start);

  //文字の置き換え
  for (var _i = 0; _i < length; _i++) {
    if (config.isFixChar(start + _i)) {
      afterText += config.getMaskChar(start + _i);
    } else {
      afterText += overrideChar.substr(_i, 1);
    }
  }

  //置き換え範囲文字より後ろにある文字を切り取り
  afterText += target.substring(start + length);
  return afterText;
}

/**
 * 入力文字の自動変換
 * @param {number} caretIndex   キャレット位置
 * @param {string} inputChar 
 * @param {MaskConfig} config 
 * @return 変換後の文字列
 */
function autoConvInput(caretIndex, inputChar, config) {
  if (typeof inputChar !== "string") return inputChar;

  var resultChar = "";
  for (var i = 0; i < inputChar.length; i++) {

    var position = caretIndex + i;

    if (config.isInput(position)) {
      //入力文字
      if (config.getMaskChar(position) == _maskconfig2.default.MASK_L_ALPHA) {
        //小文字の英字の場合
        resultChar += inputChar.substr(i, 1).toLowerCase();
      } else if (config.getMaskChar(position) == _maskconfig2.default.MASK_U_ALPHA) {
        //大文字の英字の場合
        resultChar += inputChar.substr(i, 1).toUpperCase();
      } else {
        //その他
        resultChar += inputChar.substr(i, 1);
      }
    } else if (config.isFixChar(position)) {
      //固定文字
      resultChar += config.getMaskChar(position);
    }
  }
  return resultChar;
}

/**
 * 補完文字を取得する
 * @param {number} caretIndex  キャレットインデックス
 * @param {MaskConfig} config      マスク設定
 * @return 補完文字
 */
function getHokanChar(caretIndex, config) {

  if (config.isFixChar(caretIndex + 1)) {

    var index = caretIndex + 1;
    var hokanMoji = "";
    while (true) {
      if (!config.isFixChar(index)) break;
      hokanMoji += config.getMaskChar(index);
      index++;
    }
    //補完文字を返す
    return hokanMoji;
  } else {
    return "";
  }
}

/**
 * マスク設定に従って、valueから不要な文字を削除します。
 * - 末尾の不要な空白
 * - 最大入力桁数を超えている文字
 * @param {string} value       処理対象の value値
 * @param {MaskConfig} config   マスク設定
 * @return 不要な文字を削除した新しい valueの値
 */
function cleanUp(value, config) {
  if (typeof value !== "string") return "";

  var newValue = value;

  //最大入力桁数を超えている文字をカット
  if (value.length > config.length) {
    newValue = value.substr(0, config.length);
  }

  //文字の後ろからループして、不要な空白文字を削除する
  var len = newValue.length;
  for (var i = newValue.length - 1; i >= 0; i--) {
    if (config.isFixChar(i)) {
      //len--;
    } else if (newValue.substr(i, 1) == " ") {
      len = i;
    } else {
      break;
    }
  }
  newValue = newValue.substr(0, len);
  return newValue;
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
  Delete: 46,
  Enter: 13,
  ImeInput: 229
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

      //入力済の桁数分、マスク文字列を左側からカット
      var value = $(el).val();

      //コンテキスト取得
      var ctx = canvas.getContext('2d');

      //クリア
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      //入力済みの文字は、マクスを描画しないようにする為、マスク文字をカットする
      /*
      if (value && value.length > 0) {
         //全桁入力済み
        if (value.length >= config.length) {
          target$.css("background-image", "none");
          return;
        }
         //未入力 or 部分入力
        mask = mask.substr(value.length);
      }
      */

      //描画
      var font = target$.css("font-size") + ' ' + target$.css("font-family");
      var pos = { x: 0, y: 0 };
      var borderTopWidth = parseInt(target$.css("border-top-width"), 10);
      var borderLeftWidth = parseInt(target$.css("border-left-width"), 10);

      pos.y = parseInt(target$.css("padding-top"), 10) + borderTopWidth;
      pos.x = parseInt(target$.css("padding-left"), 10) + borderLeftWidth;

      /*
      //１文字以上入力がある場合、入力文字の最後尾の位置からマスク文字を描画する
      if (value && value.length > 0) {
        var textMetrics = ctx.measureText(value); // TextMetrics オブジェクト
        pos.x += textMetrics.width;
      }
      */

      ctx.textBaseline = "top";
      ctx.font = font;
      ctx.fillStyle = "#999";

      for (var i = 0; i < config.length; i++) {

        var mask = "";
        if (value.length > i && value.substr(i, 1) != " ") {
          //入力済み桁
          mask = value.substr(i, 1);
        } else {
          //未入力の桁
          mask = config.getDisplayMaskChar(i);
          ctx.fillText(mask, pos.x, pos.y);
        }

        var textMetrics = ctx.measureText(mask); // TextMetrics オブジェクト
        pos.x += textMetrics.width;
      }

      var dataUrl = canvas.toDataURL();
      target$.css("background-image", "url(" + dataUrl + ")");
    }
  }]);

  return Draw;
}();

exports.default = Draw;

/***/ })
/******/ ]);
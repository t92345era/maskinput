import Util from './util';
import MaskConfig from './maskconfig';
import Draw from './draw';

var canvas;

$(function() {

  //お絵描き用のキャンパス作成
  if ($("#jq-maskinput-canvas").length == 0) {
    $("body").append("<canvas id='jq-maskinput-canvas' ></canvas>");
  }
  canvas = $("#jq-maskinput-canvas").get(0);
});

//プラグイン処理
jQuery.fn.maskInput = function() {


  //対象要素分のループ
  return this.each((index, el) => {

    //設定されたマスク文字列で、設定クラス生成
    var config = new MaskConfig($(el).data("mask-format"));

    /**
     * キーダウン
     */
    $(el).keydown(function(e) {
      
      var move = moveDirection.None;
      var result = true;

      if (e.keyCode == keyCode.BackSpace) {
        move = moveDirection.Back;

        //現在のキャレット位置と、選択テキストの文字数を取得する
        var caretIndex = Util.getCaretPosition(this);
        var selectionLength = Util.getInputSelectionText(this).length;

        //左端で backspaceキーが押下された場合は何もしない
        if (caretIndex == 0 && selectionLength == 0)
          return;
        
        //削除開始位置・削除文字数
        var start = (selectionLength == 0 ? caretIndex - 1 : caretIndex);
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
        Util.setCaretPosition(this, caretIndex);

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
    $(el).keypress(function(e) {

      console.log("key press:" + Util.keyCodeToChar(e.charCode));

      //入力位置、入力文字を取得する
      var caretIndex = Util.getCaretPosition(this);
      var selectionLength = Util.getInputSelectionText(this).length;
      var inputChar = Util.keyCodeToChar(e.charCode);

      //入力可能文字か判定する
      var result = config.testInput(caretIndex, inputChar);
      var returnValue = result;

      //テキストが選択されている場合は、選択範囲の文字をクリア
      if (result && selectionLength > 0) {
        var clearText = replaceSpace($(this).val(), caretIndex, selectionLength, config);
        $(this).val(clearText);
        Util.setCaretPosition(this, caretIndex);
      }

      //固定文字は入力補完
      if (result && config.isFixChar(caretIndex + 1)) {
        
        var index = caretIndex + 1;
        var hokanMoji = "";
        while(true) {
          if (!config.isFixChar(index)) 
            break;
          hokanMoji += config.getMaskChar(index);
          index++;
        }
        
        
        //入力補完文字を後ろに足す
        setTimeout(() => $(el).val($(el).val() + hokanMoji), 0);
      }

      //入力可能文字の場合、trueを返却
      return result;
    });
    
    //キーアップイベント。キーボード入力で値が変更されたタイミングをハンドリング
    $(el).keyup(function() {

      setTimeout(() => Draw.drawBackground(canvas, el, config), 0);
    });

    //初回のマスク背景色の描画処理
    setTimeout(() => {
      Draw.drawBackground(canvas, el, config);
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

  if (move != moveDirection.Back && move != moveDirection.Forward) 
    return;

  var caretIndex = Util.getCaretPosition(el);
  while(move != 0) {
    caretIndex = caretIndex + move;

    if (config.isInput(caretIndex)) {
      //入力位置までキャレットを移動する
      Util.setCaretPosition(el, caretIndex);
      break;
    } else if (caretIndex <= 0) {
      //先頭位置
      Util.setCaretPosition(el, 0);
      break;
    } else if (caretIndex >= $(el).val().length) {
      //最終位置
      Util.setCaretPosition(el, caretIndex);
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
  for (let i = 0; i < length; i++) {
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
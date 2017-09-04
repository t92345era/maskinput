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
      
      var move = 0;
      if (e.keyCode == keyCode.BackSpace) {
        move = -1;
      } else if (e.keyCode == keyCode.Left) {
        move = -1;
      } else if (e.keyCode == keyCode.Right) {
        move = 1;
      }

      var caretIndex = Util.getCaretPosition(this);
      while(move != 0) {
        caretIndex = caretIndex + move;

        if (config.isInput(caretIndex)) {
          //入力位置までキャレットを移動する
          Util.setCaretPosition(el, caretIndex);
          break;
        }
        if (caretIndex <= 0) {
          Util.setCaretPosition(el, 0);
          break;
        }
        if (caretIndex >= $(el).val().length) {
          Util.setCaretPosition(el, caretIndex);
          break;
        }
      }

      return false;
    });

    /**
     * 入力抑止用のキープレスイベント
     */
    $(el).keypress(function(e) {

      console.log("key press:" + Util.keyCodeToChar(e.charCode));

      //入力位置、入力文字を取得する
      var caretIndex = Util.getCaretPosition(this);
      var inputChar = Util.keyCodeToChar(e.charCode);

      //入力可能文字か判定する
      var result = config.testInput(caretIndex, inputChar);

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

      //マスク文字描画
      //setTimeout(() => Draw.drawBackground(canvas, el, config), 0);

      //入力可能文字の場合、trueを返却
      return result;
    });
    
    //キーアップイベント。キーボード入力で値が変更されたタイミングをハンドリング
    $(el).keyup(function() {

      setTimeout(() => Draw.drawBackground(canvas, el, config), 0);
      //;
    });

    //初回のマスク背景色の描画処理
    setTimeout(() => {
      Draw.drawBackground(canvas, el, config);
    }, 1);

  });
};



var keyCode = {
  BackSpace: 8,
  Tab: 9,
  Left: 37,
  Up: 38,
  Right: 39,
  Down: 40,
  Delete: 46
};
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
    
    //キーアップイベント。キーボード入力で値が変更されたタイミングをハンドリング
    $(this).keyup(function() {

      
      Draw.drawBackground(canvas, el, config);
    });

    //初回のマスク背景色の描画処理
    setTimeout(() => {
      Draw.drawBackground(canvas, el, config);
    }, 1);

  });
};


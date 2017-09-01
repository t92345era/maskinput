import Util from './util';
import MaskConfig from './maskconfig';

/**
 * 描画クラス
 */
export default class Draw {

  /**
   * コンストラクタ
   */
  constructor() {
  }

  /**
   * 
   * @param {Object} canvas  canvas要素
   * @param {Object} el      描画要素
   * @param {MaskConfig} config マスク設定 
   */
  static drawBackground(canvas, el, config) {

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
    var font = `${target$.css("font-size")} ${target$.css("font-family")}`;
    var pos = { x: 0, y: 0 };
    var borderTopWidth =  parseInt(target$.css("border-top-width"), 10);
    var borderLeftWidth =  parseInt(target$.css("border-left-width"), 10);

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

}
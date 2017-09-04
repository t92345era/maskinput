/**
 * ユーティリティクラス
 */
export default class Util {

  //コンストラクタ
  constructor() { 
  }

  /**
   * 指定されたサイズ表記文字列を、 px 単位の数値に変換します。
   * @param {String} direction サイズ表記文字列 (10px, 10em など)
   * @return px単位の値に変換された数値 (例:10)
   */
  static toPixel(direction) {
    //TODO:一旦これ
    return parseInt(direction); 
  }

  /**
   * 指定されたキーコードに対応する文字を取得する
   * @param {Number} keyCode 
   */
  static keyCodeToChar(keyCode) {
    return String.fromCharCode(keyCode);
  }

  /**
   * 指定した要素の現在のキャレット位置を取得する。
   * @param {Element} el 
   */
  static getCaretPosition(el) { 
    if (el.selectionStart) { 
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
   * 指定した要素のキャレット位置を設定する。
   * @param {Element} el 
   * @param {Number} position 
   * @return なし
   */
  static setCaretPosition(el, position) {
    el.selectionStart = position;
    el.selectionEnd = position;
  }

  static Test() {
    
  }

}
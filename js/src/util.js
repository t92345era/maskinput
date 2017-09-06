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
  static getInputSelectionText(el) {
    
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
  static setCaretPosition(el, position) {
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
  static trim(target) {
    if (typeof target !== "string") return target;
    return target.replace(/(^\s+)|(\s+$)/g, "");
  }

  /**
   * 指定した文字列の右端の空白を取り除いた文字列を取得する。
   * @param {String} target 対象文字列
   * @return 右端の空白を取り除いた文字列
   */
  static rtrim(target) {
    if (typeof target !== "string") return target;
    return target.replace(/\s+$/, "");
  }

  /**
   * 指定した文字列の左端の空白を取り除いた文字列を取得する。
   * @param {String} target 対象文字列
   * @return 左端の空白を取り除いた文字列
   */
  static ltrim(target) {
    if (typeof target !== "string") return target;
    return target.replace(/^\s+/, "");
  }

  /**
   * ペースとイベント発生時のみ呼び出し可。
   * クリップボードに格納されているテキストデータを取り出します。
   * @param {ClipbordEvent} event クリップボードイベント
   */
  static getClipboardText(event) {
    var clipboardData, pastedData;
    
    // Get pasted data via clipboard API
    clipboardData = event.clipboardData || window.clipboardData;
    if (typeof clipboardData === "undefined") return null;
    pastedData = clipboardData.getData('Text');
    return pastedData;
  } 


  //static replac

  static Test() {
    
  }

}
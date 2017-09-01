/**
 * マスク設定保持クラス
 */
export default class MaskConfig {

  /** マクス-年 */
  static get MASK_YEAR() { return "y"; }
  /** マクス-月 */
  static get MASK_MONTH() { return "M"; }
  /** マクス-日 */
  static get MASK_DAY() { return "d"; }
  /** マクス-英字(小文字) */
  static get MASK_L_ALPHA() { return "a"; }
  /** マクス-英字(大文字) */
  static get MASK_U_ALPHA() { return "A"; }
  /** マクス-英字(数字) */
  static get MASK_NUM() { return "#"; }


  /**
   * 入力マスク文字のリストを取得
   */
  static get INPUT_MASK_CHARS() { 
    return MaskConfig.MASK_YEAR 
    + MaskConfig.MASK_MONTH 
    + MaskConfig.MASK_DAY 
    + MaskConfig.MASK_L_ALPHA 
    + MaskConfig.MASK_U_ALPHA 
    + MaskConfig.MASK_NUM;
  }
  
  
  //コンストラクタ
  constructor(fmt) { 
    this.format = fmt;
  }

  /**
   * 入力桁数を取得する(get property)
   */
  get length() {
    if (this.format) {
      return this.format.length;
    } else {
      return 0;
    }
  }

  /**
   * 有効なマスク設定かどうかを取得します。
   * @return 有効なマスク設定の場合 true
   */
  isValid() {
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
  isInput(position) {
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
  getDisplayMask() {
    if (!this.isValid()) return "";

    var result = "";

    for (let i = 0; i < this.length; i++) {
      let c = this.format.substr(i, 1);

      if (c == MaskConfig.MASK_NUM || c == MaskConfig.MASK_L_ALPHA 
        || c == MaskConfig.MASK_U_ALPHA) {
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
  
  static Test() {
    
  }
  
}
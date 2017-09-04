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
   * 指定位置のマスク文字を取得する。
   * @param {Number} position 
   * @return 指定位置のマスク文字。位置が不正な場合は空文字。
   */
  getMaskChar(position) {
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
  isInput(position) {
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
  isFixChar(position) {
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
  testInput(position, char) {

    if (!this.isInput(position)) {
      //指定した位置が入力文字でない場合、入力不可として返却
      return false;
    }

    let mask = this.getMaskChar(position);
    var result;
    
    if (mask == MaskConfig.MASK_YEAR
      || mask == MaskConfig.MASK_MONTH
      || mask == MaskConfig.MASK_DAY
      || mask == MaskConfig.MASK_NUM) {
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
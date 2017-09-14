import Util from './util';
import MaskConfig from './maskconfig';
import Draw from './draw';

var canvas;

$(function() {

  //お絵描き用のキャンパス作成
  if ($("#jq-maskinput-canvas").length == 0) {
    $("body").append("<canvas id='jq-maskinput-canvas' style='display:none' ></canvas>");
  }
  canvas = $("#jq-maskinput-canvas").get(0);
});

//プラグイン処理
jQuery.fn.maskInput = function() {

  //対象要素分のループ
  return this.each((index, el) => {

    //設定されたマスク文字列で、設定クラス生成
    var config = new MaskConfig($(el).data("mask-format"));

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
    $(el).keydown(function(e) {

      console.log("keydown : " + e.keyCode);
      enterFlg = false;
      var move = moveDirection.None;

      if (e.keyCode == keyCode.BackSpace || e.keyCode == keyCode.Delete) {
        // backspace or delete キーが押下された場合の、文字削除処理

        //deleteキーが押されたか判定するようのフラグ
        var isDelete = e.keyCode == keyCode.Delete;

        //現在のキャレット位置と、選択テキストの文字数を取得する
        var caretIndex = Util.getCaretPosition(this);
        var selectionLength = Util.getInputSelectionText(this).length;

        //左端で backspaceキーが押下された場合は何もしない
        if (!isDelete && caretIndex == 0 && selectionLength == 0) {
          return;
        }
          
        //削除開始位置・削除文字数
        var start = (selectionLength > 0 || isDelete ? caretIndex : caretIndex - 1);
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
        let moveCaretIndex = isDelete ? 
            caretIndex : 
            findInputCaretPosition(this, config, moveDirection.Back);
        
        //文字の入れ替えを行い、キャレット位置をもとに戻す
        $(this).val(afterText);
        Util.setCaretPosition(this, moveCaretIndex);

        //背景再描画
        setTimeout(() => Draw.drawBackground(canvas, this, config), 0);

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
    $(el).keypress(function(e) {

      if (e.keyCode == keyCode.Enter) {
        console.log("keypress : enter!");
        enterFlg = true;
        return;
      }

      //入力位置、入力文字を取得する
      var caretIndex = Util.getCaretPosition(this);
      var selectionLength = Util.getInputSelectionText(this).length;
      var keybordChar = autoConvInput(caretIndex, Util.keyCodeToChar(e.charCode), config);

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
      Util.setCaretPosition(this, caretIndex);
      setTimeout(() => {
        moveCaretPosition(this, config, moveDirection.Forward);        
      }, 0);

      //背景再描画
      setTimeout(() => Draw.drawBackground(canvas, this, config), 0);

      //入力可能文字の場合、trueを返却
      return false;
    });

///////////////////////////////////////////////////////////////////////
    
    //キーアップイベント。キーボード入力で値が変更されたタイミングをハンドリング
    $(el).keyup(function(e) {

      if (e.keyCode == keyCode.Enter || e.keyCode == keyCode.ImeInput) {
        
        //現在の入力値
        var inputValue = $(this).val().substr(0, config.length);
        var newValue = "";

        //変更後のキャレット位置
        var caretIndex = -1;

        //日本語などの使用禁止文字は、ここでカット
        for (let i = 0; i < inputValue.length; i++) {

          if (config.isFixChar(i) ) {
            //固定文字
            newValue += config.getDisplayMaskChar(i);
          } else {
            //入力文字(禁止文字が入力された場合、スペースで置き換え)
            var result = config.testInput(i, inputValue.substr(i, 1)); 
            newValue += result ? inputValue.substr(i, 1) : " ";
            if (!result && caretIndex == -1) 
              caretIndex = i;
          }
        }

        //日本語等の禁止文字が入力された場合、テキストを置き換え
        if (newValue != $(this).val()) {
          $(this).val(cleanUp(newValue, config));
          setTimeout(() => {
            Util.setCaretPosition(this, caretIndex);
            Draw.drawBackground(canvas, this, config)
          }, 0);
        }

      }
    });

///////////////////////////////////////////////////////////////////////

    /**
     * クリップボードからのペースト
     */
    $(el).on("paste", function(e) {
  
      //クリップボードのテキストデータ取り出し
      var pastedData = Util.getClipboardText(e.originalEvent);

      if (typeof pastedData !== "string") 
        return false;
  
      //現在のキャレット位置・選択文字数を取得
      var caretIndex = Util.getCaretPosition(this);
      var selectionLength = Util.getInputSelectionText(this).length;

      //変更後の value 値を入れる変数
      var newValue = $(this).val();
      
      //テキストが選択されている場合は、選択範囲の文字をクリア
      if (selectionLength > 0) {
        newValue = overrideSpace(newValue, caretIndex, selectionLength, config);
      }

      //コピー文字列を作成する
      let copyText = "";
      let clipIndex = 0, i = 0;

      //自動変換できる文字があれば変換
      pastedData = autoConvInput(caretIndex, pastedData, config);
      //console.log("pastedData:" + pastedData);

      while (clipIndex < pastedData.length) {
        let position = caretIndex + i;
        
        if (config.isFixChar(position)) {
          //固定文字の位置には、ペースト文字ではなく、固定文字をセット
          let msk = config.getMaskChar(position);
          copyText += msk;
          if (pastedData.substr(clipIndex, 1) == msk) 
            clipIndex++;

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
      Util.setCaretPosition(this, caretIndex);

      //背景再描画
      setTimeout(() => Draw.drawBackground(canvas, this, config), 0);

      return false;
    });

///////////////////////////////////////////////////////////////////////

    //初回のマスク背景色の描画処理
    setTimeout(() => {
      Draw.drawBackground(canvas, el, config);
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
  var caretIndex = Util.getCaretPosition(el);

  var cnt = 1;
  if (count !== undefined && typeof count === "number") {
    cnt = count;
  }

  while(move != moveDirection.None) {
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
  let caretIndex = findInputCaretPosition(el, config, move, count);

  //キャレット位置設定
  Util.setCaretPosition(el, caretIndex);

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

  let isTrim = (typeof trim === "boolean" && trim) ? true : false;

  if (isTrim) {
    //トリムする場合

    //削除文字前までの文字を設定
    let trimText = target.substring(0, start);
    let pos = start + length;

    //削除文字以降の文字を、詰めながら trimText変数に結合していく
    while (pos < config.length && pos < target.length) {
      if (config.isInput(pos)) {
        let c = target.substr(pos, 1);
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
    let spaceChar = "";
    for (let i = 0; i < length; i++)
      spaceChar += " ";

    //指定文字での置き換え関数を呼ぶ
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
    for (let i = 0; i < ((start + length) - work.length); i++) {
      work += " ";
    }
  }

  //先頭文字から、置き換え開始直前の文字までを切り取り
  var afterText = work.substring(0, start);

  //文字の置き換え
  for (let i = 0; i < length; i++) {
    if (config.isFixChar(start + i)) {
      afterText += config.getMaskChar(start + i);
    } else {
      afterText += overrideChar.substr(i, 1);
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
  for (let i = 0; i < inputChar.length; i++) {

    let position = caretIndex + i;
    
    if (config.isInput(position)) {
      //入力文字
      if (config.getMaskChar(position) == MaskConfig.MASK_L_ALPHA) {
        //小文字の英字の場合
        resultChar += inputChar.substr(i, 1).toLowerCase();
      } else if (config.getMaskChar(position) == MaskConfig.MASK_U_ALPHA) {
        //大文字の英字の場合
        resultChar += inputChar.substr(i, 1).toUpperCase();
      } else {
        //その他
        resultChar += inputChar.substr(i, 1);
      }

    } else if(config.isFixChar(position)) {
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
    while(true) {
      if (!config.isFixChar(index)) 
        break;
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
  for (let i = newValue.length - 1; i >= 0; i--) {
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
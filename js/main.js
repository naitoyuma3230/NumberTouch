'use strict';

{
  class Panel{
    // board.panelsにはpanelクラスのオブジェクトがpushされる
    // panel.elプロパティ=pressedクラスのli要素を作成
    constructor(){
      this.el = document.createElement('li');
      this.el.classList.add('pressed');
      this.el.addEventListener('click', ()=>{
        this.check();
      })
    }

    getEl(){
      return this.el;
    }

    // パネルからpressedクラスを除き、引数numを表示
    activate(num){
      this.el.classList.remove('pressed');
      this.el.textContent = num;
    }

    // 選択されたパネルの正誤判定
    check(){
    // parseIntで文字列を10進法数値に変換 currentNumと一致すれば正解判定
      if(currentNum === parseInt(this.el.textContent, 10)){
        this.el.classList.add('pressed');
        currentNum ++;
      }
    }
  }

  class Board{
    constructor(){
      this.panels = [];
      // Panelクラスをpanelsプロパティに4回Pushする
      for(let i = 0; i < 4; i++){
        this.panels.push(new Panel());
      }
      this.setup();
    }

    // panelクラスで作成した各要素をHTMLに追加 
    // createElement -> appendChiled
    setup(){
      const board = document.getElementById('board');
      this.panels.forEach(panel => {
        // board.appendChild(panel.el);
        // オブジェクト指向のカプセル化：外部クラスのプロパティに直接アクセスせずメソッドを経由する
        board.appendChild(panel.getEl());
      });
    }
    
    // Panelクラスの同名のメソッドを各Panelに実行するメソッド
    activate(){
      const nums = [0, 1, 2, 3];

      this.panels.forEach(panel =>{
        // nums配列からランダムな位置をspliceで取り出す
        // spliceで取り出した数値は1つでも配列となるので[0]でアクセス
        const num = nums.splice(Math.floor(Math.random() * nums.length), 1)[0];
        panel.activate(num);
      });
    }

  }
    
  const board = new Board();

  let currentNum = 0;

  const btn = document.getElementById('btn');
  btn.addEventListener('click', ()=>{
    // boardクラスのactivateメソッド
    board.activate();
  })
}
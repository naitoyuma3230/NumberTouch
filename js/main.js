'use strict';

{
  class Panel{
    // board.panelsにはpanelクラスのオブジェクトがpushされる
    // panel.elプロパティ=pressedクラスのli要素を作成
    constructor(game){
      this.game = game;
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
      if(this.game.getCurrentNum() === parseInt(this.el.textContent, 10)){
        this.el.classList.add('pressed');
        this.game.addCurrentNum();

        // 4つの数字が全て選択されたらタイマーストップ
        if(this.game.getCurrentNum() === this.game.getLevel() ** 2){
          clearInterval(this.game.getTimeoutId());
        }
      }
    }
  }

  class Board{
    // クラス間のプロパティの引き渡し
    // Gameクラスのプロパティをthis引数で渡す。board側はgame引数で受け取る
    constructor(game){
      this.game = game;
      this.panels = [];
      // Panelクラスをpanelsプロパティにlevel数値の2乗回Pushする
      for(let i = 0; i < this.game.getLevel() ** 2; i++){
        this.panels.push(new Panel(this.game));
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
      const nums = [];
      // panelに表記する数字をnumsに格納
      for(let i = 0; i < this.game.getLevel() ** 2; i++){
        nums.push(i);
      }

      this.panels.forEach(panel =>{
        // nums配列からランダムな位置をspliceで取り出す
        // spliceで取り出した数値は1つでも配列となるので[0]でアクセス
        const num = nums.splice(Math.floor(Math.random() * nums.length), 1)[0];
        panel.activate(num);
        // panelクラスのメソッドにアクセスしている？
      });
    }
  }
    
  class Game{
    constructor(level){
      // new game()の引数で渡された数値をlevelプロパティとして保存
      this.level  = level;
      this.board = new Board(this);

      this.currentNum = undefined;
      this.startTime = undefined;
      this.timeoutId = undefined;

      const btn = document.getElementById('btn');
      btn.addEventListener('click', ()=>{
        this.start();
      });
      this.setup();
    }

    start(){
      // スタートボタン連打時のsettimerの重複を防止
        // timeoutIdの値がundifindでない場合もタイマーをストップ
        if(typeof this.timeoutId !== 'undefined'){
          clearTimeout(this.timeoutId);
        }
      
        this.currentNum = 0;
        // boardクラスのactivateメソッド
        this.board.activate();
        this.startTime = Date.now();
        this.runTimer();
    }

    // タイマー表示
    runTimer(){
      const timer = document.getElementById('timer');
      timer.textContent = ((Date.now()-this.startTime) / 1000).toFixed(2);

      // settimeoutの起動
      // setTimerの返り値にtimeoutIdを指定
      this.timeoutId = setTimeout(()=>{
        this.runTimer();
      }, 10);
    }

    addCurrentNum(){
      this.currentNum++;
    }

    getCurrentNum(){
      return this.currentNum;
    }

    getTimeoutId(){
      return this.timeoutId;
    }

    getLevel(){
      return this.level;
    }

    // レベルに合わせてcontainerの大きさを変更
    setup(){
      const container = document.getElementById('container');
      const PANEL_WIDTH = 50;
      const BOARD_PADDING = 10;
      container.style.width = PANEL_WIDTH * this.level + BOARD_PADDING * 2 + 'px';
    }

  }

  new Game(5);

}
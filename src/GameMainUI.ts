/**
 *
 * @author 
 *
 */
class GameMainUI extends eui.Component{
//    private bkg:egret.Shape;
    
    public questionText:eui.Label;
    public scoreText: eui.Label;
    public timebar: eui.Image;
    public btn0:eui.Button;
    public btn1: eui.Button;
    public btn2: eui.Button;
    
    public mainGroup:eui.Group;
    public resultGroup:eui.Group;
    public scoreText0:eui.Label;
    public questionText0:eui.Label;
    public desTxt:eui.Label;
    public startBtn:eui.Label;
    
    public sumsArray = [];
    public randomSum;
    public timeTween:egret.Tween;
    public buttonMask:egret.Shape;
    public score = 0;
    public isGameOver = false;
    public topScore;
    public numbersArray = [-3,-2,-1,1,2,3];
    
	public constructor() {
    	 super();
       this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
       this.skinName = "resource/skins/GameMainUISkin.exml";
	}
	
    private onComplete(): void {
        this.initUI();
    }
    public initUI(): void {
//        this.bkg = new egret.Shape;
//        this.bkg.graphics.clear();
//        this.bkg.graphics.beginFill(0xffffff,0.8);
//        this.bkg.graphics.drawRect(0,0,480,800);
//        this.bkg.graphics.endFill();
//        this.addChildAt(this.bkg,0);
        
//        this.topScore = localStorage.getItem("topScore") == null ? 0 : localStorage.getItem("topScore");
        for(var i = 1;i < 5;i++) {
            this.sumsArray[i] = [[],[],[]];
            for(var j = 1;j <= 3;j++) {
                this.buildThrees(j,1,i,j);
            }
        }
        for(var i = 0;i < 3;i++) {
//            var numberButton = game.add.button(50,250 + i * 75,"buttons",checkAnswer,this).frame = i;
            this["btn" + i].addEventListener(egret.TouchEvent.TOUCH_TAP,this.checkAnswer,this);
            this["btn" + i].name = "btn" + i;
        }
        
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onStart,this);
        
        this.buttonMask = new egret.Shape;
        this.buttonMask.x = 42;
        this.buttonMask.y = 554;
        this.addChild(this.buttonMask);
        
        this.resultGroup.visible = false;
        this.mainGroup.visible = true;
        
        this.nextNumber();		
    }
    
    private onStart(e:TouchEvent):void{
        this.resultGroup.visible = false;
        this.mainGroup.visible = true;
        this.score = 0;
        this.nextNumber();
    }
    
    private gameOver(gameOverString:any):void{
        SoundManager.ins.PlayGameOver();
        this.mainGroup.visible = false;
        this.resultGroup.visible = true;
        if(gameOverString == "?")
        {
            this.desTxt.text = "你不会了嘛？！";
        }else{
            this.desTxt.text = "你是认真的？！";
        }
//        this.bkg.graphics.clear();
//        this.bkg.graphics.beginFill(0xff0000);
//        this.bkg.graphics.drawRect(0,0,480,800);
//        this.bkg.graphics.endFill();
        this.questionText.text = this.questionText.text + " = " + gameOverString;
        this.questionText0.text = this.questionText.text;
        this.isGameOver = true;
        localStorage.setItem("topScore",""+Math.max(this.score,this.topScore));
    }
    private checkAnswer(e:egret.TouchEvent):void{
        var idx:number = Number(e.currentTarget.name.substr(3));
        SoundManager.ins.PlayClick();
        console.log("check:"+idx);
        if(!this.isGameOver) {
            if(idx == this.randomSum) {
                this.score += Math.floor((this.buttonMask.x + 358) / 4);
                this.nextNumber();
            }
            else {
                if(this.score > 0) {
                    egret.Tween.removeAllTweens();
                }
                this.gameOver(idx + 1);
            }
        }
    }
    private nextNumber():void{
        this.topScore = localStorage.getItem("topScore") == null ? 0 : localStorage.getItem("topScore");
        this.isGameOver = false;
        this.scoreText0.text = this.scoreText.text = "Score: " + this.score + "\nBest Score: " + this.topScore;
        egret.Tween.removeAllTweens();
        this.buttonMask.graphics.clear();
        this.buttonMask.x = 42;
        this.buttonMask.graphics.beginFill(0x806470);
        this.buttonMask.graphics.drawRect(0,0,400,200);
        this.buttonMask.graphics.endFill();
        this.timebar.mask = this.buttonMask;
        if(this.score > 0) {
            this.timeTween = egret.Tween.get(this.buttonMask);
            this.timeTween.to({x: -358},3000).call(function(params:any):void
            {
                params.gameOver("?");
            },this,[this]);
        }
        this.randomSum = MyMath.between(0,2);
        this.questionText.text = this.sumsArray[Math.min(Math.round((this.score - 100) / 400) + 1,4)][this.randomSum][MyMath.between(0,this.sumsArray[Math.min(Math.round((this.score - 100) / 400) + 1,4)][this.randomSum].length - 1)];
        this.questionText0.text = this.questionText.text;
    }
    private buildThrees(initialNummber,currentIndex,limit,currentString):void{
        for(var i = 0;i < this.numbersArray.length;i++) {
            var sum = initialNummber + this.numbersArray[i];
            var outputString = currentString + (this.numbersArray[i] < 0 ? "" : "+") + this.numbersArray[i];
            if(sum > 0 && sum < 4 && currentIndex == limit) {
                this.sumsArray[limit][sum - 1].push(outputString);
            }
            if(currentIndex < limit) {
                this.buildThrees(sum,currentIndex + 1,limit,outputString);
            }
        }
    }
}

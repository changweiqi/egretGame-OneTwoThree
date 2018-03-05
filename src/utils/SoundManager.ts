/**
 *
 * @author 
 *
 */
class SoundManager {
    private static _instance: SoundManager;
    static get ins(): SoundManager {
        return this._instance || (this._instance = new SoundManager);
    }
    private _click: egret.Sound;//点击声音
    private _bgm: egret.Sound;//背景
    private _gameOver: egret.Sound;//结束声音
    private _bgm_channel: egret.SoundChannel;//保存用来静音用
    
	public constructor() {
        this._click = RES.getRes("select_mp3");
        this._bgm = RES.getRes("bkgmusic_mp3");
        this._gameOver = RES.getRes("gameover_mp3");
	}
	
    public PlayBGM() {
        if(this.IsMusic) {
            this._bgm_channel = this._bgm.play(0,0);
        }

    }
    public StopBGM() {
        if(this._bgm_channel != null) {
            this._bgm_channel.stop();
        }
    }
    
    public PlayGameOver() {
        if(this.IsSound) {
            this._gameOver.play(0,1);
        }
    }
	
    public PlayClick() {
        if(this.IsSound) {
            this._click.play(0,1);
        }
    }
    
    public get IsMusic(): boolean {
        var b = egret.localStorage.getItem("ismusic");
        if(b == null || b == "") {
            return true;
        }
        else {
            return b == "1";
        }
    }
        
    //声效是否播放，保存设置
    public set IsSound(value) {
        if(value) {
            egret.localStorage.setItem("isSound","1");
        } else {
            egret.localStorage.setItem("isSound","0");
        }
    }
    public get IsSound(): boolean {
        var b = egret.localStorage.getItem("isSound");
        if(b == null || b == "") {
            return true;
        }
        else {
            return b == "1";
        }
    }
}

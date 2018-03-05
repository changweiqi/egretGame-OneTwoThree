/**
 *
 * @author
 *
 */
var SoundManager = (function () {
    function SoundManager() {
        this._click = RES.getRes("select_mp3");
        this._bgm = RES.getRes("bkgmusic_mp3");
        this._gameOver = RES.getRes("gameover_mp3");
    }
    var d = __define,c=SoundManager,p=c.prototype;
    d(SoundManager, "ins"
        ,function () {
            return this._instance || (this._instance = new SoundManager);
        }
    );
    p.PlayBGM = function () {
        if (this.IsMusic) {
            this._bgm_channel = this._bgm.play(0, 0);
        }
    };
    p.StopBGM = function () {
        if (this._bgm_channel != null) {
            this._bgm_channel.stop();
        }
    };
    p.PlayGameOver = function () {
        if (this.IsSound) {
            this._gameOver.play(0, 1);
        }
    };
    p.PlayClick = function () {
        if (this.IsSound) {
            this._click.play(0, 1);
        }
    };
    d(p, "IsMusic"
        ,function () {
            var b = egret.localStorage.getItem("ismusic");
            if (b == null || b == "") {
                return true;
            }
            else {
                return b == "1";
            }
        }
    );
    d(p, "IsSound"
        ,function () {
            var b = egret.localStorage.getItem("isSound");
            if (b == null || b == "") {
                return true;
            }
            else {
                return b == "1";
            }
        }
        //声效是否播放，保存设置
        ,function (value) {
            if (value) {
                egret.localStorage.setItem("isSound", "1");
            }
            else {
                egret.localStorage.setItem("isSound", "0");
            }
        }
    );
    return SoundManager;
}());
egret.registerClass(SoundManager,'SoundManager');
//# sourceMappingURL=SoundManager.js.map
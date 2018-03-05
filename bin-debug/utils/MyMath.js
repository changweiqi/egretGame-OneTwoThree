/**
 * 数学公式管理类
 * @author ikee
 *
 */
var MyMath = (function () {
    function MyMath() {
    }
    var d = __define,c=MyMath,p=c.prototype;
    /**
     * 取两者之前的数字（取整）
     * @param min
     * @param max
     */
    MyMath.between = function (min, max) {
        return Math.round(min + Math.random() * (max - min));
    };
    return MyMath;
}());
egret.registerClass(MyMath,'MyMath');
//# sourceMappingURL=MyMath.js.map
/**
 * 数学公式管理类
 * @author ikee
 *
 */
class MyMath {
	public constructor() {
	}
	
	/**
	 * 取两者之前的数字（取整）
	 * @param min 
	 * @param max 
	 */
	public static between(min:number,max:number):number
	{
	    return Math.round(min+Math.random()*(max-min));
	}
}

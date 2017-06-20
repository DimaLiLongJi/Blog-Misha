function getStyle(obj,attr) {
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}

function startMove(obj,json,fn){
	var flag = true;
	// 设置标杆，如果为真则执行啥，如果不为真则执行啥
	clearInterval(obj.timer);
	// 关闭定时器
	obj.timer = setInterval(function(){
		// 开始循环json内部的变量
		for(var attr in json){
			// 获取当前值
			var iCur = 0;
			if (attr == 'opacity') {
				iCur = Math.round(parseFloat(getStyle(obj,attr))*100);
			}else{
				iCur = parseInt(getStyle(obj,attr));
			}

			// 计算速度
			var iSpeed = (json[attr] - iCur)/8;
			iSpeed = iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);

			// 检测停止,如果有一项没达到，则标杆falg为false，则执行
			if(iCur != json[attr]){
				flag = false;
			}
			if(flag == false){
				if(attr == 'opacity'){
					obj.style.filter = 'alpha(opacity:'+(iCur + iSpeed)+')';
					obj.style.opacity = (iCur + iSpeed)/100;
				}else{
					obj.style[attr] = iCur + iSpeed + 'px';
			}
			}else{
				clearInterval(obj.timer);
				if(fn){
					fn();
					}
				}

			}
	},30)
}


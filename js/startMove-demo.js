function getStyle(obj,attr) {
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}

function startMove(obj,json,fn){
	var flag = true;
	clearInterval(obj.timer);
	// 关闭定时器
	obj.timer = setInterval(function(){
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

			// 检测停止,如果全部达到了目标值
			if(iCur != json[attr]){
				flag = false;
			}
			if(attr == 'opacity'){
					obj.style.filter = 'alpha(opacity:'+(iCur + iSpeed)+')';
					obj.style.opacity = (iCur + iSpeed)/100;
			}else{
					obj.style[attr] = iCur + iSpeed + 'px';
			}
			
			}
		if(flag){
			clearInterval(obj.timer);
			if(fn){
				fn();
			}
			}
	},30)
}


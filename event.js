var eventUtil = {
	// 添加事件
	addHandler: function(element, type, handler) {
		// type是没有on的
		if (element.addEventListener) {
			// ie8之后
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			// ie8之前
			element.attachEvent('on' + type, handler);
		} else {
			// dom2级
			element['on' + type] = handler;
		}
	},

	// 删除事件
	removeHandler: function(element, type, handler) {
		if (element.removeEventListener) {
			// ie8之后
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent) {
			// ie8之前
			element.detachEvent('on' + type, handler);
		} else {
			element['on' + type] = null;
		}
	},

	// 事件获取
	getEvent: function(event) {
		return event ? event : window.event;
	},

	// 获取事件源
	getElement: function(event) {
		return event.target || event.srcElement;
	},

	// 阻止事件默认动作
	preventDefault: function(event) {
		if (event.preventDefault) {
			// 非ie
			event.preventDefault();
		} else {
			// ie
			event.returnValue = false;
		}
	},

	// 阻止事件冒泡
	stopPropagation: function(event) {
		if (event.stopPropagation) {
			// 非ie8
			event.stopPropagation();
		} else {
			// ie8之前
			event.cancelBubble = false;
		}
	}
}
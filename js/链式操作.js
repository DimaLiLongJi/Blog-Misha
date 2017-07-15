function Elem(id) {
	this.element = document.getElementById(id)
}
Elem.prototype.html = function(val) {
	let elem = this.element
	if (val) {
		elem.innerHTML = val
		return this // 链式操作
	} else {
		return elem.innerHTML
	}
}
Elem.prototype.on = function(type,fn) {
	let elem = this.element
	if (elem.addEventLinstener) {
		elem.addEventLinstener(type, fn,false)
	} else if (elem.attachEvent) {
		elem.attachEvent('on' + type, fn)
	} else { elem['on' + type] = fn }
	return this // 链式操作
}
let div1 = new  Elem('div1')
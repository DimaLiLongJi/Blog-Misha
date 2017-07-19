// 无嵌套方法
let compares = {
	arrayCompare: function (obj1,obj2) {
		let flag = true
		if (obj2 instanceof Array && obj1 instanceof Array) { 
			obj2.forEach((i) => {
				let index = i
				obj1.forEach((n) => {
					if (index instanceof Object && n instanceof Object ) { // 如果两个同为数组
						flag = compares.objectCompare(n,index)
					} else {
						flag = false
						return false
					}
				})
			})
		}
		return flag
	},
	objectCompare: function objectCompare (obj1,obj2) {
		let flag = true
		if (obj2 instanceof Object && obj1 instanceof Object ) {
			Object.keys(obj2).forEach((i) => {
				// console.log(i)
				value = obj2[i]
				key = i
				if(value instanceof Object === false) { // 如果value不是对象的话
					if (!obj1[i] || obj1[i] != value) {
						flag = false
						return false
					} else {
						return true
					}
				} else if(value instanceof Object === true) { // 如果子项还是对象的话
					Object.keys(value).forEach((n) => {
						// console.log(obj1[key][n])
						// console.log(value[n])
						if (!obj1[key][n] ||  value[n]!= obj1[key][n]) {
							flag = false
							return false
						}
					})
				}
			})
		}
		return flag
	}
}
// 两层嵌套方法
function compare (obj1, obj2) {
	let value, key,flag = true 
	
	// 如果Object嵌套Array
	if (obj2 instanceof Array && obj1 instanceof Array) { 
		flag = compares.arrayCompare(obj1,obj2)
	}

	// 如果外层是Object
	else if (obj1 instanceof Object && obj2 instanceof Object ) {
			for(let i in obj2) {
				// 如果Object没有嵌套或是嵌套Array
				if(obj2[i] instanceof Array === false) {
					flag = compares.objectCompare(obj1,obj2)
				}
				// 如果Object嵌套Array
				else {
					flag = compares.arrayCompare(obj1[i],obj2[i])
				}
			}

			
	}
	// object嵌套array
	console.log(flag)
}

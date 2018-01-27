// 数组深拷贝
const arr1 = [1,2,3,4,5];
const [...arr2] = arr1;

// 对象深拷贝
const obj1 = {
	key: 'value',
};

const obj2 = Object.assign({}, obj1);

const {...obj3} = obj1;

const obj4 = JSON.parse(JSON.stringify(obj1));

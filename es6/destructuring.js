// 数组解构
// 匹配模式
let [a, b, c] = [1, 2, 3];

// 允许使用默认值
let [foo = true] = [];
let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b

// 对象解构
let { bar, foo } = { foo: "aaa", bar: "bbb" };
// foo // "aaa"
// bar // "bbb"

let { baz } = { foo: "aaa", bar: "bbb" };
// baz // undefined

let { log, sin, cos } = Math;

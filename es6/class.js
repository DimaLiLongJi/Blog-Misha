// class想相当于 原型
class ABC {
  constructor(arg) {
    // 此处为构造函数，唯一
    this.abc = arg;
  }

  static showClass() { // 静态方法 仅仅存在Abc
    console.log('为静态方法，仅仅通过 ABC调用');
  }

  showFunc() { // 方法 相当于 ABC.prototype.showFunc = () => {}
    console.log('写在原型链的方法');
  }

  value = 'abc'; // 变量，通过this.value调用
}

class abc extends ABC { // 继承extends classABC
  constructor(arg) {
    super(arg);
    this.abc = arg;
  }
}

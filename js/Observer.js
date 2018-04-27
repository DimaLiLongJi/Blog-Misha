export class EventEmitter {
  constructor() {
    console.log('init Event');
    this.handelFn = {};
  }

  on(eventName, callback) {
    if (this.handelFn[eventName] && this.handelFn[eventName] instanceof Array && callback instanceof Function) {
      this.handelFn[eventName].push(callback);
    } else {
      this.handelFn[eventName] = [];
      this.handelFn[eventName].push(callback);
    }
  }

  emit(eventName) {
    if (this.handelFn[eventName] && this.handelFn[eventName] instanceof Array) {
      this.handelFn[eventName].forEach((callback) => {
        if (callback && callback instanceof Function) {
          callback();
        }
      });
    } else {
      console.error('emit failed,nonexistent event:', eventName);
    }
  }

  remove(eventName) {
    if (this.handelFn[eventName]) {
      delete this.handelFn[eventName];
    } else {
      console.error('remove failed,nonexistent event:', eventName);
    }
  }

  showEvent(eventName) {
    if (this.handelFn[eventName] && this.handelFn[eventName] instanceof Array) {
      return this.handelFn[eventName];
    } else {
      console.error('show event failed,nonexistent event:', eventName);
    }
  }
}

// function el1() {
//   console.log('222');
// }
// let event = new EventEmitter();
// event.on('chufa', el1);
// event.emit('chufa');
// event.remove('chufa');

export class Observable {
  constructor() {
    console.log('init Observable');
    this.handelObj = [];
  }

  subscribe(obj, callback) {
    if (!this.handelObj.find(o => o === obj)) {
      console.log('obj', obj);
      this.handelObj.push(obj);
      this.watcher(obj, callback);
    }
  }

  watcher(obj, callback) {
    if (!obj || typeof obj !== 'object') return;
    const that = this;
    for (let key in obj) {
      let val = obj.key;
      this.watcher(val, callback);
      Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: true,
        get() {
          return val;
        },
        set(newVal) {
          if (newVal === val) return;
          console.log('newVal', newVal);
          val = newVal;
          callback();
          that.watcher(obj.key, callback);
        },
      });
    }
  }
}


// function el2() {
//   console.log('11132323');
// }
//
// let ober = new Observable();
// let subjuction = {
//   a: 1,
// };
// ober.subscribe(subjuction, el2);
// subjuction.a = {
//   ada: 1,
// };

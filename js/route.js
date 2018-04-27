class Router {
  constructor() {
    this.routes = {};
    this.currentUrl = '';
    window.addEventListener('load', this.refresh.bind(this), false);
    window.addEventListener('hashchange', this.refresh.bind(this), false);
  }

  route(path, callback) {
    this.routes[path] = callback || function () {};
  }

  refresh() {
    this.currentUrl = location.hash.slice(1) || '/';
    if (this.routes[this.currentUrl]) this.routes[this.currentUrl]();
  }

  init(arr) {
    if (arr && arr instanceof Array) {
      arr.forEach(route => {
        this.route(route.path, route.callback);
      });
      console.log('this.routes', this.routes);
    } else {
      console.error('no routes exit');
    }
  }
}

function cal() {
  console.log('show callback 了');
}
const routes = [
  {
    path: '1',
    callback: cal,
  },
  {
    path: 2,
    callback: cal,
  },
];
const route = new Router();
route.init(routes);

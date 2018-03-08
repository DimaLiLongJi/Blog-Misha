class stringToDOM {
  parseDom = (str) => {
    const objE = document.createElement("div");
    if (typeof str === "string") {
      objE.innerHTML = str;
      return objE.children;
    } else {
      return [];
    }
  };

  createDoM = this.parseDom('<div id="fullscreen-close"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-guanbi1" /></svg></div>')[0];
}

console.log('createDoM', new stringToDOM().createDoM);

class StringToDOM {
  parseDom = (str) => {
    const objE = document.createElement("div");
    if (typeof str === "string") {
      objE.innerHTML = str;
      return objE.children;
    } else {
      return [];
    }
  };
}

console.log('createDoM', new StringToDOM().parseDom('<div id="fullscreen-close"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-guanbi1" /></svg></div>')[0]);

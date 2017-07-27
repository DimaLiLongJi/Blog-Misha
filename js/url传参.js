// 页面传参
      function getUrlDate(id){
        let parts = window.location.search.replace("?", "").split("&"),
          params = {};
        for(let i = 0, len = parts.length; i < len; i ++) {
          let pairs = parts[i].split("=");
           params[pairs[0]] = pairs[1];
        }
        if(params[id]) {
          return params[id]
        }else {
          return ''
        }
      }
      function getQueryStr(id) { 
        let result
        let rs = new RegExp("(^|)" + str + "=([^&]*)(&|$)", "gi").exec(String(window.document.location.href)), tmp; 
        if (tmp = rs) {
          let strings = tmp[0].split("&")
          strings.forEach(function(i){
            
            let string = i.split('=')
            // console.log(string[0])
            if(string[0] === id) {
              result = string[1]
            }
          }) 
        }
        return result
      } 
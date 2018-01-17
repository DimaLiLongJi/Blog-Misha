function openURL(link) {
      if (link.indexOf('://') > 0) {
        window.open(link, '_blank');
      } else {
        window.open('http://' + link, '_blank');
      }
    }

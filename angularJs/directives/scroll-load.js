angular.module('App')
  .directive('scrollLoad', () => {
    return (scope, elm, attr) => {
      const raw = elm[0];

      elm.bind('scroll', () => {
        if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
          scope.$apply(attr.scrollLoad);
        }
      });
    };
  });

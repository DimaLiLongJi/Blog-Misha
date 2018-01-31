(() => {
  angular.module('App')
    .factory('OpportunityService', OpportunityService);

  OpportunityService.$inject = [
    '$resource',
    '$q',
    'API_BASE_URL'
  ];

  function OpportunityService(
    $resource,
    $q,
    API_BASE_URL
  ) {
    const materialResource = $resource(API_BASE_URL + 'opportunities/:id');
    const service = {
      update,
      remove,
      pushApplications,
      pushOpportunities,
      getLocationStatistics,
      getPushedOpportunities,
      copy,
      getPushedOpportunityList,
      getScheduledStudents,
      updateScheduledStudents,
    };

    return service;

    function update(id, params) {
      var deferred = $q.defer();

      $resource(API_BASE_URL + `opportunities/${id}`, null, {
          put: {
            method: 'PUT',
            isArray: false
          }
        })
        .put(params, function(opps) {
          deferred.resolve(opps);
        }, function(error) {
          var msg = "服务端错误，请联系管理员";
          if (error.data && error.data.msg) {
            msg = error.data.msg;
          }
          logErr(error, deferred);
        });
      return deferred.promise;
    }

    function remove(id) {
      var deferred = $q.defer();

      $resource(API_BASE_URL + `opps/${id}`)
        .remove(null, function(opps) {
          deferred.resolve(opps);
        }, function(error) {
          var msg = "服务端错误，请联系管理员";
          if (error.data && error.data.msg) {
            msg = error.data.msg;
          }
          logErr(error, deferred);
        });
      return deferred.promise;
    }


    function pushApplications(id, applicationIds) {
      var deferred = $q.defer();
      $resource(API_BASE_URL + `opportunities/${id}/push_applications`)
        .save({
          applicationIds
        }, function(opps) {
          deferred.resolve(opps);
        }, function(error) {
          var msg = "服务端错误，请联系管理员";
          if (error.data && error.data.msg) {
            msg = error.data.msg;
          }
          logErr(error, deferred);
        });
      return deferred.promise;
    }

    function pushOpportunities(params) {
      return $resource(`${API_BASE_URL}push_opportunities`)
        .save(params).$promise;
    }

    function getPushedOpportunities(id) {
      return $resource(`${API_BASE_URL}opportunities/students/${id}/pushed`)
        .query().$promise;
    }

    function getLocationStatistics(params) {
      return $resource(`${API_BASE_URL}opportunities/statistics/location`)
        .query(params).$promise;
    }

    function copy(id) {
      return $resource(`${API_BASE_URL}opportunities/${id}/copy`)
        .get().$promise;
    }

    function getPushedOpportunityList(studentId, id) {
      return $resource(`${API_BASE_URL}opportunities/students/${studentId}/pushed/${id}`)
        .query().$promise;
    }

    function getScheduledStudents(params) {
      return $resource(`${API_BASE_URL}opportunities/${params.oppId}/scheduled_push`)
        .get(params).$promise;
    }

    function updateScheduledStudents(oppId, params) {
      return $resource(API_BASE_URL + `opportunities/${oppId}/scheduled_push`, null, {
        put: {
          method: 'PUT',
          isArray: false
        }
      }).put(params).$promise;
    }

    function logErr(error, deferred) {
      var msg = "服务端错误，请联系管理员";
      if (error.data) {
        msg = error.data;
      }
      console.error(error);
      return deferred.reject(msg);
    }
  }
})();

angular.module('css.controllers')

.factory('StatusService', function($q, localstorage) {

  return {
    getMockStatus: function() {
      var status = [
          {name : 'London' , id:'jobs-critical', count:0},
          {name:  'Atlanta', id:'claim-denied', count:2},
          {name:  'San Francisco', id:'jobs-unassigned', count:1},
          {name:  'Repair Approved', id:'repair-approved', count:1},
          {name:  'Awaiting Parts', id:'awaiting-parts', count:2},
          {name:  'In Repair', id:'in-repair', count:1},
      ];
      return status;
    }
  };
});

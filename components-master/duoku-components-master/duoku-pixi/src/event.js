/**
 * Create by .
 * User: liutinghai
 * Date: 2019/3/7
 * Time: 10:25
 */
var events = {};
var g_events = {
  on: function (event,fun) {
    if(!events[event]){
      events[event] = [];
      events[event].push(fun)
    }
  },
  fire : function (event) {
    events[event].pop().call();
  }
};
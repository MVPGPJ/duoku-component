/**
 * Create by .
 * User: liutinghai
 * Date: 2018/12/18
 * Time: 9:39
 */

var duokuEvents = {
  
  events: {},
  
  on: function (key,cbk) {
    if(!this.events[key]){
      this.events[key] = [];
    }
    this.events[key].push(cbk);
  },
  
  off: function (key,cbk) {
    var self = this;
    for(var o in this.events){
        if(o === key ){
          this.events[o].forEach(function (fun) {
            if( fun == cbk){
              delete self.events[o];
              delete self.events[o+"-data"];
            }
          })
        }
        break;
    }
  },
  
  trigger: function (key,data) {
    for(var o in this.events){
      if(o === key ){
        this.events[o].forEach((fun)=>{
          this.events[key +"-data"] = data;
          fun.call(this,this.events[key +"-data"]);
        })
      }
    }
  },
  subscription:function (key) {
    if(this.events[key]){
      this.events[key].forEach((fun)=>{
        fun.call(this,this.events[key +"-data"])
      });
    }
  }
}


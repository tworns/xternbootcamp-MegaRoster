$(document).foundation();

var megaRoster =  {
  init: function() {
    this.setupEventListeners();

  },
  setupEventListeners : function(ev){
        document.querySelector('form').onsubmit = this.addStudent;
  },
   addStudent :  function(ev) {
     ev.preventDefault();
     document.querySelector('input');
     console.log("TEST!");
  },

};
megaRoster.init();

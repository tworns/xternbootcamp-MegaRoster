$(document).foundation();

var megaRoster =  {
  init: function() {
    this.setupEventListeners();

  },
  setupEventListeners : function(ev){
        document.querySelector('#studentForm').onsubmit = this.addStudent;
  },
   addStudent :  function(ev) {
     ev.preventDefault();
     this.appendChild(buildListItem());
     document.querySelector('input');
  },
  buildListItem : function(studentName) {
      var li = document.createElement('li');
      li.innerText = studentName;
      return li;
   },

};
megaRoster.init();

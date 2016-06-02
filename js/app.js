$(document).foundation();

var megaRoster =  {
  init: function() {
    this.setupEventListeners();

  },
  setupEventListeners : function(ev){
        document.querySelector('#studentForm').onsubmit = this.addStudent.bind(this);
  },
   addStudent :  function(ev) {
     ev.preventDefault();
     var f = ev.currentTarget;
     document.querySelector('#studentList').appendChild(this.buildListItem(f.studentName.value));
    f.reset();
     f.studentName.focus();
  },
  buildListItem : function(studentName) {
      var li = document.createElement('li');
      li.innerText = studentName;
      return li;
   },

};
megaRoster.init();

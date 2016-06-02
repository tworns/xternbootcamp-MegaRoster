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
  buildLink : function(options) {
    var link =document.createElement('a');
    link.href = '#';
    link.innerText = options.text;
    link.onclick = options.func;
    return link;

  },
  buildListItem : function(studentName) {
      var li = document.createElement('li');
      li.innerText = studentName;
      li.appendChild(this.buildLink(
        { text: 'Remove',
        func: function(){
          li.parentElement.removeChild(li);
        },
      } ));



      li.appendChild(this.buildLink(
        { text: 'Promote',
        func: function(){
          li.border = 'border solid blue';
        },
      } ));

      return li;
   },

};
megaRoster.init();

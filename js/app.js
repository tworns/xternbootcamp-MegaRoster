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
     var list = document.querySelector('#studentList');
     if(list.firstChild === null) {
       list.appendChild(this.buildListItem(f.studentName.value));
    }
    else {
      list.insertBefore(this.buildListItem(f.studentName.value), list.childNodes[0]);
    }
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
      var delLink = this.buildLink(
        { text: 'Remove',
        func: function(){
          li.parentElement.removeChild(li);
        },
      } );
      li.appendChild(delLink);
      //
      var borderLink = this.buildLink(
        { text: 'Promote',
        func: function(){
          li.style.border = '2px dashed blue';
        },
      } );
      li.appendChild(borderLink);
      //
      var topLink = this.buildLink( {
        text: 'Send to Top',
        func: function(){
          li.parentElement.insertBefore(li,li.parentElement.firstChild);
        },
      });
      li.appendChild(topLink);
      //
      var bottomLink = this.buildLink({
        text: 'Send to Bottom',
        func: function() {
          li.parentElement.appendChild(li);
        },

      });
      //
      li.appendChild(bottomLink);
      var upLink = this.buildLink({
        text: '^',
        func: function() {
          if(li.parentElement.firstChild !== li){
            li.parentElement.insertBefore(li,li.previousSibling);
          }
      },
      });
      li.appendChild(upLink);
      //
      var downLink = this.buildLink({
          text: 'v',
          func: function(){
            if(li.parentElement.lastChild !== li) {
              li.parentElement.insertBefore(li.nextSibling, li);
            }
          },
      });
      li.appendChild(downLink);
      //
      return li;
   },
};
megaRoster.init();

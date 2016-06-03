$(document).foundation();

var megaRoster =  {
  init: function() {
    this.setupEventListeners();
    var list = document.querySelector('#studentList');
    document.getElementById("studentList").innerHTML =localStorage.getItem('list');
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
    localStorage.setItem("list",document.querySelector('#studentList').innerHTML);
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
      var bordered = 0;
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
          if(bordered === 0) {
          li.style.border = '2px dashed blue';
          bordered = 1;
          this.text = 'Demote';
        }
        else{
            li.style.border = 'none';
            this.text = 'Promote';
            bordered = 0;
        }
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
      var editLink = this.buildLink({
        text: 'Edit',
        func : function(){
          var editLi = document.createElement('li');
          var editContainer= document.createElement('form');
          //
          var editBox = document.createElement('input');
          editBox.type = 'text';
          editBox.name = 'editName';
          editBox.placeholder = studentName ;
          editBox.required = true;
          editBox.id = 'edit';
          //
          var editConf = megaRoster.buildLink({
            text: 'Confirm',
            func: function(){
              var box = document.querySelector('#edit');
              if(box.value !== "") {
              var newLi = megaRoster.buildListItem(box.value);
              li.parentElement.insertBefore(newLi,li);
              li.parentElement.removeChild(editLi);
              li.parentElement.removeChild(li);
            }
            else {
              editBox.placeholder = "Please enter a value!";
              }
            },
          });
          var editCancel = megaRoster.buildLink({
            text : 'Cancel',
            func : function(){
              li.parentElement.removeChild(editLi);
              },
          });
          //
          editContainer.appendChild(editBox);
          editContainer.appendChild(editConf);
          editContainer.appendChild(editCancel);
          editLi.appendChild(editContainer);
          //
          li.parentElement.appendChild(editLi);
        }
      });
      li.appendChild(editLink);
      //
      return li;
   },
};
megaRoster.init();

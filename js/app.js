$(document).foundation();
//TODO use localStorage to make data persistant
// (loop through list, stash names in an object array, use JSON.stringify to insert into localStorage. JSON.parse and build item to reconstitue objects)
//Use foundation button styles on links.
var megaRoster =  {
  init: function() {
    this.setupEventListeners();
    var list = document.querySelector('#studentList');
    document.getElementById("studentList").innerHTML =JSON.parse(localStorage.getItem('list'));
  },
  setupEventListeners : function(ev){
        document.querySelector('#studentForm').onsubmit = this.addStudent.bind(this);
  },
  //
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
    localStorage.setItem("list",JSON.stringify(document.querySelector('#studentList').innerHTML));
     f.reset();
     f.studentName.focus();
  },
  //
  buildLink : function(options) {
    var link =document.createElement('a');
    link.href = '#';
    link.innerHTML = options.contents;
    link.onclick = options.func;
    link.backgroundcolor = 'grey';
    return link;
  },
//
  buildListItem : function(studentName) {
      var li = document.createElement('li');
      li.innerText = studentName;
      var bordered = 0;
      var delLink = this.buildLink(
        { contents: 'Remove',
        func: function(){
          li.parentElement.removeChild(li);
          localStorage.setItem("list",JSON.stringify(document.querySelector('#studentList').innerHTML));
        },
      } );
      li.appendChild(delLink);
      //
      var borderLink = this.buildLink(
        { contents: 'Favorite',
        func: function(){
        if(bordered === 0) {
          li.style.border = '2px dashed blue';
          bordered = 1;
          this.contents = 'Unfavorite';
          this.innerHTML = 'Unfavorite';
        }
        else{
            li.style.border = 'none';
            this.contents = 'Favorite';
            this.innerHTML = 'Favorite';
            bordered = 0;
        }
        },
      } );
      li.appendChild(borderLink);
      //
      var topLink = this.buildLink( {
        contents: 'Send to Top',
        func: function(){
          li.parentElement.insertBefore(li,li.parentElement.firstChild);
        },
      });
      li.appendChild(topLink);
      //
      var bottomLink = this.buildLink({
        contents: 'Send to Bottom',
        func: function() {
          li.parentElement.appendChild(li);
        },
      });
      li.appendChild(bottomLink);
      //
      var upLink = this.buildLink({
        contents: '<i class ="fa fa-arrow-up"></i>',
        func: function() {
          if(li.parentElement.firstChild !== li){
            li.parentElement.insertBefore(li,li.previousSibling);
          }
      },
      });
      li.appendChild(upLink);
      //
    var downLink = this.buildLink({
          contents: 'v',
          func: function(){
            if(li.parentElement.lastChild !== li) {
              li.parentElement.insertBefore(li.nextSibling, li);
            }
          },
      });
      li.appendChild(downLink);
      //
    var editLink = this.buildLink({
        contents: 'Edit',
        func : function(){
          var editLi = document.createElement('li');
          var editContainer= document.createElement('form');
          //
          var editBox = document.createElement('input');
          editBox.type = 'text';
          editBox.name = 'editName';
          editBox.value = studentName;
          editBox.required = true;
          editBox.id = 'edit';
          //
          var editConf = megaRoster.buildLink({
            contents: 'Confirm',
            func: function(){
              var box = document.querySelector('#edit');

              if(box.value !== "") {
              var newLi = megaRoster.buildListItem(box.value);
              li.parentElement.insertBefore(newLi,li);
              li.parentElement.removeChild(editLi);
              li.parentElement.removeChild(li);
              localStorage.setItem("list",JSON.stringify(document.querySelector('#studentList').innerHTML));
            }
            else {
              editBox.placeholder = "Please enter a value!";
              }
            },
          });
          //
          var editCancel = megaRoster.buildLink({
            contents : 'Cancel',
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
          editBox.focus();
          editBox.select();
        }
      });
      li.appendChild(editLink);
      //
      return li;
   },
};
megaRoster.init();

$(document).foundation()
var studentRoster = [];
var rE;

var megaRoster = {
  init: function(rosterElementSelector) {
  //  this.mutants();
    this.rosterElement = document.querySelector(rosterElementSelector);
    rE = this.rosterElement;
    this.setupEventListeners();
          //debugger;
      var temp;
    temp = JSON.parse(localStorage.getItem('roster'));
      console.log(JSON.stringify(temp));
      if(temp){
      this.studentRoster = temp;
    }
   this.loadRoster();
  },

  setupEventListeners: function() {
    document.querySelector('#studentForm').onsubmit = this.addStudent.bind(this);

  },
  loadRoster : function() {
    if(localStorage.length >= 1){
    for(var i = 0; i< studentRoster.length; i++) {
      if(studentRoster[i] !== undefined){
        addAjax(rE, studentRoster[i]);
      /*var oldList = this.buildListItem(studentRoster[i]);
      this.prependChild(this.rosterElement,oldList);*/
      }
    }
  }
  },
  addStudent: function(ev) {
    ev.preventDefault();
    var f = ev.currentTarget;
    var studentName = f.studentName.value;
    var item = this.buildListItem(studentName);
    this.prependChild(this.rosterElement, item);
    this.saveRoster(studentName);
    f.reset();
    f.studentName.focus();
  },
  mutants: function() {
    $.ajax({
    url: "https://mutant-school.herokuapp.com/api/v1/mutants",
    method: "GET", })
    .success(function(data){
      $(data).each(function(index) {
        megaRoster.addAjax('\n'+ 'Real Name: '+this.real_name + '\n' + 'Alias: ' +this.mutant_name);
      });
    })
},
  addAjax : function(name) {
    this.prependChild(rE, this.buildListItem(name));
  },
  prependChild: function(parent, child) {
    parent.insertBefore(child, parent.firstChild);
  },

  buildListItem: function(studentName) {
    var item = document.createElement('li');
    var span = document.createElement('span');
    span.innerText = studentName;
    span.className = 'studentName';
    item.appendChild(span);
    this.appendLinks(item);

    return item;
  },
  saveRoster: function(name){
      studentRoster.push(name);
      localStorage.setItem('roster',JSON.stringify(studentRoster));
  },
  promote: function(item) {
    this.prependChild(this.rosterElement, item);
  },

  moveUp: function(item) {
    var previousElement = item.previousElementSibling;
    this.rosterElement.insertBefore(item, previousElement);
  },

  moveDown: function(item) {
    this.moveUp(item.nextElementSibling);
    item.querySelector('.favorite').contents = 'unfavorite';
  },
  favorite: function(item) {

     if(item.favoriteable === "true") {
       item.querySelector('.favorite').innerHTML = 'Unfavorite';
       item.style.backgroundColor = "Gold" ;
       item.favoriteable = "false";
  }
  else {
    item.querySelector('.favorite').innerHTML = 'Favorite';
    item.favoriteable = "true";
    item.style.backgroundColor = 'transparent';
  }
  },

  toggleEditable: function(el) {
    var toggleElement = el.parentElement.querySelector('.toggleEdit');
    if (el.contentEditable === "true") {
        el.contentEditable = "false";
        toggleElement.innerHTML = "Edit";
    } else {
        el.contentEditable = "true";
        toggleElement.innerHTML = "Update";
        el.focus();
    }
  },

  appendLinks: function(item) {
    var span = document.createElement('span');
    span.className = 'actions';

    var deleteLink = this.buildLink({
      contents: 'Remove',
      className : 'remove button small alert',
      handler: function(ev) {
        this.rosterElement.removeChild(item);
      }
    });
    span.appendChild(deleteLink);

    var promoteLink = this.buildLink({
      contents: 'Promote',
      className: 'promote button small',
      handler: function() {
        this.promote(item);
      }
    });
        span.appendChild(promoteLink);
        //
    var favLink = this.buildLink({
        contents: 'Favorite',
        favoriteable : 'true',
        className: 'favorite button small',
        handler: function(){
          this.favorite(item);
        },
    });
    span.appendChild(favLink);
//
    span.appendChild(this.buildLink({
      contents: '<i class="fa fa-arrow-up"></i>',
      className: 'button tiny success',
      handler: function() {
        if (item !== this.rosterElement.firstElementChild) {
          this.moveUp(item);
        }
      }
    }));

    span.appendChild(this.buildLink({
      contents: '<i class = "fa fa-arrow-down"</i>',
      className: 'button tiny success',
      handler: function() {
        if (item !== this.rosterElement.lastElementChild) {
          this.moveDown(item);
        }
      }
    }));

    span.appendChild(this.buildLink({
      contents: 'Edit',
      className: ' toggleEdit button small',
      handler: function() {
        this.toggleEditable(item.querySelector('span.studentName'));
      }
    }));

    item.appendChild(span);
  },

  buildLink: function(options) {
    var link = document.createElement('a');
    link.href = '#';
    link.innerHTML = options.contents;
    link.onclick = options.handler.bind(this);
    link.className = options.className;
    return link;
  },
};

megaRoster.init('#studentList');

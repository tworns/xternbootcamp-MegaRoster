$(document).foundation()

var megaRoster = {
    studentRoster : ["&","l","d"],
  init: function(rosterElementSelector) {
    this.rosterElement = document.querySelector(rosterElementSelector);
    this.setupEventListeners();
    this.loadRoster(this.studentRoster);
  },

  setupEventListeners: function() {
    document.querySelector('#studentForm').onsubmit = this.addStudent.bind(this);

  },
  loadRoster : function(roster) {
    roster = JSON.parse(localStorage.getItem('roster'));
    debugger;
    if(roster!== null) {
    for(var i = 0; i< roster.length; i++) {
      if(roster[i] !== undefined){
      this.buildListItem(roster.shift());
    }
  }
  }
  this.studentRoster = roster;
  },
  addStudent: function(ev) {
    ev.preventDefault();
    var f = ev.currentTarget;
    var studentName = f.studentName.value;
    var item = this.buildListItem(studentName);
    this.prependChild(this.rosterElement, item);
    this.addToRoster(studentName);
    f.reset();
    f.studentName.focus();
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
  addToRoster: function(name){
    if(megaRoster.studentRoster !== null){
      megaRoster.studentRoster.push(name);
      localStorage.setItem('roster',JSON.stringify(this.studentRoster));
    }
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
     var i = item.parentElement.querySelector('.studentName');
     if(item.favoriteable === "true") {
       item.querySelector('.favorite').innerHTML = 'Unfavorite';
       i.style.backgroundColor = "Gold" ;
       item.favoriteable = "false";
  }
  else {
    item.querySelector('.favorite').innerHTML = 'Favorite';
    item.favoriteable = "true";
    i.style.backgroundColor = 'transparent';
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

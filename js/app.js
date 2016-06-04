$(document).foundation()

var megaRoster = {
  init: function(rosterElementSelector) {
    this.rosterElement = document.querySelector(rosterElementSelector);
    this.setupEventListeners();
  },

  setupEventListeners: function() {
    document.querySelector('#studentForm').onsubmit = this.addStudent.bind(this);
  },

  addStudent: function(ev) {
    ev.preventDefault();
    var f = ev.currentTarget;
    var studentName = f.studentName.value;
    var item = this.buildListItem(studentName);
    this.prependChild(this.rosterElement, item);
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

  promote: function(item) {
    this.prependChild(this.rosterElement, item);
  },

  moveUp: function(item) {
    var previousElement = item.previousElementSibling;
    this.rosterElement.insertBefore(item, previousElement);
  },

  moveDown: function(item) {
    this.moveUp(item.nextElementSibling);
  },
  favorite: function(item) {
     var i = item.parentElement.querySelector('.studentName');
    i.style.backgroundColor = "Gold" ;
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

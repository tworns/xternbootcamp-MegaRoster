var listItem ={
  init: function() {
  document.querySelector('form').onsubmit = listItem.addToList;
},
  promo : function(ev) {
   this.parentNode.style.border= "solid blue" ;

 },

  del : function(ev){
   this.parentNode.remove();
 },

 buildList : function(name) {
 var listElement = document.createElement('dt');
var dd = document.createElement('dd');
dd.innerHTML =name;
listElement.appendChild(dd);
var delBtn = document.createElement('button');

delBtn. onclick = this.del;
delBtn.style = "padding-left: 50px";
delBtn.innerHTML = 'Delete';
listElement.appendChild(delBtn);

var promoBtn = document.createElement('button');
promoBtn.innerHTML = 'Promote </dd></dt>';
promoBtn.onclick = this.promo;
promoBtn.style = 'padding-left: 50px';
listElement.appendChild(promoBtn);
return listElement;
},


 addToList : function(ev) {
 ev.preventDefault();
 var nameList =  document.querySelector('#nameList');
 nameList.insertBefore(listItem.buildList(this.name.value),nameList.childNodes[0]);
},

};
listItem.init();

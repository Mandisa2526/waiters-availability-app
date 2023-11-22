let waitersNamesElement = document.querySelector('.list');

waitersNamesElement.addEventListener("click",() {
//   var text = document.createTextNode(item);
  var li = document.createElement('@key');

  //create button and named x
  var btn = document.createElement("button");
  btn.textContent = "x";
  //button styling
  btn.style.marginLeft = "10px";
  .appendChild(text);
  li.appendChild(btn);
  document.getElementById('todo-list').appendChild(li);
  btn.addEventListener('click', function() {
    this.parentElement.remove();
  })
})
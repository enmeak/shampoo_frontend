function setDisplay(collapsed, item) {
  (collapsed == "true") ? (item.className = "hide") : (item.className = "");
}

function displayHierarchy(hierarchy, el) {
  var par = document.createElement("ul")

  for (var i = 0; i < hierarchy.length; i++) {
    if (hierarchy[i].value != "ignore"){
    var item = document.createElement("li");

    var li = par.appendChild(item);

    item.innerHTML = (hierarchy[i].value).replace('_', ' ')
    item.classList.add(hierarchy[i].type)
    
      if (hierarchy[i].type == "file") {
        item.innerHTML = ('<i class="fas fa-book"></i> '+(hierarchy[i].value).replace('_', ' '))
      } 
      else {
        item.innerHTML = ('<i class="fas fa-archive"></i> '+(hierarchy[i].value).replace('_', ' '))
      }
  }

    //set initial display from hierarchy
    setDisplay(hierarchy[i].collapsed, item.parentNode);


    li.addEventListener("click", function (e) { 
      if (e.target.children.length == 1) {
        let textbook = e.target.innerText.toLowerCase().split(' ').join('_')
        textbook = textbook.substring(1)
        loadPdf(textbook)
      }
      else
      {
        var child = e.target.children[1];
        if (child && child.classList.value == "hide") {
          setDisplay("false", child);
        } else {
          setDisplay("true", child);
        }
        e.stopPropagation();
      }

    });

    el.appendChild(par);

    if (hierarchy[i].children) {
      displayHierarchy(hierarchy[i].children, li);
    } 
  }
}

var root = document.getElementById("mySidenav");
displayHierarchy(hierarchy, root);

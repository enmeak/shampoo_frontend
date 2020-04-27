function setDisplay(collapsed, item) {
  (collapsed == "true") ? (item.className = "hide") : (item.className = "");
}

// const icon = document.createElement("i")
// icon.classList.add("fas","fa-caret-down")

function displayData(data, el) {
  var par = document.createElement("ul")

  for (var i = 0; i < data.length; i++) {
    var item = document.createElement("li");

    var li = par.appendChild(item);

    // item.innerHTML = (data[i].value).replace('_', ' ')
    item.classList.add(data[i].type)
    if (data[i].type == "file") {
      item.innerHTML = ('<i class="far fa-file-pdf"></i> '+(data[i].value).replace('_', ' '))
    } else {
      item.innerHTML = ('<i class="far fa-folder"></i> '+(data[i].value).replace('_', ' '))
    }

    //set initial display from data
    setDisplay(data[i].collapsed, item.parentNode);


    li.addEventListener("click", function (e) {  
      if (e.target.children.length == 0) {
        let textbook = e.target.innerText.toLowerCase().replace(' ', '_')
        loadPdf(textbook)
      }
      else
      {
        var child = e.target.children[0];
        console.log(child.classList.value)
        if (child && child.classList.value == "hide") {
          setDisplay("false", child);
        } else {
          setDisplay("true", child);
        }
        e.stopPropagation();
      }

    });

    el.appendChild(par);

    if (data[i].children) {
      displayData(data[i].children, li);
    } 
  }
}

var root = document.getElementById("mySidenav");
displayData(data, root);

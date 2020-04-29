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

    item.innerHTML = (data[i].value).replace('_', ' ')
    item.classList.add(data[i].type)
    if (data[i].type == "file") {
      item.innerHTML = ('<i class="fas fa-book"></i> '+(data[i].value).replace('_', ' '))
    } 
    else {
      item.innerHTML = ('<i class="fas fa-archive"></i> '+(data[i].value).replace('_', ' '))
    }

    //set initial display from data
    setDisplay(data[i].collapsed, item.parentNode);


    li.addEventListener("click", function (e) { 
      // console.log(e.target.children.length)
      if (e.target.children.length == 1) {
        // console.log(e.target.innerText)
        let textbook = e.target.innerText.toLowerCase().split(' ').join('_')
        textbook = textbook.substring(1)
        console.log(textbook)
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

    if (data[i].children) {
      displayData(data[i].children, li);
    } 
  }
}

var root = document.getElementById("mySidenav");
displayData(data, root);

const tab_ids = ["home", "material", "completed_exams", "scheduale"];


if (document.cookie == "login=true") {
    showMain()
    showNav()
    switchTab("home")
    hideSignUp()
    hideLogging()
} else {
    startUpLogging();
}


function startUpLogging() {
  hideSignUp();
  hideMain();
  hideNav();
  showLogging();
}

function startUpSignUp() {
  showSignUp();
  hideMain();
  hideNav();
  hideLogging();
}

function signIn() {
  showMain();
  showNav();
  hideLogging();
  hideSignUp();
  switchTab("home");

  document.cookie = "login=true"
}

function signOut() {
  startUpLogging()
  document.cookie = "login=false"

}

function hideLogging() {
  $("#logging").hide();
}

function showLogging() {
  $("#logging").show();
}

function hideSignUp() {
  $("#sign_up_content").hide();
}

function showSignUp() {
  $("#sign_up_content").show();
}

function hideNav() {
  $("nav.navbar").hide();
}

function showNav() {
  $("nav.navbar").show();
}

function hideMain() {
  $("main").hide();
}

function showMain() {
  $("main").show();
}

function switchTab(tab_id) {
  activateTabNav(tab_id);
  showContent(tab_id);
}
function activateTabNav(tab_id) {
  tab_ids.forEach(id => {
    if (id == tab_id) {
      $("#" + id).addClass("active");
    } else {
      $("#" + id).removeClass("active");
    }
  });
}

function showContent(content_id) {
  tab_ids.forEach(id => {
    if (id == content_id) {
      $("#" + id + "_content").show();
    } else {
      $("#" + id + "_content").hide();
    }
  });
}



/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

//* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

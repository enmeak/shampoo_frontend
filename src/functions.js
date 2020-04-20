// all tabs options
const tab_ids = ["home", "material", "completed_exams", "scheduale"];

// validate password match at signup
$("#confirm_sign_up_password").on("focusout", function() {
  if ($("#sign_up_password").val() == $("#confirm_sign_up_password").val()) {
    $("#error_signup").hide();
  } else $("#error_signup").show();
});

// cookies
if (document.cookie == "login=true") {
  showMain();
  showNav();
  switchTab("home");
  hideSignUp();
  hideLogging();
} else {
  startUpLogging();
}

// startup log in page
function startUpLogging() {
  hideSignUp();
  hideMain();
  hideNav();
  showLogging();
}

// startup sign up page
function startUpSignUp() {
  showSignUp();
  hideMain();
  hideNav();
  hideLogging();
}

// sign in function
function signIn() {
  const user_name = $("#Login_Username").val();
  const password = $("#login_password").val();

  const url = `http://localhost:5000/users/signIn/${user_name}/${password}`;

  $.get(url, function(data, status) {
    if (data == true) {
      showMain();
      showNav();
      hideLogging();
      hideSignUp();
      switchTab("home");
      $("#error_login").hide();

      document.cookie = "login=true";
    } else $("#error_login").show();
  });
}

// sign up function
function signUp() {
  const user_name = $("#sign_up_Username").val();
  const password = $("#sign_up_password").val();
  const confirm_password = $("#confirm_sign_up_password").val();
  const team = $("#sign_up_team").val();
  const url = `http://localhost:5000/users/signUp/${user_name}/${password}/${team}`;
  const regexp = new RegExp("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}");
  console.log(
    user_name,
    password,
    confirm_password,
    team,
    regexp.test(password)
  );
  if (password == confirm_password && regexp.test(password)) {
    $.get(url);
    startUpLogging();
  }
}

// sign out function
function signOut() {
  startUpLogging();
  document.cookie = "login=false";
}

// hide log in pagge
function hideLogging() {
  $("#sign_in").hide();
}

// show log in form
function showLogging() {
  $("#sign_in").show();
}

// hide sign up form
function hideSignUp() {
  $("#sign_up").hide();
}

// show sign up form
function showSignUp() {
  $("#sign_up").show();
}

// hide navbar
function hideNav() {
  $("nav.navbar").hide();
}

// show navbar
function showNav() {
  $("nav.navbar").show();
}

// hide main content
function hideMain() {
  $("main").hide();
}

// show main content
function showMain() {
  $("main").show();
}

// function to switch tab
function switchTab(tab_id) {
  activateTabNav(tab_id);
  showContent(tab_id);
}

// function to highlight chosen tab
function activateTabNav(tab_id) {
  tab_ids.forEach(id => {
    if (id == tab_id) {
      $("#" + id).addClass("active");
    } else {
      $("#" + id).removeClass("active");
    }
  });
}

// function to show chosen content according to chosen tab
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


// load documents
$(document).ready(function(){
  $("#linux").click(function(){
      $("#pdf").load("/src/material.html", function(responseTxt, statusTxt, jqXHR){
          if(statusTxt == "success"){
              console.log("New content loaded successfully!");
          }
          if(statusTxt == "error"){
              console.log("Error: " + jqXHR.status + " " + jqXHR.statusText);
          }
      });
  });
});
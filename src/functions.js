const tab_ids = ["home", "material", "completed_exams", "scheduale"];

$("#confirm_sign_up_password").on("focusout", function() {
  if ($("#sign_up_password").val() == $("#confirm_sign_up_password").val()) {
    $("#error_signup").hide();
  } else
    $("#error_signup").show();
});

if (document.cookie == "login=true") {
  showMain();
  showNav();
  switchTab("home");
  hideSignUp();
  hideLogging();
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

function signUp() {
  const user_name = $("#sign_up_Username").val();
  const password = $("#sign_up_password").val();
  const confirm_password = $("#confirm_sign_up_password").val();
  const team = $("#sign_up_team").val();
  const url = `http://localhost:5000/users/signUp/${user_name}/${password}/${team}`;
  const regexp = new RegExp("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")
  console.log(user_name, password, confirm_password, team, regexp.test(password) );
  if (password == confirm_password && regexp.test(password)) {
    $.get(url);
    startUpLogging();
  }
}

function signOut() {
  startUpLogging();
  document.cookie = "login=false";
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

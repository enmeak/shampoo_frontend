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

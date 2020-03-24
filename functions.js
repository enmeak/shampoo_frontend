const tab_ids = ['home', 'material', 'completed_exams', 'scheduale', 'sign_up']

hideAll()

function hideAll() {
    $("nav.navbar").hide();
    $("main").hide()
    $("#logging").show()
}

function showAll() {
    $("nav.navbar").show();
    $("main").show()
    $("#logging").hide()
}

function switchTab(tab_id) {
    activateTabNav(tab_id)
    showContent(tab_id)
}
function activateTabNav(tab_id){
    tab_ids.forEach(id => {
        if (id == tab_id) {
            $("#"+id).addClass("active")
        } else {
            $("#"+id).removeClass("active")
        }
    });
}

function showContent(content_id) {
    tab_ids.forEach(id => {
        if (id == content_id) {
            $("#"+id+"_content").show()
        } else {
            $("#"+id+"_content").hide()
        }
    });
    
}

function signIn() {
    console.log('1')
    showAll()
    switchTab('home')
}

function moveToSignUp() {
    console.log('1')
    $("#logging").hide()
    $("main").show()
    showContent('sign_up')
    $("#sign_up_content").show()
}
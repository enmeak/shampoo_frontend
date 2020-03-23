const tab_ids = ['home', 'material', 'completed_exams', 'scheduale']


function showTab(tab_id){
    tab_ids.forEach(id => {
        if (id == tab_id) {
            document.getElementById(id+"_content").style.display = 'block'
            document.getElementById(id).classList.add('active')
        } else {
            document.getElementById(id+"_content").style.display = 'none'
            document.getElementById(id).classList.remove('active')
        }
    });
}
addQuestionTemplate()
function addQuestionTemplate() {
    const num = Number($('#questions_count').val()) + 1

    let asamble_question = `<div class="md-form mb-5"><i class="fas fa-question prefix grey-text"></i>
    <input type="text" id="form_${num}q" class="form-control validate">
    <label for="form_${num}q">Question ${num}</label>
    </div>

    <div style="padding-left: 20px; font-size: 10px !important;">
    <div class="md-form">
    <i class="fas fa-check prefix" style="color: #57c557"></i>
    <input type="email" id="form_${num}a" class="form-control validate">
    <label data-error="wrong" data-success="right" for="form_${num}a">Right Answer</label>
    </div>

    <div class="md-form">
    <i class="fas fa-times prefix grey-text"></i>
    <input type="email" id="form_${num}b" class="form-control validate">
    <label data-error="wrong" data-success="right" for="form_${num}b">Almost Right Answer</label>
    </div>

    <div class="md-form">
    <i class="fas fa-times prefix grey-text"></i>
    <input type="email" id="form_${num}c" class="form-control validate">
    <label data-error="wrong" data-success="right" for="form_${num}c">Smartass Answer</label>
    </div>

    <div class="md-form">
    <i class="fas fa-times prefix grey-text"></i>
    <input type="email" id="form_${num}d" class="form-control validate">
    <label data-error="wrong" data-success="right" for="form_${num}d">Who is Answer?</label>
    </div>
    </div>
    </div> `

    if (num > 1) {
        asamble_question = `<hr class="warning-color">` + asamble_question
    }
    

    $('#questions_container').append(asamble_question)
    $('#questions_count').val(num) 
}




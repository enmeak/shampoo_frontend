// display all avialable exams
function displayExams() {
  $("#exam_cards").html("");
  const url = `http://localhost:5000/exams`;
  $.get(url, function (data, status) {
    data.forEach((element) => {
      let card = `
      <div class="col-lg-3">
        <div class="card amber text-center z-depth-2" onclick="displayExamByID('${element._id}')">
          <div class="card-body hoverable ">
            <h3 class="text-uppercase font-weight-bold indigo-text mt-2 mb-3"><strong>${element.exam_name}</strong><i
                class="far fa-heart ml-3"></i>
            </h3>
          </div>
        </div>
      </div>`;
      $("#exam_cards").append(card);
    });
  });
}

// display exam by id
function displayExamByID(exam_id) {
  const url = `http://localhost:5000/exams/${exam_id}`;
  // $("#exam_container").empty()
  $.get(url, function (data, status) {
    let exam = "";
    data.questions.forEach((question) => {
      exam += `<p>${question["question"]}</p>
      <div>`;
      for (let index = 0; index < 4; index++) {
        let answer = question["answers"][index];
        exam += `<div class="custom-control custom-radio">
        <input type="radio" class="custom-control-input" id="${answer._id}"
        name="answer" value="${answer._id}">
        <label class="custom-control-label" for="${answer._id}">${answer["answer"]}</label>
        </div><br>`;
      }
      exam += `</div><hr class="info-color">`;
      $("#exam_title").text(data.exam_name);
    });
    exam += `<!--Footer-->
    <div class="modal-footer justify-content-center" id="submit_exam_button">
      <input type="submit" class="btn btn-outline-info waves-effect" value='Submit'>
    </div>`;

    $("#exam_container").html(exam);
    $("#exam_modal").modal("toggle");
  });
}

// add questionTemplate for creating a new exam.
addQuestionTemplate();
function addQuestionTemplate() {
  const num = Number($("#questions_count").val()) + 1;
  let asamble_question = `<div class="md-form mb-5"><i class="fas fa-question prefix grey-text"></i>
    <input required type="text" id="form_${num}q" name="question" class="form-control">
    <small style="color: red; display: none">Please provide a valid question</small>
    <label for="form_${num}q">Question ${num}</label>
    <div class="invalid-feedback">
        Please fill out the question.
    </div>
    <div style="padding-left: 20px; font-size: 10px !important;">
    <div class="md-form">
    <i class="fas fa-check prefix grey-text"></i>
    <input required type="text" id="form_${num}a" name="right_answer" class="form-control">
    <label for="form_${num}a">Right Answer</label>
    <div class="invalid-feedback">
        Please fill out right answer.
    </div>
    </div>

    <div class="md-form">
    <i class="fas fa-times prefix grey-text"></i>
    <input required type="text" id="form_${num}b" name="answer_a" class="form-control">
    <label for="form_${num}b">Almost Right Answer</label>
    <div class="invalid-feedback">
        Please fill out answer.
    </div>
    </div>

    <div class="md-form">
    <i class="fas fa-times prefix grey-text"></i>
    <input required type="text" id="form_${num}c" name="answer_b" class="form-control">
    <label for="form_${num}c">Smartass Answer</label>
    <div class="invalid-feedback">
        Please fill out answer.
    </div>
    </div>

    <div class="md-form">
    <i class="fas fa-times prefix grey-text"></i>
    <input type="text" id="form_${num}d" name="answer_c" class="form-control" required>
    <label for="form_${num}d">Who is Answer?</label>
    <div class="invalid-feedback">
        Please fill out answer.
    </div>
    </div>
    </div>
    </div> `;

  let submit_button = `<!--Footer-->
    <div class="modal-footer justify-content-center" id="submit_exam_button">
      <input type="submit" class="btn btn-outline-info waves-effect" value='Submit'>
    </div>`;

  let add_question_button = `<button id="add_question_button" class="btn btn-info btn-block" onclick="addQuestionTemplate()">Add Qusestion <i class="fas fa-plus-square fa-lg"></i></button>
  `;
  if (num > 1) {
    asamble_question = `<hr class="info-color">` + asamble_question;
  }
  $("#add_question_button").remove();
  $("#submit_exam_button").remove();
  $("#questions_container").append(asamble_question);
  $("#questions_count").val(num);
  $("#questions_container").append(add_question_button);
  $("#questions_container").append(submit_button);
}

//  trigger api to add exam on form submit
(function () {
  "use strict";
  window.addEventListener(
    "load",
    function () {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName("needs-validation");
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            event.preventDefault();

            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            } else {
              const exam_form = $("#questions_container");
              const values = $(exam_form).serializeArray();
              const exam_name = values[0].value;
              let questions = [];

              for (let i = 1; i < values.length - 3; i++) {
                let question = {
                  question: values[i].value,
                  answers: [],
                };
                for (let j = 0; j < 4; j++) {
                  i += 1;
                  let right = false;
                  if (j == 0) {
                    right = true;
                  }
                  let answer = {
                    answer: values[i].value,
                    right: right,
                  };
                  question.answers.push(answer);
                }
                questions.push(question);
              }
              const exam = {
                exam_name: exam_name,
                team: "Merkaz Zayad",
                questions: questions,
              };

              $.post("http://localhost:5000/exams/add_exam", exam, function (
                data,
                status
              ) {
                if (status == "success") {
                  displayExams();
                  $("#create_exam_modal").modal("toggle");
                }
              });
            }
            // event.preventDefault();
            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    false
  );
})();

// TODO: function to submit
(function () {
  "use strict";
  window.addEventListener("load", function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    let forms = document.getElementsByClassName("exam_validation");
    // Loop over them and prevent submission
    // var validation = Array.prototype.filter.call(forms, function (form) {
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        const exam_form = $("#exam_container");
        const values = $(exam_form).serializeArray();
        console.log(exam_form[0][2])
        console.log(exam_form[0].getElementsByTagName("P")[0].outerText)
        // const exam_name = values[0].value;
        // console.log(exam_name)
        let answers = [];
      });
    });
  });
})();

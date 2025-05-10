 const quizData = [
  {
    question: "Which of the following is NOT a JavaScript data type?",
    a: "String",
    b: "Boolean",
    c: "Float",
    d: "Undefined",
    correct: "c"
  },
  {
    question: "What will be the output of: typeof null?",
    a: "object",
    b: "null",
    c: "undefined",
    d: "number",
    correct: "a"
  },
  {
    question: "What does the '===' operator do in JavaScript?",
    a: "Compares only values",
    b: "Compares only types",
    c: "Compares values and types",
    d: "Assigns a value",
    correct: "c"
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    a: "<style>",
    b: "<link>",
    c: "<script>",
    d: "<head>",
    correct: "a"
  },
  {
    question: "Which property is used to change the background color in CSS?",
    a: "bgcolor",
    b: "background-color",
    c: "color",
    d: "bgcolor-color",
    correct: "b"
  },
  {
    question: "Which of the following is the correct syntax to link an external JavaScript file?",
    a: "<script src='file.js'>",
    b: "<script href='file.js'>",
    c: "<link rel='script' href='file.js'>",
    d: "<javascript src='file.js'>",
    correct: "a"
  },
  {
    question: "What is the correct HTML element to define the title of a webpage?",
    a: "<head>",
    b: "<title>",
    c: "<meta>",
    d: "<header>",
    correct: "b"
  },
  {
    question: "Which CSS selector is used to select an element with a specific class?",
    a: "#class-name",
    b: ".class-name",
    c: "class-name",
    d: "class",
    correct: "b"
  },
  {
    question: "In CSS, which property is used to change the text color?",
    a: "color",
    b: "text-color",
    c: "font-color",
    d: "text-decoration",
    correct: "a"
  },
  {
    question: "How do you add a comment in JavaScript?",
    a: "/* comment */",
    b: "// comment",
    c: "<!-- comment -->",
    d: "# comment",
    correct: "b"
  }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

function loadQuiz() {
  const current = quizData[currentQuestion];
  document.getElementById("question").innerText = current.question;
  document.getElementById("a_text").innerText = current.a;
  document.getElementById("b_text").innerText = current.b;
  document.getElementById("c_text").innerText = current.c;
  document.getElementById("d_text").innerText = current.d;

  document.querySelectorAll('input[name="answer"]').forEach(el => el.checked = false);
}

function getSelected() {
  let answer;
  document.querySelectorAll('input[name="answer"]').forEach(el => {
    if (el.checked) answer = el.value;
  });
  return answer;
}

function submitAnswer() {
  const selected = getSelected();
  if (!selected) {
    alert("Please select an answer.");
    return;
  }

  const current = quizData[currentQuestion];
  userAnswers.push({ question: current.question, selected, correct: current.correct });

  if (selected === current.correct) {
    score++;
  }

  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuiz();
  } else {
    showResult();
  }
}

function showResult() {
  // Hide quiz box and show result box
  document.getElementById("quiz-box").classList.add("hidden");
  document.getElementById("result-box").classList.remove("hidden");

  // Display score
  document.getElementById("score").innerText = `Your Score: ${score} out of ${quizData.length}`;

  // Display review
  const review = document.getElementById("review");
  review.innerHTML = "<h3>Review:</h3>";
  userAnswers.forEach((ans, index) => {
    const isCorrect = ans.selected === ans.correct;
    review.innerHTML += `
      <p>
        Q${index + 1}: ${ans.question}<br>
        Your Answer: <b>${ans.selected}</b> | Correct: <b>${ans.correct}</b>
        <span style="color: ${isCorrect ? 'green' : 'red'};">
          (${isCorrect ? "Correct" : "Wrong"})
        </span>
      </p>
    `;
  });
}

// Start quiz by loading the first question
loadQuiz();

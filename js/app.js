// Quiz flow: shows one screen at a time and walks the learner through 15 questions.

// Chosen option for each question. Position 0 is question 1.
var userAnswers = [];

// Which question is on screen. 0 means the first question.
var currentQuestionIndex = 0;

// Hide all three screens, then show the one named screenId.
function showScreen(screenId) {
  document.getElementById("start-screen").hidden = true;
  document.getElementById("quiz-screen").hidden = true;
  document.getElementById("results-screen").hidden = true;
  document.getElementById(screenId).hidden = false;
}

// Start over from question 1 with an empty answer list.
function startQuiz() {
  userAnswers = [];
  currentQuestionIndex = 0;
  showScreen("quiz-screen");
  showQuestion();
}

// Put the current question, its skill, and its four answers on the quiz screen.
function showQuestion() {
  var question = QUESTIONS[currentQuestionIndex];
  var questionNumber = currentQuestionIndex + 1;

  document.getElementById("progress-text").textContent = "Question " + questionNumber + " of " + QUESTIONS.length;
  document.getElementById("skill-name").textContent = question.skill;

  showReadingText(question);
  document.getElementById("question-text").textContent = question.question;
  showOptions(question);

  // A new question has no answer yet, so Next stays off.
  document.getElementById("next-button").disabled = true;
}

// Show Maria's email only when the question is a reading question.
function showReadingText(question) {
  var readingBox = document.getElementById("reading-text");

  if (question.skill === "reading") {
    readingBox.hidden = false;
    readingBox.textContent = READING_TEXT;
  } else {
    readingBox.hidden = true;
    readingBox.textContent = "";
  }
}

// Replace the old answer buttons with the four options for this question.
function showOptions(question) {
  var optionsBox = document.getElementById("options");
  optionsBox.innerHTML = "";

  var optionIndex = 0;

  for (optionIndex = 0; optionIndex < question.options.length; optionIndex = optionIndex + 1) {
    var button = document.createElement("button");
    button.type = "button";
    button.textContent = question.options[optionIndex];
    // The button remembers its own option number, as text.
    button.setAttribute("data-index", optionIndex);
    button.onclick = onOptionClick;
    optionsBox.appendChild(button);
  }
}

// Read the option number from the clicked button, then save it.
function onOptionClick(event) {
  var chosenIndex = Number(event.currentTarget.getAttribute("data-index"));
  selectOption(chosenIndex);
}

// Save the choice, mark that button, and allow Next.
function selectOption(optionIndex) {
  userAnswers[currentQuestionIndex] = optionIndex;
  highlightSelectedOption(optionIndex);
  document.getElementById("next-button").disabled = false;
}

// Draw a box around the chosen answer and clear the other buttons.
function highlightSelectedOption(optionIndex) {
  var buttons = document.querySelectorAll("#options button");
  var index = 0;

  for (index = 0; index < buttons.length; index = index + 1) {
    if (index === optionIndex) {
      buttons[index].className = "selected";
    } else {
      buttons[index].className = "";
    }
  }
}

// Move to the next question. After question 15, show the results screen.
function goToNextQuestion() {
  var nextButton = document.getElementById("next-button");

  // A second click in a row should not skip a question.
  if (nextButton.disabled) {
    return;
  }

  // Ignore a click if this question has no answer yet.
  if (userAnswers[currentQuestionIndex] === undefined) {
    return;
  }

  // Turn Next off immediately, before the screen changes.
  nextButton.disabled = true;

  var lastIndex = QUESTIONS.length - 1;

  if (currentQuestionIndex === lastIndex) {
    showResults();
    return;
  }

  currentQuestionIndex = currentQuestionIndex + 1;
  showQuestion();
}

// Turn the saved answers into the results screen.
function showResults() {
  var result = calculateResults(QUESTIONS, userAnswers);
  showStatus(result);
  showSkillBars(result);
  showPractice(result);
  showScreen("results-screen");
}

// Show the status in large coloured text, plus one sentence of meaning.
function showStatus(result) {
  var statusText = document.getElementById("status-text");
  var meaning = document.getElementById("status-meaning");

  statusText.textContent = result.status;

  if (result.status === "Ready to book") {
    statusText.className = "ready";
    meaning.textContent = "Your vocabulary, grammar and reading are strong enough to book the exam.";
  } else if (result.status === "Almost there") {
    statusText.className = "almost";
    meaning.textContent = "You are close. Practise the weak spots below, then try the check again.";
  } else {
    statusText.className = "not-yet";
    meaning.textContent = "Keep practising. Book the exam after these skills are stronger.";
  }
}

// Draw one bar for vocabulary, grammar, and reading.
function showSkillBars(result) {
  var box = document.getElementById("skill-bars");
  box.innerHTML = "";

  var skills = [
    { name: "Vocabulary", score: result.skillScores.vocabulary },
    { name: "Grammar", score: result.skillScores.grammar },
    { name: "Reading", score: result.skillScores.reading }
  ];
  var index = 0;

  for (index = 0; index < skills.length; index = index + 1) {
    var skill = skills[index];
    var row = document.createElement("div");

    var label = document.createElement("p");
    label.textContent = skill.name + " " + skill.score + "%";
    row.appendChild(label);

    var track = document.createElement("div");
    track.className = "bar-track";

    var fill = document.createElement("div");
    fill.className = "bar-fill";
    // The bar grows in step with the percentage. 100 means the full track.
    fill.style.width = skill.score + "%";

    track.appendChild(fill);
    row.appendChild(track);
    box.appendChild(row);
  }
}

// List up to three weak spots and the matching practice tip.
function showPractice(result) {
  var box = document.getElementById("practice-list");
  box.innerHTML = "";

  if (result.weakAreas.length === 0) {
    var message = document.createElement("p");
    message.textContent = "Well done. You have no weak spots in this check.";
    box.appendChild(message);
    return;
  }

  var index = 0;

  for (index = 0; index < result.weakAreas.length; index = index + 1) {
    var area = result.weakAreas[index];
    var item = document.createElement("p");
    item.textContent = area + ": " + PRACTICE_TIPS[area];
    box.appendChild(item);
  }
}

// Connect Start, Next, and the restart button once, when the page is ready.
function setupApp() {
  document.getElementById("start-button").onclick = startQuiz;
  document.getElementById("next-button").onclick = goToNextQuestion;
  document.getElementById("start-over-button").onclick = startQuiz;
  document.getElementById("restart-button").onclick = startQuiz;
}

setupApp();

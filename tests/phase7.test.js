// Phase 7: five realistic learners, scored with the real question list.

// A wrong choice is any option that is not the correct one.
function wrongChoice(question) {
  if (question.correctIndex === 0) {
    return 1;
  }
  return 0;
}

// Build 15 answers. wrongIndexes lists the questions to get wrong.
// Counting starts at 0, so question 1 is index 0.
function answersExcept(wrongIndexes) {
  var answers = [];
  var index = 0;

  for (index = 0; index < QUESTIONS.length; index = index + 1) {
    var isWrong = false;
    var listIndex = 0;

    for (listIndex = 0; listIndex < wrongIndexes.length; listIndex = listIndex + 1) {
      if (wrongIndexes[listIndex] === index) {
        isWrong = true;
      }
    }

    if (isWrong) {
      answers.push(wrongChoice(QUESTIONS[index]));
    } else {
      answers.push(QUESTIONS[index].correctIndex);
    }
  }

  return answers;
}

function expectResult(label, result, status, vocabulary, grammar, reading, weakAreas) {
  assertEqual(result.status, status, label + " status");
  assertEqual(result.skillScores.vocabulary, vocabulary, label + " vocabulary");
  assertEqual(result.skillScores.grammar, grammar, label + " grammar");
  assertEqual(result.skillScores.reading, reading, label + " reading");
  assertEqual(result.weakAreas.length, weakAreas.length, label + " weak area count");

  var index = 0;
  for (index = 0; index < weakAreas.length; index = index + 1) {
    assertEqual(result.weakAreas[index], weakAreas[index], label + " weak area " + index);
  }
}

test("a strong learner is ready to book", function () {
  // Misses only the question-word item. 14 out of 15 is 93%.
  var answers = answersExcept([8]);
  var result = calculateResults(QUESTIONS, answers);

  expectResult("strong learner", result, "Ready to book", 100, 80, 100, ["question words"]);
});

test("a weak learner is not yet ready", function () {
  // Gets only the shopping question and the evening greeting right. 2 out of 15 is 13%.
  var answers = answersExcept([0, 1, 2, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
  var result = calculateResults(QUESTIONS, answers);

  expectResult("weak learner", result, "Not yet", 40, 0, 0, [
    "finding details",
    "articles (der/die/das)",
    "everyday words"
  ]);
});

test("a learner weak only in grammar is almost there", function () {
  // Vocabulary and reading are perfect. Four of the five grammar questions are wrong.
  var answers = answersExcept([6, 7, 8, 9]);
  var result = calculateResults(QUESTIONS, answers);

  expectResult("grammar-weak learner", result, "Almost there", 100, 20, 100, [
    "articles (der/die/das)",
    "verb conjugation",
    "word order"
  ]);
});

test("a learner weak only in reading is almost there", function () {
  // Vocabulary and grammar are perfect. Four of the five reading questions are wrong.
  var answers = answersExcept([11, 12, 13, 14]);
  var result = calculateResults(QUESTIONS, answers);

  expectResult("reading-weak learner", result, "Almost there", 100, 100, 20, [
    "finding details",
    "understanding the main idea"
  ]);
});

test("an average learner is almost there", function () {
  // Two misses in each skill. 9 out of 15 is 60%.
  var answers = answersExcept([0, 1, 5, 6, 10, 14]);
  var result = calculateResults(QUESTIONS, answers);

  expectResult("average learner", result, "Almost there", 60, 60, 60, [
    "everyday words",
    "numbers and time",
    "articles (der/die/das)"
  ]);
});

// Phase 3: check the scoring engine against known answer patterns.

// A wrong choice is any option index that is not the correct one.
function wrongIndex(question) {
  if (question.correctIndex === 0) {
    return 1;
  }
  return 0;
}

function answersAllCorrect(questions) {
  var answers = [];
  var index = 0;

  for (index = 0; index < questions.length; index = index + 1) {
    answers.push(questions[index].correctIndex);
  }

  return answers;
}

function answersAllWrong(questions) {
  var answers = [];
  var index = 0;

  for (index = 0; index < questions.length; index = index + 1) {
    answers.push(wrongIndex(questions[index]));
  }

  return answers;
}

// Vocabulary and reading are perfect. Only the first grammar question is correct.
function answersGrammarMostlyWrong(questions) {
  var answers = answersAllCorrect(questions);
  var index = 0;
  var grammarSeen = 0;

  for (index = 0; index < questions.length; index = index + 1) {
    if (questions[index].skill === "grammar") {
      grammarSeen = grammarSeen + 1;

      if (grammarSeen > 1) {
        answers[index] = wrongIndex(questions[index]);
      }
    }
  }

  return answers;
}

// The first correctCount answers are right. The rest are wrong.
function answersWithFirstCorrect(questions, correctCount) {
  var answers = [];
  var index = 0;

  for (index = 0; index < questions.length; index = index + 1) {
    if (index < correctCount) {
      answers.push(questions[index].correctIndex);
    } else {
      answers.push(wrongIndex(questions[index]));
    }
  }

  return answers;
}

test("all answers correct gives Ready to book", function () {
  var result = calculateResults(QUESTIONS, answersAllCorrect(QUESTIONS));

  assertEqual(result.overallScore, 100, "overall score should be 100");
  assertEqual(result.skillScores.vocabulary, 100, "vocabulary should be 100");
  assertEqual(result.skillScores.grammar, 100, "grammar should be 100");
  assertEqual(result.skillScores.reading, 100, "reading should be 100");
  assertEqual(result.status, "Ready to book", "status should be Ready to book");
  assertEqual(result.weakAreas.length, 0, "weakAreas should be empty");
});

test("all answers wrong gives Not yet and 3 weak areas", function () {
  var result = calculateResults(QUESTIONS, answersAllWrong(QUESTIONS));

  assertEqual(result.overallScore, 0, "overall score should be 0");
  assertEqual(result.status, "Not yet", "status should be Not yet");
  assertEqual(result.weakAreas.length, 3, "weakAreas should have 3 items");
  // finding details has 4 mistakes, then the two subtopics with 2 mistakes.
  assertEqual(result.weakAreas[0], "finding details", "the weakest subtopic should be first");
  assertEqual(result.weakAreas[1], "everyday words", "the next subtopic should follow mistake count");
  assertEqual(result.weakAreas[2], "articles (der/die/das)", "the third subtopic should follow mistake count");
});

test("a weak skill blocks Ready to book even when overall is 73%", function () {
  var result = calculateResults(QUESTIONS, answersGrammarMostlyWrong(QUESTIONS));

  assertEqual(result.skillScores.vocabulary, 100, "vocabulary should be 5 out of 5");
  assertEqual(result.skillScores.reading, 100, "reading should be 5 out of 5");
  assertEqual(result.skillScores.grammar, 20, "grammar should be 1 out of 5");
  assertEqual(result.overallScore, 73, "11 out of 15 should round to 73");
  assertEqual(result.status, "Almost there", "status should be Almost there, not Ready to book");
});

test("overall around 60% gives Almost there", function () {
  // 9 out of 15 is exactly 60%.
  var result = calculateResults(QUESTIONS, answersWithFirstCorrect(QUESTIONS, 9));

  assertEqual(result.overallScore, 60, "9 out of 15 should be 60");
  assertEqual(result.status, "Almost there", "60% overall should be Almost there");
});

test("weakAreas never has more than 3 items", function () {
  var result = calculateResults(QUESTIONS, answersAllWrong(QUESTIONS));

  assertTrue(result.weakAreas.length <= 3, "weakAreas should never have more than 3 items");
  assertEqual(result.weakAreas.length, 3, "all wrong answers should still keep the top 3");
});

test("every subtopic used in QUESTIONS has a tip", function () {
  var index = 0;

  for (index = 0; index < QUESTIONS.length; index = index + 1) {
    var subtopic = QUESTIONS[index].subtopic;
    var tip = PRACTICE_TIPS[subtopic];

    assertTrue(typeof tip === "string", subtopic + " should have a tip");
    assertTrue(tip.length > 0, subtopic + " tip should not be empty");
  }
});

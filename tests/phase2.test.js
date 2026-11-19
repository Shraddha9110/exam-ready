// Phase 2: check that the question data has the right shape.

var requiredFields = ["id", "skill", "subtopic", "question", "options", "correctIndex"];

test("there are exactly 15 questions", function () {
  assertEqual(QUESTIONS.length, 15, "QUESTIONS should have 15 items");
});

test("there are exactly 5 questions per skill", function () {
  var vocabularyCount = 0;
  var grammarCount = 0;
  var readingCount = 0;
  var index = 0;

  for (index = 0; index < QUESTIONS.length; index = index + 1) {
    if (QUESTIONS[index].skill === "vocabulary") {
      vocabularyCount = vocabularyCount + 1;
    }
    if (QUESTIONS[index].skill === "grammar") {
      grammarCount = grammarCount + 1;
    }
    if (QUESTIONS[index].skill === "reading") {
      readingCount = readingCount + 1;
    }
  }

  assertEqual(vocabularyCount, 5, "vocabulary should have 5 questions");
  assertEqual(grammarCount, 5, "grammar should have 5 questions");
  assertEqual(readingCount, 5, "reading should have 5 questions");
});

test("every question has all required fields", function () {
  var questionIndex = 0;

  for (questionIndex = 0; questionIndex < QUESTIONS.length; questionIndex = questionIndex + 1) {
    var question = QUESTIONS[questionIndex];
    var fieldIndex = 0;

    for (fieldIndex = 0; fieldIndex < requiredFields.length; fieldIndex = fieldIndex + 1) {
      var fieldName = requiredFields[fieldIndex];
      assertTrue(question[fieldName] !== undefined, "question " + questionIndex + " is missing " + fieldName);
      assertTrue(question[fieldName] !== null, "question " + questionIndex + " has an empty " + fieldName);
    }
  }
});

test("every question has exactly 4 options", function () {
  var index = 0;

  for (index = 0; index < QUESTIONS.length; index = index + 1) {
    var options = QUESTIONS[index].options;
    assertTrue(Array.isArray(options), "question " + index + " options should be a list");
    assertEqual(options.length, 4, "question " + index + " should have 4 options");
  }
});

test("every correctIndex is between 0 and 3", function () {
  var index = 0;

  for (index = 0; index < QUESTIONS.length; index = index + 1) {
    var correctIndex = QUESTIONS[index].correctIndex;
    var isAllowed = correctIndex === 0 || correctIndex === 1 || correctIndex === 2 || correctIndex === 3;
    assertTrue(isAllowed, "question " + index + " has a correctIndex outside 0 to 3");
  }
});

test("all ids are unique", function () {
  var seenIds = {};
  var index = 0;

  for (index = 0; index < QUESTIONS.length; index = index + 1) {
    var id = QUESTIONS[index].id;
    assertTrue(seenIds[id] !== true, "id " + id + " is used more than once");
    seenIds[id] = true;
  }
});

test("READING_TEXT exists and is not empty", function () {
  assertTrue(typeof READING_TEXT === "string", "READING_TEXT should be text");
  assertTrue(READING_TEXT.length > 0, "READING_TEXT should not be empty");
});

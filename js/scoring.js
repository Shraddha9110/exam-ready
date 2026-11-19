// Scoring engine: turns answers into a readiness result.

// A 15-question check is less reliable than the real exam,
// so the learner needs 70%. The real Goethe A1 pass mark is 60%.
const READY_OVERALL = 70;

// Every skill must reach 60%. A strong skill cannot hide a weak one.
const READY_MIN_PER_SKILL = 60;

// An overall score of 50% or more, but not yet "ready", means "Almost there".
const ALMOST_OVERALL = 50;

// One short practice tip for every subtopic used in the questions.
const PRACTICE_TIPS = {
  "everyday words": "Learn 5 household words a day, such as Stift, Tisch, and Tür.",
  "numbers and time": "Practise Viertel nach, Viertel vor, and halb with a drawn clock.",
  "family and people": "Draw your family and label each person: Mutter, Vater, Onkel, Bruder.",
  "food and shopping": "Write a shopping list and name the shop, such as Bäckerei or Apotheke.",
  "articles (der/die/das)": "Learn every new noun together with der, die, or das.",
  "verb conjugation": "Take one verb and write ich, du, er, wir, and sie with the right ending.",
  "word order": "In a statement, keep the verb in second place: Heute lerne ich Deutsch.",
  "question words": "Write 5 questions that start with wer, was, wo, wie, and wann.",
  "finding details": "Read a short email and underline the place, the time, and the person.",
  "understanding the main idea": "After a short text, say in one sentence what it is mainly about."
};

// Turn a count into a whole-number percentage.
// 11 out of 15 is 73.33, which rounds to 73.
function toWholePercent(correctCount, totalCount) {
  if (totalCount === 0) {
    return 0;
  }

  return Math.round((correctCount / totalCount) * 100);
}

// Move subtopics with more mistakes toward the front of the list.
// If two counts are equal, they stay in the order we first saw them.
function sortByMostMistakes(areas) {
  var passIndex = 0;

  for (passIndex = 0; passIndex < areas.length; passIndex = passIndex + 1) {
    var pairIndex = 0;

    for (pairIndex = 0; pairIndex < areas.length - 1; pairIndex = pairIndex + 1) {
      var left = areas[pairIndex];
      var right = areas[pairIndex + 1];

      if (right.mistakes > left.mistakes) {
        areas[pairIndex] = right;
        areas[pairIndex + 1] = left;
      }
    }
  }

  return areas;
}

// questions: the question list. userAnswers: the chosen option index for each question, in the same order.
function calculateResults(questions, userAnswers) {
  var skillCorrect = {
    vocabulary: 0,
    grammar: 0,
    reading: 0
  };
  var skillTotal = {
    vocabulary: 0,
    grammar: 0,
    reading: 0
  };
  var mistakeCounts = {};
  var index = 0;

  // Walk each question once. Count correct answers per skill, and mistakes per subtopic.
  for (index = 0; index < questions.length; index = index + 1) {
    var question = questions[index];
    var skill = question.skill;
    var subtopic = question.subtopic;
    var chosen = userAnswers[index];

    skillTotal[skill] = skillTotal[skill] + 1;

    if (chosen === question.correctIndex) {
      skillCorrect[skill] = skillCorrect[skill] + 1;
    } else {
      if (mistakeCounts[subtopic] === undefined) {
        mistakeCounts[subtopic] = 0;
      }
      mistakeCounts[subtopic] = mistakeCounts[subtopic] + 1;
    }
  }

  var vocabularyScore = toWholePercent(skillCorrect.vocabulary, skillTotal.vocabulary);
  var grammarScore = toWholePercent(skillCorrect.grammar, skillTotal.grammar);
  var readingScore = toWholePercent(skillCorrect.reading, skillTotal.reading);

  var totalCorrect = skillCorrect.vocabulary + skillCorrect.grammar + skillCorrect.reading;
  var totalQuestions = skillTotal.vocabulary + skillTotal.grammar + skillTotal.reading;
  var overallScore = toWholePercent(totalCorrect, totalQuestions);

  // Ready only when the overall score AND every skill are high enough.
  var everySkillIsReady = vocabularyScore >= READY_MIN_PER_SKILL &&
    grammarScore >= READY_MIN_PER_SKILL &&
    readingScore >= READY_MIN_PER_SKILL;

  var status = "Not yet";

  if (overallScore >= READY_OVERALL && everySkillIsReady) {
    status = "Ready to book";
  } else if (overallScore >= ALMOST_OVERALL) {
    status = "Almost there";
  }

  // List each weak subtopic once, in the order it first appears in the questions.
  var weakList = [];
  var seenSubtopics = {};
  var questionIndex = 0;

  for (questionIndex = 0; questionIndex < questions.length; questionIndex = questionIndex + 1) {
    var name = questions[questionIndex].subtopic;
    var mistakes = mistakeCounts[name];
    var alreadyAdded = seenSubtopics[name] === true;

    if (mistakes >= 1 && alreadyAdded === false) {
      weakList.push({
        subtopic: name,
        mistakes: mistakes
      });
      seenSubtopics[name] = true;
    }
  }

  sortByMostMistakes(weakList);

  // Keep at most 3 subtopic names.
  var weakAreas = [];
  var weakIndex = 0;
  var limit = weakList.length;

  if (limit > 3) {
    limit = 3;
  }

  for (weakIndex = 0; weakIndex < limit; weakIndex = weakIndex + 1) {
    weakAreas.push(weakList[weakIndex].subtopic);
  }

  return {
    skillScores: {
      vocabulary: vocabularyScore,
      grammar: grammarScore,
      reading: readingScore
    },
    overallScore: overallScore,
    status: status,
    weakAreas: weakAreas
  };
}

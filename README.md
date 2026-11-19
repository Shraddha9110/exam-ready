# Am I exam-ready?

A short German A1 check for Globio, a German learning company.

A learner who is thinking about the Goethe or ÖSD A1 exam can answer 15 questions and see whether they are ready to book, almost ready, or not yet. The page also names the two or three things to practise first.

This is a practice check. It is not the official exam, and it does not book the exam for anyone.

## The problem

Learners often ask, "Can I book the A1 exam now?" A full mock exam is long. This check is a small, honest signal: 15 questions, about 5 minutes, covering vocabulary, grammar, and reading. At the end the learner sees a clear status and a short practice list, instead of only a raw score.

## What the app does

1. The welcome page explains the check. The learner clicks Start.
2. One question appears at a time. There are four answers. Next stays off until an answer is chosen.
3. The five reading questions include a short email from Maria. Vocabulary and grammar questions do not.
4. After question 15, the results page shows:
   - a status in large text: green "Ready to book", amber "Almost there", or red "Not yet"
   - a bar and a percentage for vocabulary, grammar, and reading
   - up to three practice tips, or a short well-done message if nothing was weak
   - a reminder that the real exam also tests listening, writing, and speaking
5. "Take the check again", or "Start over" during the questions, begins again at question 1.

Open `index.html` in a browser. There is nothing to install.

## How "ready" is calculated, and why

The real Goethe A1 exam is passed at **60%**. This check uses a higher bar, because 15 questions are less reliable than the full exam. A lucky run on a short quiz should not send someone to book too early.

Three lines decide the status:

| Line | Number | What it means |
| --- | --- | --- |
| Ready overall | 70% | The learner needs 70% overall, 10 points above the real 60% pass mark. That gap is a safety buffer. |
| Ready per skill | 60% | Vocabulary, grammar, and reading must each reach 60%. A strong skill cannot hide a weak one. |
| Almost there | 50% | An overall score of 50% or more, when the learner is not yet "ready", means they are close. |

The status is chosen in this order:

- **Ready to book** only when the overall score is at least 70% **and** every skill is at least 60%.
- **Almost there** when that is not true, but the overall score is still at least 50%.
- **Not yet** when the overall score is under 50%.

Example: vocabulary 100%, reading 100%, grammar 20%. The overall score is 73%, which is above 70%, but grammar is under 60%. The status is **Almost there**, not "Ready to book".

Each question also belongs to a smaller topic, such as "articles (der/die/das)" or "finding details". The result lists up to three of those topics, the ones with the most mistakes first. Topics with no mistakes are left out. Each listed topic has one short practice tip, such as learning every new noun together with der, die, or das. The tips follow the weak topics, not a generic list.

Scores are whole-number percentages. 11 correct out of 15 is 73.33, which is shown as 73.

## Architecture

The app is plain HTML, CSS, and JavaScript. There is no framework, no library, and no build step. The JavaScript files are loaded with ordinary script tags, in this order: questions, then scoring, then the app. Nothing is imported or exported.

The work was built in eight phases. Each phase has a plain-language note in `PHASE_SUMMARIES.md` and a page in `preview/`.

| Phase | What it added |
| --- | --- |
| 1. Foundation | Folders, the three empty screens, and the test runner. |
| 2. Question data | The 15 questions and Maria's email. |
| 3. Scoring engine | The 70 / 60 / 50 rules, weak topics, and practice tips. |
| 4. Quiz flow | Start, one question at a time, Next, and the move to results. |
| 5. Results screen | Status, skill bars, practice list, and "Take the check again". |
| 6. Design | The phone-friendly layout and the teal colour. |
| 7. Edge cases | Double-click protection, Start over, and five full learner checks. |
| 8. README and deployment | This file, and publishing the project. |

What each file does:

- `index.html` — the welcome page, the question page, and the results page.
- `style.css` — colours, spacing, rounded cards, and the phone layout.
- `js/questions.js` — the 15 questions and the reading email.
- `js/scoring.js` — turns the answers into scores, a status, and up to three weak topics.
- `js/app.js` — shows the screens, saves each answer, and fills in the results.
- `tests/test-helpers.js` — the tiny pass/fail tool used by the automatic tests.
- `tests/test-runner.html` — opens the automatic tests in a browser.
- `tests/phase1.test.js`, `phase2.test.js`, `phase3.test.js`, `phase7.test.js` — automatic checks for the test tool, the questions, the scoring rules, and five learner patterns.
- `tests/phase4-checklist.md`, `phase5-checklist.md`, `phase6-checklist.md` — click-by-click checks for the screens and the design.
- `preview/` — one short page per phase, for reading what that phase added.
- `PROJECT_PLAN.md` — the rules and the phase list we followed.
- `PHASE_SUMMARIES.md` — a plain-language note for every phase.
- `README.md` — this guide.

## Testing

### Automatic tests

Open `tests/test-runner.html` in a browser.

You should see green PASS lines, then:

**19 passed, 0 failed**

That means the question list has the right shape, the scoring rules hold, and five realistic learners get the expected status.

### Manual checklists

Open these and follow the steps in a browser. Each step says what you should see.

- `tests/phase4-checklist.md` — start, progress, Next, the reading email, all 15 questions.
- `tests/phase5-checklist.md` — all correct, all wrong, a mixed run, a weak grammar run, and restart. The correct answers are listed in the file.
- `tests/phase6-checklist.md` — desktop layout, phone layout, tap size, readable text, and no sideways scrolling. For the phone, press Cmd+Option+I, then the phone icon.

## Limitations

- There are only 15 questions. That is why "ready" means 70%, not the real exam's 60%.
- The check covers vocabulary, grammar, and reading only. The real Goethe and ÖSD A1 exams also test listening, writing, and speaking.
- One reading email is not the whole reading exam.
- The result is guidance for practice. It is not an official pass or fail.
- Refreshing the page forgets the answers. Nothing is saved.

## Version 2 ideas

- Add short listening, writing, and speaking tasks so the check covers the whole exam.
- Use more than 15 questions, so the result is closer to the real exam and the safety buffer can be reconsidered.
- After each answer, show the correct one and a one-line reason.
- Let the learner go back one question.
- Keep the answers if the page is refreshed.
- Add a gentle timer, so the practice feels a little more like the exam.

## How to run

1. Download or clone this project.
2. Open `index.html` in Chrome, Safari, or Firefox. Double-clicking the file is enough.
3. Click Start and answer the 15 questions.

No terminal, no install, and no build step is required.

# Phase summaries

## Phase 4: Quiz flow

### What we built

The learner can now open the check, read one question at a time, and answer all 15. The app remembers each answer. At the end it leaves the questions and shows a simple holding page. The real score is not on that page yet.

### What each file does

- `index.html` — the three pages: welcome, questions, and the holding page that says results are coming.
- `js/app.js` — what happens when the learner clicks Start, chooses an answer, or clicks Next.
- `tests/phase4-checklist.md` — a click-by-click list to try the quiz by hand.
- `preview/phase4.html` — a short page that explains this phase and links to the app.
- `preview/index.html` — the list of phase previews, now including Phase 4.
- `PHASE_SUMMARIES.md` — this note, kept with the other phase notes.

### How it works

When the learner clicks Start, the welcome page hides and question 1 appears. Next stays switched off. When they tap an answer, that answer is saved, the chosen button is marked, and Next switches on. When they click Next, the app shows the next question and switches Next off again until they choose. Maria's email is shown only above the five reading questions. After they answer question 15 and click Next, the questions hide and the page says "Results coming soon".

### What you can see or try

Open `index.html`. You can start the check, answer every question, see the email on the reading questions, and reach the holding page at the end.

### How to test it

Open `tests/phase4-checklist.md` and follow the seven checks in the browser. It worked if each "Expected result" happens: Start opens question 1, the counter moves from "Question 1 of 15" to "Question 15 of 15", Next does nothing until an answer is chosen, the chosen answer is marked, the email appears only on questions 11 to 15, and the last Next shows "Results coming soon".

### Interview questions

**Why can't the learner press Next before choosing an answer?**
So nobody can skip a question. All 15 answers are saved before the results page.

**Why does the email appear only on some questions?**
Only the reading questions are about Maria's email. The vocabulary and grammar questions do not use it, so it stays hidden there.

## Phase 5: Results screen

### What we built

When the learner finishes all 15 questions, they now see how ready they are. The page names the result in large coloured text, shows a bar for each skill, and lists the two or three things to practise. They can start the whole check again from the beginning.

### What each file does

- `index.html` — the results page: the status, the score bars, the practice list, the exam note, and the button to start again.
- `js/app.js` — fills that page from the answers, and clears everything when the learner starts again.
- `tests/phase5-checklist.md` — five tries to do by hand, with the result you should see each time.
- `preview/phase5.html` — a short page that explains this phase and links to the app.
- `preview/index.html` — the list of phase previews, now including Phase 5.
- `PHASE_SUMMARIES.md` — this note, added after the Phase 4 note.

### How it works

After the learner answers question 15 and clicks Next, the app scores the answers. If they did very well in every skill, the page says "Ready to book" in green. If the overall result is in the middle, or one skill is weak, it says "Almost there" in amber. If the result is low, it says "Not yet" in red. Each skill gets a bar filled to match its percentage. The weak spots are listed with a short practice tip. If there are no weak spots, the page says well done instead. Clicking "Take the check again" throws away the old answers and shows question 1.

### What you can see or try

Open `index.html`, answer all 15 questions, and read the results. Try a perfect run, a run where every answer is wrong, and a run where grammar is the weak skill. Then click "Take the check again" and check that you are back at question 1.

### How to test it

Open `tests/phase5-checklist.md` and follow the five checks. It worked if the statuses match: all correct is "Ready to book", all wrong is "Not yet", the mixed run and the weak-grammar run are both "Almost there", and the restart button brings back "Question 1 of 15" with Next switched off.

### Interview questions

**Why can someone score well overall and still see "Almost there"?**
Because every skill has to be strong enough on its own. A perfect vocabulary score cannot hide weak grammar.

**What happens when the learner clicks "Take the check again"?**
The old answers are thrown away and the check starts again at question 1, as if they had just opened the page.

## Phase 6: Design

### What we built

The check now looks like a calm, simple page that is easy to use on a phone. The words sit on a white rounded card, the main buttons are a deep teal, and the chosen answer is clearly marked. The quiz still works the same way as before.

### What each file does

- `style.css` — the colours, spacing, rounded corners, and the phone layout.
- `index.html` — the temporary rough styling was removed so this new look is the only one.
- `tests/phase6-checklist.md` — five look-and-feel checks, including a phone-sized screen.
- `preview/phase6.html` — a short page that explains this phase and links to the app.
- `preview/index.html` — the list of phase previews, now including Phase 6.
- `PHASE_SUMMARIES.md` — this note, added after the Phase 5 note.

### How it works

When the learner opens the check on a phone, the card fills the screen with a little space at the edges. Start, each answer, Next, and Take the check again are tall buttons a thumb can hit. Before an answer is chosen, Next looks grey. After they tap an answer, that button turns light teal with a darker teal edge, and Next turns teal too. On a wider screen the same card stays in the middle with more empty space around it.

### What you can see or try

Open `index.html` on your computer, then again with the browser set to a phone width. Start the check, tap an answer, and look at a reading question and the results page.

### How to test it

Open `tests/phase6-checklist.md`. It worked if the card stays inside the screen on both a wide window and a phone, the buttons are easy to tap, the words are easy to read, and nothing sticks out the side or needs a sideways scroll.

### Interview questions

**Why are the answer buttons so tall?**
So a person on a phone can tap the right answer with a thumb, without hitting the one above or below it.

**Why is there one main colour?**
So the page feels calm and consistent. Green, amber, and red are kept only for the three result words, because those colours carry a meaning.

## Phase 7: Edge cases and integration

### What we built

The check was looked over for clumsy clicks and for starting again. A double-click on Next now moves only one question forward, and the learner can start over in the middle of the check. Five kinds of learner were also scored, and each one gets the result the rules promise.

### What each file does

- `js/app.js` — ignores a second click on Next, and the new Start over button uses the same fresh start as the results page.
- `index.html` — adds the Start over button on the question page.
- `style.css` — makes Start over look quieter than Next, so the two buttons are easy to tell apart.
- `tests/phase7.test.js` — scores a strong learner, a weak learner, a grammar-only weakness, a reading-only weakness, and an average learner.
- `tests/test-runner.html` — runs those new checks with the older ones.
- `preview/phase7.html` — a short page that explains this phase and links to the app and the tests.
- `preview/index.html` — the list of phase previews, now including Phase 7.
- `PHASE_SUMMARIES.md` — this note, added after the Phase 6 note.

### How it works

If the learner clicks Next twice very quickly, the first click is kept and the second is ignored, so they do not skip a question. If they click Start over halfway through, the answers so far are thrown away and question 1 appears again. The same thing happens from the results page with Take the check again. If they refresh the page, the welcome page comes back, because the answers live only on the screen until the page is closed.

### What you can see or try

Open `index.html`. Start the check, click Next twice, then click Start over. Finish a check and start again. You can also open `preview/phase7.html` for the same explanation.

### How to test it

Open `tests/test-runner.html`. It worked if the page ends with **19 passed, 0 failed**, including the five new learner lines: strong is Ready to book, weak is Not yet, and the grammar-only, reading-only, and average learners are Almost there.

### Interview questions

**Why does a fast double-click not skip a question?**
The Next button switches off as soon as it is used, so the second click has nothing to do.

**Why does refreshing the page go back to the welcome screen?**
The answers are not stored anywhere. Closing or reloading the page forgets them, which is what we want for a short practice check.

## Phase 8: README and deployment

### What we built

The project now has a guide that explains the check in plain language. Anyone can open the app, see how "ready" is decided, and run the tests. The same project can be published on GitHub so it is not only on this computer.

### What each file does

- `README.md` — the guide: the problem, the scoring rules, the files, the tests, the limits, and how to open the app.
- `preview/phase8.html` — a short page that points at the guide, the app, and the tests.
- `preview/index.html` — the list of phase previews, now including Phase 8.
- `PHASE_SUMMARIES.md` — this note, added after the Phase 7 note.

### How it works

A new person opens the guide first. It tells them to double-click `index.html`. The learner clicks Start, answers 15 questions, and sees a result. If that person wants to check the project, they open the test page and look for 19 passed, 0 failed. Publishing means copying the saved project onto GitHub, where other people can download it.

### What you can see or try

Open `README.md` and read it from top to bottom. Then open `index.html` and take the check. The same links are on `preview/phase8.html`.

### How to test it

Open `tests/test-runner.html`. It worked if the page still ends with **19 passed, 0 failed**. The guide did not change how answers are scored, so the same 19 checks should pass.

### Interview questions

**Why is "ready" 70% when the real exam is 60%?**
Fifteen questions are a smaller sample than the real exam. The extra 10 points are a safety buffer, so a lucky short quiz does not tell someone to book too early.

**How does someone run this project?**
They open `index.html` in a browser. There is nothing to install.

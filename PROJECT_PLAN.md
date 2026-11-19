PROJECT: "Am I exam-ready?" A German A1 exam readiness check for Globio (a German learning company). A learner answers 15 questions (vocabulary, grammar, reading), then sees their readiness per skill and the 2-3 things to practise before booking the Goethe/ÖSD A1 exam.

RULES (always follow):
1. Only plain HTML, CSS and JavaScript. No frameworks, no libraries, no npm, no build tools.
2. No JavaScript modules (no import/export). Load files with normal <script> tags.
3. Beginner-friendly code with short comments. I must be able to explain every line.
4. Build ONLY the current phase. Never build ahead.
5. Every phase ends with tests. Logic phases get automated tests in /tests, screen phases get a manual checklist in /tests.
6. After building, tell me exactly how to run the tests and what I should see.
7. After finishing every phase, give a "Phase Summary" in simple, plain English (no code, no technical jargon). Write it for a non-technical person. Include:
   - What we built in this phase (2-3 sentences)
   - What each new or changed file does (one simple line per file)
   - How it works, explained with a real-life example (for example, "when the learner clicks Next, the app saves their answer and shows the next question")
   - What I can now see or try in the app
   - How to test it and what result means it worked
   - One or two questions an interviewer might ask about this phase, with simple answers I can give
   Also save the same summary at the end of a file called PHASE_SUMMARIES.md, so all summaries stay in one place.
8. Every phase gets a preview page in /preview (preview/phaseN.html) that shows what that phase added. Link it from preview/index.html.

PHASES:
Phase 1: Foundation (folder structure, empty files, test runner)
Phase 2: Question data
Phase 3: Scoring engine
Phase 4: Quiz flow (screens)
Phase 5: Results screen
Phase 6: Design and mobile styling
Phase 7: Edge cases and full integration test
Phase 8: README and deployment

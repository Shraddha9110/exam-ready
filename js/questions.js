// Question data for the A1 exam readiness check.
// QUESTIONS is the full list of 15 questions.
// READING_TEXT is the short email the reading questions are about.

const READING_TEXT = "Liebe Anna,\n\nich wohne jetzt in Berlin. Meine Wohnung ist klein, aber hell. Sie liegt neben einem Park. Am Montag beginnt mein Deutschkurs. Der Kurs geht von neun bis zwölf Uhr. Am Samstag gehe ich mit Lea ins Kino. Der Film fängt um achtzehn Uhr an. Am Sonntag lerne ich zu Hause. Kannst du mich bald besuchen?\n\nLiebe Grüße\nMaria";

const QUESTIONS = [
  {
    id: 1,
    skill: "vocabulary",
    subtopic: "everyday words",
    question: "Welches Wort passt? Ich schreibe mit einem ___.",
    options: ["Apfel", "Stuhl", "Stift", "Hund"],
    correctIndex: 2
  },
  {
    id: 2,
    skill: "vocabulary",
    subtopic: "numbers and time",
    question: "Es ist Viertel nach sieben. Wie viel Uhr ist das?",
    options: ["7:45", "7:15", "6:15", "8:15"],
    correctIndex: 1
  },
  {
    id: 3,
    skill: "vocabulary",
    subtopic: "family and people",
    question: "Der Bruder meines Vaters ist mein ___.",
    options: ["Sohn", "Opa", "Cousin", "Onkel"],
    correctIndex: 3
  },
  {
    id: 4,
    skill: "vocabulary",
    subtopic: "food and shopping",
    question: "Wo kauft man Brot und Brötchen?",
    options: ["in der Bäckerei", "in der Apotheke", "im Kino", "im Schwimmbad"],
    correctIndex: 0
  },
  {
    id: 5,
    skill: "vocabulary",
    subtopic: "everyday words",
    question: "Was sagt man am Abend zur Begrüßung?",
    options: ["Guten Morgen", "Gute Nacht", "Guten Abend", "Auf Wiedersehen"],
    correctIndex: 2
  },
  {
    id: 6,
    skill: "grammar",
    subtopic: "articles (der/die/das)",
    question: "Welcher Artikel passt? ___ Haus ist groß.",
    options: ["Der", "Die", "Das", "Den"],
    correctIndex: 2
  },
  {
    id: 7,
    skill: "grammar",
    subtopic: "verb conjugation",
    question: "Welches Verb passt? Du ___ in München.",
    options: ["wohnst", "wohne", "wohnt", "wohnen"],
    correctIndex: 0
  },
  {
    id: 8,
    skill: "grammar",
    subtopic: "word order",
    question: "Welcher Satz ist richtig?",
    options: [
      "Heute ich lerne Deutsch.",
      "Heute lerne ich Deutsch.",
      "Ich heute lerne Deutsch.",
      "Lerne heute ich Deutsch."
    ],
    correctIndex: 1
  },
  {
    id: 9,
    skill: "grammar",
    subtopic: "question words",
    question: "Welches Fragewort passt? ___ wohnst du?",
    options: ["Wer", "Was", "Wie", "Wo"],
    correctIndex: 3
  },
  {
    id: 10,
    skill: "grammar",
    subtopic: "articles (der/die/das)",
    question: "Welcher Artikel passt? ___ Lampe ist neu.",
    options: ["Der", "Die", "Das", "Den"],
    correctIndex: 1
  },
  {
    id: 11,
    skill: "reading",
    subtopic: "finding details",
    question: "Wo wohnt Maria jetzt?",
    options: ["in Berlin", "in Hamburg", "in München", "in Köln"],
    correctIndex: 0
  },
  {
    id: 12,
    skill: "reading",
    subtopic: "finding details",
    question: "Von wann bis wann geht der Deutschkurs?",
    options: [
      "von acht bis zehn Uhr",
      "von zwölf bis achtzehn Uhr",
      "von neun bis zwölf Uhr",
      "am Samstagabend"
    ],
    correctIndex: 2
  },
  {
    id: 13,
    skill: "reading",
    subtopic: "finding details",
    question: "Mit wem geht Maria ins Kino?",
    options: ["mit Anna", "mit Lea", "mit ihrem Bruder", "allein"],
    correctIndex: 1
  },
  {
    id: 14,
    skill: "reading",
    subtopic: "finding details",
    question: "Was macht Maria am Sonntag?",
    options: [
      "Sie geht ins Kino.",
      "Sie beginnt den Deutschkurs.",
      "Sie besucht Anna.",
      "Sie lernt zu Hause."
    ],
    correctIndex: 3
  },
  {
    id: 15,
    skill: "reading",
    subtopic: "understanding the main idea",
    question: "Worum geht es in der E-Mail?",
    options: [
      "Maria bestellt ein Kinoticket.",
      "Maria erzählt Anna von ihrem Alltag in Berlin.",
      "Anna sucht eine Wohnung.",
      "Lea schreibt über einen Film."
    ],
    correctIndex: 1
  }
];

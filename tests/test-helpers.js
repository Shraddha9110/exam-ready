// Tiny test tool. Each test prints a green PASS or red FAIL line.
// At the end of the page it prints a summary like "1 passed, 0 failed".

var passedCount = 0;
var failedCount = 0;

// Run one test. The name is what you see on the page.
// If fn throws an error, the test failed.
function test(name, fn) {
  try {
    fn();
    passedCount = passedCount + 1;
    writeLine("PASS: " + name, "green");
  } catch (error) {
    failedCount = failedCount + 1;
    writeLine("FAIL: " + name + " — " + error.message, "red");
  }
}

// Fail the test when two values are not exactly the same.
function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(message);
  }
}

// Fail the test when the condition is not true.
function assertTrue(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

// Add one coloured line of text to the page.
function writeLine(text, color) {
  var line = document.createElement("p");
  line.textContent = text;
  line.style.color = color;
  document.body.appendChild(line);
}

// Print the summary after every test file has finished.
window.addEventListener("load", function () {
  writeLine(passedCount + " passed, " + failedCount + " failed", "black");
});

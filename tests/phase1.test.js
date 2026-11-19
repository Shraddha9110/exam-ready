// Phase 1: confirm the test tool itself works.

test("the test tool can pass a simple check", function () {
  assertEqual(1 + 1, 2, "1 + 1 should equal 2");
  assertTrue(true, "true should stay true");
});

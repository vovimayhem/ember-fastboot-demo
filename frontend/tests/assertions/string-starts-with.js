export default function stringStartsWith(context, stringToTest, expectedStringStart, message) {
  message = message || `"${stringToTest}" should start with "${expectedStringStart}"`;
  let actual = stringToTest;
  let expected = expectedStringStart;
  let result = !!actual.startsWith(expected);

  // use this.pushResult to add the assertion.
  // see: https://api.qunitjs.com/pushResult/ for more information
  this.pushResult({ result, actual, expected, message });
}

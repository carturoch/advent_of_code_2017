const app = require("./high-entropy-passphrases");
const uniqueWords = app.uniqueWords;
const isValidPassphrase = app.isValidPassphrase;
const areAnagrams = app.areAnagrams;

describe("high-entropy-passphrase", () => {
  describe("uniqueWords", () => {
    test("return empty array when get empty sentence", () => {
      let sen = "";
      expect(uniqueWords(sen)).toEqual([]);
    });
    test("return the same word when single one is given", () => {
      let sen = "abc";
      expect(uniqueWords(sen)).toEqual([sen]);
    });
    test("return unique words", () => {
      let sen = "abc abc bb bb zx";
      expect(uniqueWords(sen)).toEqual(["abc", "bb", "zx"]);
    });
    test("return unique words even with irregular spacing", () => {
      let sen = "abc   abc       bb   bb zx";
      expect(uniqueWords(sen)).toEqual(["abc", "bb", "zx"]);
    });
  });
  describe("isValidPassphrase", () => {
    test("is false when sentence has duplicated words", () => {
      expect(isValidPassphrase("abc abc xyz")).toBe(false);
    });
    test("is false when sentence is empty", () => {
      expect(isValidPassphrase("")).toBe(false);
    });
    test("is true when sentence has no duplicated words", () => {
      expect(isValidPassphrase("abc xkd lmp")).toBe(true);
    });
    test("is true when sentence has no duplicated words with irregular spacing", () => {
      expect(isValidPassphrase("abc    xkd lmp  ")).toBe(true);
    });
  });
  describe("areAnagrams", () => {
    test("same words are anagrams", () => {
      expect(areAnagrams("aaa", "aaa")).toBe(true);
    });
    test("empty strings are anagrams", () => {
      expect(areAnagrams("", "")).toBe(true);
    });
    test("different lettered words are not anagrams", () => {
      expect(areAnagrams("abc", "cbd")).toBe(false);
      expect(areAnagrams("abc", "xyz")).toBe(false);
      expect(areAnagrams("abc", "abx")).toBe(false);
    });
    test("anagrams have equal length", () => {
      expect(areAnagrams("aaa", "aaaa")).toBe(false);
    });
    test("anagrams have same letters in any order", () => {
      expect(areAnagrams("abc", "cab")).toBe(true);
      expect(areAnagrams("aabb", "baba")).toBe(true);
    });
  });
});

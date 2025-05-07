import { romajiToHiragana } from "./config/romajiMappings";

/**
 * Converts romaji (Latin alphabet) to hiragana
 * @param romaji - The romaji string to convert
 * @returns Hiragana string
 */
export function romajiToJapanese(romaji: string): string {
  if (!romaji) return "";

  const lowerRomaji = romaji.toLowerCase();
  let result = "";
  let i = 0;

  while (i < lowerRomaji.length) {
    // Check for double consonants (small tsu)
    if (
      i < lowerRomaji.length - 1 &&
      lowerRomaji[i] === lowerRomaji[i + 1] &&
      "bcdfghjklmpqrstvwxyz".includes(lowerRomaji[i])
    ) {
      result += "っ";
      i++;
      continue;
    }

    // Try 3 character sequences
    if (i < lowerRomaji.length - 2) {
      const threeChars = lowerRomaji.substring(i, i + 3);
      if (romajiToHiragana[threeChars]) {
        result += romajiToHiragana[threeChars];
        i += 3;
        continue;
      }
    }

    // Try 2 character sequences
    if (i < lowerRomaji.length - 1) {
      const twoChars = lowerRomaji.substring(i, i + 2);
      // Special handling for 'wo' particle
      if (twoChars === "wo") {
        result += "を";
        i += 2;
        continue;
      }
      if (romajiToHiragana[twoChars]) {
        result += romajiToHiragana[twoChars];
        i += 2;
        continue;
      }
    }

    // Try single character
    if (romajiToHiragana[lowerRomaji[i]]) {
      result += romajiToHiragana[lowerRomaji[i]];
      i++;
      continue;
    }

    // If no match is found, just add the character as is
    result += lowerRomaji[i];
    i++;
  }

  // Handle long vowels
  result = result
    .replace(/あー/g, "ああ")
    .replace(/いー/g, "いい")
    .replace(/うー/g, "うう")
    .replace(/えー/g, "ええ")
    .replace(/おー/g, "おお");

  return result;
}

/**
 * Determines if a string contains only romaji characters
 * @param text - The string to check
 * @returns True if the string is only romaji
 */
export function isRomaji(text: string): boolean {
  // A simple check for romaji - contains only Latin alphabet and basic punctuation
  return /^[a-zA-Z0-9\s.,;:!?-]*$/.test(text);
}

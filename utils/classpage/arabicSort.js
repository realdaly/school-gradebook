export default function arabicSort(students){
    const arabicAlphabet = [
        "ا", "أ", "إ", "آ", "ب", "ت", "ث", "ج", "ح", "خ",
        "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ",
        "ع", "غ", "ف", "ق", "ك", "ل", "م", "ن", "ه", "و", "ؤ", "ي", "ئ"
    ];

    // Remove non-Arabic characters
    const normalize = (str) => str.replace(/[^ء-ي]/g, "");
    const indexOfChar = (char) => arabicAlphabet.indexOf(char) + 1 || 0;

    return students.sort((a, b) => {
        const nameA = normalize(a.name);
        const nameB = normalize(b.name);

        for (let i = 0; i < Math.max(nameA.length, nameB.length); i++) {
            const charA = nameA[i] || ""; // Fallback to empty string if no character
            const charB = nameB[i] || ""; // Fallback to empty string if no character

            const charAIndex = indexOfChar(charA);
            const charBIndex = indexOfChar(charB);

            if (charAIndex !== charBIndex) {
                return charAIndex - charBIndex;
            }
        }

        return 0;
    });
};
function reverseAlphabetWithNumber(str) {
    let letters = '';
    let numbers = '';

    // Pisahkan huruf dan angka
    for (const char of str) {
        if (char >= 'A' && char <= 'Z') {
            letters += char;
        } else if (char >= '0' && char <= '9') {
            numbers += char;
        }
    }

    // Balikkan huruf
    let reversedLetters = '';
    for (let i = letters.length - 1; i >= 0; i--) {
        reversedLetters += letters[i];
    }

    // Gabungkan huruf yang dibalik dengan angka
    return reversedLetters + numbers;
}

const input = "NEGIE1";
const result = reverseAlphabetWithNumber(input);
console.log(result);

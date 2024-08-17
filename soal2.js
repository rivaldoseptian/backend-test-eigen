function longest(sentence) {
    // Pisahkan kalimat menjadi array kata-kata
    const words = sentence.split(' ');

    // Temukan kata terpanjang
    let longestWord = '';
    for (const word of words) {
        if (word.length > longestWord.length) {
            longestWord = word;
        }
    }

    // Output kata terpanjang dan panjangnya
    return `${longestWord}: ${longestWord.length} character`;
}

const sentence = "Saya sangat senang mengerjakan soal algoritma";
const result = longest(sentence);
console.log(result);

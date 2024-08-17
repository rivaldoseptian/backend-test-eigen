function countOccurrences(INPUT, QUERY) {
    // Buat objek untuk menyimpan frekuensi kata dalam INPUT
    const frequencyMap = {};

    // Hitung frekuensi setiap kata dalam INPUT
    for (const word of INPUT) {
        if (frequencyMap[word]) {
            frequencyMap[word]++;
        } else {
            frequencyMap[word] = 1;
        }
    }

    // Hitung berapa kali setiap kata dalam QUERY muncul di INPUT
    const result = QUERY.map(word => frequencyMap[word] || 0);

    return result;
}

// Contoh penggunaan
const INPUT = ['xc', 'dz', 'bbb', 'dz'];
const QUERY = ['bbb', 'ac', 'dz'];
const result = countOccurrences(INPUT, QUERY);
console.log(result);

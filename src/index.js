const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

/**
 * Main task function.
 * @param   expr    {String}    - Morse code coed by `10` (.) and `11` (-).
 * @return          {String}    - decoded string.
 */
function decode(expr, verboseLvl = 1) {

    // Local copy of source Array of bits.
    let localSource = expr;

    // Array for parsed sequences from source string.
    // One sequence - one coded regular symbol.
    const symbolsBinLongCodes = Array();

    // Array for parsed sequences from source string.
    // One sequence - one coded regular symbol, without pad symbols at start.
    let symbolsBinShortCodes = Array();

    // Temporal Array for other calculations
    let tmpArr = Array();

    // Write source arg to log in debug reason
    if (verboseLvl !== 0) console.log("\nSource string:", expr);

    // Get into symbolsBinLongCodes Arrays elements from localSource by Array with 8 elements.
    while(localSource.length !== 0) {
        symbolsBinLongCodes.push(localSource.slice(0, 10));
        localSource = localSource.slice(10);
    }

    if (verboseLvl === 2) console.log("Parsed in Array of String(10):", symbolsBinLongCodes);

    // Cut all pad symbols (first Zero's) in all binary Morse codes
    symbolsBinShortCodes = symbolsBinLongCodes.map((element) =>
       (element.indexOf('*') === -1) ? element.slice(element.indexOf('1')) : element.slice(-2));

    if (verboseLvl === 2) console.log("Array of cutted strings:", symbolsBinShortCodes);

    // Parse into pairs
    tmpArr = symbolsBinShortCodes.map((element) => {
        let tmpElement = []
        while(element.length !== 0) {
            tmpElement.push(element.slice(0, 2));
            element = element.slice(2);
        }
        return tmpElement;
    });

    if (verboseLvl === 2) console.log("Array of Array with String(2):", tmpArr);

    // Convert pairs of bits to dots and dashes and space
    tmpArr = tmpArr.map((element) => element.map((bitPair) => bitPair !== '**'
      ? (bitPair === '10' ? '.' : '-')
      : ' '));

    if (verboseLvl === 2) console.log("Array of Array with String(1):", tmpArr);

    // Convert inner Arrays with dot and dash sequences in string
    tmpArr = tmpArr.map((element) => element.join(''));

    if (verboseLvl === 2) console.log("Array of Strings - dots and dashes sequences:", tmpArr);

    // Convert dots and dashes sequences into human readable symbols
    tmpArr = tmpArr.map((element) => element !== ' ' ? MORSE_TABLE[element] : ' ');

    const result = tmpArr.join('');

    if (verboseLvl !== 0) console.log("Result:", result, '\n');

    return result;
}

module.exports = {
    decode
}

const testArr = ["00101010100000000010001011101000101110100000111111**********00001011110000111111000010111000101110100000111010"];

testArr.forEach((element) => {
    console.log("Result:", decode(element, 2));
});

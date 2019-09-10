function stringManipulation(word){
    if (word.charAt(0).match(/[aiueo]/)){
        console.log(word);
    }
    else {
        var kata = word.slice(1,word.length).concat('nyo');
        console.log(kata);
    }
}
stringManipulation('ayam');
stringManipulation('bebek');
//console.log(stringManipulation('ayam'));
//console.log(stringManipulation('bebek'));
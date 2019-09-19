function stringManipulation(word){
    var vokal=['a','i','u','e','o'];
    var konsonan = true;
    var i = 0;
    var hasil = word;
    while (i<=4 && konsonan){
        if(word.charAt(0)==vokal[i]){
            konsonan = false;
            //console.log(word);
            return word;
        }
        else{
            i++;
        }
        }
    if(konsonan){
        hasil= word.slice(1)+word.charAt(0) + "nyo";
        //console.log(hasil);
        return hasil;
    }
}

function sentencesManipulation(sentence){
    var arrKalimat = sentence.split(" ");
    for (var i=0; i<arrKalimat.length; i++){
        arrKalimat[i]=stringManipulation(arrKalimat[i]);
    }
    var kalimat = arrKalimat.toString().replace(/,/g, " ");
    //console.log(kalimat);
    return kalimat;
}
//sentencesManipulation('ibu pergi ke pasar bersama aku');

function readLine(line){
    if (line.toLowerCase().match('bye')!=null){
        rl.close();
    }
    console.log('hasil konversi = ' +sentencesManipulation(line));
    rl.prompt();
}

var readline = require('readline');
process.stdin.setEncoding('utf8');
var rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout,
    prompt : 'Tulis Kalimatmu Disini > '
});
rl.on('line', readLine);
rl.on('close', process.exit);
rl.prompt();

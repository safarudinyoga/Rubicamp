function weirdMultiply(sentence){
    var strAngka = sentence.toString();
    var hasil=1;
    if(strAngka.length==1){
        hasil = parseInt(strAngka);
        return hasil;
        //console.log(hasil);
    }
    else {
        for (var i=0; i<strAngka.length; i++){
            hasil *= parseInt(strAngka.charAt(i));
        }
        return weirdMultiply(hasil);
        }
}

console.log(weirdMultiply(39));
console.log(weirdMultiply(999));
console.log(weirdMultiply(3));

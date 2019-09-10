function indexPrime(param1){
    var i = 0;
    var angka = 1;
    while (i<param1){
        angka++;
        var prime = true ;
        for (var n=2; n<=Math.sqrt(angka);n++){
            if (angka%n==0){
                prime = false;
            }
        }
        if (prime) i++;
    }
    return angka;
}

console.log(indexPrime(4));
console.log(indexPrime(500));
console.log(indexPrime(37786));


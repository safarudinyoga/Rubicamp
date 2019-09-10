function stringManipulation(word){
    var vokal=['a','i','u','e','o'];
    var konsonan = true;
    var i = 0;
    var hasil = word;
    while (i<=4 && konsonan){
        if(word.charAt(0)==vokal[i]){
            konsonan = false;
            console.log(word);
        }
        else{
            i++;
        }
        }
    if(konsonan){
        hasil= word.slice(1)+word.charAt(0) + "nyo";
        console.log(hasil);
    }
}
stringManipulation('ayam');
stringManipulation('bebek');
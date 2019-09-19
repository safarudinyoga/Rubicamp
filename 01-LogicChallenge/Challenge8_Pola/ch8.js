function pola(str){
    var arr = str.split(" "); //diubah ke array dan di split
    var hasil = [];
    for (let i=0; i<10; i++){ 
        var tebak = arr[0].replace(/#/g,i);
        for (let j=0; j<10; j++){
            var tebak2 = arr[4].replace(/#/g,j);
            if(parseInt(tebak) * parseInt(arr[2]) == parseInt(tebak2)){ //convert string to int
                hasil.push(i,j); //memasukkan angka ke array
                return hasil;
            }
        }
    }
    return hasil;
}

console.log(pola("42#3 * 188 = 80#204"));
console.log(pola("8#61 * 895 = 78410#5"));


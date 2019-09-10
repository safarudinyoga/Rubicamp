function sum(){
    var jumlah = 0;
    for(var i=0;i<arguments.length;i++){
        jumlah += arguments[i];
    }
    console.log(jumlah);
}
sum(1,2,7);
sum(1,4);
sum(11);
sum(10,3,6,7,9);
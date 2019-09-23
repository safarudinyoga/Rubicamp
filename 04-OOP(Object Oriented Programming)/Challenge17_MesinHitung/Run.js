import MesinHitung from './MesinHitung.js';
const Pi = 22/7;

var mh = new MesinHitung();
mh.add(10).subtract(5).result(); //1 + 10 - 5 = 6
mh.add(3).multiply(4).divide(6).result(); //curret result is 2 then mhutate is 6 + 3 * 4 / 6 = 6
mh.x = 7; //set jari jari 7
console.log(`nilai sekarang : ${mh.x}`);
mh.multiply(2).multiply(Pi).result(); //keliling dengan jari2 7 = 2 x Pi x r = 44
mh.x = 7; //set jari2 7
mh.square().multiply(Pi).result(); //luas lingkaran dgn jari2 7 = Pi x R pangkat 2 = 154
mh.x = 4;
mh.exponent(3).result(); //4 pangkat 3 = 64
mh.squareRoot().result(); // akar pangkat 2 dari 64 = 8
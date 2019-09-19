/* Rubicamp read Matrix Clockwise */
/* manually input matrix */
var input = [[1,  2,   3,  4],
             [5,  6,   7,  8],
             [9,  10, 11, 12],
             [13, 14, 15, 16]];

function spiral(param1){

    /* making the cage of matrix */
    //var matriks = spiral;
    /*let count = 0;
    let  = [];
  
    for (let i = 0; i < param1; i++) {
      tempat[i] = [];
      for (let j = 0; j < param1; j++) {
        tempat[i][j] = count;
        count++;
      }
    }*/

    var result = [];
    function goAround(matrix) {
        if (matrix.length == 0) {
            return;
        }
        // matrik kanan
        result = result.concat(matrix.shift());
        
        // bawah
        for (var j=1; j < matrix.length - 1; j++) {
            result.push(matrix[j].pop());
        }
        // bottom
        result = result.concat(matrix.pop().reverse());

        // up
        for (var k = matrix.length -2; k > 0; k--) {
            result.push(matrix[k].shift());
        }
        return goAround(matrix);
    };
    goAround(param1);

    return result;
    //console.log(result);
};
var result = spiral(input);
console.log(result);
// spiral(5);
// spiral(6);
// spiral(7);


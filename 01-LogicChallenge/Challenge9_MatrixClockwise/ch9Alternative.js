function spiral(param1) {
    
    var matrix = [
        [ 1,  2,  3,  4,  5,  6],
        [ 7,  8,  9, 10, 11, 12],
        [13, 14, 15, 16, 17, 18],
        [19, 20, 21, 22, 23, 24],
        [25, 26, 27, 28, 29, 30],
        [31, 32, 33, 34, 35, 36]
    ];
    
    var endRow = matrix.length;
    var endColumn = matrix[0].length;
    var arr = [];
    
    spiralLoop(endRow, endColumn, matrix);
    
    
    /**
     * Function that loops in a spiral way trough a given matrix (clockwise)
     */
    function spiralLoop(endRow, endColumn, matrix) {
        var i, startRow = 0, startColumn = 0, resultString = '';
    
        while (startRow < endRow && startColumn < endColumn) {
            /* Loop the first row from the remaining rows */
            for (i = startColumn; i < endColumn; ++i) {
                resultString += matrix[startRow][i] + ' ';
            }
            startRow++;
     
            /* Loop the last column from the remaining columns */
            for (i = startRow; i < endRow; ++i) {
                resultString += matrix[i][endColumn - 1] + ' ';
            }
            endColumn--;
     
            /* Loop the last row from the remaining rows */
            if (startRow < endRow) {
                for (i = endColumn - 1; i >= startColumn; --i) {
                    resultString += matrix[endRow - 1][i] + ' ';
                }
                endRow--;
            }
    
            /* Loop the first column from the remaining columns */
            if (startColumn < endColumn) {
                for (i = endRow - 1; i >= startRow; --i) {
                    resultString += matrix[i][startColumn] + ' ';
                }
                startColumn++;
            }
        }
        
        // console.log(parseInt(resultString.split('')));
        console.log(resultString);
        
        
    }
    
}

// spiral(5);
spiral(6);
spiral(7);
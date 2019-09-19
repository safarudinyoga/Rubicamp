function spiral(size){
    let count = 0;
    let wadah = []
  
    for (var i = 0; i < size; i++) {
      wadah[i] = []
      for (var j = 0; j < size; j++) {
        //ngakses    //mengisi
        wadah[i][j] = count;
        count++;
      }
    }

    let x = 0, y = 0;
    let batasAtas = size;
    let batasBawah = 0;
    let hasil = [];
  
    // ke kanan
    while(hasil.length < size * size){
      for (; x < batasAtas; x++) {
        hasil.push(wadah[y][x])
        if(hasil.length == size * size){
          break;
        }
  
      }
      x--
      y++
  
      // ke bawah
      for (; y < batasAtas; y++) {
        hasil.push(wadah[y][x])
        if(hasil.length == size * size){
          break;
        }
      }
      y--
      x--
  
      // ke kiri
      for (; x >= batasBawah; x--) {
        hasil.push(wadah[y][x])
        if(hasil.length == size * size){
          break;
        }
      }
      //console.log(y,x)
      y-- 
      x++
  
      // ke atas
      for (; y > batasBawah; y--) {
        hasil.push(wadah[y][x])
        if(hasil.length == size * size){
          break;
        }
      }
      x++;
      y++;
      batasAtas--;
      batasBawah++;
    }
    console.log(hasil);
  }
  
  spiral(5);
  spiral(6);
  spiral(7);
  spiral(8);
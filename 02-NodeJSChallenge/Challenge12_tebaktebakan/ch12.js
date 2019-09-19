const fs = require('fs');
const readline = require('readline');
//process.stdin.setEncoding('utf8');
fs.readFile('data.json','utf8', (err, data) => {
    if (err){
        throw err;
    }
    let question = JSON.parse(data);
    var i = 0;
    var salah = 0;
    const rl = readline.createInterface({
        input : process.stdin,
        output : process.stdout,
        prompt : 'Masukkan Jawaban Anda : '
    });

    console.log("Pertanyaan = " +`${question[i].definition}`);
    rl.prompt();
    rl.on('line', (answer) => {
        if(answer.toLocaleLowerCase() == 'skip'){
            i++;
            salah = 0;
            console.log("Pertanyaan = " + `${question[i].definition}`);
        }
        else {
            if(answer == question[i].term.toLowerCase()){
                console.log("selamat jawaban anda benar!");
                i++;
                salah = 0;
            } else {
                console.log(`Maaf Jawaban Salah! ${salah}`);
                salah++;
                rl.prompt();
            }
            if(i < question.length) {
                console.log("Pertanyaan = " + `${question[i].definition}`);
                rl.prompt();
            } else {
                console.log("HORE ANDA MENANG!");
                process.exit();
            }
            
        }
    });     
});


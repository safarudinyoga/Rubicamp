const fs = require('fs');
const readline = require('readline');
//process.stdin.setEncoding('utf8');
fs.readFile('data.json','utf8', (err, data) => {
    if (err){
        throw err;
    }
    let question = JSON.parse(data);
    var i = 0;
    const rl = readline.createInterface({
        input : process.stdin,
        output : process.stdout,
        prompt : 'Masukkan Jawaban Anda : '
    });

    console.log("Pertanyaan = " +`${question[i].definition}`);
    rl.prompt();
    rl.on('line', (answer) => {
        if(answer == question[i].term.toLowerCase()){
            console.log("selamat jawaban anda benar!");
            i++;
            if(i < question.length) {
                console.log("Pertanyaan = " + `${question[i].definition}`);
                rl.prompt();
            }
            else {
                console.log("HORE ANDA MENANG!");
                process.exit();
            }
        }
        else {
            console.log("Maaf Jawaban Salah!");
            rl.prompt();
        }
    });
        
})


const fs = require('fs');
const readfile = require('readline');
var input = process.argv;
let command = [
    "list", "add", "delete", "complete", "uncomplete", "list:outstanding", 
    "list:completed", "tag", "filter:"
]


// command help
if (input.length <= 2 || input[2] == 'help'){
console.log(
    '>>> JS TODO <<<\n' +
    '$ node todo.js <command>\n' +
    '$ node todo.js list\n' +
    '$ node todo.js task <task_id>\n' +
    '$ node todo.js add <task_content>\n' +
    '$ node todo.js delete <task_id>\n' +
    '$ node todo.js complete <task_id>\n' +
    '$ node todo.js uncomplete <task_id>\n' +
    '$ node todo.js list:outstanding asc|desc\n' +
    '$ node todo.js list:completed asc|desc\n' +
    '$ node todo.js tag <task_id> <tag_name_1> <tag_name2>...<tag_name_N>\n' +
    '$ node todo.js filter:<tag_name>');
    process.exit(0);
}
    
// command list
else if (input[2] == command[0] || command == 'list'){
    console.log(">>> Daftar Pekerjaan <<<");
    fs.readFile('todo.json', 'utf8', (err, data) =>{
        if(err)
            throw err;
        let list = JSON.parse(data);
        let i = 0;
        let status;
        while (i < Object.keys(list).length){
            if (list[i].status == 'complete'){
                status = '[X]';
            } else {
                status = '[ ]';
            }
            console.log(`${i+1}.${status}` + list[i].task);
            i++;
        }
    });
}

//add
else if (input[2] == command[1] || command == 'add'){
    fs.readFile('todo.json','utf8', (err, data) => {
        if(err)
            throw err;
        let arr = JSON.parse(data);
        let addArr = [];
        let output = 0;
        for (let i = 3; i < input.length; i++){ //looping index
            addArr[output] = input[i];
            output++;
        }
        let newTask = new Object();
        newTask.status = 'uncomplete';
        newTask.task = addArr.join('');
        newTask.tags = '';
        arr[Object.keys(arr).length] = newTask; //menambah addArr ke list
        let datajson = JSON.stringify(arr, null, 3);
        fs.writeFile('todo.json', datajson, (err) => {
            if(err)
                throw err;
            console.log(`"${newTask.task}" telah ditambahkan`);   
        });
    });
}

// sort outstanding && completed
else if (input[2] == command[5] || input[2] == command[6]){
    fs.readFile ('todo.json','utf8', (err, data) => {
        if(err)
            throw err;
        let arr2 = JSON.parse(data);
        //let status;
        if(input[3] == 'asc'){ //for asc
            let i = 0;
        while (i < Object.keys(arr2).length){
            if(arr2[i].status == 'complete' && input[2] == command[6]) {
                status = '[X]';
                console.log(`${i+1}.${status}` + arr2[i].task);
            }
            else if (arr2[i].status == 'uncomplete' && input[2] == command[5]) {
                status = '[ ]';
                console.log(`${i+1}.${status}` + arr2[i].task);
            }
            i++;
        }
    }
        else {
            let i = Object.keys(arr2).length - 1; //for desc
            while (i >= 0){
                if (arr2[i].status == 'complete' && input[2] == command[6]) {
                    status = '[X]';
                    console.log(`${i+1}.${status}` + arr2[i].task);
                }
                else if (arr2[i].status == 'uncomplete' && input[2] == command[5]) {
                    status = '[ ]';
                    console.log(`${i+1}.${status}` + arr2[i].task);
                }
                i--;
            }
        }
    });
}

//remove
else if (input[2] == command[2] || command == 'delete'){
    fs.readFile('todo.json', 'utf8', (err,data) => {
        if(err)
            throw err;
        let arr = JSON.parse(data);
        let delArr = [];
        if(Object.keys(arr).length >= input[3]){ //input[3] = delete argumen
            var delIndex = input[3]; //delete based index
            let output = 0;
            for(let i = 0; i < Object.keys(arr).length; i++){ //loop index task
                if(i+1 != delIndex){
                    delArr[output] = arr[i]; 
                    output++;
                }
            }
        }
    let datajson = JSON.stringify(delArr, null, 3);
    fs.writeFile('todo.json', datajson, (err) => {
        if(err)
            throw err;
        console.log(`${arr[delIndex-1].task} telah dihapus`);
    });
    });
}

//complete
else if (input[2] == command[3] || command == 'complete'){
    fs.readFile('todo.json', 'utf8', (err, data) => {
        if(err)
            throw err;
        let arr = JSON.parse(data);
        //let 
        if (Object.keys(arr).length >= input[3]){   
            let cekList = input[3] - 1;             //cek index
            arr[cekList].status = 'complete';
            let datajson = JSON.stringify(arr, null, 3);
            fs.writeFile('todo.json', datajson, (err) =>{
                if(err)
                    throw err;
                console.log(`"${arr[cekList].task}" telah selesai`);         
            });
        } 
    });
}

//uncomplete
else if (input[2] == command[4] || command == 'uncomplete'){
    fs.readFile('todo.json', 'utf8', (err, data) => {
        if(err)
            throw err;
        let arr = JSON.parse(data);
        if (Object.keys(arr).length >= input[3]) {
            let unCekList = input [3] - 1;
            arr[unCekList].status = 'uncomplete';
            let datajson = JSON.stringify(arr, null, 3);
            fs.writeFile('todo.json', datajson, (err) => {
                if(err)
                    throw err;
                console.log(`"${arr[unCekList].task}" status selesai dibatalkan`);
            })
        }
    })
}

//tags
else if (input[2] == command[7] || command == 'tag'){
    fs.readFile('todo.json', 'utf8', (err,data) => {
        if(err)
            throw err;
        let arr = JSON.parse(data);
        if (Object.keys(arr).length >= input[3]){
            let indexTag = input[3] - 1;
            let addTag = [];
            let output = 0;
            for (let i = 4; i < input.length; i++){
                addTag[output] = input[i];
                output++;
            }
            arr[indexTag].tags = addTag.join (" ");
            let datajson = JSON.stringify(arr, null, 3);
            fs.writeFile('todo.json', datajson, (err) => {
                if (err)
                    throw err;
                console.log(`tag "${arr[indexTag].tags}" telah ditambahkan ke daftar "${arr[indexTag].task}"`);
        });
        };
    });
}

//filter
else {
    if(input[2].includes(`${command[8]}`)){
    let search = input[2].replace(`${command[8]}`,"");
    console.log('Daftar Pekerjaan');
    fs.readFile('todo.json', 'utf8', (err, data) => {
        if (err)
            throw err;
        let arr = JSON.parse(data);
        let status;
        let i = 0;
        let output = 1;
        while (i < Object.keys(arr).length){
            if(arr[i].tags.includes(`${search}`)){
                if(arr[i].status == 'complete'){
                    status = '[X]';
                } else {
                    status = '[ ]';
                    console.log(`${output}. ${status} ` + arr[i].task);
                    output++;
                }
            }
            i++;
        }
    })
    }
}



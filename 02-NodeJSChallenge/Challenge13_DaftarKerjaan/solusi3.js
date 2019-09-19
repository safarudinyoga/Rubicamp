const fs = require('fs');
const readline = require('readline');
let command = [
    "list", "add", "delete", "complete", "uncomplete", "list:outstanding", 
    "list:completed", "tag", "filter:"
]
input = process.argv;
if(input.length <= 2 || input[2] == "help"){
    console.log('>>> JS TODO <<<\n' +
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
    '$ node todo.js filter:<tag_name>'
);
    process.exit(0);
}else if(input[2] == command[0]){  //LIST TODO
    console.log("DAFTAR PEKERJAAN");
    fs.readFile("todo.json", (err, data) => {
        if(err) 
            throw err;
        let list = JSON.parse(data);
        let i = 0;
        let status;
        while(i < Object.keys(list).length){
           if(list[i].status == "complete")
                status = "[X]";
            else 
                status = "[ ]";
           console.log(`${i+1}. ${status} ` + list[i].task);
           i++;
       } 
    });
}else if(input[2] == command[6] || input[2] == command[5]){ // SORT TODO list:out list:complete
    console.log("DAFTAR PEKERJAAN");
    fs.readFile("todo.json", (err, data) => {
     if(err) 
        throw err;
     let list = JSON.parse(data);
     if(input[3] == "asc"){ 
        let i = 0;
        while(i < Object.keys(list).length){
            if(list[i].status == "complete" && input[2] == command[6]){
                status = "[x]";
                console.log(`${i+1}. ${status} ` + list[i].task);
            }else if(input[2] == command[5] && list[i].status == "uncomplete"){
                status = "[]";
                console.log(`${i+1}. ${status} ` + list[i].task);
            }
           i++;
        }
    } else {
        let i = Object.keys(list).length - 1;
        while(i >= 0){
            if(list[i].status == "complete" && input[2] == command[6]){
                status = "[x]";
                console.log(`${i+1}. ${status} ` + list[i].task);
            }else if(input[2] == command[5] && list[i].status == "uncomplete"){
                status = "[ ]";
                console.log(`${i+1}. ${status} ` + list[i].task);
            }
           i--;
        }
    } 
    });
}else if(input[2] == command[1] && input.length > 3){ // ADD NEW TODOS   
    fs.readFile("todo.json", (err, data) => {
        if(err) 
            throw err;
        let arr = JSON.parse(data);
        let todosArr = [];
        let j = 0;
        for(let i = 3; i < input.length; i++){
            todosArr[j] = input[i];
            j++;
        } 
        let newTodo = new Object();
        newTodo.status = "uncomplete";
        newTodo.task = todosArr.join(" ");
        newTodo.tags = "";
        arr[Object.keys(arr).length] = newTodo;
        let dataJson = JSON.stringify(arr);
            fs.writeFile("todo.json",dataJson,(err)=>{
              if(err)
                throw err;
                console.log(`"${newTodo.task}" + telah ditambahkan`);
            });
    });
} else if(input[2] == command[2]){ // HAPUS TODO
    fs.readFile("todo.json", (err, data) => {
        if(err) 
            throw err;
        let arr = JSON.parse(data);
        let arr2 = []; 
        if(Object.keys(arr).length >= input[3]){
            let indexHapus = input[3];
            let i = 0;
            for(let k = 0; k < Object.keys(arr).length; k++){
                if(k+1 != indexHapus){
                    arr2[i] = arr[k];
                    i++;
                }
            }
            let dataJson = JSON.stringify(arr2);
            fs.writeFile("todo.json",dataJson,(err)=>{
                if(err)
                  throw err;
                  console.log(`${arr[indexHapus-1].task} telah dihapus dari daftar`);
            });
        }
    });
} else if(input[2] == command[3]){ // SUDAH SELESAI
    fs.readFile("todo.json", (err, data) => {
        if(err) 
            throw err;
        let arr = JSON.parse(data);
        if(Object.keys(arr).length >= input[3]){
            let indexChecklist = input[3]-1;
            arr[indexChecklist].status = "complete";
            let dataJson = JSON.stringify(arr);
            fs.writeFile("todo.json",dataJson,(err)=>{
                if(err)
                  throw err;
                  console.log(`${arr[indexChecklist].task} telah selesai`);
            });
        }
    });
} else if(input[2] == command[4]){ //BATAL SELESAI
    fs.readFile("todo.json", (err, data) => {
        if(err) 
            throw err;
        let arr = JSON.parse(data);
        if(Object.keys(arr).length >= input[3]){
            let indexChecklist = input[3]-1;
            arr[indexChecklist].status = "uncomplete";
            let dataJson = JSON.stringify(arr);
            fs.writeFile("todo.json",dataJson,(err)=>{
                if(err)
                  throw err;
                  console.log(`${arr[indexChecklist].task} status selesai dibatalkan`);
            });
        }
    });
} else if(input[2] == command[7]){ //tag
    fs.readFile("todo.json", (err, data) => {
        if(err) 
            throw err;
        let arr = JSON.parse(data);
        if(Object.keys(arr).length >= input[3]){
            let indexTag = input[3]-1;
            let tagsArr = [];
            let j = 0;
            for(let i = 4; i < input.length; i++){
                tagsArr[j] = input[i];
                j++;
            } 
            arr[indexTag].tags = tagsArr.join(",");
            let dataJson = JSON.stringify(arr);
            fs.writeFile("todo.json",dataJson,(err)=>{
                if(err)
                  throw err;
                  console.log(`Tag '${arr[indexTag].tags}' telah ditambahkan ke daftar '${arr[indexTag].task}' `);
            });
        }
    });
} else { //searchtag
    if(input[2].includes(`${command[8]}`)){
        let searchTags = input[2].replace(`${command[8]}`,"");
        console.log("DAFTAR PEKERJAAN");
            fs.readFile("todo.json", (err, data) => {
                if(err) 
                 throw err;
            let list = JSON.parse(data);
            let i = 0; let j = 1; let status;
            while(i < Object.keys(list).length){
                if(list[i].tags.includes(`${searchTags}`)){
                    if(list[i].status == "complete")
                        status = "[X]";
                    else 
                        status = "[ ]";
                    console.log(`${j}. ${status} ` + list[i].task);
                    j++;
                }         
                i++;
              } 
             });
    }
} 
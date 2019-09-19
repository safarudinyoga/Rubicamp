const file = 'todo.json';
// if file tasks.json doesn't exist, it must be created manually before compiling this script with content: '{}'
const help = [
    '<command>','list','add <task_content>','delete <task_id>',
    'complete <task_id>','uncomplete <task_id>',
    'list:outstanding asc|desc', 'list:completed asc|desc', 
    'tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>', 
    'filter:<tag_name>'
];
const task = function(id,content){
    // function expression to generate new task
    this.task_id = id; this.task_content = content;
    this.completed = false; this.tags = [];
};
const checkId = function(id,context){
    // function expression to check existance of id. 
    // If the id exists and fit to available task_id, then this function will return undefined.
    // This function will be invoked in delete, complete, uncomplete, and tag methods of executeCommands object using call method.
    if (id<=0 | id.toString()==='NaN') return `Mohon isi dengan task_id (nomor pekerjaan) yang ${context}.`;
    const keys = Object.keys(this);
    const arrId = keys.map(key=>this[key].task_id);
    if (!arrId.includes(id)) return 'task_id '+id+' belum tersedia.';
};
const listingTasks = function(keys){
    // Function to create string of tasks list based on keys array
    // This function will be invoked in list and filter methods of executeCommands object using call method.
    const str = 'Daftar Pekerjaan\n';
    const strTasks = keys.map(key=>{
        return this[key].task_id + '. ' 
        + (this[key].completed ? '[x] ':'[ ] ')
        + this[key].task_content + '.';
    }).join('\n')
    return str + strTasks;
};
const executeCommands = { // main object that consists of methods for each command
    list: function (condition){
        // method to list tasks either completed tasks, uncompleted tasks, or all tasks.
        // get key names of 'this' (tasks) object
        let keys = Object.keys(this); let con = (condition+'').toLowerCase();
        if (con==='outstanding') keys = keys.filter(key=>!this[key].completed); // get key names of tasks which are not yet completed
        else if (con==='completed') keys = keys.filter(key=>this[key].completed); // get key names of tasks which are completed
        if (keys.length===0) {
            return 'Tidak ada pekerjaan' + (con=='outstanding' ? ' yang belum selesai.' : con=='completed' ? ' yang telah selesai.' : '.');
        }
        if ((args[3]+'').toLowerCase()==='desc' & (con==='outstanding' | con==='completed')) keys = keys.reverse();
        return listingTasks.call(this,keys);
    },
    add: function(){
        if (args.slice(3,args.length).length==0) return 'Mohon isi dengan pekerjaan yang ingin ditambahkan.';
        const task_content = args.slice(3,args.length).join(' ');
        const numOfTasks = Object.keys(this).length;
        const keyName = `task_${numOfTasks+1}`;
        this[keyName] = {};
        task.call(this[keyName], numOfTasks+1, task_content);
        return '"'+task_content+'" telah ditambahkan.'
    },
    delete: function(){
        const id = Number(args[3]);
        if (checkId.call(this,id,'')!==undefined) return checkId.call(this,id,'ingin dihapus');
        const keys = Object.keys(this);
        const keyName = keys.filter(key=>this[key].task_id===id); // get keyName of an object that has task_id===id
        const task_content = this[keyName].task_content; // get task_content of the deleted task
        delete this[keyName]; // delete object of tasks with key===keyName
        // change task_id and keyName of tasks which are created after the deleted task
        for (let i=id; i<keys.length; i++){
            this[`task_${i}`] = this[keys[i]];
            this[`task_${i}`].task_id = i;
            delete this[keys[i]];
        }
        return '"'+task_content+'" telah dihapus dari daftar.';
    },
    complete: function (){
        const id = Number(args[3]);
        if (checkId.call(this,id,'')!==undefined) return checkId.call(this,id,'telah selesai');
        const keys = Object.keys(this);
        const keyName = keys.filter(key=>this[key].task_id===id); // get keyName of an object that has task_id===id
        const task_content = this[keyName].task_content; // get task_content of the task
        this[keyName].completed = true; // change state of the task
        return '"'+task_content+'" telah selesai.';
    },
    uncomplete: function(){
        const id = Number(args[3]);
        if (checkId.call(this,id,'')!==undefined) return checkId.call(this,id,'status selesainya ingin dibatalkan');
        const keys = Object.keys(this);
        const keyName = keys.filter(key=>this[key].task_id===id); // get keyName of an object that has task_id===id
        const task_content = this[keyName].task_content; // get task_content of the task
        this[keyName].completed = false; // change state of the task
        return '"'+task_content+'" status selesai dibatalkan.';
    },
    tag: function(){
        const id = Number(args[3]);
        if (checkId.call(this,id,'')!==undefined) return checkId.call(this,id,'tags-nya ingin ditambahkan');
        let tags = args.slice(4,args.length).map(x=>x.toLowerCase());
        const keys = Object.keys(this);
        const keyName = keys.filter(key=>this[key].task_id===id); // get keyName of an object that has task_id===id
        const task_content = this[keyName].task_content; // get task_content of the task
        let thisTags = this[keyName].tags;
        tags = tags.filter(t=>!thisTags.includes(t)); // filter tags which are not elements of thisTags
        if (tags.length===0) return 'Mohon masukkan tags yang ingin ditambahkan dan belum ada pada daftar \''+task_content+'\'.';
        this[keyName].tags = thisTags.concat(tags);
        return 'Tag \'' + tags.join(',') +'\' telah ditambahkan ke daftar \'' + task_content +'\'.';
    },
    filter: function(tag_name){
        // get key names of 'this' (tasks) object
        let keys = Object.keys(this);
        if (keys.length===0) return 'Tidak ada pekerjaan apapun yang tersedia.';
        tag_name = (tag_name+'').toLowerCase();
        if (tag_name==='undefined') return 'Mohon masukkan tag untuk memfilter daftar pekerjaan (filter:<tag_name>).';
        keys = keys.filter(key=>this[key].tags.map(t=>t.toLowerCase()).includes(tag_name));
        if (keys.length===0) return 'Tidak ada pekerjaan dengan tag '+tag_name+'.';
        return listingTasks.call(this,keys);
    }
};

const process = require('process');
const args = process.argv;
if (args.length<3 | (args[2]+"").toLowerCase()==='help'){
    // display help of JS TODO program
    console.log('>>> JS TODO <<<');
    const filePath = args[1].split('/');
    const fileName = filePath[filePath.length-1];
    console.log(
        [...Array(help.length).keys()].map(x=>'$ node '+fileName+
        ' '+help[x]).join('\n')
    );
    process.exit();
}

const commands = Object.keys(executeCommands);
const command = args[2].toLowerCase().split(':')[0];
const con = args[2].toLowerCase().split(':')[1];
// check if command is absent
if (!commands.includes(command)){
    console.log('"' + command + '" bukan perintah pada program JS TODO');
    process.exit();
}
const fs = require('fs');

let tasks = JSON.parse(fs.readFileSync(file,'utf8')); // read file tasks.json and immediately parse it to JSON
console.log(executeCommands[command].call(tasks,con)); // execute the command and update tasks object if necessary
fs.writeFileSync(file,JSON.stringify(tasks)); // convert tasks object to string and save it as tasks.json
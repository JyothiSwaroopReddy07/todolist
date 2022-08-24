var tasks = [];
var taskList = document.getElementById('list');
var addTaskInput = document.getElementById('add');
var tasksCounter = document.getElementById('tasks-counter');


function addTaskToDOM(task){
    let li = document.createElement('li');
    li.innerHTML = `
            <input type="checkbox" id="${task.id}" ${task.done ? 'checked': ''} class="custom-checkbox" onclick = "markTaskAsComplete(${task.id})">
            <label for="${task.id}">${task.text}</label>
            <img src="bin.png" class="delete" data-id="${task.id}" onclick = "deleteTask(${task.id})"/>
    `;
    taskList.append(li);
}

function renderList () {
    taskList.innerHTML = '';
    for( let i = 0; i<tasks.length; i++){
        addTaskToDOM(tasks[i]);
    }
    tasksCounter.innerHTML = tasks.length;
}

function markTaskAsComplete (taskId) {
    for(let i=0;i<tasks.length;i++){
        if(tasks[i].id == taskId){
            tasks[i].done = true;
        }
    }
    renderList();
    showNotification('Task completed successfully');

}

function deleteTask (taskId) {
    let newTasks = tasks.filter(function(task){
        return task.id != taskId;
    });
    tasks=newTasks;
    renderList();
    showNotification('Deleted task Successfully');
}

function addTask (task) {
    if(task)
    {
        tasks.push(task);
        renderList();
        showNotification('task added successful');
    }else{
        showNotification('please add the task again !!!!!!');
    }
}

function showNotification(text) {
    alert(text);
}

function handleInputKeypress(e) {
    if(e.key === 'Enter'){
        const text = e.target.value;
        if(!text) {
            showNotification('Test Text can not be empty');
            return;
        }
        const task = {
            text,
            id : Date.now().toString(),
            done: false
        }
        e.target.value = '';
        addTask(task);
    }
}
addTaskInput.addEventListener('keyup', handleInputKeypress);
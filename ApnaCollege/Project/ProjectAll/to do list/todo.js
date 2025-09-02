const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const clearAll = document.getElementById('clearAll');
const taskCount = document.getElementById('taskCount');

document.addEventListener("DOMContentLoaded", loadTasks);
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') addTask();
});
clearAll.addEventListener('click', () => {
    taskList.innerHTML = '';
    saveTasks();
    updateTaskCount();
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const li = document.createElement('li');
    li.textContent = taskText;

    li.addEventListener('click', () => {
        li.classList.toggle('completed');
        saveTasks();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        li.remove();
        saveTasks();
        updateTaskCount();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    taskInput.value = '';
    saveTasks();
    updateTaskCount();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) li.classList.add('completed');

        li.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            li.remove();
            saveTasks();
            updateTaskCount();
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
    updateTaskCount();
}

function updateTaskCount() {
    const total = document.querySelectorAll('#taskList li').length;
    taskCount.textContent = `${total} ${total === 1 ? 'task' : 'tasks'}`;
}

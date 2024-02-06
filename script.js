document.addEventListener('DOMContentLoaded', () => {
        loadTasks();
    });

    function addTask() {
        const taskInput = document.getElementById('taskInput');
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        const tasksList = document.getElementById('tasks');
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${taskText}</span>
            <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
        `;

        tasksList.appendChild(listItem);
        saveTask(taskText);

        taskInput.value = '';
    }

    function deleteTask(button) {
        const listItem = button.parentNode;
        const tasksList = listItem.parentNode;
        tasksList.removeChild(listItem);
        removeTask(listItem.querySelector('span').textContent);
    }

    function saveTask(task) {
        const tasks = getSavedTasks();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function removeTask(task) {
        const tasks = getSavedTasks();
        const index = tasks.indexOf(task);
        if (index !== -1) {
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    function loadTasks() {
        const tasks = getSavedTasks();
        const tasksList = document.getElementById('tasks');

        tasks.forEach(task => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${task}</span>
                <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
            `;
            tasksList.appendChild(listItem);
        });
    }

    function getSavedTasks() {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    }
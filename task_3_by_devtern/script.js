
        document.addEventListener('DOMContentLoaded', () => {
            const taskInput = document.querySelector('#newtask input');
            const taskContainer = document.querySelector('#tasks');
            const addButton = document.querySelector('#push');

            // Load tasks from localStorage
            loadTasks();

            addButton.onclick = function() {
                if (taskInput.value.length == 0) {
                    alert("Kindly Enter Task Name!!!!");
                } else {
                    addTask(taskInput.value);
                    taskInput.value = ""; // Clear the input field after adding a task
                }
            };

            function addTask(taskName) {
                const taskHTML = `
                    <div class="task">
                        <span id="taskname">${taskName}</span>
                        <button class="edit">Edit</button>
                        <button class="delete">Delete</button>
                    </div>
                `;
                taskContainer.innerHTML += taskHTML;
                saveTasks();
                addTaskEventListeners();
            }

            function addTaskEventListeners() {
                const tasks = document.querySelectorAll('.task');
                tasks.forEach(task => {
                    task.querySelector('#taskname').onclick = function() {
                        this.parentNode.classList.toggle('completed');
                        saveTasks();
                    };
                    task.querySelector('.delete').onclick = function() {
                        this.parentNode.remove();
                        saveTasks();
                    };
                    task.querySelector('.edit').onclick = function() {
                        const newTaskName = prompt("Edit Task Name", this.parentNode.querySelector('#taskname').textContent);
                        if (newTaskName !== null && newTaskName.trim() !== "") {
                            this.parentNode.querySelector('#taskname').textContent = newTaskName;
                            saveTasks();
                        }
                    };
                });
            }

            function saveTasks() {
                const tasks = [];
                document.querySelectorAll('.task').forEach(task => {
                    tasks.push({
                        name: task.querySelector('#taskname').textContent,
                        completed: task.classList.contains('completed')
                    });
                });
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }

            function loadTasks() {
                const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
                tasks.forEach(task => {
                    addTask(task.name);
                    if (task.completed) {
                        const taskElements = document.querySelectorAll('.task');
                        taskElements[taskElements.length - 1].classList.add('completed');
                    }
                });
            }
        });
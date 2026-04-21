// 1. Ініціалізація даних та елементів
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const totalTasksDisplay = document.getElementById('total-tasks');
const themeBtn = document.getElementById('theme-btn');

// Завантажуємо масив об'єктів або створюємо порожній
let tasks = JSON.parse(localStorage.getItem('dashTasks')) || [];

// 2. Функція оновлення дати, часу та привітання
function updateDateTime() {
    const now = new Date();
    
    const dateOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    document.getElementById('current-date').innerText =
        now.toLocaleDateString('en-US', dateOptions);
    
    const hours = now.getHours();
    let greeting = "Good Evening";
    if (hours < 12) greeting = "Good Morning";
    else if (hours < 18) greeting = "Good Afternoon";
    
    const headerTitle = document.querySelector('header h1');
    if (headerTitle) {
        headerTitle.innerHTML = `${greeting}, <span class="gradient-text">Creator</span>`;
    }
}

// 3. Головна функція рендеру задач
function renderTasks() {
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        
        const textStyle = task.completed
            ? 'text-decoration: line-through; opacity: 0.5;'
            : '';
        
        li.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px; cursor: pointer; flex: 1;" onclick="toggleTask(${index})">
                <i class="far ${task.completed ? 'fa-check-circle' : 'fa-circle'}" style="color: var(--accent)"></i>
                <span style="${textStyle}">${task.text}</span>
            </div>
            <button onclick="deleteTask(${index})" style="background:none; border:none; color:#ff4d4d; cursor:pointer; padding: 5px;">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        taskList.appendChild(li);
    });

    const activeTasks = tasks.filter(t => !t.completed).length;
    totalTasksDisplay.innerText = activeTasks;
    
    localStorage.setItem('dashTasks', JSON.stringify(tasks));
}

// 4. Логіка взаємодії
window.toggleTask = function(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
};

window.deleteTask = function(index) {
    tasks.splice(index, 1);
    renderTasks();
};

addTaskBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (text !== '') {
        tasks.push({ text: text, completed: false });
        taskInput.value = '';
        renderTasks();
    }
});

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTaskBtn.click();
});

// 5. Тема та запуск
themeBtn.onclick = () => {
    document.body.classList.toggle('light-theme');
    const icon = themeBtn.querySelector('i');
    icon.classList.toggle('fa-adjust');
    icon.classList.toggle('fa-sun');
};

// Старт
updateDateTime();
renderTasks();
setInterval(updateDateTime, 60000);

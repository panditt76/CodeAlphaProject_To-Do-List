const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Load tasks 
document.addEventListener('DOMContentLoaded', loadTasks);

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    addTask(taskText);
    taskInput.value = '';
  }
});

function addTask(text, isCompleted = false) {
  const li = document.createElement('li');
  if (isCompleted) li.classList.add('completed');

  li.innerHTML = `
    <span class="task-text">${text}</span>
    <div class="actions">
      <button class="complete-btn">✔️</button>
      <button class="edit-btn">✏️</button>
      <button class="delete-btn">🗑️</button>
    </div>
  `;
  taskList.appendChild(li);
  saveTasks();
  showToast("Task Created ✅");

}


taskList.addEventListener('click', (e) => {
  const li = e.target.closest('li');
  const taskText = li.querySelector('.task-text');

  if (e.target.classList.contains('complete-btn')) {
    li.classList.toggle('completed');
  }

  else if (e.target.classList.contains('delete-btn')) {
    li.remove();
  }

  else if (e.target.classList.contains('edit-btn')) {
    const newTask = prompt('Edit task:', taskText.textContent);
    if (newTask) taskText.textContent = newTask;
  }

  saveTasks();
});

// Saving all the tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#task-list li').forEach((li) => {
    tasks.push({
      text: li.querySelector('.task-text').textContent,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load all pf em' from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => addTask(task.text, task.completed));
}
// now js for toast message
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.style.display = 'block';

  // Reset styles so fadeOut restarts each time
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  setTimeout(() => {
    toast.style.display = 'none';
  }, 2000); // Visible for 2 seconds
}



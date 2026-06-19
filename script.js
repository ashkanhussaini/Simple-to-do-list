// ---------- State ----------
const STORAGE_KEY = 'todo-app-tasks';
let tasks = loadTasks();
let currentFilter = 'all';

// ---------- DOM Elements ----------
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const itemsLeft = document.getElementById('items-left');
const clearCompletedBtn = document.getElementById('clear-completed');
const filtersContainer = document.getElementById('filters');

// ---------- Storage helpers ----------
function loadTasks() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to load tasks:', e);
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// ---------- Core actions ----------
function addTask(text) {
  const newTask = {
    id: Date.now().toString(),
    text: text.trim(),
    completed: false,
  };
  tasks.push(newTask);
  saveTasks();
  render();
}

function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  render();
}

function clearCompleted() {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  render();
}

// ---------- Rendering ----------
function getFilteredTasks() {
  if (currentFilter === 'active') return tasks.filter((t) => !t.completed);
  if (currentFilter === 'completed') return tasks.filter((t) => t.completed);
  return tasks;
}

function render() {
  const filtered = getFilteredTasks();
  list.innerHTML = '';

  if (filtered.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'empty-state';
    empty.textContent = 'No tasks here.';
    list.appendChild(empty);
  } else {
    filtered.forEach((task) => {
      const li = document.createElement('li');
      li.className = `todo-item${task.completed ? ' is-completed' : ''}`;
      li.dataset.id = task.id;

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'todo-item__checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => toggleTask(task.id));

      const span = document.createElement('span');
      span.className = 'todo-item__text';
      span.textContent = task.text;

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'todo-item__delete';
      deleteBtn.textContent = '✕';
      deleteBtn.setAttribute('aria-label', 'Delete task');
      deleteBtn.addEventListener('click', () => deleteTask(task.id));

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteBtn);
      list.appendChild(li);
    });
  }

  const remaining = tasks.filter((t) => !t.completed).length;
  itemsLeft.textContent = `${remaining} item${remaining !== 1 ? 's' : ''} left`;
}

// ---------- Event listeners ----------
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = input.value.trim();
  if (!value) return;
  addTask(value);
  input.value = '';
  input.focus();
});

clearCompletedBtn.addEventListener('click', clearCompleted);

filtersContainer.addEventListener('click', (e) => {
  const btn = e.target.closest('.filters__btn');
  if (!btn) return;

  currentFilter = btn.dataset.filter;

  document
    .querySelectorAll('.filters__btn')
    .forEach((b) => b.classList.remove('is-active'));
  btn.classList.add('is-active');

  render();
});

// ---------- Initial render ----------
render();

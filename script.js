// ---------- State ----------
const STORAGE_KEY = 'todo-app-pro-tasks';
let tasks = loadTasks();
let currentFilter = 'all';
let currentCategory = 'all';
let currentSort = 'created';

// ---------- DOM Elements ----------
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const categorySelect = document.getElementById('todo-category');
const prioritySelect = document.getElementById('todo-priority');
const dueDateInput = document.getElementById('todo-due-date');
const list = document.getElementById('todo-list');
const itemsLeft = document.getElementById('items-left');
const clearCompletedBtn = document.getElementById('clear-completed');
const filtersContainer = document.getElementById('filters');
const categoryFilter = document.getElementById('category-filter');
const sortSelect = document.getElementById('sort-select');

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

// ---------- Helpers ----------
function isOverdue(task) {
  if (!task.dueDate || task.completed) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(task.dueDate);
  return due < today;
}

const PRIORITY_WEIGHT = { high: 0, medium: 1, low: 2 };

function formatDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
}

// ---------- Core actions ----------
function addTask(text, category, priority, dueDate) {
  const newTask = {
    id: Date.now().toString(),
    text: text.trim(),
    category,
    priority,
    dueDate: dueDate || null,
    completed: false,
    createdAt: Date.now(),
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

// ---------- Filtering & sorting ----------
function getFilteredTasks() {
  let result = [...tasks];

  if (currentFilter === 'active') {
    result = result.filter((t) => !t.completed);
  } else if (currentFilter === 'completed') {
    result = result.filter((t) => t.completed);
  } else if (currentFilter === 'overdue') {
    result = result.filter((t) => isOverdue(t));
  }

  if (currentCategory !== 'all') {
    result = result.filter((t) => t.category === currentCategory);
  }

  if (currentSort === 'priority') {
    result.sort((a, b) => PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority]);
  } else if (currentSort === 'dueDate') {
    result.sort((a, b) => {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
  } else {
    result.sort((a, b) => b.createdAt - a.createdAt);
  }

  return result;
}

// ---------- Rendering ----------
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

      const content = document.createElement('div');
      content.className = 'todo-item__content';

      const span = document.createElement('span');
      span.className = 'todo-item__text';
      span.textContent = task.text;
      content.appendChild(span);

      const meta = document.createElement('div');
      meta.className = 'todo-item__meta';

      const categoryTag = document.createElement('span');
      categoryTag.className = 'tag tag--category';
      categoryTag.textContent = task.category;
      meta.appendChild(categoryTag);

      const priorityTag = document.createElement('span');
      priorityTag.className = `tag tag--priority-${task.priority}`;
      priorityTag.textContent = task.priority;
      meta.appendChild(priorityTag);

      if (task.dueDate) {
        const dueTag = document.createElement('span');
        const overdue = isOverdue(task);
        dueTag.className = `tag ${overdue ? 'tag--overdue' : 'tag--due'}`;
        dueTag.textContent = overdue
          ? `Overdue: ${formatDate(task.dueDate)}`
          : `Due: ${formatDate(task.dueDate)}`;
        meta.appendChild(dueTag);
      }

      content.appendChild(meta);

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'todo-item__delete';
      deleteBtn.textContent = '✕';
      deleteBtn.setAttribute('aria-label', 'Delete task');
      deleteBtn.addEventListener('click', () => deleteTask(task.id));

      li.appendChild(checkbox);
      li.appendChild(content);
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

  addTask(value, categorySelect.value, prioritySelect.value, dueDateInput.value);

  input.value = '';
  dueDateInput.value = '';
  prioritySelect.value = 'medium';
  categorySelect.value = 'general';
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

categoryFilter.addEventListener('change', (e) => {
  currentCategory = e.target.value;
  render();
});

sortSelect.addEventListener('change', (e) => {
  currentSort = e.target.value;
  render();
});

// ---------- Initial render ----------
render();

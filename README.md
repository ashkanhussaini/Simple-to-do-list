# To-Do List App

A simple, clean to-do list web app built with vanilla HTML, CSS, and JavaScript. No frameworks, no build tools — just the fundamentals.

## Features

- Add new tasks
- Mark tasks as complete / incomplete
- Delete individual tasks
- Filter tasks by **All / Active / Completed**
- Clear all completed tasks at once
- Live count of remaining tasks
- Data persists in the browser via `localStorage` — your tasks are still there after you close the tab

## Tech Stack

- HTML5
- CSS3 (Flexbox)
- JavaScript (ES6+, no frameworks or libraries)
- Browser `localStorage` API for persistence

## How to Run

No installation needed — it's a static site.

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/todo-list.git
   ```
2. Open `index.html` in your browser.

That's it.

## Project Structure

```
todo-list/
├── index.html      # Markup
├── style.css       # Styling
├── script.js       # App logic (CRUD + localStorage)
└── README.md
```

## What I Learned / Practiced

- DOM manipulation without a framework
- Event delegation (for dynamically rendered list items)
- Persisting state with `localStorage`
- Basic state management patterns (filter, render cycle)

## Possible Future Improvements

- Edit existing tasks inline
- Drag-and-drop reordering
- Due dates and priority levels
- Sync with a backend (e.g., a simple REST API)

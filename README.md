# To-Do List App — Pro Version

An advanced version of my original [To-Do List App](#), rebuilt with vanilla HTML, CSS, and JavaScript — no frameworks. This version adds categories, priority levels, due dates, and smarter sorting/filtering on top of the original CRUD functionality.

> **Note:** This is an evolution of an earlier, simpler to-do list project. I rebuilt it to practice more advanced JavaScript concepts: multi-criteria filtering, sorting algorithms, and date handling.

## Features

**Core**
- Add, complete, and delete tasks
- Data persists via `localStorage`
- Live count of remaining tasks

**New in Pro version**
- 📁 **Categories** — General, Work, Study, Personal
- 🚦 **Priority levels** — Low / Medium / High, each with a distinct visual tag
- 📅 **Due dates** — assign a deadline to any task
- ⏰ **Overdue detection** — tasks past their due date are automatically flagged and filterable
- 🔍 **Combined filtering** — filter by status (All/Active/Completed/Overdue) AND category at the same time
- ↕️ **Sorting** — sort by newest, priority, or due date

## Tech Stack

- HTML5
- CSS3 (Flexbox, responsive layout)
- JavaScript (ES6+, no frameworks or libraries)
- Browser `localStorage` API for persistence

## How to Run

No installation needed — it's a static site.

1. Clone the repo:
   ```bash
   git clone https://github.com/ashkanhussaini/todo-list.git
   ```
2. Open `index.html` in your browser.

## Project Structure

```
todo-list/
├── index.html      # Markup
├── style.css       # Styling
├── script.js       # App logic (CRUD + filters + sorting + localStorage)
└── README.md
```

## What I Learned / Practiced

- Combining multiple independent filters (status + category) on the same dataset
- Implementing custom sort logic (by priority weight, by date)
- Working with the JavaScript `Date` object to detect overdue tasks
- Structuring more complex application state without a framework
- Writing more modular, maintainable vanilla JS as the app grows in complexity

## Possible Future Improvements

- Edit existing tasks inline
- Drag-and-drop reordering
- Recurring tasks
- Sync with a backend (e.g., a simple REST API)

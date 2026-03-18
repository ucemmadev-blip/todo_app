const input = document.querySelector("body > main > div.input-task > input[type=text]")
const button = document.querySelector('body > main > div.input-task > button')
const output = document.querySelector('body > main > div.task-list > ul')

function saveTodos() {
  const todos = [];
  output.querySelectorAll('li').forEach(li => {
    todos.push({
      text: li.querySelector('p').textContent,
      checked: li.classList.contains('checked')
    });
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.forEach(todo => {
    if (typeof todo === 'string') {
      createTodoElement(todo, false);
    } else {
      createTodoElement(todo.text, todo.checked);
    }
  });
}

function createTodoElement(text, isChecked = false) {
  const newTodo = document.createElement('li')
  if (isChecked) {
    newTodo.classList.add('checked');
  }

  newTodo.innerHTML = `
    <div class="task-info">
      <input type="checkbox" ${isChecked ? 'checked' : ''}>
      <p>${text}</p>
    </div>
    <div class="task-buttons">
      <button>
        <img src="images/trash.png" alt="trash-icon" width="30">
      </button>
    </div>
  `

  output.appendChild(newTodo)

  const deleteBtn = newTodo.querySelector('button')
  const checkbox = newTodo.querySelector('input[type="checkbox"]')

  deleteBtn.addEventListener('click', () => {
    newTodo.remove()
    saveTodos() // Save to localStorage after removing
  })

  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      newTodo.classList.add('checked');
    } else {
      newTodo.classList.remove('checked');
    }
    saveTodos();
  })
}

function addTodo() {
  if (input.value.trim() === '') return;

  createTodoElement(input.value);
  saveTodos(); // Save to localStorage after adding

  input.value = '';
}

button.addEventListener('click', addTodo);

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTodo();
  }
});

// Load todos when the script runs
loadTodos();
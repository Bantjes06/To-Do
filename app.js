// select everything
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('#input-task');
const todoItemsList = document.querySelector('#task-list');
// array which stores every todos
let todos = [];

//an eventListener on form, and listen for submit event
todoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addTodo(todoInput.value);
});

// function to add todo
function addTodo(item) {
    if (item !== '') {
        //todo object
        const todo = {
            id: Date.now(),
            name: item,
            completed: false
        };

        //add to todos array
        todos.push(todo);
        addToLocalStorage(todos); //store in localStorage
        todoInput.value = '';
    }
}

// function to render given todos to screen
function renderTodos(todos) {
    todoItemsList.innerHTML = '';

    // run through each item inside todos
    todos.forEach(function (item) {
        // check if the item is completed
        const checked = item.completed ? 'checked' : null;

        const li = document.createElement('li');
        li.setAttribute('class', 'item');
        li.setAttribute('data-key', item.id);
        if (item.completed === true) {
            li.classList.add('checked');
        }

        li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>
      <span class="task">${item.name}</span>
      <button class="delete-btn">x</button>
    `;
        //add the <li> to the <ul>
        todoItemsList.append(li);
    });

}

// function to add todos to local storage
function addToLocalStorage(todos) {
    // conver the array to string then store it.
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos(todos);
}

// function helps to get everything from local storage
function getFromLocalStorage() {
    const reference = localStorage.getItem('todos');
    // if reference exists
    if (reference) {
        // converts back to array and store it in todos array
        todos = JSON.parse(reference);
        renderTodos(todos);
    }
}

// toggle value to completed and not completed
function toggle(id) {
    todos.forEach(function (item) {
        if (item.id == id) {
            item.completed = !item.completed;
        }
    });

    addToLocalStorage(todos);
}

// deletes a todo from todos array, then updates localstorage and renders updated list to screen
function deleteTodo(id) {
    todos = todos.filter(function (item) {
        return item.id != id;
    });
    addToLocalStorage(todos);
}

// initially get everything from localStorage
getFromLocalStorage();

//addEventListener <ul>
todoItemsList.addEventListener('click', function (event) {
    if (event.target.type === 'checkbox') {
        toggle(event.target.parentElement.getAttribute('data-key'));
    }

    // check if that is a delete-button
    if (event.target.classList.contains('delete-btn')) {
        deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
});
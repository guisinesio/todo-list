const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");


let oldInputValue;


const saveTodo = (text) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);
    
    const ediBtn = document.createElement("button");
    ediBtn.classList.add("edit-todo");
    ediBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(ediBtn);
    
    const deletebtn = document.createElement("button");
    deletebtn.classList.add("remove-todo");
    deletebtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deletebtn);

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();

};


const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
};

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        let todoTitle =todo.querySelector("h3");

        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
        }
    });

};


function filterTasks() {
    const filterSelect = document.querySelector("#filter-select");
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        const todoIsDone = todo.classList.contains("done");
        const filterValue = filterSelect.value;

        if (filterValue === "all") {
            todo.style.display = "flex"; 
        } else if (filterValue === "done" && todoIsDone) {
            todo.style.display = "flex"; 
        } else if (filterValue === "todo" && !todoIsDone) {
            todo.style.display = "flex"; 
        } else {
            todo.style.display = "none"; 
        }
    });
}

const filterSelect = document.querySelector("#filter-select");

filterTasks();


function searchTasks() {
    const searchInput = document.querySelector("#search-input");
    const todos = document.querySelectorAll(".todo");

    const searchText = searchInput.value.toLowerCase(); 

    todos.forEach((todo) => {
        const todoText = todo.querySelector("h3").innerText.toLowerCase(); 

        if (todoText.includes(searchText)) {
            todo.style.display = "flex"; 
        } else {
            todo.style.display = "none"; 
        }
    });
}

const searchInput = document.querySelector("#search-input");


todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value

    if(inputValue) {
        saveTodo (inputValue)
    }
});

document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if (parentEl && parentEl.querySelector("h3")){
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if (targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle ("done");
    }

    if (targetEl.classList.contains("remove-todo")) {
        parentEl.remove();
    }
    
    if (targetEl.classList.contains("edit-todo")) {
        toggleForms();

        editInput.value = todoTitle
        oldInputValue = todoTitle
    }

});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
});

editForm.addEventListener("submit", (e) => {
    
    e.preventDefault();

    const editInputValue = editInput.value;

    if (editInputValue) {
        updateTodo(editInputValue);
    }

    toggleForms();

});

filterSelect.addEventListener("change", filterTasks);

searchInput.addEventListener("input", searchTasks);




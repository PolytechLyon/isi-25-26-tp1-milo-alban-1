document.addEventListener("DOMContentLoaded", () => {
    const todoList = document.getElementById("todo-list");
    const totalItemsSpan = document.getElementById("total-items");
    const remainingItemsSpan = document.getElementById("remaining-items");
    const storageKey = "todo-list-items";
    let tasks = loadTasks();

    function loadTasks() {
        const storedTasks = localStorage.getItem(storageKey);
        if (storedTasks === null) return [];
        return JSON.parse(storedTasks);
    }

    function renderTasks() {
        todoList.innerHTML = "";

        totalItemsSpan.innerText = tasks.length;
        remainingItemsSpan.innerText = tasks.filter((task) => !task.completed).length;

        tasks.forEach((task) => {
            const newItem = document.createElement("li");
            const newSpan = document.createElement("span");
            newSpan.innerText = task.title;
            task.completed && newSpan.classList.add("checked");

            newItem.appendChild(newSpan);
            todoList.appendChild(newItem);
        });
    }

    renderTasks();

});
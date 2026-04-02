document.addEventListener("DOMContentLoaded", () => {
    const newTaskContent = document.getElementById("new-todo-item-title");
    const newTaskAdd = document.getElementById("new-todo-item-add");
    const todoList = document.getElementById("todo-list");
    const editInput = document.getElementById("edit-todo-item-title");
    const editSection = document.getElementById("edit-item");
    const newSection = document.getElementById("new-item");
    const confirmButton = document.getElementById("edit-todo-item-confirm");
    const cancelButton = document.getElementById("edit-todo-item-cancel");
    const storageKey = "todo-list-items";
    let tasks = loadTasks();
    let currentEditedIndex = null;

    function loadTasks() {
        const storedTasks = localStorage.getItem(storageKey);
        if (storedTasks === null) return [];
        return JSON.parse(storedTasks);
    }

    function saveTasks() {
        localStorage.setItem(storageKey, JSON.stringify(tasks));
    }

    function renderTasks() {
        todoList.innerHTML = "";

        tasks.forEach((task, index) => {
            const newItem = document.createElement("li");
            const newSpan = document.createElement("span");
            newSpan.innerText = task.title;

            const newCheckbox = document.createElement("input");
            newCheckbox.type = "checkbox";
            newCheckbox.checked = task.completed;
            newCheckbox.addEventListener("change", () => {
                task.completed = newCheckbox.checked;
                saveTasks();
            });

            const newEditButton = document.createElement("button");
            newEditButton.innerText = "Modifier";
            newEditButton.addEventListener("click", () => {
                editItem(index);
            });

            const newDeleteButton = document.createElement("button");
            newDeleteButton.innerText = "Supprimer";
            newDeleteButton.addEventListener("click", () => {
                if (currentEditedIndex === index) {
                    exitEditMode();
                }

                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });

            newItem.appendChild(newSpan);
            newItem.appendChild(newCheckbox);
            newItem.appendChild(newEditButton);
            newItem.appendChild(newDeleteButton);
            todoList.appendChild(newItem);
        });
    }

    function exitEditMode() {
        currentEditedIndex = null;
        editSection.hidden = true;
        newSection.hidden = false;
    }

    function addItem() {
        const taskValue = newTaskContent.value.trim();
        if (taskValue === "") return;
        tasks.push({ title: taskValue, completed: false });
        saveTasks();
        renderTasks();
        newTaskContent.value = "";
    }

    function editItem(index) {
        currentEditedIndex = index;
        editSection.hidden = false;
        newSection.hidden = true;
        editInput.value = tasks[index].title;
    }

    function confirmEdit() {
        if (currentEditedIndex === null) return;
        const nextValue = editInput.value.trim();
        if (nextValue === "") return;
        tasks[currentEditedIndex] = { title: nextValue, completed: tasks[currentEditedIndex].completed };
        saveTasks();
        renderTasks();
        exitEditMode();
    }

    confirmButton.addEventListener("click", () => {
        confirmEdit();
    });
    editInput.addEventListener("keydown", (event) => {
        event.key === "Enter" && confirmEdit();
    });

    cancelButton.addEventListener("click", () => {
        exitEditMode();
    });

    newTaskAdd.addEventListener("click", () => addItem());
    newTaskContent.addEventListener("keydown", (event) => {
        event.key === "Enter" && addItem();
    });

    renderTasks();

});
document.addEventListener("DOMContentLoaded", () => {
    let newTaskContent = document.getElementById("new-todo-item-title");
    let newTaskAdd = document.getElementById("new-todo-item-add");
    let todoList = document.getElementById("todo-list");

    function addItem() {
        let newItem = document.createElement("li")
        let newSpan = document.createElement("span")
        newSpan.innerText = newTaskContent.value
        let newDeleteButton = document.createElement("button")
        newDeleteButton.innerText = "Supprimer"
        newDeleteButton.addEventListener("click", () => {
            todoList.removeChild(newItem)
        })
        newItem.appendChild(newSpan)
        newItem.appendChild(newDeleteButton)
        todoList.appendChild(newItem)
        newTaskContent.value = ""
    }

    newTaskAdd.addEventListener("click", () => addItem())
    newTaskContent.addEventListener("submit", () => addItem())

})
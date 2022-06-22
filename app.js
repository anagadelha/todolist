'use strict';

let data = [];

const getData = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setData = (data) => localStorage.setItem('todoList', JSON.stringify(data));

const newItem = (task, status, index) => {
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-index=${index}>
        <div>${task}</div>
        <input type="button" value="X" data-index=${index}>
    `;
    document.getElementById('todoList').appendChild(item);
}

const cleanList = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

const updateList = () => {
    cleanList();
    const data = getData();
    data.forEach((item, index) => newItem (item.task, item.status, index));
}

const insertTask = (event) => {
    const keyPress = event.key;
    const description = event.target.value;
    if (keyPress == 'Enter'){
        const data = getData();
        data.push({task: description});
        setData(data);
        updateList();
        event.target.value = "";
    }
}

const removeItem = (index) => {
    const data = getData();
    data.splice (index, 1);
    setData(data);
    updateList();
}

const updateItem = (index) => {
    const data = getData();
    data[index].status = data[index].status == '' ? 'checked' : '';
    setData(data);
    updateList();
}

const clickItem = (event) => {
    const element = event.target;
    console.log(element);
    if (element.type == 'button') {
        const index = element.dataset.index;
        removeItem(index)
    } else if (element.type == 'checkbox') {
        const index = element.dataset.index;
        updateItem(index);
    }

}

document.getElementById("newTask").addEventListener('keypress', insertTask);
document.getElementById("todoList").addEventListener('click', clickItem);

updateList();
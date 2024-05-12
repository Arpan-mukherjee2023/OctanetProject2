// when the button + clicked
let createBtn = document.querySelector('.btn_add');
createBtn.addEventListener('click', function () {
    let parentElem = document.querySelector('.list-of-tasks');
    let taskItem = document.createElement('li');
    taskItem.style.display = "flex";
    taskItem.className = "item";

    // date input field
    let dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.id = 'date-input';

    // task input field
    let taskInput = document.createElement('input');
    taskInput.type = 'text';
    taskInput.id = 'task-input';

    // button for add
    let addbtn = document.createElement('button');
    addbtn.innerText = "add";
    addbtn.classList.add('crt');
    addbtn.onclick = function () {
        let data_date = document.querySelector('#date-input').value;
        let data_task = document.querySelector('#task-input').value;

        if (data_date === '' || data_task === '') {
            alert('No data added');
            return;
        }

        let currDate = new Date();
        let deadline = new Date(data_date);
        let dateMS = deadline - currDate;
        let daysLeft = Math.floor(dateMS / (1000 * 60 * 60 * 24)) + 1;

        localStorage.setItem(`D${daysLeft}`, data_task);
        // create all the elements
        let checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.id = 'check-item';

        let dateLabel = document.createElement('label');
        dateLabel.className = 'date';
        dateLabel.innerText = daysLeft;

        let taskLabel = document.createElement('label');
        taskLabel.innerText = data_task;

        let delBtn = document.createElement('button');
        delBtn.id = "delete-btn";
        delBtn.innerText = 'Del';

        // list items
        let parentElem = this.parentElement;
        delBtn.onclick = function () {
            let grandParent = parentElem.parentElement;
            let key = `D${this.parentNode.querySelector('.date').innerText}`;
            localStorage.removeItem(key);
            grandParent.removeChild(parentElem);
        }


        while (parentElem.firstElementChild) {
            parentElem.removeChild(parentElem.firstElementChild);
        }
        parentElem.appendChild(checkBox);
        parentElem.appendChild(dateLabel);
        parentElem.appendChild(taskLabel);
        parentElem.appendChild(delBtn);
    }

    // add childrens
    taskItem.appendChild(dateInput);
    taskItem.appendChild(taskInput);
    taskItem.appendChild(addbtn);

    parentElem.prepend(taskItem);
});

window.addEventListener('load', function () {
    for (let i = 0; i < this.localStorage.length; i++) {
        let key = this.localStorage.key(i);
        if (key.charAt(0) === 'D') {
            let taskItem = document.createElement('li');
            taskItem.style.display = "flex";
            taskItem.className = "item";


            let checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.id = 'check-item';

            let dateLabel = document.createElement('label');
            dateLabel.className = 'date';
            dateLabel.innerText = key.substring(1);

            let taskLabel = document.createElement('label');
            taskLabel.innerText = this.localStorage[key];

            let delBtn = document.createElement('button');
            delBtn.id = "delete-btn";
            delBtn.innerText = 'Del';

            delBtn.onclick = function () {
                let key = `D${this.parentNode.querySelector('.date').innerText}`;
                localStorage.removeItem(key);
                this.parentNode.remove();
            }


            taskItem.appendChild(checkBox);
            taskItem.appendChild(dateLabel);
            taskItem.appendChild(taskLabel);
            taskItem.appendChild(delBtn);

            document.querySelector('.list-of-tasks').prepend(taskItem);
        }
    }
})
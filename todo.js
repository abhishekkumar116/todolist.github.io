(function () {
    let tasks = [];

    const tasksList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const tasksCounter = document.getElementById('tasks-counter');

    console.log('working');

    async function fetchTodos() {
        //GET REQUEST
        // fetch('https://jsonplaceholder.typicode.com/todos')
        //     .then(function (response) {
        //         return response.json;
        //     }).then(function (data) {
        //         tasks = data.slice(0, 19);
        //         renderList();
        //     })
        //     .catch(function (error){
        //         console.log('error', error);
        //     })

        //}

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data = await response.json();
            tasks = data.slice(0, 10);
            renderList();
        } catch {
            console.log(error);
        }
    }

    function addTaskDOM(task) {
        const li = document.createElement('li');

        li.innerHTML = `
    
          <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
          <label for="${task.id}">${task.title}</label>
          <img src="bin.svg" class="delete" data-id="${task.id}" />
    
    `;
        tasksList.append(li);
    }

    function renderList() {
        tasksList.innerHTML = '';

        for (let i = 0; i < tasks.length; i++) {
            addTaskDOM(tasks[i]);
        }
        tasksCounter.innerHTML = tasks.length;
    };

    function toggleTask(taskId) {
        const task = tasks.filter(function (task) {
            return task.id == taskId;
        });

        if (task.length > 0) {
            const currentTask = tasks[0];
            currentTask.completed = !currentTask.done;

            renderList();
            showNotification("Task toggle successfully");
            return;
        }
        showNotification("could not toggle the task")
    }

    function deleteTask(taskId) {
        const newTask = tasks.filter(function (task) {
            return task.id !== Number(taskId);
        });

        tasks = newTask;
        renderList();
        showNotification("Task is deleted Successfully")
    }

    function addTask(task) {
        if (task) {
            // fetch('https://jsonplaceholder.typicode.com/todos', {
            //     method: 'POST',
            //     headers: {
            //         'Cotent-Type': 'application/json',
            //     },
            //     body: JSON.stringify(data),
            // }).then(function (response) {
            //     return response.json;
            // }).then(function (data) {
            //     tasks.push(task);
            //     renderList();
            //     showNotification("Task added successfully");

            // })
            // .catch(function (error){
            //     console.log('error', error);
            // })
            tasks.push(task);
            renderList();
            showNotification("Task added successfully");
            return;
        }
        showNotification("Task cannot be added");
    }

    function showNotification(text) {
        alert(text);
    }

    function handleInputkeypress(e) {
        if (e.key === 'Enter') {
            const text = e.target.value;

            if (!text) {
                showNotification("task test cannot be Empty");
                return;
            }
            const task = {
                title: text,
                id: Date.now(),
                completed: false
            }
            e.target.value = '';
            addTask(task);
        }
    }

    function hadleClickListener(e) {
        const target = e.target;

        if (target.className == 'delete') {
            const taskId = target.dataset.id;
            deleteTask(taskId);
            return;
        } else if (target.className == 'custom-checkbox') {
            const taskId = target.id;
            toggleTask(taskId);
            return;
        }

    }
    function initializeApp() {
        fetchTodos();
        addTaskInput.addEventListener('keyup', handleInputkeypress);

        document.addEventListener('click', hadleClickListener);

    }
    initializeApp();

})()


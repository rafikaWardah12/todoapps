document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("form");
  btn.addEventListener("submit", function (event) {
    event.preventDefault;
    addToDo();
  });
});

//JSON
{
  id: String;
  task: String;
  timeStamp: Date;
  isCompleted: Boolean;
}

function addToDo() {
  const textTodo = document.getElementById("title").value;
  const dateTodo = document.getElementById("date").value;

  //Mengambil id, task, timestamp, completed jdi object
  const idValue = generateId();
  const generateObjectValue = generateObject(
    idValue,
    textTodo,
    dateTodo,
    false
  );

  //Menampilkan di html/dipush (dimasukkan dlm array)
  todoInput.push(generateObjectValue);
  document.dispatchEvent(new Event(RENDER_EVENT));
}

//Generate data menjadi 1 object
function generateObject(id, task, timeStamp, isCompleted) {
  return {
    id,
    task,
    timeStamp,
    isCompleted,
  };
}

//generate ID
//kenapa ambil dari date? Karena sifatnya kan local, jadi tidak perlu dirandom. 1 user doang soalnya
function generateId() {
  return new Date();
}

let todoInput = [];
const RENDER_EVENT = "render-todo";

//Membuat list item todo
function makeToDo(generateObjectValue) {
  //Membuat task
  const textTitle = document.createElement("h2");
  textTitle.innerText = generateObjectValue.task;
  console.log(textTitle);

  //Membuat tanggal
  const date = document.createElement("p");
  date.innerText = generateObjectValue.timeStamp;

  //Membuat class grouping task, date
  const todoContainer = document.createElement("div");
  todoContainer.classList.add("todo", "shadow");
  todoContainer.append(textTitle, date);

  //Grouping class container
  const container = document.createElement("div");
  container.classList.add("todo");
  container.append(todoContainer);
  container.setAttribute("id", `todo-${generateObjectValue.id}`);
  

  
  //Membuat remove, add, undo
  if (!generateObjectValue.isCompleted) {
    //Dom untuk add
    const addTask = document.createElement("button");
    addTask.classList.add("check-button");

    addTask.addEventListener("click", function () {
      //Memanggil funciton addTasCompleted
      addTaskCompleted(generateObjectValue.id);
    });
    
    //Menambahkan icon button
    todoContainer.append(addTask);
  }
  
  return container;

}

//Submit Todo List sehingga diperlukan event handler
document.addEventListener(RENDER_EVENT, function () {
  console.log(todos);
  const uncompletedTODOList = document.getElementById("todos");
  // uncompletedTODOList.innerText = "";

  //Dilaksanakan apabila data msih ad di list
  for (const todoItem of todoInput) {
    const todoElement = makeToDo(todoItem);
    uncompletedTODOList.append(todoElement);
  }
});

//Membuat function untuk completed task
//1. Function buat cek apakah data sudah completed/belum. Disini akan menampilkan jga html js nya
//2. Function untuk add/remove/undo, parameter berdasarkan ID
//How cara find all? bikin functionnya

//Membuat function addtask/mengubah completed menjadi uncompleted
function addTaskCompleted(todoId) {
  const addTaskTarget = findId(todoId);
  //Jika Target Null
  if (addTaskTarget == null) {
    return null;
  } else {
    addTaskTarget.isCompleted = true;
  }
  document.dispatchEvent(new Event(RENDER_EVENT));
}

//Mencari id
function findId(todoIdTarget) {
  for (const todoItem in todos) {
    if (todoItem.id === todoIdTarget) {
      return todoIdTarget;
    }
  }
  return null;
}

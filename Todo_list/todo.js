const input = document.querySelector("#todoInput");
const btn = document.querySelector("#addBtn");
const list = document.querySelector("#todoList");
const danger = document.querySelector(".danger");
const clearBtn = document.querySelector("#clear-btn");
let isEditMode = false;

const API_URL = "https://jsonplaceholder.typicode.com/";

const getData = async () => {
  let current = JSON.parse(localStorage.getItem("demo"));
  if (current && current.length != 0) {
    current.forEach((item) => addToDOM(item));
    return;
  }
  // fetch(API_URL + "todos?_limit=5")
  //   .then((res) => res.json())
  //   .then((data) => {
  //     localStorage.setItem("demo", JSON.stringify(data));
  //     data.forEach((item) => addToDOM(item));
  //   });

  //using await
  const res = await fetch(API_URL + "todos?_limit=5");
  const data = await res.json();

  localStorage.setItem("demo", JSON.stringify(data));
  data.forEach((item) => addToDOM(item));
};

function addToDOM(item) {
  const li = document.createElement("li");
  li.className = "todo-item";
  li.appendChild(document.createTextNode(item.title));
  if (item.completed) {
    li.classList.add("completed");
  }
  li.setAttribute("data-id", item.id);
  li.addEventListener("contextmenu", deleteItem);
  li.addEventListener("click", updateItem);
  list.appendChild(li);
}

const createItem = (e) => {
  e.preventDefault();
  if (!input.value) {
    danger.textContent = "Please enter some value";
    danger.style.display = "block";
    return;
  } else {
    let value = input.value;
    // console.log("running");
    let isPresent = false;
    document.querySelectorAll(".todo-item").forEach((item) => {
      if (!isPresent) {
        item.textContent.toLowerCase() == value.toLowerCase()
          ? (isPresent = true)
          : "";
        // console.log("run");
      }
    });

    if (isPresent) {
      danger.textContent = "Item already present";
      danger.style.display = "block";
      // console.log("run");
      return;
    }

    if (isEditMode) {
      // const id = e.target.attributes.getNamedItem("data-id").value;
      // let id = document
      //   .querySelector(".edit")
      //   .attributes.getNamedItem("data-id").value;

      let id = document.querySelector(".edit").dataset.id;
      document.querySelectorAll(".todo-item").forEach((item, index) => {
        const itemId = item.attributes.getNamedItem("data-id").value;
        if (id === itemId) {
          document.querySelector(".edit").textContent = value;
          let current = JSON.parse(localStorage.getItem("demo"));

          current.splice(index, 1, { title: value, id });

          localStorage.setItem("demo", JSON.stringify(current));
        }
      });

      // console.log(
      //   Array.from(document.querySelectorAll(".todo-item")).sort((a, b) => {
      //     // console.log(id ? (id--, 1) : -1, id);
      //     console.log(`id :`, id);
      //     // id =
      //     // console.log(`updated :`, id);
      //     id = id && --id;
      //     console.log(`id : `, id);
      //     return id ? 1 : -1;
      //   })
      // );

      document
        .querySelectorAll(".todo-item")
        .forEach((item) => item.classList.remove("edit"));

      isEditMode = false;

      //TODO: Sort the Items

      let indexAt;
      let arr = JSON.parse(localStorage.getItem("demo"));
      arr.forEach((item, i) => {
        item.id == id ? (indexAt = i) : "";
      });
      let item = arr.splice(indexAt, 1);
      arr.unshift(item[0]);
      localStorage.setItem("demo", JSON.stringify(arr));
      // document.querySelectorAll(".todo-item").forEach((item) => item.remove());
      list.innerHTML = "";
      arr.forEach((item) => addToDOM(item));
      input.value = "";
      danger.style.display = "none";
      return;
    }

    danger.style.display = "none";
    // fetch(API_URL + "todos", {
    //   method: "POST",
    //   body: JSON.stringify({ title: value, completed: false }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    let current = JSON.parse(localStorage.getItem("demo")) || [];
    // current.push({ title: value, completed: false, id: current.length + 1 });
    let random = Math.random().toString(10).substring(2, 9);
    current.push({
      title: value,
      completed: false,
      id: random,
    });
    localStorage.setItem("demo", JSON.stringify(current));
    addToDOM({ title: value, id: random });
    input.value = "";
    // });
  }
};

function deleteItem(e) {
  // console.log(e.target.attributes.getNamedItem("data-id").value);
  if (isEditMode) return;
  const id = e.target.attributes.getNamedItem("data-id").value;
  document.querySelectorAll(".todo-item").forEach((item, index) => {
    const itemId = item.attributes.getNamedItem("data-id").value;
    if (id === itemId) {
      e.target.remove();
      let current = JSON.parse(localStorage.getItem("demo"));
      // let arrInd =
      current.splice(index, 1);
      // console.log(current, id - 1);
      localStorage.setItem("demo", JSON.stringify(current));
    }
  });
}

function updateItem(e) {
  // console.log(e.target.attributes.getNamedItem("data-id").value);
  list
    .querySelectorAll(".todo-item")
    .forEach((item) => item.classList.remove("edit"));

  isEditMode = true;

  input.value = e.target.textContent;
  input.focus();
  e.target.classList.add("edit");
  // console.log(document.querySelector(".edit"));
  // document.querySelectorAll(".todo-item").forEach((item, index) => {
  //   const itemId = item.attributes.getNamedItem("data-id").value;
  //   if (id === itemId) {
  //     e.target.remove();
  //     let current = JSON.parse(localStorage.getItem("demo"));
  //     // let arrInd =
  //     current.splice(index, 1);
  //     console.log(current, id - 1);
  //     localStorage.setItem("demo", JSON.stringify(current));
  //   }
  // });
  // createItem(e);
  // console.log(isEditMode);
  // document.querySelectorAll(".todo-item").forEach();
}

getData();

clearBtn.addEventListener("click", () => {
  localStorage.removeItem("demo");
  list.innerHTML = "";
});

btn.addEventListener("click", createItem);

const form = document.getElementById("main-form");
const input = document.getElementById("add-input");
const itemList = document.querySelector(".items");
const clearBtn = document.querySelector("#clear-btn");
const addBtn = document.querySelector(".add-btn");
const filterInput = document.querySelector("#filter-input");
let isEditMode = false;

function filterItems(e) {
  const items = itemList.querySelectorAll(".item");
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemText = item.querySelector("p").textContent.toLowerCase();
    // console.log(itemText.indexOf(text), text);

    /* indexOf returns index 0 for empty string i.e. start.indexOf('') => 0 (not -1)
     */

    if (itemText.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });

  // console.log(text, items);
}

function saveToLocalStorage(text) {
  // const data1 = [];

  let data1 = JSON.parse(localStorage.getItem("list"));
  data1 = data1 || [];

  // itemList.querySelectorAll(".item").forEach((item) => {
  // let text = item.querySelector("p").textContent;
  // console.log(text);

  data1.push(text);
  text = JSON.stringify(data1);

  // console.log(text);

  localStorage.setItem("list", text);

  // });
}

function addToDOM(inputValue) {
  const item = document.createElement("li");
  item.className = "item";

  const paragraph = document.createElement("p");
  paragraph.className = "text";

  paragraph.appendChild(document.createTextNode(inputValue));

  item.appendChild(paragraph);

  const button = createButton();
  item.appendChild(button);

  item.querySelector(".icon-container").addEventListener("click", (e) => {
    if (
      confirm(`do you want to delete ${item.querySelector("p").textContent}`)
    ) {
      let availableTask = JSON.parse(localStorage.getItem("list"));

      availableTask = availableTask.filter((text) =>
        text === inputValue ? false : true
      );

      localStorage.setItem("list", JSON.stringify(availableTask));
      item.remove();

      if (!itemList.querySelector("li")) {
        document.querySelector("#filter-form").style.display = "none";
        document.querySelector("#clear-btn").style.display = "none";
      }
    }
    e.stopPropagation();
  });

  item.addEventListener("click", (e) => {
    isEditMode = true;

    itemList.querySelectorAll(".item").forEach((item) => {
      item.classList.remove("edit-mode");
      addBtn.classList.remove("edit");
    });

    item.classList.add("edit-mode");
    addBtn.classList.add("edit");
    addBtn.innerHTML = `Update Item`;
    input.value = item.querySelector("p").textContent;
    input.focus();
  });

  itemList.append(item);
  input.value = "";
}

function addItem(e) {
  e.preventDefault();

  document.querySelector("#filter-form").style.display = "block";
  document.querySelector("#clear-btn").style.display = "block";

  const inputValue = input.value.trim();

  if (inputValue === "") {
    alert("please enter some value");
    return;
  }

  if (isEditMode) {
    const removeElement = itemList.querySelector(".edit-mode");
    const itemText = removeElement.querySelector("p").textContent;
    let updateArr = JSON.parse(localStorage.getItem("list")).filter((item, i) =>
      item == itemText ? false : true
    );

    localStorage.setItem("list", JSON.stringify(updateArr));

    addBtn.classList.remove("edit");
    removeElement.remove();
    addBtn.innerHTML = `+&nbsp;Add Item`;
    isEditMode = false;
  }

  //  Duplicate entry validation
  let items = JSON.parse(localStorage.getItem("list"));
  if (items && items.length != 0) {
    const newArr = items.map((item) => item.toLowerCase());
    if (newArr.indexOf(inputValue.toLowerCase()) != -1) {
      alert("item already exist");
      return;
    }
  }

  addToDOM(inputValue);
  saveToLocalStorage(inputValue);
}

function createButton() {
  const button = document.createElement("div");
  button.className = "icon-container";

  const icon = document.createElement("i");
  icon.className = "fa-solid fa-xmark";

  button.appendChild(icon);

  return button;
}

form.addEventListener("submit", addItem);

// clear Functionality
clearBtn.addEventListener("click", () => {
  const items = itemList.querySelectorAll(".item");
  // console.log(items);

  document.querySelector("#filter-form").style.display = "none";
  document.querySelector("#clear-btn").style.display = "none";

  if (!items.length) {
    alert("Nothing to remove...");
    return;
  }

  items.forEach((item) => item.remove());
  localStorage.removeItem("list");
});

filterInput.addEventListener("input", filterItems);

// IIFE implementation of showData function
(function () {
  let data = JSON.parse(localStorage.getItem("list"));
  let dataLength = data ? data.length : null;
  //If there is empty array then also data will result in true ,therefore use arr.length to check whether there is anything present in the array

  if (dataLength) {
    data.forEach((item) => {
      // const inputValue = item1;
      // addToDOM(inputValue);
      addToDOM(item);
    });
  } else {
    document.querySelector("#filter-form").style.display = "none";
    document.querySelector("#clear-btn").style.display = "none";
  }
})();

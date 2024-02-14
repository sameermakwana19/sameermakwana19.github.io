//initially render the stored task
// function showData() {
//   let data = JSON.parse(localStorage.getItem("list"));
//   let dataLength = data ? data.length : null; //If there is empty array then data will result in true.
//   // console.log(data);

//   if (dataLength) {
//     data.forEach((item1) => {
//       const inputValue = item1;
//       addToDOM(inputValue);
//       // console.log(item);
//     });
//   } else {
//     document.querySelector("#filter-form").style.display = "none";
//     document.querySelector("#clear-btn").style.display = "none";
//   }
// }
// showData();

// function updateItem(e) {
//   let data = JSON.parse(localStorage.getItem("list"));
//   console.log(data);
//   data.forEach((item) => {
//     if (item === e.target.textContent) {
//       input.value = item;
//     }
//   });
// }

// console.log(itemList);

// Below code is for static elements ( for testing purpose )

/* 
const items = itemList.querySelectorAll(".item");
items.forEach((item) => {
  const removeBtn = item.querySelector(".icon-container");
  console.log(item);
  removeBtn.addEventListener("click", () => {
    item.remove();
  });
});

*/

/* add item logic 
  const item = document.createElement("li");
  item.className = "item";

  const paragraph = document.createElement("p");
  paragraph.className = "text";

  paragraph.appendChild(document.createTextNode(inputValue));

  item.appendChild(paragraph);

  const button = createButton();
  item.appendChild(button);
  // console.log(item);

  item.querySelector(".icon-container").addEventListener("click", () => {
    if (
      confirm(`do you want to delete ${item.querySelector("p").textContent}`)
    ) {
      let availableTask = JSON.parse(localStorage.getItem("list"));

      availableTask = availableTask.filter((text) =>
        text === inputValue ? false : true
      );

      localStorage.setItem("list", JSON.stringify(availableTask));
      // console.log(availableTask);
      item.remove();

      if (!itemList.querySelector("li")) {
        document.querySelector("#filter-form").style.display = "none";
        document.querySelector("#clear-btn").style.display = "none";
      }
    }
  });

  // item.addEventListener("click", updateItem);

  itemList.append(item);
  input.value = "";

  */

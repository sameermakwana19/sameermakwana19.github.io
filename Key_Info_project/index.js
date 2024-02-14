const body = document.querySelector("body");
// const box = document.querySelector(".box");

function key(e) {
  const box = document.querySelector(".key");
  if (box.firstChild) {
    box.firstChild.remove();
  }

  const textNode = document.createTextNode(e.key);
  if (e.shiftKey) {
    // console.log(textNode);
    textNode.textContent = "Shift + " + textNode.textContent;
    // console.log(e.shiftKey);
  }
  if (e.key == " ") {
    textNode.textContent = "Space";
  }
  box.appendChild(textNode);
}
function keyCode(e) {
  const box = document.querySelector(".keycode");

  if (box.firstChild) {
    box.firstChild.remove();
  }

  const textNode = document.createTextNode(e.keyCode);

  if (e.shiftKey) {
    textNode.textContent = "Shift + " + textNode.textContent;
  }

  box.appendChild(textNode);
}
function Code(e) {
  const box = document.querySelector(".code");

  if (box.firstChild) {
    box.firstChild.remove();
  }

  const textNode = document.createTextNode(e.code);

  if (e.shiftKey) {
    textNode.textContent = "Shift + " + textNode.textContent;
  }

  box.appendChild(textNode);
}

body.addEventListener("keypress", (e) => {
  document.querySelector(".main").style.display = "flex";
  document.querySelector("h1").style.display = "none";
  key(e);
  keyCode(e);
  Code(e);
});

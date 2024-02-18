const boxes = document.querySelectorAll(".box");

const isChecked = [false, false, false, false, false, false];
let currentState = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // 1 -> for user 1 & -1 ->user2

let isGameOver = false;
let winner = 0; //  0 - Tie , 1 -> User1, -1 -> user2
let isUserOneTurn = true;

boxes.forEach((box, index) => {
  box.addEventListener("click", (e) => {
    if (isChecked[index]) {
      // console.log("returning at ", index);
      return;
    }

    // console.log(e.target);
    // console.log(e.currentTarget);

    isChecked[index] = true;
    e.target.classList.add("visible");

    if (isUserOneTurn) {
      box.querySelector("i").classList.add("fa-circle");
      box.querySelector("i").classList.add("fa-regular");
      currentState[index] = 1;
    } else {
      box.querySelector("i").classList.add("fa-xmark");
      box.querySelector("i").classList.add("fa-solid");
      currentState[index] = -1;
    }
    isUserOneTurn = !isUserOneTurn;
    // console.log(currentState);

    checkGameOver();

    if (isGameOver) {
      const modal = document.querySelector(".modal");
      if (!winner) {
        modal.innerHTML = "TIE.....";
        modal.style.opacity = 0.8;
        modal.style.zIndex = "10";
      } else {
        modal.innerHTML =
          winner === 1
            ? `User 1(O)&nbsp;&nbsp; WON`
            : `User 2(X)&nbsp;&nbsp; WON`;
        modal.style.opacity = 0.8;
        modal.style.zIndex = "10";
        // console.log("winner", winner);
      }
    }
  });
});

// winConditions = ["123", "147", "159", "258", "369", "357", "456", "789"]

function checkGameOver() {
  // 123-147-159 conditions
  // for user 1
  if (currentState[0] === 1) {
    if (currentState[1] === 1 && currentState[2] === 1) {
      // console.log("userone won 123");
      isGameOver = true;
      winner = 1;
      return;
    }

    if (currentState[3] === 1 && currentState[6] === 1) {
      // console.log("userone won 147");
      isGameOver = true;
      winner = 1;
      return;
    }

    if (currentState[4] === 1 && currentState[8] === 1) {
      // console.log("userone won 159");
      isGameOver = true;
      winner = 1;
      return;
    }
  }
  //for user 2
  if (currentState[0] === -1) {
    if (currentState[1] === -1 && currentState[2] === -1) {
      console.log("usertwo won 123");
      isGameOver = true;
      winner = -1;
      return;
    }

    if (currentState[3] === -1 && currentState[6] === -1) {
      // console.log("usertwo won 147");
      isGameOver = true;
      winner = -1;
      return;
    }
    if (currentState[4] === -1 && currentState[8] === -1) {
      // console.log("usertwo won 159");
      isGameOver = true;
      winner = -1;
      return;
    }
  }

  //  357-369  -conditions

  //for user 1
  if (currentState[2] === 1) {
    if (currentState[4] === 1 && currentState[6] === 1) {
      // console.log("userone won 357");
      isGameOver = true;
      winner = 1;
      return;
    }

    if (currentState[5] === 1 && currentState[8] === 1) {
      // console.log("userone won 369");
      isGameOver = true;
      winner = 1;
      return;
    }
  }
  // for user 2
  if (currentState[2] === -1) {
    if (currentState[4] === -1 && currentState[6] === -1) {
      // console.log("userTwo won 357");
      isGameOver = true;
      winner = -1;
      return;
    }

    if (currentState[5] === -1 && currentState[8] === -1) {
      // console.log("userTwo won 369");
      isGameOver = true;
      winner = -1;
      return;
    }
  }

  //258 - condition
  if (
    currentState[1] === -1 &&
    currentState[4] === -1 &&
    currentState[7] === -1
  ) {
    // console.log("usertwo won 258");
    isGameOver = true;
    winner = -1;
    return;
  }

  if (currentState[1] === 1 && currentState[4] === 1 && currentState[7] === 1) {
    // console.log("userOne won 258");
    isGameOver = true;
    winner = 1;
    return;
  }

  // 456 - condition
  if (
    currentState[3] === -1 &&
    currentState[4] === -1 &&
    currentState[5] === -1
  ) {
    // console.log("usertwo won 456");
    isGameOver = true;
    winner = -1;
    return;
  }

  if (currentState[3] === 1 && currentState[4] === 1 && currentState[5] === 1) {
    // console.log("userOne won 456");
    isGameOver = true;
    winner = 1;
    return;
  }

  // 789 condition
  if (
    currentState[6] === -1 &&
    currentState[7] === -1 &&
    currentState[8] === -1
  ) {
    // console.log("usertwo won 789");
    isGameOver = true;
    winner = -1;
    return;
  }

  if (currentState[6] === 1 && currentState[7] === 1 && currentState[8] === 1) {
    // console.log("userOne won 789");
    isGameOver = true;
    winner = 1;
    return;
  }

  if (currentState.indexOf(0) === -1) {
    isGameOver = true;
  }
}

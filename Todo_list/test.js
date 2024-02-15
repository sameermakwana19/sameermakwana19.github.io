let input = document.querySelector("#user-input");
const btn = document.querySelector("#submit-button");

let viewBtn = document.querySelector(".user-profile-link");
let img = document.querySelector(".user-avatar");
let name = document.querySelector(".user-name");
let email = document.querySelector(".user-email");
let company = document.querySelector(".user-company");
let location1 = document.querySelector(".user-location");
let created = document.querySelector(".user-created");
let link = document.querySelector(".user-profile-link");
let repo = document.querySelector(".user-public-repos");

btn.addEventListener("click", () => {
  let value = input.value.toLowerCase();
  if (input == "") {
    alert("please enter the user name ");
    return;
  } else {
    // console.log(input);
    fetch(`https://api.github.com/users/${value}`)
      .then((res) => {
        if (res.status === 404) {
          // alert("NOT FOUND");
          throw new Error("data not found");
        }
        return res.json();
      })
      .then((data) => {
        img.src = data.avatar_url || "null";
        name.innerHTML = data.name || "null";
        email.innerHTML = data.email || "email : null";
        company.innerHTML = `Company : ${data.company}`;
        location1.innerHTML = data.location
          ? `Location : ${data.location}`
          : `Location : Pluto`;
        // console.log(new Date(data.created_at).getFullYear());
        created.innerHTML =
          `Created on : ${new Date(data.created_at).getFullYear()}` ||
          "Created on : null";
        repo.innerHTML =
          `Public Repos : ${data.public_repos}` || "Repos data not found";
        link.href = data.html_url || "null";
        input.value = "";
      })
      .catch((error) => {
        console.log(error);
        // alert("no data found");
        alert(error);
      });
  }
});

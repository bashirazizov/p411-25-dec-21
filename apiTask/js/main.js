let postsWrapper = document.querySelector("#posts-wrapper");

let users;
let usersRequest = new XMLHttpRequest();
usersRequest.onload = function () {
  users = JSON.parse(usersRequest.responseText);
  getPosts();
};
usersRequest.open("get", "https://jsonplaceholder.typicode.com/users");
usersRequest.send();

function getPosts() {
  let postsRequest = new XMLHttpRequest();

  postsRequest.onload = function () {
    let response = JSON.parse(postsRequest.responseText);
    for (const post of response) {
      let postUser = users.find((user) => user.id == post.userId);

      let div = document.createElement("div");
      div.classList.add("post-item", "mb-4");

    //   let randomColor = Math.floor(Math.random() * 16777215).toString(16);
      
      let userHtml = `
      <div class="d-flex align-items-center mb-4">
        <div>
            <span class="avatar" style="background-color:rgb(${(Math.random() * 256) | 0},${(Math.random() * 256) | 0},${(Math.random() * 256) | 0})">
                ${postUser.name.charAt(0)}
            </span>
        </div>
        <div class="ms-3">
            <p class="mb-0">${postUser.name}</p>
            <p class="mb-0">${postUser.email}</p>
        </div>
      </div>
      `;

      let h2 = document.createElement("h2");
      h2.innerText = post.title;

      let p = document.createElement("p");
      p.innerText = post.body;

      div.innerHTML = userHtml;
      div.append(h2);
      div.append(p);

      postsWrapper.append(div);
    }
  };

  postsRequest.open("get", "https://jsonplaceholder.typicode.com/posts");

  postsRequest.send();
}

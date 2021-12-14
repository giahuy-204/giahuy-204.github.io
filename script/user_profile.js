var jwt = localStorage.getItem("jwt");
var uid = localStorage.getItem("uid");
var client = localStorage.getItem("client");

var task_counter = 0;
var available_counter = 0;
var completed_counter = 0;
var notdone_counter = 0;

if (jwt == null) {
  alert('You need to login before using this page');
  window.location.href = 'login.html';
}

console.log(jwt);
console.log(uid);
console.log(client);

function getUser() {
  const xhttp = new XMLHttpRequest();
  const xhttp_counter = new XMLHttpRequest();

  xhttp.open("GET", "https://herokutuan.herokuapp.com/profile");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.setRequestHeader("Access-Token", jwt);
  xhttp.setRequestHeader("Uid", uid);
  xhttp.setRequestHeader("Client", client);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        const objects = JSON.parse(this.responseText);
        document.getElementById("username").innerHTML = objects["email"];
        document.getElementById("created").innerHTML = objects["created_at"];
        document.getElementById("updated").innerHTML = objects["updated_at"];
      } else {
        alert('You need to login before using this page!')
        window.location.href = 'login.html'
        localStorage.removeItem("jwt");
        localStorage.removeItem("uid");
        localStorage.removeItem("client");
      }
    }
  };

  xhttp_counter.open("GET", "https://herokutuan.herokuapp.com/task_lists");
  xhttp_counter.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp_counter.setRequestHeader("Access-Token", jwt);
  xhttp_counter.setRequestHeader("Uid", uid);
  xhttp_counter.setRequestHeader("Client", client);
  xhttp_counter.send();
  xhttp_counter.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        const objects = JSON.parse(this.responseText);
        for (let list of objects) {
          available_counter++;
          task_counter += list["todo_count"];
          completed_counter += list["done_count"];
        }
        notdone_counter = task_counter - completed_counter;

        document.getElementById("available").innerHTML = available_counter;
        document.getElementById("task_available").innerHTML = task_counter;
        document.getElementById("completed").innerHTML = completed_counter;
        document.getElementById("notdone").innerHTML = notdone_counter;
      }
    }
  };
}

function logOut(e) {
  e.preventDefault();
  Swal.fire({
    title: 'Are you sure?',
    text: "You need to login again if you want to access this page!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes!'
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("jwt");
      localStorage.removeItem("uid");
      localStorage.removeItem("client");
      window.location.href = 'login.html'
    }
  })
}


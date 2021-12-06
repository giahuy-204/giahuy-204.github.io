var jwt = localStorage.getItem("jwt");
var uid = localStorage.getItem("uid");
var client = localStorage.getItem("client");

console.log(jwt);
console.log(uid);
console.log(client);

function getUser() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://herokutuan.herokuapp.com/profile");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.setRequestHeader("Access-Token", jwt);
    xhttp.setRequestHeader("Uid", uid);
    xhttp.setRequestHeader("Client", client);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {
            const objects = JSON.parse(this.responseText);
            document.getElementById("username").innerHTML = objects["email"];
            document.getElementById("created").innerHTML = objects["created_at"];
            document.getElementById("updated").innerHTML = objects["updated_at"];
          } else {
            alert ('You need to login before using this page!')
            window.location.href = 'login.html'
            localStorage.removeItem("jwt");
            localStorage.removeItem("uid");
            localStorage.removeItem("client");
          }
        }
      };
    }
    getUser();

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


window.onload = function() {


var jwt = localStorage.getItem("jwt");
if (jwt == null) {
    alert ('You need to login before using this page!')
    window.location.href = 'login.html'
}

function getUser() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://herokutuan.herokuapp.com/profile");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.setRequestHeader("Access-Token", "odsoe7lgPTkWf6JOYKBBhA");
    xhttp.setRequestHeader("Uid", "giahuy.dng@gmail.com");
    xhttp.setRequestHeader("Client", "yTGn6ExsDfHirQfZ7QbJ6Q");
    // xhttp.setRequestHeader("Authorization", "Bearer " + jwt);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          const objects = JSON.parse(this.responseText);
          console.log(objects);
          document.getElementById("username").innerHTML = objects["email"];
          document.getElementById("created").innerHTML = objects["created_at"];
          document.getElementById("updated").innerHTML = objects["updated_at"];
        }
      };
    }
    getUser();

function logout() {
    localStorage.removeItem("jwt");
    window.location.href = 'login.html'
 }

}

var jwt = localStorage.getItem("jwt");
var uid = null;
var client = null;

if (jwt != null) {
    alert ('Logged in, redirect you to profile page instead!')
    window.location.href = 'user_profile.html'
}

function loginFunction() { 
    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://herokutuan.herokuapp.com/auth/sign_in");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({
        "email": email,
        "password": password
    }));
 

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          const objects = JSON.parse(this.responseText);
          console.log(objects);
          jwt = xhttp.getResponseHeader('Access-Token');
          uid = xhttp.getResponseHeader('Uid');
          client = xhttp.getResponseHeader('Client');
          localStorage.setItem('jwt', jwt);
          localStorage.setItem('uid', uid);
          localStorage.setItem('client', client);
          console.log(jwt);
          console.log(uid);
          console.log(client);
          console.log(this.status);
          if (this.status == 200) {
            Swal.fire({
              text: 'Login successful',
              icon: 'success',
              confirmButtonText: 'OK'
              }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = 'user_profile.html';
              }
              });
          } else {
            Swal.fire({
              text: 'Login failed! Please check your credentials again',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }  
          } 
        }
        return false;
      };


var jwt = localStorage.getItem("jwt");
var uid = null;
var client = null;

if (jwt != null) {
  window.location.href = 'make_task.html';
}

function loginFunction() {
  var email = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  if (email == "") {
    Swal.fire({
      text: 'Login failed! Your email is null',
      icon: 'error',
      confirmButtonText: 'OK'
    });
    return false;
  } else if (password == "") {
    Swal.fire({
      text: 'Login failed! Your password is null',
      icon: 'error',
      confirmButtonText: 'OK'
    });
    return false;
  } else {
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
            text: 'Login failed! Your account is not existed. Check your email or password again',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      }
    }
    return false;
  }
};


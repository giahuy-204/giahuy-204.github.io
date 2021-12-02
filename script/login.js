var jwt = localStorage.getItem("jwt");
if (jwt != null) {
    alert ('Logged in, redirect you to profile page instead!')
    window.location.href = 'user_profile.html'
}

function loginFunction() {
    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://herokutuan.herokuapp.com/auth/sign_in");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "email": email,
        "password": password
    }));

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          const objects = JSON.parse(this.responseText);
          console.log(objects);
            localStorage.setItem("jwt", objects['Access-Token']);
            Swal.fire({
              text: objects['message'],
              icon: 'success',
              confirmButtonText: 'OK'
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = 'index.html';
              }
            });
        //   } else {
        //     Swal.fire({       
        //       text: objects['message'],
        //       icon: 'error',
        //       confirmButtonText: 'OK'
        //     });
        //   }
        }
      };
    return false;
}

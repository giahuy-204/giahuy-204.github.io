function registerFunction() {
    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://herokutuan.herokuapp.com/auth");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({
        "email": email,
        "password": password
    }));

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                Swal.fire({
                  text: 'Register successful',
                  icon: 'success',
                  confirmButtonText: 'OK'
                  }).then((result) => {
                  if (result.isConfirmed) {
                    window.location.href = 'login.html';
                  }
                  });
            } else {
                Swal.fire({
                    text: 'Register failed! Please check your credentials again',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }  
        }
      }
      return false
    
}

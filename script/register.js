function registerFunction() {
    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://herokutuan.herokuapp.com/auth");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "email": email,
        "password": password
    }));

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          const objects = JSON.parse(this.responseText);
          if (document.getElementById("username").value == "") {
        document.getElementById("validation_username").innerHTML = "Please fill in Username!";
        document.getElementById("username").style.border='2px solid red';
        return false;
    } else {
        document.getElementById("validation_username").innerHTML = "";
        document.getElementById("username").style.border='1px solid currentColor';
        console.log(objects);
        Swal.fire({
          text: objects['message'],
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = 'login.html';
          }
        });
    }

    if (document.getElementById("password").value == "") {
        document.getElementById("validation_password").innerHTML = "Please fill in Password!";
        document.getElementById("password").style.border='2px solid red';
        return false;
    } else {
        document.getElementById("validation_password").innerHTML = "";
        document.getElementById("password").style.border='1px solid currentColor';
    }

    if (document.getElementById("confirm_password").value != "") {
        if (document.getElementById("confirm_password").value == document.getElementById("password").value) {
            document.getElementById("validation_confirm_password").innerHTML = "";
            document.getElementById("confirm_password").style.border='1px solid currentColor';
        }
        else {
            document.getElementById("validation_confirm_password").innerHTML = "Please match confirm password with current password!";
            document.getElementById("confirm_password").style.border='2px solid red';
            return false;
        }
    } else {
        document.getElementById("validation_confirm_password").innerHTML = "Please fill in Confirm password!";
        document.getElementById("confirm_password").style.border='2px solid red';
        return false;
    }
         
        }
      };
      return false
    
}

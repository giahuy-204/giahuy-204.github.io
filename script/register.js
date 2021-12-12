function registerFunction() {
    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const c_password = document.getElementById("confirm_password").value;

    if (email == "") {
        Swal.fire({
            text: 'Register failed! Your email is null',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return false;
    } else if (password == "") {
        Swal.fire({
            text: 'Register failed! Your password is null',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return false;
    } else if (password != c_password) {
        Swal.fire({
            text: 'Register failed! Your confirm password is not matching your current password',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return false;
    } else {
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
                        text: 'Register failed! Your email existed',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }
        }
        return false;
    }
}

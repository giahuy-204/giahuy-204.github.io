var jwt = localStorage.getItem("jwt");
var uid = localStorage.getItem("uid");
var client = localStorage.getItem("client");

if (jwt == null) {
    window.location.href = 'login.html';
}

function passwordFunction() {
    const old_password = document.getElementById("old_password").value;
    const password = document.getElementById("password").value;
    const confirm_password = document.getElementById("confirm_password").value;

    let isnum = /^\d+$/.test(password);

    if (old_password == "") {
        Swal.fire({
            text: 'Change password failed! Your old password is null.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return false;
    } else if (password == "") {
        Swal.fire({
            text: 'Change password failed! Your new password is null.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return false;
    } else if (password != confirm_password) {
        Swal.fire({
            text: 'Change password failed! Your confirm password is not matching your new password.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return false;
    } else if (isnum == true) {
        Swal.fire({
            text: 'Change password failed! Your new password must contain at least 1 character.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return false;
    } else {
        const xhttp = new XMLHttpRequest();
        xhttp.open("PATCH", "https://herokutuan.herokuapp.com/auth/password");
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.setRequestHeader("Access-Token", jwt);
        xhttp.setRequestHeader("Uid", uid);
        xhttp.setRequestHeader("Client", client);
        xhttp.send(JSON.stringify({
            "password": password,
            "password_confirmation": confirm_password
        }));

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    Swal.fire({
                        text: 'Change password successful.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload();
                        }
                    });
                } else {
                    Swal.fire({
                        text: 'Change password failed! Your old password is not matching your current password',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }
        }
        return false;
    }
}
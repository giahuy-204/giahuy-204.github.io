
var jwt = null;
jwt = localStorage.getItem("jwt");

if (jwt != null) {
    document.getElementById("login").style.display = "none";
    document.getElementById("register").style.display = "none";
} else {
    document.getElementById("change_password").style.display = "none";
    document.getElementById("profile").style.display = "none";
    document.getElementById("logout").style.display = "none";
}

function logOut(e) {
    e.preventDefault();
    Swal.fire({
        title: 'Are you sure?',
        text: "You might need to login again if you want to access some page!",
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
            localStorage.removeItem("selectedFolder");
            localStorage.removeItem("selectedUpdateFolderText");
            Swal.fire({
                text: 'Logged out!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = 'index.html'
                }
            })

        }
    })
}


var jwt = null;
jwt = localStorage.getItem("jwt");
console.log(jwt);

if (jwt != null) {
    document.getElementById("login").style.display = "none";
    document.getElementById("register").style.display = "none";
} else {
    document.getElementById("profile").style.display = "none";
    document.getElementById("logout").style.display = "none";
}

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
            Swal.fire({
                text: 'Logged out!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem("jwt");
                    localStorage.removeItem("uid");
                    localStorage.removeItem("client");
                    window.location.href = 'index.html'
                }
            })

        }
    })
}

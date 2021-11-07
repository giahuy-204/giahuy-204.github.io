function loginFunction() {
    var username = "admin";
    var password = "admin";
    if(document.getElementById("username").value === username) {
    if (document.getElementById("password").value === password) {           
        alert('Login successfully');
        return true;
        // jQuery(window).load(function() {
        // sessionStorage.setItem('status', 'loggedIn')
        // });
    }
    else {
        document.getElementById("validation_password").innerHTML = "Wrong password!";
        document.getElementById("password").style.border='2px solid red';
        document.getElementById("validation_username").innerHTML = "";
        document.getElementById("username").style.border='1px solid currentColor';
        return false;
    }
    }
    else {
        document.getElementById("validation_username").innerHTML = "Wrong username!";
        document.getElementById("username").style.border='2px solid red';
        return false;
    }
}

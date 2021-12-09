var jwt = localStorage.getItem("jwt");
var uid = localStorage.getItem("uid");
var client = localStorage.getItem("client");

console.log(jwt);
console.log(uid);
console.log(client);

if (jwt == null) {
    alert ('You need to login before using this page');
    window.location.href = 'login.html';
}

let serverUrl = 'http://herokutuan.herokuapp.com';

function addTaskFunction() {
    var taskName = document.getElementById('addTask_name').value;
    if (taskName == "") {
        Swal.fire({
            text: 'Please give your task a name!',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } else {
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", `${serverUrl}/task_lists`);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.setRequestHeader("Access-Token", jwt);
        xhttp.setRequestHeader("Uid", uid);
        xhttp.setRequestHeader("Client", client);
        xhttp.send(JSON.stringify({
            "name": taskName
        }));

        
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 201) {
                    Swal.fire({
                        text: 'Successful created task! You can create another task or cancel now.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                } else {
                    Swal.fire({
                        text: 'Something wrong!',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }
        };
    }
      
}

// const objects = JSON.parse(this.responseText);

//             var task_lists = document.getElementById("task_lists");

//             var th_id = document.createElement("th");
//             th_id.innerHTML = objects["id"];

//             var td_name = document.createElement("td");
//             td_name.innerHTML = objects["name"];

//             var td_created = document.createElement("td");
//             td_created.innerHTML = objects["created_at"];

//             task_lists.appendChild(th_id);
//             task_lists.appendChild(td_name);
//             task_lists.appendChild(td_created);

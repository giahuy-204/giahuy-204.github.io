var jwt = localStorage.getItem("jwt");
var uid = localStorage.getItem("uid");
var client = localStorage.getItem("client");

var counter = 0;

if (jwt == null) {
    alert('You need to login before try to make a task!');
    window.location.href = 'login.html';
}

let serverUrl = 'https://herokutuan.herokuapp.com';

function fetchTaskFunction() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `${serverUrl}/task_lists`);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.setRequestHeader("Access-Token", jwt);
    xhttp.setRequestHeader("Uid", uid);
    xhttp.setRequestHeader("Client", client);
    xhttp.send();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                const objects = JSON.parse(this.responseText);
                if (objects.length === 0) {
                    document.getElementById("table").style.display = "none";
                    document.getElementById("share").style.display = "none";
                    document.getElementById("notify").innerHTML = "Your task is empty! Start to make some by press the button below";
                } else {
                    for (let list of objects) {
                        //create random text for td detail test
                        var tokens = ['Apple', 'Banana', 'The', 'Task'];
                        var text = '';
                        for (var i = 0; i < 11; i++) {
                            text += tokens[Math.floor(Math.random() * tokens.length)];
                        }

                        const task_lists = document.getElementById("task_lists");

                        const tr = document.createElement("tr");
                        const th_id = document.createElement("th");
                        const td_name = document.createElement("td");
                        const td_status = document.createElement("td");
                        const td_deadline = document.createElement("td");
                        const td_details = document.createElement("td");
                        const td_options = document.createElement("td");

                        const edit_button = document.createElement("button");
                        const completed_button = document.createElement("button");
                        const move_button = document.createElement("button");
                        const delete_button = document.createElement("button");

                        const edit_i = document.createElement("i");
                        const completed_i = document.createElement("i");
                        const move_i = document.createElement("i");
                        const delete_i = document.createElement("i");

                        th_id.scope = "row";

                        edit_button.className = "btn btn-primary";
                        edit_button.title = "Edit";
                        edit_button.setAttribute("data-toggle", "modal");
                        edit_button.setAttribute("data-target", "#editModal");
                        edit_i.className = "fa fa-pencil-square-o";

                        completed_button.className = "btn btn-success";
                        completed_button.title = "Mark as completed";
                        completed_button.setAttribute("data-toggle", "modal");
                        completed_button.setAttribute("data-target", "#completedModal");
                        completed_i.className = "fa fa-check-square-o";

                        move_button.className = "btn btn-warning";
                        move_button.title = "Move to another folder";
                        move_button.setAttribute("data-toggle", "modal");
                        move_button.setAttribute("data-target", "#moveModal");
                        move_i.className = "fa fa-exchange";

                        delete_button.className = "btn btn-danger";
                        delete_button.title = "Delete";
                        delete_button.setAttribute("data-toggle", "modal");
                        delete_button.setAttribute("data-target", "#deletedModal");
                        delete_i.className = "fa fa-trash-o";

                        th_id.setAttribute("id", list["id"]);

                        th_id.innerHTML = counter + 1;
                        td_name.innerHTML = list["name"];
                        if (list["done_count"] == 0) {
                            td_status.innerHTML = "Not done";
                        } else {
                            td_status.innerHTML = "Done";
                        }

                        td_deadline.innerHTML = "dd/mm/yyyy";
                        td_details.innerHTML = text;

                        //create table
                        task_lists.appendChild(tr);
                        tr.appendChild(th_id);
                        tr.appendChild(td_name);
                        tr.appendChild(td_status);
                        tr.appendChild(td_deadline);
                        tr.appendChild(td_details);
                        tr.appendChild(td_options);

                        td_options.appendChild(edit_button);
                        edit_button.appendChild(edit_i);

                        td_options.appendChild(completed_button);
                        completed_button.appendChild(completed_i);

                        td_options.appendChild(move_button);
                        move_button.appendChild(move_i);

                        td_options.appendChild(delete_button);
                        delete_button.appendChild(delete_i);

                        const btn = document.getElementsByClassName("btn btn-danger")[counter];
                        btn.addEventListener('click', function () {
                            let confirm = document.getElementById('delete_btn');
                            confirm.addEventListener('click', function () {
                                xhttp.open("DELETE", `${serverUrl}/task_lists/${th_id.id}`);
                                xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                                xhttp.setRequestHeader("Access-Token", jwt);
                                xhttp.setRequestHeader("Uid", uid);
                                xhttp.setRequestHeader("Client", client);
                                xhttp.send();
                                Swal.fire({
                                    text: 'Task deleted! Reload webpage',
                                    icon: 'success',
                                    confirmButtonText: 'OK'
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        location.reload();
                                    }
                                })
                            });
                        });
                        counter++;
                    }
                }
            }
        }
    }
}

function searchFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

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

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 201) {
                    Swal.fire({
                        text: 'Successful created task! Reload webpage',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
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
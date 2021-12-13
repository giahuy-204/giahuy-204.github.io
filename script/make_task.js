var jwt = localStorage.getItem("jwt");
var uid = localStorage.getItem("uid");
var client = localStorage.getItem("client");
let counter = 0;
let id_counter = 0;
const deletefolder_lists = document.getElementById("deletefolder_lists")
const addtaskfolders_lists = document.getElementById("addtaskfolders_lists")

if (jwt == null) {
    alert('You need to login before try to make a task!');
    window.location.href = 'login.html';
}

let serverUrl = 'https://herokutuan.herokuapp.com';

// document.getElementById('folder_lists').onchange = function () {
//     localStorage.setItem('selectedtem', document.getElementById('folder_lists').value);
// };

// if (localStorage.getItem('selectedtem')) {
//     document.getElementById('folder_lists').options[localStorage.getItem('selectedtem')].selected = true;
// }

function loadingFolders() {
    const folder_lists = document.getElementById("folder_lists");

    document.getElementById("table").style.display = "none";
    document.getElementById("share").style.display = "none";
    document.getElementById("btn_addtask").style.display = "none";
    document.getElementById("notify").innerHTML = "Select a folder to begin with. <br>If you don't have a folder, make one.";

    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `${serverUrl}/task_lists`);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.setRequestHeader("Access-Token", jwt);
    xhttp.setRequestHeader("Uid", uid);
    xhttp.setRequestHeader("Client", client);
    xhttp.send();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            const objects = JSON.parse(this.responseText);
            for (let list of objects) {

                options = document.createElement("option");
                options.innerHTML = list["name"];
                options.value = list["id"];

                delete_options = document.createElement("option");
                delete_options.innerHTML = list["name"];
                delete_options.value = list["id"];

                addtask_options = document.createElement("option");
                addtask_options.innerHTML = list["name"];
                addtask_options.value = list["id"];

                folder_lists.appendChild(options);
                deletefolder_lists.appendChild(delete_options);
                addtaskfolders_lists.appendChild(addtask_options);
            }
        }
    };
}

function selectFolder() {
    document.getElementById("table").style.display = "inline";
    document.getElementById("share").style.display = "inline";
    document.getElementById("btn_addtask").style.display = "inline";
    document.getElementById("notify").innerHTML = "";
    counter = 0;
    $("#task_lists").empty();
    fetchTask();
}

function fetchTask() {
    let selected = folder_lists.options[folder_lists.selectedIndex].value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `${serverUrl}/task_lists/${selected}/todos`);
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
                        const task_lists = document.getElementById("task_lists");

                        const tokens = ['Gone', 'Four', 'Them', 'Task'];
                        let text = '';
                        for (let i = 0; i < 11; i++) {
                            text += tokens[Math.floor(Math.random() * tokens.length)];
                        }

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

                        edit_button.className = "btn btn-primary 1";
                        edit_button.title = "Edit";
                        edit_button.setAttribute("data-toggle", "modal");
                        edit_button.setAttribute("data-target", "#editModal");
                        edit_i.className = "fa fa-pencil-square-o";

                        completed_button.className = "btn btn-success 1";
                        completed_button.title = "Mark as completed";
                        completed_button.setAttribute("data-toggle", "modal");
                        completed_button.setAttribute("data-target", "#completedModal");
                        completed_i.className = "fa fa-check-square-o";

                        move_button.className = "btn btn-warning 1";
                        move_button.title = "Move to another folder";
                        move_button.setAttribute("data-toggle", "modal");
                        move_button.setAttribute("data-target", "#moveModal");
                        move_i.className = "fa fa-exchange";

                        delete_button.className = "btn btn-danger 1";
                        delete_button.title = "Delete";
                        delete_button.setAttribute("data-toggle", "modal");
                        delete_button.setAttribute("data-target", "#deletedModal");
                        delete_i.className = "fa fa-trash-o";

                        th_id.innerHTML = counter + 1;
                        td_name.innerHTML = list["name"];
                        if (list["done"] = "null") {
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

                        const btn_delete = document.getElementsByClassName("btn btn-danger 1")[counter];
                        btn_delete.addEventListener('click', function () {
                            document.getElementById("delete_label1").innerHTML = 'Are you sure you want to delete <span class = "thick">' + list["name"] + "</span> task?";
                            document.getElementById("delete_label2").innerHTML = "Action can't be revert!"
                            let confirm = document.getElementById('delete_btn');
                            confirm.addEventListener('click', function () {
                                xhttp.open("DELETE", `${serverUrl}/task_lists/${selected}/todos/${list["id"]}`);
                                xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                                xhttp.setRequestHeader("Access-Token", jwt);
                                xhttp.setRequestHeader("Uid", uid);
                                xhttp.setRequestHeader("Client", client);
                                xhttp.send();
                                Swal.fire({
                                    text: 'Task deleted! Reload webpage to make it appears or click outside to continue your work.',
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

function search() {
    let input, filter, table, tr, td, i, txtValue;
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

function addFolder() {
    let folderName = document.getElementById('addFolder_name').value;
    if (folderName == "") {
        Swal.fire({
            text: 'Please give your folder a name!',
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
            "name": folderName
        }));

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 201) {
                    Swal.fire({
                        text: 'Successful created folder! Reload webpage to make it appears or click outside to continue your work.',
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

function deleteFolder() {
    let selected = deletefolder_lists.value;
    let text = deletefolder_lists.options[deletefolder_lists.selectedIndex].text;
    if (selected) {
        Swal.fire({
            title: 'Are you sure?',
            html: "You are about to delete <span class = 'thick'>" + text + "</span> folder! <p class = thick> Action can't be revert after</p>",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.isConfirmed) {
                const xhttp = new XMLHttpRequest();
    
                xhttp.open("DELETE", `${serverUrl}/task_lists/${selected}`);
                xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xhttp.setRequestHeader("Access-Token", jwt);
                xhttp.setRequestHeader("Uid", uid);
                xhttp.setRequestHeader("Client", client);
                xhttp.send();
                Swal.fire({
                    text: 'Folder deleted! Reload webpage to make it appears or click outside to continue your work.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.reload();
                    }
                })
            }
        })
    } else {
        Swal.fire({
            text: 'Please choose folder `(*>﹏<*)′',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}

function addTask() {
    const task_name = document.getElementById("addTask_name").value;
    let folder_value = addtaskfolders_lists.value;
    if (task_name == "") {
        Swal.fire({
            text: 'Oopsie hold on task name is empty 😂',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } else {
        const xhttp = new XMLHttpRequest();

        xhttp.open("POST", `${serverUrl}/task_lists/${folder_value}/todos`);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.setRequestHeader("Access-Token", jwt);
        xhttp.setRequestHeader("Uid", uid);
        xhttp.setRequestHeader("Client", client);
        xhttp.send(JSON.stringify({
            "name": task_name
        }));

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 201) {
                    Swal.fire({
                        html: "<span class = 'thick'>" + task_name + "</span> task added! Reload webpage to make it appears or click outside to continue your work.",
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    })
                } else {
                    Swal.fire({
                        text: 'Please choose folder `(*>﹏<*)′',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }
        }
    };
}
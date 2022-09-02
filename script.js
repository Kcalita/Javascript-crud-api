function loadinfo() 
{
    const xhttp = new XMLHttpRequest()
    xhttp.open("GET", "https://gorest.co.in/public/v2/users", true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8"),
    xhttp.setRequestHeader(
            "Authorization",
            "Bearer b570480fdd257112e2a35414dc1ea4321894d039e061e965a6f361fc360ad979"
        );
    xhttp.send();
    xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
            var html_data = "";
            var user = JSON.parse(this.responseText);
            console.log(this.responseText);
            user.map((user) => {
                html_data += "<tr>";
                html_data += "<td>" + user["id"] + "</td>";
                html_data += "<td>" + user["name"] + "</td>";
                html_data += "<td>" + user["email"] + "</td>";
                html_data += "<td>" + user["gender"] + "</td>";
                html_data += "<td>" + user["status"] + "</td>";
                html_data += "<td><button type='button' onclick='getinfo(" + user["id"] + ")'>EDIT</button></td>";
                html_data += "<td><button type='button' onclick='deleteinfo(" + user["id"] + ")'>DELETE</button></td>";    
                html_data += "</tr>";
                })
               document.getElementById("tablebody").innerHTML = html_data;
        }
    }
}

function addinfo() {
    const name1 = document.getElementById("name1").value;
    const email1 = document.getElementById("email1").value;
    const gender1 = document.getElementById("gender1").value;
    const status1 = document.getElementById("status1").value;
    const xhttp = new XMLHttpRequest()
    xhttp.open("POST", "https://gorest.co.in/public/v2/users");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.setRequestHeader(
        "Authorization",
        "Bearer b570480fdd257112e2a35414dc1ea4321894d039e061e965a6f361fc360ad979"
    );
    xhttp.send(
        JSON.stringify({
            name: name1,
            email: email1,
            gender: gender1,
            status: status1,
        })
    );
    xhttp.onreadystatechange = function () {
            if (this.status == 422){
                document.getElementById("servererr").innerHTML = this.responseText;
                return false;
            }
            
            if (this.readyState == 4 && this.status == 200) {
                var user = JSON.parse(this.responseText);
                console.log(user); 
            }
            loadinfo();
            resetForm();
            enterdetail();
       }
}  


//const button = document.getElementById("btn1");
//button.addEventListener("click",enterdetail());
//button.addEventListener("click",editdetail());

function enterdetail(){
    const form = document.getElementById("data");
    if(form.style.display === 'none'){
        form.style.display = 'block';
    }
    else{
        form.style.display = 'none';
    }

}

function editdetail(){
    const form = document.getElementById("data");
    if(form.style.display === 'none'){
        form.style.display = 'block';
    }
    else{
        form.style.display = 'none';
    }
}


function editinfo(){
    var id = document.getElementById("id").value;
    var name2 = document.getElementById("name1").value;
    var email2 = document.getElementById("email1").value;
    var gender2 = document.getElementById("gender1").value;
    var status2 = document.getElementById("status1").value;
    //'id ->', id;
    const xhttp = new XMLHttpRequest()
    xhttp.open("PATCH", `https://gorest.co.in/public/v2/users/${id}`);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader(
        "Authorization",
        "Bearer b570480fdd257112e2a35414dc1ea4321894d039e061e965a6f361fc360ad979"
    );
        xhttp.send(
        JSON.stringify({
            name: name2,
            email: email2,
            gender: gender2,
            status: status2,
        })
    );
    xhttp.onreadystatechange = function () {
        this.readyState, this.status
        if (this.readyState == 4 && this.status == 200) {
            this.responseText;
            //const objects = JSON.parse(this.responseText);
            console.log(this.responseText);
            }
            loadinfo();
            resetForm();
            enterdetail();
    }    
}

function getinfo(id){
           
        document.getElementById("id").value = id;
        editdetail();
        console.log("Edit",id);
        const xhttp = new XMLHttpRequest();
        xhttp.open("GET", `https://gorest.co.in/public/v2/users/${id}`, true);
        xhttp.setRequestHeader("Accept", "application/json");
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.setRequestHeader("Authorization","Bearer b570480fdd257112e2a35414dc1ea4321894d039e061e965a6f361fc360ad979");
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
            var user1 = JSON.parse(this.responseText);
            console.log(user1);
            document.getElementById("name1").value = user1["name"];
            document.getElementById("email1").value = user1["email"];
            document.getElementById("gender1").value = user1["gender"];
            document.getElementById("status1").value = user1["status"];
        }
    }
    
}


/*function getGender(gender, ourvalue) {
    if (gender === ourvalue){
       return "checked"
    }
    else return ""
}
function getStatus(status) {
    if (status === "inactive"){ 
        return "selected"
    }
}*/


function deleteinfo(id){
    var result = confirm("Do you surely want to delete this?");
    if(result){
    //console.log("Delete", id)
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "https://gorest.co.in/public/v2/users/" + id);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.setRequestHeader("Authorization","Bearer b570480fdd257112e2a35414dc1ea4321894d039e061e965a6f361fc360ad979");
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const user = JSON.parse(this.responseText)
            console.log(user);
            }
            loadinfo();
    }
    
  }
}

function printError(elemId, msg){
    document.getElementById(elemId).innerHTML = msg;
}

function validate(){
    
    const name = document.getElementById("name1");
    const email = document.getElementById("email1");
    const gender = document.getElementById("gender1");
    const status = document.getElementById("status1");
    const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    var nameErr = emailErr = genderErr = statusErr = true;
    
    if(name.value == ""){
        printError("nameErr","Please enter your name!");
    }
    else{
        printError("nameErr","");
        nameErr = false;
    }
    if(email.value == "" || !regEmail.test(email.value)){
        printError("emailErr","Please enter valid Email id!");
    }
    else{
       printError("emailErr","");
       emailErr = false;
    }
    if(gender.value == ""){
        printError("genderErr","Select your Gender!");
    }
    else{
        printError("genderErr","");
        genderErr = false;
    }
    if(status.value == ""){
        printError("statusErr","Select the Status!");
    }
    else{
        printError("statusErr","");
        statusErr = false;
    }
    if((nameErr || emailErr || genderErr || statusErr) == true) {
        return false;
    } 
    else {
        if(!document.getElementById("id").value){
            addinfo();
        }
        else{
            editinfo();
        }
    }  
}  
function resetForm() {
    //document.getElementById("id").value = "";
    document.getElementById("name1").value = "";
    document.getElementById("email1").value = "";
    document.getElementById("gender1").value = "";
    document.getElementById("status1").value = "";
    
}

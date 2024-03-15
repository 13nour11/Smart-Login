var signupNameInput = document.getElementById("Name");
var signupEmailInput = document.getElementById("Email");
var signupPassInput = document.getElementById("Password");
var loginEmailInput = document.getElementById("email");
var loginPassInput = document.getElementById("password");

var signupArr = (localStorage.getItem("signUpInfo") != null) ?  JSON.parse(localStorage.getItem("signUpInfo")) : [];
/*
if(localStorage.getItem("signUpInfo") != null){
        signupArr = JSON.parse(localStorage.getItem("signUpInfo"));
    
}
*/

// sign up function as make object , push at array , store at localStorage
function addSignUp(){
    // localStorage.removeItem("signUpInfo")
    var obj = {
        name: signupNameInput.value,
        email: signupEmailInput.value,
        pass: signupPassInput.value
    }
    if(signupNameInput.value == '' || signupEmailInput.value == '' || signupPassInput.value == ''){
        // signupParagraphResult.classList.add("text-danger");
        // signupParagraphResult.innerHTML = "All inputs is required";
        document.getElementById("error").classList.replace("d-none","d-block");
        document.getElementById("repeat").classList.replace("d-block","d-none");
        document.getElementById("success").classList.replace("d-block","d-none");
        return;
    }
    for(var i =0; i<signupArr.length;i++){
        if(obj.email == signupArr[i].email){
            // signupParagraphResult.classList.add("text-danger");
            // signupParagraphResult.innerHTML = "email already exists";
            document.getElementById("error").classList.replace("d-block","d-none");
            document.getElementById("repeat").classList.replace("d-none","d-block");
            document.getElementById("success").classList.replace("d-block","d-none");
            return;
        }
    }
    signupArr.push(obj);
    // console.log(signupArr);
    localStorage.setItem("signUpInfo",JSON.stringify(signupArr));
    document.getElementById("error").classList.replace("d-block","d-none");
    document.getElementById("repeat").classList.replace("d-block","d-none");
    document.getElementById("success").classList.replace("d-none","d-block");

    // signupParagraphResult.classList.add("text-success");
    // signupParagraphResult.innerHTML = "Congratulations!";
    // return signupArr;
}

// sign in function as compare if the login inputs email and pass same what are at the local storage which is done at signin
function signin(){
    var info = {
        email: loginEmailInput.value,
        pass: loginPassInput.value
    };
    for(var j=0; j < signupArr.length; j++){
        if(info.email == signupArr[j].email && info.pass == signupArr[j].pass){
            localStorage.setItem("userName",signupArr[j].name);
            window.location.href = "home.html";
            document.getElementById("errorLogin").classList.replace("d-block","d-none");
        }else{
            document.getElementById("errorLogin").classList.replace("d-none","d-block");
        }
    }
}

// get the userName
function getUserName(){
    return localStorage.getItem("userName");
}

// Display the "Hello" message followed by the user's name at home page
/*
- This condition checks if userName contains a truthy value. 
    If userName is not null, undefined, an empty string, 0, NaN, or false, 
    it is considered truthy, and the code inside the if block will execute.
-  it means that the user's name was successfully retrieved from local storage

-  in summary, the if (userName) condition ensures that the user's name is only displayed on the home page 
    if it exists (i.e., if it was successfully retrieved from local storage). 
    If userName is falsy (e.g., null, undefined, or an empty string), 
    the code inside the if block will not execute, and the user's name will not be displayed.
*/
var userName = getUserName();
if (userName) {
    var homeMsg = document.getElementById("msg");
    homeMsg.innerHTML = `Hello ${userName}`;
}
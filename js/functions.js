function redirectLogin() {
    window.location.href = "login.php";
}
function redirectRegister() {
    window.location.href = "register.php";
}
function redirectPA() {
    window.location.href = "personal_page.php";
}
function login() {
    var username = document.getElementById("username");
    var password = document.getElementById("password");
    var toast_error = document.getElementById("toast_error");
    var redir_screen = document.getElementById("redir_screen");

    if (!badValueUP(username, password, toast_error))
    {
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "backend/functions.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("username="+username.value+"&password="+password.value);
        xhttp.onreadystatechange = function()
        {
            if (this.readyState === 4)
            {
                if (this.status === 400)
                {
                    if (toast_error)
                    {
                        toast_error.innerHTML = "Error, check your fields";
                        toast_error.className = "show";
                        setTimeout(function() {
                            toast_error.className = toast_error.className.replace("show", "");
                        }, 3000);
                    }
                }
                if (this.status === 404)
                {
                    if (toast_error)
                    {
                        toast_error.innerHTML = "Error, user not found / Wrong Password";
                        toast_error.className = "show";
                        setTimeout(function() {
                            toast_error.className = toast_error.className.replace("show", "");
                        }, 3000);
                    }
                }
                if (this.status === 302)
                {
                    if (redir_screen)
                    {
                        redir_screen.style.display = "";
                        redir_screen.classList.add('login-completed');
                        setTimeout(function() {
                            window.location.replace("index.php");
                        }, 3000);
                    }
                }
                if (this.status === 401)
                {
                    if (toast_error)
                    {
                        toast_error.innerHTML = "Error, please click on the validation link sent to your email";
                        toast_error.className = "show";
                        setTimeout(function() {
                            toast_error.className = toast_error.className.replace("show", "");
                        }, 3000);
                    }
                }
            }
        };
    }
}
function recoverPassword() {
    var email = document.getElementById("username");
    var password = document.getElementById("password");
    var btnLogin = document.getElementById("login-btn");
    var btnLabel = document.getElementById("recover-text");
    var formTitle = document.getElementById("form-title");
    var btnRestore = document.getElementById("restore-btn");
    var toast_error = document.getElementById("toast_error");
    var toast_ok = document.getElementById("toast_ok");

    btnLogin.style.display = "none";
    password.style.display = "none";
    btnLabel.innerHTML = "Send activation link";
    formTitle.innerHTML = "Recover Password";
    email.placeholder = "Email";
    email.maxLength = 100;
    btnRestore.onclick = function () {
        if (!email || !email.value.length || email.value.indexOf("@") === -1)
        {
            if (toast_error)
            {
                toast_error.innerHTML = "Error, please check email field";
                toast_error.className = "show";
                setTimeout(function() {
                    toast_error.className = toast_error.className.replace("show", "");
                }, 3000);
            }
        }
        else {
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "backend/functions.php", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send("email="+email.value);
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4) {
                    if (this.status === 201) {
                        if (toast_ok) {
                            toast_ok.innerHTML = "A new password has been sent!";
                            toast_ok.className = "show";
                            setTimeout(function () {
                                toast_ok.className = toast_ok.className.replace("show", "");
                            }, 3000);
                        }
                    }
                    if (this.status === 400)
                    {
                        if (toast_error) {
                            toast_error.innerHTML = "Error, please check the email field";
                            toast_error.className = "show";
                            setTimeout(function () {
                                toast_error.className = toast_error.className.replace("show", "");
                            }, 3000);
                        }
                    }
                    if (this.status === 404)
                    {
                        if (toast_error) {
                            toast_error.innerHTML = "Error, user not found";
                            toast_error.className = "show";
                            setTimeout(function () {
                                toast_error.className = toast_error.className.replace("show", "");
                            }, 3000);
                        }
                    }
                }
            }
        }
    }
}
function register() {
    var username = document.getElementById("username");
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var name = document.getElementById("name");
    var surname = document.getElementById("surname");

    var toast_error = document.getElementById("toast_error");
    var toast_ok = document.getElementById("toast_ok");

    if (!badValue(username, email, password, name, surname, toast_ok, toast_error))
    {
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "backend/functions.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("username="+username.value+"&email="+email.value+"&password="+password.value+"&name="+name.value+
            "&surname="+surname.value);
        xhttp.onreadystatechange = function()
        {
            if (this.readyState === 4)
            {
                if (this.status === 302)
                {
                    if (toast_error)
                    {
                        toast_error.innerHTML = "User already exist";
                        toast_error.className = "show";
                        setTimeout(function() {
                            toast_error.className = toast_error.className.replace("show", "");
                        }, 3000);
                    }
                }
                if (this.status === 400)
                {
                    if (toast_error)
                    {
                        toast_error.innerHTML = "Error, check your fields";
                        toast_error.className = "show";
                        setTimeout(function() {
                            toast_error.className = toast_error.className.replace("show", "");
                        }, 3000);
                    }
                }
                if (this.status === 201)
                {
                    if (toast_ok)
                    {
                        toast_ok.innerHTML = "User created successfully";
                        toast_ok.className = "show";
                        setTimeout(function() {
                            toast_ok.className = toast_ok.className.replace("show", "");
                        }, 3000);
                    }
                }
                if (this.status === 409)
                {
                    if (toast_error)
                    {
                        toast_error.innerHTML = "Error, found user with same username/email";
                        toast_error.className = "show";
                        setTimeout(function() {
                            toast_error.className = toast_error.className.replace("show", "");
                        }, 3000);
                    }
                }
            }
        };
    }
}
function destroy_session() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST","backend/functions.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("destroy=true");
    xhttp.onreadystatechange = function()
    {
        if (xhttp.readyState === 4)
            if(xhttp.status === 200)
                window.location.replace("index.php");
    };
}
function passwordComplexity() {
    var indicator = document.getElementById("pwd_indicator");
    var password = document.getElementById("password");
    if (password && password.value.length < 5)
        if (indicator)
            indicator.style.background = "red";
    if (password && password.value.length >= 5)
        if (indicator)
            indicator.style.background = "yellow";
    if (password && password.value.length >= 10)
        if (indicator)
            indicator.style.background = "green";
}
function badValue(username, email, password, name, surname, toast_ok, toast_error) {
    if (!username || !username.value.length)
    {
        if (toast_error)
        {
            toast_error.innerHTML = "Username not valid";
            toast_error.className = "show";
            setTimeout(function() {
                toast_error.className = toast_error.className.replace("show", "");
            }, 3000);
        }
        return (1);
    }
    else if (!email || !email.value.length || email.value.indexOf('@') === -1)
    {
        if (toast_error)
        {
            toast_error.innerHTML = "Email not valid";
            toast_error.className = "show";
            setTimeout(function() {
                toast_error.className = toast_error.className.replace("show", "");
            }, 3000);
        }
        return (1);
    }
    else if (!password || !password.value.length)
    {
        if (toast_error)
        {
            toast_error.innerHTML = "Password not valid";
            toast_error.className = "show";
            setTimeout(function() {
                toast_error.className = toast_error.className.replace("show", "");
            }, 3000);
        }
        return (1);
    }
    else if (!name || !name.value.length)
    {
        if (toast_error)
        {
            toast_error.innerHTML = "Name not valid";
            toast_error.className = "show";
            setTimeout(function() {
                toast_error.className = toast_error.className.replace("show", "");
            }, 3000);
        }
        return (1);
    }
    else if (!surname || !surname.value.length)
    {
        if (toast_error)
        {
            toast_error.innerHTML = "Surname not valid";
            toast_error.className = "show";
            setTimeout(function() {
                toast_error.className = toast_error.className.replace("show", "");
            }, 3000);
        }
        return (1);
    }
    return (0);
}
function badValueUP(username, password, toast_error) {
    if (!username || !username.value.length)
    {
        if (toast_error)
        {
            toast_error.innerHTML = "Username not valid";
            toast_error.className = "show";
            setTimeout(function() {
                toast_error.className = toast_error.className.replace("show", "");
            }, 3000);
        }
        return (1);
    }
    else if (!password || !password.value.length)
    {
        if (toast_error)
        {
            toast_error.innerHTML = "Password not valid";
            toast_error.className = "show";
            setTimeout(function() {
                toast_error.className = toast_error.className.replace("show", "");
            }, 3000);
        }
        return (1);
    }
    return (0);
}

function getCamera() {
    const constraints = {
        video: true
    };

    const video = document.getElementById("camera");

    function success(stream) {
        video.srcObject = stream;
    }

    function error(error) {
        //TODO: Print something user no permission
    }

    navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
}
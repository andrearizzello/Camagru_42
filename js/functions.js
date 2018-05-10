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
function getCamera() {
    const constraints = {
        video: true
    };

    const video = document.getElementById("camera");

    function success(stream) {
        video.srcObject = stream;
    }

    function error() {
        var radios = document.getElementsByName("mask");
        radios.forEach(function (elem) {
            elem.disabled = true;
            elem.onchange = null;
        });
        var container = document.getElementById("camera-container");
        if (container)
        {
            //TODO:Addare modalita di upload foto
        }
    }
    navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
}
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
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
function putLike(likebtn) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST","backend/functions.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("putlike="+likebtn.parentNode.getAttribute('id'));
    xhttp.onreadystatechange = function()
    {
        if (xhttp.readyState === 4)
            if(xhttp.status === 200)
            {
                var x = document.getElementById(xhttp.responseText.substr(0, xhttp.responseText.indexOf(" ")));
                debugger;
                x.childNodes[3].innerHTML = xhttp.responseText.substr(xhttp.responseText.indexOf(" ") + 1, xhttp.responseText.length);
            }
    };
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
function redirectLogin() {
    window.location.href = "login.php";
}
function redirectPA() {
    window.location.href = "personal_page.php";
}
function redirectRegister() {
    window.location.href = "register.php";
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
function takePhotoFrom(start) {
    var container = document.getElementById("im-container");
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST","backend/functions.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("getphoto="+start);
    xhttp.onreadystatechange = function()
    {
        if (xhttp.readyState === 4)
            if(xhttp.status === 200)
                container.innerHTML = xhttp.responseText;
    };
}
function takePicture() {
    var canvas = document.createElement("canvas");
    var container = document.getElementById("prev-cont");
    var camera = document.getElementById("camera");
    var hat = document.getElementById("pic-hat");
    var glasses = document.getElementById("pic-glasses");
    var pipe = document.getElementById("pic-pipe");

    canvas.className = "photo-canvas";
    canvas.width = camera.videoWidth;
    canvas.height = camera.videoHeight;
    canvas.getContext('2d').drawImage(camera, 0, 0);
    if (hat.checked || glasses.checked || pipe.checked)
    {
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST","backend/functions.php", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		if (document.getElementById("pic-hat").checked)
			xhttp.send("photo="+canvas.toDataURL()+"&superpos=1");
		else if (document.getElementById("pic-glasses").checked)
			xhttp.send("photo="+canvas.toDataURL()+"&superpos=2");
		else if (document.getElementById("pic-pipe").checked)
			xhttp.send("photo="+canvas.toDataURL()+"&superpos=3");
        xhttp.onreadystatechange = function()
        {
            if (xhttp.readyState === 4)
                if(xhttp.status === 200)
                    container.innerHTML = xhttp.responseText;
        };
    }
}
function trigger(radio) {
    var cameraButton = document.getElementById("camera-icon");
    var cameraContainer = document.getElementById("camera-container");
    var image = document.getElementById("superpos");
    if (radio && cameraButton && cameraContainer && image) {
        cameraButton.style.display = "initial";
        image.style = "";
        if (radio.value === "1")
        {
            image.src = "imgs/hat.png";
            image.style.width = "200px";
            image.style.left = "calc(50% - (200px/2))";
        }
        else if (radio.value === "2")
        {
            image.src = "imgs/sunglasses.png";
            image.style.top = "80px";
            image.style.width = "200px";
            image.style.left = "calc(50% - (200px/2))";
        }
        else if (radio.value === "3")
        {
            image.src = "imgs/pipe.png";
            image.style.top = "250px";
            image.style.left = "calc(50% + 100px)";
        }
    }
    else
        cameraButton.style.display = "none";
}
function openComment(commentbtn) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST","backend/functions.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("putcomment="+commentbtn.parentNode.getAttribute('id')); //TODO: FINIRE!!!!
    xhttp.onreadystatechange = function()
    {
        if (xhttp.readyState === 4)
            if(xhttp.status === 200)
            {
                var x = document.getElementById(xhttp.responseText.substr(0, xhttp.responseText.indexOf(" ")));
                debugger;
                x.childNodes[7].innerHTML = xhttp.responseText.substr(xhttp.responseText.indexOf(" ") + 1, xhttp.responseText.length);
            }
    };
}

function submit() {
    var username = document.getElementById("username");
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var name = document.getElementById("name");
    var surname = document.getElementById("surname");

    var toast_error = document.getElementById("toast_error");
    var toast_ok = document.getElementById("toast_ok");

    if (!checkValue(username, email, password, name, surname, toast_ok, toast_error))
    {
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "backend/register.php", true);
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

function checkValue(username, email, password, name, surname, toast_ok, toast_error) {
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
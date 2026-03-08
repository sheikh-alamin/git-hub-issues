document.getElementById ("sign-in-btn").addEventListener("click" , function () {
    const userName = document.getElementById("input-id");
    const userId = userName.value;

    const userPass = document.getElementById("input-pass");
    const loginPass = userPass.value;

    if (userId == "admin" && loginPass == "admin123") {
        window.location.assign("./home.html")
    }
    else {
        alert("login failed");
        return;
    }
})


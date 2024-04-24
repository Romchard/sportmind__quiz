window.onload = function () {
    setTimeout(function () {
        if (document.getElementById("preload"))
            document.getElementById("preload").style.opacity = "0";
    }, 1500)

    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}
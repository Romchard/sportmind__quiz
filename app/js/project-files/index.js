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

const modal = document.getElementById("modal");

if (modal) {
    const requisites = document.getElementById('req')
    modal.querySelector('.modal__close').addEventListener('click', closeModal)

    function closeModal() {
        modal.classList.remove('open')

    }

    function openModal(e) {
        modal.classList.add('open')
        e.preventDefault()
    }

    requisites.addEventListener('click', openModal)

}
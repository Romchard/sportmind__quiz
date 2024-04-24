const burger = document.querySelector('.burger')
const dialog = document.querySelector('.dialog')
if (burger) {
    burger.addEventListener("click", (e) => {
        dialog.showModal()
    })
}

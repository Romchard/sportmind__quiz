const newUser = {
    name: '',
    tel: '',
    email: ''
}

const buttonPayment = document.querySelector('.button__payment')

if (buttonPayment) {
    buttonPayment.addEventListener('click', (e) => {

        let payerFullName = document.getElementById('sportmind-payer-full-name').value
        let payerPhone = document.getElementById('sportmind-payer-phone').value
        let payerEmail = document.getElementById('sportmind-payer-email').value

        newUser.name = payerFullName
        newUser.tel = payerPhone
        newUser.email = payerEmail

        localStorage.setItem('user', JSON.stringify(newUser))

        e.preventDefault();
        setTimeout(() => {
            window.location.href = './quiz.html'
        }, 1000)

    })
}
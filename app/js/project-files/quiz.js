const quizQuestions = [
    "Часто я не уверен в своих силах",
    "Нередко мне кажется безысходным положение, из которого можно было бы найти выход",
    "Я часто оставляю за собой последнее слово",
    "Мне трудно менять свои планы",
    "Я часто из-за пустяков краснею",
    "Неприятности меня сильно расстраивают и я падаю духом",
    "Нередко в разговоре я перебиваю собеседника",
    "Я с трудом переключаюсь с одного дела на другое",
    "Я часто просыпаюсь ночью",
    "При крупных неприятностях я виню только себя",
    "Меня легко рассердить",
    "Я очень осторожен по отношению к переменам в своей жизни",
    "Я легко впадаю в уныние",
    "Несчастия и неудачи меня ничему не учат",
    "Мне приходится часто делать замечания другим",
    "В споре меня трудно переубедить",
    "Меня волнуют даже воображемые неприятности",
    "Я часто отказываюсь от борьбы, считая ее бесполезной",
    "Я хочу быть авторитетом для окружающих",
    "Нередко у меня не выходят из головы мысли, от которых следовало бы избавиться",
    "Меня пугают трудности, с которыми мне придется встретиться в жизни",
    "Нередко я чувствую себя беззащитным",
    "В любом деле я не довольствуюсь малым, а хочу добиться максимального успеха",
    "Я легко сближаюсь с людьми",
    "Я часто копаюсь в своих недостатках",
    "Иногда у меня бывают состояния отчаяния",
    "Мне трудно сдерживать себя, когда я сержусь",
    "Я сильно переживаю, если в моей жизни что-то неожиданного меняется",
    "Меня легко убедить",
    "Я чувствую растерянность, когда у меня возникают трудности",
    "Я предпочитаю руководить, а не подчиняться",
    "Нередко я проявляю упрямство",
    "В трудные минуты я иногда веду себя по-детски",
    "В трудные минуты я иногда веду себя по-детски, хочу чтобы меня пожалели",
    "У меня резкая, грубовая жестикуляция",
    "Я охотно иду на риск",
    "Я с трудом переношу время ожидания",
    "Я думаю, что никогда не смогу исправить свои недостатки",
    "Я мстителен",
    "Меня расстраивают даже незначительные нарушения моих планов"
]

let currentQuestionIndex = 0

const quizQuestionValue = document.querySelector('.quiz__question')
const quizQuestionsLength = document.querySelector('.quiz__inner-question__end')
const submitButton = document.querySelector('.button__submit')
const currentQuestion = document.querySelector('.quiz__inner-question__start')
const rangeInput = document.getElementById('question__length')


function updateCurrentQuestionNumber() {
    currentQuestion.textContent = currentQuestionIndex + 1
}

if (rangeInput) {
    rangeInput.setAttribute('max', quizQuestions.length)
}


function updateQuiz() {
    quizQuestionValue.innerHTML = quizQuestions[currentQuestionIndex]
    quizQuestionsLength.innerHTML = quizQuestions.length
    rangeInput.value = currentQuestionIndex + 1
}

if (submitButton) {
    submitButton.addEventListener('click', () => {
        let radioInputs = document.querySelectorAll('.quiz__input')

        const isChecked = Array.from(radioInputs).some(input => input.checked)
        if (!isChecked) {
            submitButton.disabled = true
        }
        submitButton.disabled = false
        radioInputs.forEach(input => {
            input.checked = false
        })
        if (currentQuestionIndex < quizQuestions.length - 1) {
            currentQuestionIndex++
            updateQuiz()
            updateCurrentQuestionNumber()
        } else {
            window.location.href = './result.html'
        }
    })
}

let quizInner = document.querySelector('.quiz__inner')

if (quizInner) {
    updateQuiz()
}
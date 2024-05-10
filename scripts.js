import { questions } from "./questions.js"

document.addEventListener("DOMContentLoaded", function () {
  const mainSection = document.querySelector("main")
  const questionText = document.createElement("p")
  const inputBox = document.createElement("input")
  inputBox.setAttribute("type", "text")
  inputBox.placeholder = "Type your answer here"
  const comment = document.createElement("p")
  let currentIndex = 0

  const button = document.createElement("button")
  button.textContent = "Click here to start"
  button.addEventListener("click", startQuiz)
  mainSection.appendChild(button)

  function startQuiz() {
    currentIndex = 0
    questionText.textContent = questions[currentIndex]["question"]
    button.textContent = "Check answer"
    inputBox.value = ""
    button.removeEventListener("click", startQuiz)
    button.addEventListener("click", checkAnswer)
    mainSection.insertBefore(questionText, button)
    mainSection.insertBefore(inputBox, button)
  }

  function checkAnswer() {
    const userInput = inputBox.value.trim()
    const correctAnswer = questions[currentIndex]["answer"]
    if (!mainSection.contains(comment)) {
      mainSection.insertBefore(comment, button)
    }
    if (userInput == correctAnswer) {
      inputBox.remove()
      if (currentIndex == questions.length - 1) {
        comment.remove()
        button.removeEventListener("click", nextQuestion)
        button.addEventListener("click", startQuiz)
        button.textContent = "Reset quiz"
        questionText.textContent =
          "Congratulations!! you have answered all questions correctly!"
      } else {
        comment.textContent = "Correct!"
        button.removeEventListener("click", checkAnswer)
        button.addEventListener("click", nextQuestion)
        button.textContent = "Go to next question"
      }
    } else {
      comment.textContent = "Wrong!"
    }
  }

  function nextQuestion() {
    currentIndex++
    comment.remove()
    button.removeEventListener("click", nextQuestion)
    inputBox.value = ""
    mainSection.insertBefore(inputBox, button)
    questionText.textContent = questions[currentIndex]["question"]
    button.addEventListener("click", checkAnswer)
    button.textContent = "Check answer"
  }
})

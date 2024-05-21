import { flexiableOperators, questions } from "./questions.js"

const FIRST = "first"
const SECOND = "second"
const OPERAND = "operand"
const ANSWER = "answer"
const SUBANSWER = "subAnswer"
const COMMENT = "comment"
const HEADING = "heading"

document.addEventListener("DOMContentLoaded", function () {
  const mainSection = document.querySelector("main")
  const promptText = document.createElement("p")
  const header = document.getElementById(HEADING)

  let currentQuestionIndex = 0
  let currentSubQuestionIndex = 0

  const sqrWidth = "20px"

  let button = document.createElement("button")
  button.textContent = "Click here to start"
  button.addEventListener("click", startQuiz)
  mainSection.appendChild(button)

  function startQuiz() {
    header.remove()
    button.textContent = "Check answer"
    startQuestion()
  }

  function startQuestion() {
    promptText.textContent = questions[currentQuestionIndex]["prompt"]
    mainSection.insertBefore(promptText, button)
    showSubQuestion()
  }

  function showSubQuestion() {
    const subQ =
      questions[currentQuestionIndex]["subQuestions"][currentSubQuestionIndex]
    const subQuestionText = document.createElement("p")
    subQuestionText.textContent = subQ.question

    const finalAnswerinput = document.createElement("input")
    const comment = document.createElement("p")
    comment.setAttribute("id", COMMENT)
    comment.style.fontWeight = "600"
    finalAnswerinput.setAttribute("type", "text")
    finalAnswerinput.setAttribute(
      "id",
      SUBANSWER + currentSubQuestionIndex.toString()
    )
    finalAnswerinput.placeholder = "Final answer"

    mainSection.insertBefore(subQuestionText, button)

    subQ.working.forEach((_, i) => {
      const workingRow = document.createElement("div")
      const firstOperandInput = document.createElement("input")
      const secondOperandInput = document.createElement("input")
      const operatorInput = document.createElement("input")
      const answerInput = document.createElement("input")
      firstOperandInput.setAttribute("type", "text")
      secondOperandInput.setAttribute("type", "text")
      operatorInput.setAttribute("type", "text")
      answerInput.setAttribute("type", "text")
      firstOperandInput.setAttribute("id", FIRST + i.toString())
      secondOperandInput.setAttribute("id", SECOND + i.toString())
      operatorInput.setAttribute("id", OPERAND + i.toString())
      answerInput.setAttribute("id", ANSWER + i.toString())
      firstOperandInput.style.width = sqrWidth
      secondOperandInput.style.width = sqrWidth
      operatorInput.style.width = sqrWidth
      answerInput.style.width = sqrWidth

      workingRow.appendChild(firstOperandInput)
      workingRow.appendChild(operatorInput)
      workingRow.appendChild(secondOperandInput)
      workingRow.append("=")
      workingRow.appendChild(answerInput)
      mainSection.insertBefore(workingRow, button)
    })
    mainSection.insertBefore(finalAnswerinput, button)
    mainSection.insertBefore(comment, button)
    const newButton = button.cloneNode(true)
    button.parentNode.replaceChild(newButton, button)
    newButton.addEventListener("click", checkAnswer)
    button = newButton
    button.textContent = "Check answer"
  }

  function checkWorkingCorrect(
    working,
    firstInput,
    secondInput,
    operatorInput,
    answerInput
  ) {
    const operator = working["operator"]
    const operands = JSON.parse(JSON.stringify(working["operands"]))
    const answer = working["answer"].toString()
    const inputIsFlexible = flexiableOperators.includes(operator)

    let isCorrect = true
    if (inputIsFlexible) {
      const index = operands.indexOf(parseInt(firstInput))
      if (index < 0) {
        isCorrect = false
      } else {
        operands.splice(index, 1)
      }
      isCorrect = isCorrect && operands.includes(parseInt(secondInput))
    } else {
      isCorrect =
        operands[0].toString() === firstInput &&
        operands[1].toString() === secondInput
    }
    isCorrect =
      isCorrect && operator === operatorInput && answer === answerInput

    return isCorrect
  }

  function checkAnswer() {
    const subQs = questions[currentQuestionIndex]["subQuestions"]
    const subQ = subQs[currentSubQuestionIndex]
    const workings = subQ.working
    const ans = subQ.answer

    const answerInput = document.getElementById(
      SUBANSWER + currentSubQuestionIndex.toString()
    )
    const comment = document.getElementById(COMMENT)

    let isFilled = workings.every((_, i) => {
      const firstInput = document
        .getElementById(FIRST + i.toString())
        .value.trim()
      const secondInput = document
        .getElementById(SECOND + i.toString())
        .value.trim()
      const operatorInput = document
        .getElementById(OPERAND + i.toString())
        .value.trim()
      const answerInput = document
        .getElementById(ANSWER + i.toString())
        .value.trim()

      return (
        firstInput !== "" &&
        secondInput !== "" &&
        operatorInput !== "" &&
        answerInput !== ""
      )
    })

    isFilled = isFilled && answerInput !== ""

    if (!isFilled) {
      comment.textContent = "Please fill all boxes"
      comment.style.color = "red"
      return
    }

    let isCorrect = workings.every((working, i) => {
      const firstInput = document
        .getElementById(FIRST + i.toString())
        .value.trim()
      const secondInput = document
        .getElementById(SECOND + i.toString())
        .value.trim()
      const operatorInput = document
        .getElementById(OPERAND + i.toString())
        .value.trim()
      const answerInput = document
        .getElementById(ANSWER + i.toString())
        .value.trim()

      return checkWorkingCorrect(
        working,
        firstInput,
        secondInput,
        operatorInput,
        answerInput
      )
    })
    const answerValue = answerInput.value
    isCorrect = isCorrect && answerValue == ans

    if (isCorrect) {
      comment.textContent = "Correct!"
      comment.style.color = "green"
      button.removeEventListener("click", checkAnswer)
      if (subQs.length - 1 === currentSubQuestionIndex) {
        button.addEventListener("click", nextQuestion)
        button.textContent = "Next Question"
      } else {
        button.addEventListener("click", nextSubQuestion)
        button.textContent = "Continue"
      }
    } else {
      comment.textContent = "Wrong!"
      comment.style.color = "red"
    }
  }

  function nextSubQuestion() {
    const comment = document.getElementById(COMMENT)
    comment.remove()
    currentSubQuestionIndex++
    showSubQuestion()
  }

  function completeQuiz() {
    currentQuestionIndex = 0
    header.textContent = "Congratulations!"
    mainSection.insertBefore(header, button)
    const newButton = button.cloneNode(true)
    button.parentNode.replaceChild(newButton, button)
    newButton.addEventListener("click", startQuiz)
    button = newButton

  }

  function nextQuestion() {
    const mainSection = document.querySelector("main")
    const children = Array.from(mainSection.children)
    children.forEach((child) => {
      if (child.tagName.toLowerCase() !== "button") {
        mainSection.removeChild(child)
      }
    })
    currentQuestionIndex++
    currentSubQuestionIndex = 0
    if (currentQuestionIndex === questions.length) {
      completeQuiz()
    } else {
      startQuestion()
    }
  }
})

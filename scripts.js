import { flexiableOperators, questions } from "./questions.js"

const FIRST = "first"
const SECOND = "second"
const OPERATOR = "operator"
const ANSWER = "answer"
const SUBANSWER = "subAnswer"
const COMMENT = "comment"
const HEADING = "heading"
const WORKINGS = "workings"

const sqrWidth = "20px"

document.addEventListener("DOMContentLoaded", function () {
  const mainSection = document.querySelector("main")
  const promptText = document.createElement("p")
  const header = document.getElementById(HEADING)
  const allAnswers = [...Array(questions.length)].map((e) => [])
  let currQIndex = 0
  let currSubQIndex = 0
  let button = document.createElement("button")
  button.textContent = "Click here to start"
  button.addEventListener("click", startQuiz)
  mainSection.appendChild(button)

  function startQuiz() {
    button.textContent = "Check answer"
    startQuestion()
  }

  function startQuestion() {
    header.textContent = `Question ${currQIndex + 1}`
    promptText.textContent = questions[currQIndex]["prompt"]
    mainSection.insertBefore(promptText, button)
    showSubQuestion()
  }

  function createOperatorSelect() {
    const operators = ["+", "-", "x", "/"]
    const selectElement = document.createElement("select")

    operators.forEach((operator) => {
      const optionElement = document.createElement("option")
      optionElement.value = operator
      optionElement.textContent = operator
      selectElement.appendChild(optionElement)
    })

    return selectElement
  }

  function showSubQuestion() {
    const subQ = questions[currQIndex]["subQuestions"][currSubQIndex]
    const subQuestionText = document.createElement("p")
    subQuestionText.textContent = subQ.question

    const finalAnswerinput = document.createElement("input")
    const subQuestionWorkings = document.createElement("div")
    subQuestionWorkings.setAttribute("id", WORKINGS + currSubQIndex.toString())
    const comment = document.createElement("p")
    comment.setAttribute("id", COMMENT)
    comment.style.fontWeight = "600"
    finalAnswerinput.setAttribute("type", "text")
    finalAnswerinput.setAttribute("id", SUBANSWER + currSubQIndex.toString())
    finalAnswerinput.placeholder = "Final answer"

    mainSection.insertBefore(subQuestionText, button)

    subQ.working.forEach((_, i) => {
      const workingRow = document.createElement("div")
      const firstInput = document.createElement("input")
      const secondInput = document.createElement("input")
      const operatorInput = createOperatorSelect()
      const answerInput = document.createElement("input")
      firstInput.setAttribute("type", "text")
      secondInput.setAttribute("type", "text")
      answerInput.setAttribute("type", "text")
      firstInput.setAttribute(
        "id",
        FIRST + currSubQIndex.toString() + i.toString()
      )
      secondInput.setAttribute(
        "id",
        SECOND + currSubQIndex.toString() + i.toString()
      )
      operatorInput.setAttribute(
        "id",
        OPERATOR + currSubQIndex.toString() + i.toString()
      )
      answerInput.setAttribute(
        "id",
        ANSWER + currSubQIndex.toString() + i.toString()
      )
      firstInput.style.width = sqrWidth
      secondInput.style.width = sqrWidth
      answerInput.style.width = sqrWidth

      workingRow.appendChild(firstInput)
      workingRow.appendChild(operatorInput)
      workingRow.appendChild(secondInput)
      workingRow.append("=")
      workingRow.appendChild(answerInput)
      subQuestionWorkings.appendChild(workingRow)
    })
    mainSection.insertBefore(subQuestionWorkings, button)
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
    const subQs = questions[currQIndex]["subQuestions"]
    const subQ = subQs[currSubQIndex]
    const workings = subQ.working
    const ans = subQ.answer

    const answerInput = document.getElementById(
      SUBANSWER + currSubQIndex.toString()
    )
    const comment = document.getElementById(COMMENT)

    let isFilled = workings.every((_, i) => {
      const firstInput = document
        .getElementById(FIRST + currSubQIndex.toString() + i.toString())
        .value.trim()
      const secondInput = document
        .getElementById(SECOND + currSubQIndex.toString() + i.toString())
        .value.trim()
      const operatorInput = document
        .getElementById(OPERATOR + currSubQIndex.toString() + i.toString())
        .value.trim()
      const answerInput = document
        .getElementById(ANSWER + currSubQIndex.toString() + i.toString())
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

    const workingRows = []

    let isCorrect = workings.every((working, i) => {
      const firstInput = document
        .getElementById(FIRST + currSubQIndex.toString() + i.toString())
        .value.trim()
      const secondInput = document
        .getElementById(SECOND + currSubQIndex.toString() + i.toString())
        .value.trim()
      const operatorInput = document
        .getElementById(OPERATOR + currSubQIndex.toString() + i.toString())
        .value.trim()
      const answerInput = document
        .getElementById(ANSWER + currSubQIndex.toString() + i.toString())
        .value.trim()

      workingRows.push(
        `${firstInput} ${operatorInput} ${secondInput} = ${answerInput}`
      )
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
      allAnswers[currQIndex].push(workingRows)
      convertInputsToText(workingRows)
      if (subQs.length - 1 === currSubQIndex) {
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

  function convertInputsToText(workingRows) {
    const workings = document.getElementById(
      WORKINGS + currSubQIndex.toString()
    )
    const answers = document.createElement("div")
    workingRows.forEach((row) => {
      const workingRow = document.createElement("p")
      workingRow.textContent = row
      answers.appendChild(workingRow)
    })
    mainSection.replaceChild(answers, workings)

    const answerInput = document.getElementById(
      SUBANSWER + currSubQIndex.toString()
    )
    answerInput.remove()
  }

  function nextSubQuestion() {
    const comment = document.getElementById(COMMENT)
    comment.remove()
    currSubQIndex++
    showSubQuestion()
  }

  function completeQuiz() {
    currQIndex = 0
    header.textContent = "Congratulations!"
    mainSection.insertBefore(header, button)
    const newButton = button.cloneNode(true)
    newButton.textContent = "Review answers"
    newButton.addEventListener("click", reviewQuiz)
    button.parentNode.replaceChild(newButton, button)
    button = newButton
  }

  function previousReviewQuestion() {
    clearMainSectionContent()
    currQIndex--
    showQuestionWithAnswers()
    createQToggle()
  }

  function nextReviewQuestion() {
    clearMainSectionContent()
    currQIndex++
    showQuestionWithAnswers()
    createQToggle()
  }

  function createQToggle() {
    const qToggleRow = document.createElement("div")
    qToggleRow.style.padding = "16px"
    if (currQIndex > 0) {
      const previousButton = document.createElement("button")
      previousButton.textContent = "Previous"
      previousButton.addEventListener("click", previousReviewQuestion)
      qToggleRow.appendChild(previousButton)
    }
    if (currQIndex + 1 < questions.length) {
      const nextButton = document.createElement("button")
      nextButton.textContent = "Next"
      nextButton.addEventListener("click", nextReviewQuestion)
      qToggleRow.appendChild(nextButton)
    }
    mainSection.insertBefore(qToggleRow, button)
  }

  function reviewQuiz() {
    const newButton = button.cloneNode(true)
    newButton.textContent = "Reset quiz"
    newButton.addEventListener("click", resetQuiz)
    button.parentNode.replaceChild(newButton, button)
    button = newButton
    showQuestionWithAnswers()
    createQToggle()
  }

  function showQuestionWithAnswers() {
    header.textContent = `Question ${currQIndex + 1}`
    promptText.textContent = questions[currQIndex]["prompt"]
    mainSection.insertBefore(promptText, button)
    const subQuestions = questions[currQIndex]["subQuestions"]

    subQuestions.forEach((subQ, i) => {
      const subQuestionText = document.createElement("p")
      subQuestionText.textContent = subQ.question
      const workingRows = document.createElement("div")
      const workingRow = allAnswers[currQIndex][i]
      workingRow.forEach((row) => {
        const workingRow = document.createElement("p")
        workingRow.textContent = row
        workingRows.appendChild(workingRow)
      })
      mainSection.insertBefore(subQuestionText, button)
      mainSection.insertBefore(workingRows, button)
    })
  }

  function resetQuiz() {
    currQIndex = 0
    header.textContent = "Start quiz"
    clearMainSectionContent()
    const newButton = button.cloneNode(true)
    newButton.textContent = "Click here to start"
    button.parentNode.replaceChild(newButton, button)
    newButton.addEventListener("click", startQuiz)
    button = newButton
  }

  function nextQuestion() {
    clearMainSectionContent()
    currQIndex++
    currSubQIndex = 0
    if (currQIndex === questions.length) {
      completeQuiz()
    } else {
      startQuestion()
    }
  }

  const elementsToIgnore = ['button', 'h2']
  function clearMainSectionContent() {
    const children = Array.from(mainSection.children)
    children.forEach((child) => {
      if (!elementsToIgnore.includes(child.tagName.toLowerCase())) {
        mainSection.removeChild(child)
      }
    })
  }
})

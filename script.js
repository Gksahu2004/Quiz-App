// JavaScript to toggle between skeleton and actual content
document.addEventListener("DOMContentLoaded", function () {
    // Simulate content loading delay (you can replace this with actual loading logic)
    setTimeout(function () {
        document.querySelector(".content-placeholder").style.display = "none";
        document.querySelector(".actual-content").style.display = "block";
    }, 2000); // Adjust the delay as needed
});


let heading1 = document.getElementById("heading1")

let hide = document.querySelector("#Container")
hide.style.display = 'none'

let prev = document.querySelector("#prev")
prev.style.display = 'none'

let next = document.querySelector("#next")
let submit = document.querySelector("#submit")
let quizbutton = document.querySelector("#quiz")
let opts = document.querySelectorAll(".options")
let quizCont = document.querySelector("#quizContainer")
let scoreCard = document.querySelector("#scoreShow")
scoreCard.style.display = 'none'

let result = document.querySelector("#result")
let cross = document.querySelectorAll(".cross")
let retry = document.querySelector("#retry")

let quizTimer = document.querySelector("#timer")

let score = 0
let questionNo = 1
userOptArray = []

let timerInterval; 
let timer = 2
let time = timer*60
let min = 0
let sec = 0
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

let questions = [
    {
        question:"what is 6/3*2 ?",
        options:["3","4","5","1"],
        correctAns:"4",
        userAns:""
    },

    {
        question:"what is 2+2 ?",
        options:["5","9","2","4"],
        correctAns:"4",
        userAns:""
    },

    {
        question:"what is 5+3*2 ?",
        options:["13","11","22","16"],
        correctAns:"11",
        userAns:""
    },

    {
        question:"what is 3*2 ?",
        options:["4","10","11","6"],
        correctAns:"6",
        userAns:""
    },

    {
        question:"what is 5+3 ?",
        options:["17","13","8","1"],
        correctAns:"8",
        userAns:""
    },

    {
        question:"what is 0/3 ?",
        options:["3","2","0","1"],
        correctAns:"0",
        userAns:""
    },

    {
        question:"what is 5+1*5 ?",
        options:["14","18","10","20"],
        correctAns:"10",
        userAns:""
    },

    {
        question:"what is 5*3/1 ?",
        options:["15","17","9","12"],
        correctAns:"15",
        userAns:""
    },

    {
        question:"what is 5/5 ?",
        options:["25","1","010","100"],
        correctAns:"1",
        userAns:""
    },

    {
        question:"what is 5+3/4/9-4*0 ?",
        options:["8","6","0","1"],
        correctAns:"0",
        userAns:""
    }
];
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
let i = 0
let randomArray = []
let qArray = []
createQNA()

function createQNA(){
    while(i != 5){
        let randomNo = Math.floor(Math.random()*10)
        if(!randomArray.includes(randomNo)){
            randomArray.push(randomNo)
            i++
        }
    }
    
    i = 0
    while(i != 5){
        qArray.push(questions[randomArray[i]])
        i++
    }

}
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

// ADDING CLICK EVENT TO QUIZ BUTTON
quizbutton.addEventListener('click',function(){
    hide.style.display = ''
    clearInterval(timerInterval); 
    timer = 2
    time = timer*60
    min = 0
    sec = 0
    startQuiz()

    // insertQuestion()
})
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// ADDING CLICK EVENT TO NEXT BUTTON
next.addEventListener('click',function(){
    questionNo++
    prev.style.display = ''
    next.style.display = ''
    clearOptions()

    if (questionNo == 5){
        next.style.display = 'none'
    }
    
    insertQuestion()
    checkForNull(questionNo)

    // if(userOptArray[questionNo-1] != ""){
    //     document.getElementById(userOptArray[questionNo-1]).classList.add("visited")
    // }    
})
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// ADDING CLICK EVENT TO PREVIOUS BUTTON
prev.addEventListener('click',function(){
    
    questionNo--
    prev.style.display = ''
    next.style.display = ''
    clearOptions()
    
    
    if (questionNo == 1){
        prev.style.display = 'none'
    }
    
    
    insertQuestion()
    checkForNull(questionNo)
    
})
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// FUNCTION TO INSERT QUESTIONS AND OPTIONS
function insertQuestion(){
    let qPara = document.querySelector("#question")
    qPara.innerHTML = `Q${questionNo}. ${qArray[questionNo-1].question}`

    let i = 0
    opts.forEach(function(e){
        e.innerHTML = `Option ${i+1} : ${qArray[questionNo-1].options[i]}` 
        i++
    })
    
}
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function checkForNull(questionNo) {
    // My Code.....
    if(userOptArray[questionNo-1] != null){
        document.getElementById(userOptArray[questionNo-1]).classList.add("visited")
    }

    // @chat_GPT Code.....

    // let userAnswerId = userOptArray[questionNo - 1];

    // if (userAnswerId) {
    //     let selectedOption = document.querySelector(userAnswerId);
        
    //     if (selectedOption) {
    //         selectedOption.classList.add("visited");
    //     }
    // }

}
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// ADDING CLICK EVENT TO OPTION BUTTONS
opts.forEach(function(e){
    e.addEventListener('click',function(event){
        clearOptions()

        let clickedVal = e.innerHTML.substring(11)
        // console.log(clickedVal)
        qArray[questionNo-1].userAns = clickedVal
        // console.log(qArray[questionNo-1])

        // let userId = "#"+e.id
        // console.log(userId)
        // document.getElementById(userId).style.backgroundColor = 'red';

        // let userId = "#" + e.id;  // this little thing waste my 1.5hrs(error)
        let userId = e.id;
        userOptArray[questionNo-1] = userId
        e.classList.add("visited")
        // console.log(userOptArray)
    })
})
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function clearOptions(){
    let i = 0
    let optBtns = document.querySelectorAll(".options")
    optBtns.forEach(function(e){
        e.classList.remove("visited")
    })
}
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// ADDING CLICK EVENT TO SUBMIT BUTTON
submit.addEventListener('click',function(){
    clearInterval(timerInterval); 
    let i = 0
    for(i = 0;i<5;i++){
        if ((qArray[i].userAns) == (qArray[i].correctAns)){
            score++
        }
    }
    result.innerHTML = score
    quizCont.style.display = 'none'
    heading1.style.display = 'none'
    scoreCard.style.display = ''

    // console.log(score)
})
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// ADDING CLICK EVENT TO CROSS IMAGE
cross.forEach(function(e){
    e.addEventListener('click',function(event){
        clearInterval(timerInterval); 
        randomArray = []
        qArray = []
        userOptArray = []
        hide.style.display = 'none'
        scoreCard.style.display = 'none'
        timer = 2
        time = timer*60
        min = 0
        sec = 0

        let j
        for (j = 0;j<10;j++){
            questions[i].userAns = ""
        }

        // console.log(e)
        // terminateQuiz()
    })
})
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// ADDING CLICK EVENT TO RETRY BUTTON
retry.addEventListener('click',function(){

    startQuiz()
})

function startQuiz(){
    clearInterval(timerInterval); 
    SetTimer()
    timer = 2
    time = timer*60
    min = 0
    sec = 0
    prev.style.display = 'none'
    next.style.display = ''
    quizCont.style.display = ''
    heading1.style.display = ''
    scoreCard.style.display = 'none'
    score = 0
    questionNo = 1
    userOptArray = []
    
    i = 0
    randomArray = []
    qArray = []
    createQNA()
    insertQuestion()
    clearOptions()

}
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// SetTimer()
function SetTimer(){
    // let timer = 2
    // let time = timer*60

    clearInterval(timerInterval); 
    timerInterval = setInterval(quizTimerFun,1000)
    function quizTimerFun(){
        if (time != -1){
            min = Math.floor(time/60)
            sec = time % 60
            if(sec < 10){
                sec = "0"+sec
            }
            if(min < 10){
                min = "0"+min
            }
            quizTimer.innerHTML = min+" : "+sec 
            time--

        }
    }
    
}

// ++++++++++++++++++++++++ THE END ++++++++++++++++++++++++
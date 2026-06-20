// 1. 이차함수 용어 문제 데이터 (선생님께서 자유롭게 수정/추가 가능합니다)
const quizData = [
    {
        question: "y = ax² + bx + c (a≠0) 와 같이 y가 x에 대한 이차식으로 나타내어지는 함수를 무엇이라고 할까요?",
        options: ["일차함수", "이차함수", "삼차함수", "이차방정식"],
        answer: "이차함수"
    },
    {
        question: "이차함수 y = ax² 의 그래프와 같은 모양의 곡선을 무엇이라고 할까요?",
        options: ["직선", "타원", "포물선", "쌍곡선"],
        answer: "포물선"
    },
    {
        question: "포물선은 선대칭도형입니다. 이때 대칭의 기준이 되는 선을 무엇이라고 할까요?",
        options: ["꼭짓점", "x축", "y축", "축"],
        answer: "축"
    },
    {
        question: "포물선과 축이 만나는 점을 무엇이라고 할까요?",
        options: ["원점", "절편", "꼭짓점", "교점"],
        answer: "꼭짓점"
    },
    {
        question: "이차함수 y = x² 의 그래프의 꼭짓점 좌표는 무엇일까요?",
        options: ["(0, 0)", "(1, 1)", "(0, 1)", "(1, 0)"],
        answer: "(0, 0)"
    }
];

// 변수 초기화
let currentQuestionIndex = 0;
let score = 0;

// HTML 요소 가져오기
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressText = document.getElementById('progress-text');
const progressBar = document.getElementById('progress-bar');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const scoreText = document.getElementById('score-text');

// 퀴즈 시작 함수
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizContainer.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    loadQuestion();
}

// 문제 로드 함수
function loadQuestion() {
    const currentQuiz = quizData[currentQuestionIndex];
    
    // 진행도 업데이트
    progressText.innerText = `문제 ${currentQuestionIndex + 1} / ${quizData.length}`;
    progressBar.style.width = `${((currentQuestionIndex + 1) / quizData.length) * 100}%`;
    
    // 질문 텍스트 삽입
    questionText.innerText = currentQuiz.question;
    
    // 기존 선택지 초기화
    optionsContainer.innerHTML = '';
    
    // 선택지 버튼 생성
    currentQuiz.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectAnswer(button, option, currentQuiz.answer));
        optionsContainer.appendChild(button);
    });
}

// 정답 확인 함수
function selectAnswer(selectedButton, selectedOption, correctAnswer) {
    // 중복 클릭 방지를 위해 모든 버튼 비활성화
    const buttons = optionsContainer.querySelectorAll('.option-btn');
    buttons.forEach(btn => {
        btn.disabled = true;
        // 정답인 버튼은 초록색으로 표시
        if (btn.innerText === correctAnswer) {
            btn.classList.add('correct');
        }
    });

    // 선택한 답이 맞는지 확인
    if (selectedOption === correctAnswer) {
        score++;
    } else {
        // 틀린 경우 선택한 버튼을 빨간색으로 표시
        selectedButton.classList.add('wrong');
    }

    // 1초 뒤에 다음 문제로 넘어가기
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 1200);
}

// 결과 화면 표시 함수
function showResult() {
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    scoreText.innerText = `총 ${quizData.length}문제 중 ${score}문제를 맞혔습니다!`;
}

// 페이지가 로드되면 퀴즈 시작
startQuiz();

// 사용자 정의 사건 목록
const events = [
  { name: '바람의나라', year: 1996, image: 'images/01.png' },
  { name: '타이타닉', year: 1997, image: 'images/02.png' },
  { name: '아이언맨1', year: 2008, image: 'images/03.png' },
  { name: '셔플댄스', year: 2010, image: 'images/04.png' },
  { name: '무한도전 돈가방을 갖고 튀어라', year: 2008, image: 'images/05.png' },
  { name: '꼭짓점 댄스', year: 2006, image: 'images/06.png' },
  { name: '빠삐놈', year: 2008, image: 'images/07.png' },
  { name: '슈퍼주니어 쏘리쏘리', year: 2009, image: 'images/08.png' },
  { name: '스타크래프트: 브루드 워', year: 1998, image: 'images/09.png' },
  { name: '마시마로(엽기토끼)', year: 2000, image: 'images/10.png' },
  { name: '스타벅스 한국 진출', year: 1999, image: 'images/11.png' },
  { name: '한일 월드컵', year: 2002, image: 'images/12.png' },
  { name: '리그 오브 레전드', year: 2011, image: 'images/13.png' },
  { name: '불닭볶음면', year: 2012, image: 'images/14.png' },
  { name: '비틀즈 Let it Be', year: 1970, image: 'images/15.png' },
  { name: '대부(The Godfather)1', year: 1973, image: 'images/16.png' },
  { name: '개그콘서트:봉숭아학당', year: 2000, image: 'images/17.png' },
  { name: '짬', year: 2005, image: 'images/18.png' },
  { name: '노스페이스 패딩', year: 2010, image: 'images/19.png' },
  { name: '웃찾사 그때그때 달라요', year: 2004, image: 'images/20.png' },
  { name: '테크노 댄스', year: 1990, image: 'images/21.png' },
  { name: '졸라맨', year: 1999, image: 'images/22.png' },
  { name: '해리포터와 마법사의 돌(책) 한국 발간', year: 1999, image: 'images/23.png' },
  { name: '펩시맨', year: 1997, image: 'images/24.png' },
  { name: '이말년씨리즈', year: 2009, image: 'images/25.png' },
  { name: '텔미', year: 2007, image: 'images/26.png' },
  { name: '소녀시대 Gee', year: 2009, image: 'images/27.png' },
  { name: '신과함께', year: 2010, image: 'images/28.png' },
  { name: '상남2인조', year: 1991, image: 'images/29.png' },
  { name: '별은 내 가슴에. 안재욱', year: 1997, image: 'images/30.png' }
];

let availableEvents = [...events];
let score = 0;
let questionCount = 0;
const totalQuestions = 15;

// DOM 요소 참조
const event1Image = document.getElementById('event1Image');
const event2Image = document.getElementById('event2Image');
const event1Name = document.getElementById('event1Name');
const event2Name = document.getElementById('event2Name');
const currentScoreElement = document.getElementById('currentScore');
const currentQuestionElement = document.getElementById('currentQuestion');
const totalQuestionsElement = document.getElementById('totalQuestions');
const finalScoreElement = document.getElementById('finalScore');
const gamePage = document.getElementById('game-page');
const resultPage = document.getElementById('result-page');
const restartButton = document.getElementById('restartButton');
const submitScoreButton = document.getElementById('submitScore');
const playerNameInput = document.getElementById('playerName');
const rankingList = document.getElementById('rankingList');

nextButton.id = 'nextButton';
nextButton.textContent = '다음 문제';
document.body.appendChild(nextButton);  // 버튼을 body에 추가

nextButton.onclick = () => {
  nextButton.style.display = 'none';  // 버튼 숨기기
  updateQuestion();  // 다음 질문으로 이동
};
// 총 문제 수 설정
totalQuestionsElement.textContent = totalQuestions;
function getRandomEvents() {
  if (availableEvents.length < 2) {
    endGame();
    return;
  }

  let event1, event2;
  let validPair = false;

  // 연도 차이가 10년 이하이고, 같은 연도가 아닐 때까지 반복
  while (!validPair) {
    const shuffled = availableEvents.sort(() => 0.5 - Math.random());
    event1 = shuffled[0];
    event2 = shuffled[1];

    // 두 사건의 연도 차이가 10년 이하이고, 같은 연도가 아닐 경우 유효한 문제로 처리
    if (Math.abs(event1.year - event2.year) <= 10 && event1.year !== event2.year) {
      validPair = true;
    }
  }

  // 선택된 사건들을 availableEvents에서 제거
  availableEvents = availableEvents.filter(event => event !== event1 && event !== event2);

  return [event1, event2];
}
function updateQuestion() {
  if (questionCount >= totalQuestions) {
    endGame();
    return;
  }
  // 기존 연도 요소 삭제
  const existingYears = document.querySelectorAll('.event-year');
  existingYears.forEach(year => year.remove());

  const [event1, event2] = getRandomEvents();

  event1Image.src = event1.image;
  event1Name.textContent = event1.name;
  event2Image.src = event2.image;
  event2Name.textContent = event2.name;

  // 새로운 연도 요소 추가
  const event1Year = document.createElement('div');
  event1Year.textContent = event1.year;
  event1Year.classList.add('event-year');
  const event2Year = document.createElement('div');
  event2Year.textContent = event2.year;
  event2Year.classList.add('event-year');

  event1Image.after(event1Year);
  event2Image.after(event2Year);

  // 이미지와 연도를 다시 초기화
  event1Image.parentElement.classList.remove('selected');
  event2Image.parentElement.classList.remove('selected');

  event1Image.onclick = () => checkAnswer(event1, event2, event1Year, event2Year);
  event2Image.onclick = () => checkAnswer(event2, event1, event2Year, event1Year);

  questionCount++;
  currentScoreElement.textContent = score;
  currentQuestionElement.textContent = questionCount;
}
function checkAnswer(older, newer, selectedYear, otherYear) {
  event1Image.parentElement.classList.add('selected');
  event2Image.parentElement.classList.add('selected');

  if (older.year < newer.year) {
    score++;
    body.classList.add('correct-answer');
  } else {
    body.classList.add('wrong-answer');
  }
  // 버튼을 표시하고, 마지막 문제일 경우 '결과 보기'로 변경
  nextButton.textContent = (questionCount === totalQuestions) ? '결과 보기' : '다음 문제';
  nextButton.style.display = 'block';

  setTimeout(() => {
    body.classList.remove('correct-answer', 'wrong-answer');
  }, 1500);  // 1.5초 후 배경색 효과 제거
}
function endGame() {
  // 게임 페이지 숨기고 결과 페이지 보여주기
  gamePage.classList.add('hidden');
  resultPage.classList.remove('hidden');

  // 최종 점수 표시
  finalScoreElement.textContent = score;
}
// 게임 다시 시작
restartButton.onclick = () => {
  score = 0;
  questionCount = 0;
  availableEvents = [...events];

  resultPage.classList.add('hidden');
  gamePage.classList.remove('hidden');

  // 게임 재시작
  updateQuestion();
};

// 점수 제출
submitScoreButton.onclick = () => {
  const playerName = playerNameInput.value.trim();
  if (playerName) {
    saveScore(playerName, score);
    showRanking();
    playerNameInput.value = ''; // 이름 입력 필드 초기화
  }
};

// 점수 저장 함수 (localStorage에 저장)
function saveScore(name, score) {
  const scores = JSON.parse(localStorage.getItem('scores')) || [];
  scores.push({ name, score });
  
  // 점수를 내림차순으로 정렬 후 상위 20명만 유지
  scores.sort((a, b) => b.score - a.score);
  const topScores = scores.slice(0, 20);

  localStorage.setItem('scores', JSON.stringify(topScores));
}

// 랭킹 표시 함수
function showRanking() {
  const scores = JSON.parse(localStorage.getItem('scores')) || [];
  rankingList.innerHTML = ''; // 기존 랭킹 초기화

  scores.forEach((score, index) => {
    const li = document.createElement('li');
    li.textContent = `${index + 1}. ${score.name}: ${score.score}점`;
    rankingList.appendChild(li);
  });
}

// 게임 시작
updateQuestion();
showRanking(); // 페이지가 로드될 때 랭킹 표시

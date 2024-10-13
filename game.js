// 사용자 정의 사건 목록
const events = [
  { name: '바람의나라', year: 1996 },
  { name: '타이타닉', year: 1997 },
  { name: '아이언맨1', year: 2008 },
  { name: '셔플댄스', year: 2010 },
  { name: '무한도전 돈가방을 갖고 튀어라', year: 2008 },
  { name: '꼭짓점 댄스', year: 2006 },
  { name: '빅뱅 붉은노을', year: 2008 },
  { name: '슈퍼주니어 쏘리쏘리', year: 2009 },
  { name: '스타크래프트: 브루드 워', year: 1998 },
  { name: '마시마로(엽기토끼)', year: 2000 },
  { name: '스타벅스 한국 진출', year: 1999 },
  { name: '한일 월드컵', year: 2002 },
  { name: '리그 오브 레전드', year: 2011 },
  { name: '불닭볶음면', year: 2012 },
  { name: '비틀즈 Let it Be', year: 1970 },
  { name: '대부(The Godfather)1', year: 1973 },
  { name: '스키니진', year: 2000 },
  { name: '짬', year: 2005 },
  { name: '노스페이스 패딩', year: 2010 },
  { name: '웃찾사 그때그때 달라요', year: 2004 },
  { name: '테크노 댄스', year: 1990 },
  { name: '졸라맨', year: 1999 },
  { name: '해리포터와 마법사의 돌(책) 한국 발간', year: 1999 },
  { name: '펩시맨', year: 1997 },
  { name: '이말년씨리즈', year: 2009 },
  { name: '텔미', year: 2007 },
  { name: '소녀시대 Gee', year: 2009 },
  { name: '신과함께', year: 2010 },
  { name: '상남2인조', year: 1991 },
  { name: '별은 내 가슴에. 안재욱', year: 1997 }
];

let score = 0;
let questionCount = 0;
const totalQuestions = 5;  // 총 문제 수

// DOM 요소
const event1Button = document.getElementById('event1Button');
const event2Button = document.getElementById('event2Button');
const scoreElement = document.getElementById('score');
const finalScoreElement = document.getElementById('finalScore');
const resultPage = document.getElementById('result');
const gamePage = document.getElementById('game');
const rankingList = document.getElementById('rankingList');

// 남은 사건 배열
let availableEvents = [...events];

// 중복 방지 및 랜덤 선택
function getRandomEvents() {
  // 남은 사건이 2개 미만일 경우 처리
  if (availableEvents.length < 2) {
    endGame();
    return;
  }

  const shuffled = availableEvents.sort(() => 0.5 - Math.random());
  const event1 = shuffled[0];
  const event2 = shuffled[1];

  // 사용된 사건을 배열에서 제거
  availableEvents = availableEvents.filter(event => event !== event1 && event !== event2);

  return [event1, event2];
}

function updateQuestion() {
  // 총 문제 수를 초과하면 게임 종료
  if (questionCount >= totalQuestions) {
    endGame();
    return;
  }

  const eventsPair = getRandomEvents();
  if (!eventsPair) return;  // 사건이 부족할 경우 함수 종료

  const [event1, event2] = eventsPair;
  event1Button.textContent = event1.name;
  event2Button.textContent = event2.name;

  // 정답 선택 시 처리
  event1Button.onclick = () => checkAnswer(event1, event2);
  event2Button.onclick = () => checkAnswer(event2, event1);

  questionCount++;
}

function checkAnswer(older, newer) {
  if (older.year < newer.year) {
    score++;
  }
  scoreElement.textContent = score;
  updateQuestion();
}

function endGame() {
  gamePage.classList.add('hidden');
  resultPage.classList.remove('hidden');
  finalScoreElement.textContent = score;
  displayRanking();
}

function displayRanking() {
  // 랭킹 리스트 임시 데이터
  const rankings = [
    { username: '홍길동', score: 5 },
    { username: '김철수', score: 4 },
    { username: '박영희', score: 3 }
  ];

  rankingList.innerHTML = '';
  rankings.forEach((entry) => {
    const li = document.createElement('li');
    li.textContent = `${entry.username}: ${entry.score}점`;
    rankingList.appendChild(li);
  });
}

// 게임 재시작
document.getElementById('restart').onclick = () => {
  score = 0;
  questionCount = 0;
  availableEvents = [...events];  // 사용한 사건 초기화
  scoreElement.textContent = score;
  resultPage.classList.add('hidden');
  gamePage.classList.remove('hidden');
  updateQuestion();
};

// 게임 시작
updateQuestion();

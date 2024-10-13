// 사건 목록
const events = [
    { name: '한일 월드컵', year: 2002 },
    { name: '한국 전쟁', year: 1950 },
    { name: '서울 올림픽', year: 1988 },
    { name: '애플 아이폰 출시', year: 2007 },
    { name: '대한민국 독립', year: 1945 },
    { name: '달 착륙', year: 1969 },
    { name: '베를린 장벽 붕괴', year: 1989 },
    { name: '유로화 도입', year: 1999 },
    { name: '인터넷 발명', year: 1983 }
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
  

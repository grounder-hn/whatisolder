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
    // 더 많은 사건 추가 가능
  ];
  
  let score = 0;
  let questionCount = 0;
  let availableEvents = [...events];
  const totalQuestions = 5;
  
  // DOM 요소
  const event1Button = document.getElementById('event1Button');
  const event2Button = document.getElementById('event2Button');
  const scoreElement = document.getElementById('score');
  const finalScoreElement = document.getElementById('finalScore');
  const resultPage = document.getElementById('result');
  const gamePage = document.getElementById('game');
  const rankingList = document.getElementById('rankingList');
  
  // 중복 방지 및 랜덤 선택
  function getRandomEvents() {
    availableEvents = availableEvents.filter(event => !event.used);
    const shuffled = availableEvents.sort(() => 0.5 - Math.random());
    const event1 = shuffled[0];
    const event2 = shuffled[1];
    event1.used = true;
    event2.used = true;
    return [event1, event2];
  }
  
  function updateQuestion() {
    if (questionCount >= totalQuestions) {
      endGame();
      return;
    }
  
    const [event1, event2] = getRandomEvents();
    event1Button.textContent = event1.name;
    event2Button.textContent = event2.name;
  
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
    availableEvents = [...events]; // 사용한 이벤트 초기화
    scoreElement.textContent = score;
    resultPage.classList.add('hidden');
    gamePage.classList.remove('hidden');
    updateQuestion();
  };
  
  // 게임 시작
  updateQuestion();
  
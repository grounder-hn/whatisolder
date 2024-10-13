// 사건 목록 예시
const events = [
    { name: '한일 월드컵', year: 2002 },
    { name: '한국 전쟁', year: 1950 },
    { name: '서울 올림픽', year: 1988 },
    { name: '애플 아이폰 출시', year: 2007 },
    { name: '대한민국 독립', year: 1945 }
    // 사건을 더 추가할 수 있습니다.
  ];
  
  let score = 0; // 점수 저장
  let questionCount = 0; // 문제 수 카운팅
  const totalQuestions = 20; // 총 20문제
  
  // DOM 요소 가져오기
  const event1Element = document.getElementById('event1');
  const event2Element = document.getElementById('event2');
  const scoreElement = document.getElementById('score');
  
  function getRandomEvents() {
    const shuffled = events.sort(() => 0.5 - Math.random()); // 사건을 랜덤하게 섞음
    return [shuffled[0], shuffled[1]];
  }
  
  function updateQuestion() {
    if (questionCount >= totalQuestions) {
      alert(`게임 종료! 최종 점수: ${score}`);
      return;
    }
  
    const [event1, event2] = getRandomEvents();
    event1Element.textContent = `${event1.name} (${event1.year}년)`;
    event2Element.textContent = `${event2.name} (${event2.year}년)`;
  
    document.getElementById('chooseEvent1').onclick = () => checkAnswer(event1, event2);
    document.getElementById('chooseEvent2').onclick = () => checkAnswer(event2, event1);
  
    questionCount++; // 문제 수 카운트 증가
  }
  
  function checkAnswer(older, newer) {
    if (older.year < newer.year) {
      score++;
      alert('정답입니다!');
    } else {
      alert('오답입니다!');
    }
    scoreElement.textContent = score;
    updateQuestion();
  }
  
  // 게임 시작
  updateQuestion();
  
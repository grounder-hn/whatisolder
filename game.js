// 사용자 정의 사건 목록
const events = [
  { name: '바람의나라', year: 1996, image: 'images/01.png' },
  { name: '타이타닉', year: 1997, image: 'images/02.png' },
  { name: '아이언맨1', year: 2008, image: 'images/03.png' },
  { name: '셔플댄스', year: 2010, image: 'images/04.png' },
  { name: '무한도전 돈가방을 갖고 튀어라', year: 2008, image: 'images/05.png' },
  { name: '꼭짓점 댄스', year: 2006, image: 'images/06.png' },
  { name: '빅뱅 붉은노을', year: 2008, image: 'images/07.png' },
  { name: '슈퍼주니어 쏘리쏘리', year: 2009, image: 'images/08.png' },
  { name: '스타크래프트: 브루드 워', year: 1998, image: 'images/09.png' },
  { name: '마시마로(엽기토끼)', year: 2000, image: 'images/10.png' },
  { name: '스타벅스 한국 진출', year: 1999, image: 'images/11.png' },
  { name: '한일 월드컵', year: 2002, image: 'images/12.png' },
  { name: '리그 오브 레전드', year: 2011, image: 'images/13.png' },
  { name: '불닭볶음면', year: 2012, image: 'images/14.png' },
  { name: '비틀즈 Let it Be', year: 1970, image: 'images/15.png' },
  { name: '대부(The Godfather)1', year: 1973, image: 'images/16.png' },
  { name: '스키니진', year: 2000, image: 'images/17.png' },
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
const

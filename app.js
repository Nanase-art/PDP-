const questions = [
  { text: "終於忙完一整週，理想的週末午後是？", answers: ["窩在熟悉的角落，安靜充電", "揪上朋友出門，走到哪玩到哪", "找個新地方探索，順便觀察世界", "把喜歡的人約來家裡，好好陪伴"] },
  { text: "朋友臨時改了約，你第一個反應是？", answers: ["太好了，剛好有自己的時間", "沒關係！那我們改去別的地方", "先問清楚原因，再重新安排", "有點失落，但會關心對方還好嗎"] },
  { text: "來到一個陌生的聚會，你通常會？", answers: ["先找舒服的位置，慢慢熟悉環境", "主動打招呼，很快就聊開了", "默默觀察，找到有趣的人再加入", "待在熟悉的人身邊，照顧大家"] },
  { text: "遇到一件棘手的事，你習慣？", answers: ["先自己想一想，整理好再行動", "邊做邊試，總會找到辦法", "拆成小步驟，仔細找出線索", "找信任的人聊聊，一起想辦法"] },
  { text: "如果今天突然多出一小時，你會？", answers: ["發呆、伸懶腰，什麼也不趕", "立刻出門，去做一件好玩的事", "看看一直好奇、還沒研究的東西", "打電話給朋友，分享這段空檔"] },
  { text: "你最常被身邊的人說很？", answers: ["有自己的節奏，卻很有魅力", "很有活力，總能炒熱氣氛", "觀察入微，想法很特別", "溫柔可靠，讓人很安心"] },
  { text: "面對新的挑戰，你心裡的小聲音是？", answers: ["先看看值不值得，再決定", "走吧！不試試怎麼知道", "讓我先研究一下可能性", "有人一起的話，我就放心多了"] },
  { text: "對你來說，最棒的一天結尾是？", answers: ["回到自己的空間，舒服地放鬆", "還在回味今天發生的有趣故事", "學到一件新事，腦袋滿滿收穫", "和喜歡的人互道晚安、彼此陪伴"] }
];

const results = [
  { name: "慵懶貓貓", emoji: "🐱", subtitle: "自在獨立，溫柔有自己的節奏", description: "你知道怎麼照顧自己的感受，也珍惜舒服自在的相處。安靜的你並不冷淡，只是把真心留給值得的人；一旦認定，就會用自己的方式溫柔陪伴。", traits: ["自在獨立", "敏銳細膩", "慢熟深情"] },
  { name: "快樂狗狗", emoji: "🐶", subtitle: "熱情直率，總能讓日常發光", description: "你帶著滿滿的好奇心走進每一天，願意把快樂分享給身邊的人。你的直率讓人感到真誠，行動力也常常替生活打開意想不到的新支線。", traits: ["熱情真誠", "行動派", "感染力十足"] },
  { name: "聰明狐狸", emoji: "🦊", subtitle: "觀察敏銳，腦中總有新點子", description: "你擅長看見別人忽略的小細節，常常能用不同角度找到答案。好奇心讓你不斷探索，而清晰的判斷力，則讓你知道什麼時候該出發。", traits: ["好奇心旺盛", "點子很多", "洞察力強"] },
  { name: "暖心兔兔", emoji: "🐰", subtitle: "溫柔體貼，讓身邊的人安心", description: "你細心感受周遭，也很懂得珍惜彼此的連結。你的溫柔不是沒有主見，而是知道關心如何讓人更有力量；和你相處，總能找到安心的感覺。", traits: ["溫柔體貼", "重視連結", "可靠安心"] }
];

let current = 0;
let choices = [];
const intro = document.querySelector("#intro-screen");
const quiz = document.querySelector("#question-screen");
const result = document.querySelector("#result-screen");
const progressFill = document.querySelector("#progress-fill");
const progressTrack = document.querySelector(".progress-track");
const answersBox = document.querySelector("#answers");

function showScreen(screen) {
  for (const item of [intro, quiz, result]) {
    item.hidden = item !== screen;
    item.classList.toggle("active", item === screen);
  }
}

function renderQuestion() {
  const question = questions[current];
  const percent = Math.round(((current + 1) / questions.length) * 100);
  document.querySelector("#question-kicker").textContent = `${String(current + 1).padStart(2, "0")} / ${String(questions.length).padStart(2, "0")}`;
  document.querySelector("#progress-label").textContent = `探索進度 ${percent}%`;
  progressFill.style.width = `${percent}%`;
  progressTrack.setAttribute("aria-valuenow", String(percent));
  document.querySelector("#question-title").textContent = question.text;
  document.querySelector("#back-button").disabled = current === 0;
  answersBox.replaceChildren(...question.answers.map((answer, index) => {
    const button = document.createElement("button");
    button.className = `answer${choices[current] === index ? " selected" : ""}`;
    button.type = "button";
    button.innerHTML = `<span class="answer-letter">${String.fromCharCode(65 + index)}</span><span>${answer}</span>`;
    button.addEventListener("click", (event) => chooseAnswer(index, event));
    return button;
  }));
  showScreen(quiz);
}

function starBurst(event) {
  const layer = document.querySelector("#star-layer");
  const x = event.clientX || window.innerWidth / 2;
  const y = event.clientY || window.innerHeight / 2;
  for (let i = 0; i < 7; i++) {
    const star = document.createElement("span");
    star.className = "star";
    star.textContent = ["✦", "✧", "✳"][i % 3];
    star.style.setProperty("--x", `${x + (Math.random() - .5) * 50}px`);
    star.style.setProperty("--y", `${y + (Math.random() - .5) * 20}px`);
    star.style.setProperty("--dx", `${(Math.random() - .5) * 90}px`);
    star.style.setProperty("--size", `${10 + Math.random() * 10}px`);
    star.style.setProperty("--color", ["#7853d8", "#e9b747", "#a0bd38"][i % 3]);
    layer.append(star);
    star.addEventListener("animationend", () => star.remove(), { once: true });
  }
}

function chooseAnswer(index, event) {
  choices[current] = index;
  starBurst(event);
  renderQuestion();
  if (current < questions.length - 1) {
    current++;
    window.setTimeout(renderQuestion, 220);
  } else {
    window.setTimeout(showResult, 220);
  }
}

function showResult() {
  const scores = [0, 0, 0, 0];
  for (const choice of choices) scores[choice]++;
  const max = Math.max(...scores);
  const winner = scores.indexOf(max);
  const profile = results[winner];
  document.querySelector("#result-name").textContent = profile.name;
  document.querySelector("#result-emoji").textContent = profile.emoji;
  document.querySelector("#result-subtitle").textContent = profile.subtitle;
  document.querySelector("#result-description").textContent = profile.description;
  document.querySelector("#trait-list").replaceChildren(...profile.traits.map((trait) => {
    const tag = document.createElement("span"); tag.className = "trait"; tag.textContent = `✦ ${trait}`; return tag;
  }));
  showScreen(result);
}

document.querySelector("#start-button").addEventListener("click", (event) => { starBurst(event); current = 0; choices = []; renderQuestion(); });
document.querySelector("#back-button").addEventListener("click", () => { if (current > 0) { current--; renderQuestion(); } });
document.querySelector("#restart-button").addEventListener("click", () => { current = 0; choices = []; showScreen(intro); });
document.querySelector("#share-button").addEventListener("click", async (event) => {
  starBurst(event);
  const text = `我在「你是哪種小動物？」測出是${document.querySelector("#result-name").textContent}！來測測你的動物性格。`;
  const status = document.querySelector("#share-status");
  try {
    if (navigator.share) await navigator.share({ title: "PDP 動物性格測驗", text, url: location.href });
    else { await navigator.clipboard.writeText(`${text} ${location.href}`); status.textContent = "結果連結已複製，分享給朋友吧！"; }
  } catch (error) { if (error.name !== "AbortError") status.textContent = "複製連結時發生問題，請直接分享網址。"; }
});

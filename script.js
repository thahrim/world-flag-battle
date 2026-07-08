const defaultTeams = [
  { code: "pt", name: "Portugal", total: 48, supporters: 13, last: "RimZ says Ronaldo forever" },
  { code: "br", name: "Brazil", total: 42, supporters: 11, last: "Joga bonito" },
  { code: "ar", name: "Argentina", total: 39, supporters: 9, last: "Vamos!" },
  { code: "fr", name: "France", total: 31, supporters: 7, last: "Allez les Bleus" },
  { code: "ca", name: "Canada", total: 27, supporters: 8, last: "Toronto is showing up" },
  { code: "bd", name: "Bangladesh", total: 22, supporters: 6, last: "Bangladesh on the board" },
  { code: "ma", name: "Morocco", total: 18, supporters: 4, last: "Atlas Lions energy" },
  { code: "jp", name: "Japan", total: 16, supporters: 4, last: "Samurai Blue" },
  { code: "de", name: "Germany", total: 15, supporters: 3, last: "Never count them out" },
  { code: "es", name: "Spain", total: 13, supporters: 3, last: "La Roja" },
  { code: "gb-eng", name: "England", total: 12, supporters: 3, last: "It might be coming home" },
  { code: "nl", name: "Netherlands", total: 9, supporters: 2, last: "Orange wave" },
  { code: "mx", name: "Mexico", total: 8, supporters: 2, last: "Vamos México" },
  { code: "us", name: "United States", total: 7, supporters: 2, last: "USA boost" },
  { code: "it", name: "Italy", total: 6, supporters: 1, last: "Azzurri" },
  { code: "kr", name: "South Korea", total: 5, supporters: 1, last: "Red Devils" },
  { code: "ng", name: "Nigeria", total: 4, supporters: 1, last: "Super Eagles" },
  { code: "eg", name: "Egypt", total: 3, supporters: 1, last: "Pharaohs" }
];

const storageKey = "worldFlagBattleTeamsV4";
let teams = loadTeams();
let activeTeamCode = null;
let selectedAmount = 5;

const board = document.querySelector("#flag-board");
const leaderboardList = document.querySelector("#leaderboard-list");
const leaderboardPanel = document.querySelector("#leaderboard-panel");
const leaderboardToggle = document.querySelector("#leaderboard-toggle");
const closeLeaderboard = document.querySelector("#close-leaderboard");
const modal = document.querySelector("#boost-modal");
const modalFlag = document.querySelector("#modal-flag");
const modalTitle = document.querySelector("#modal-title");
const confirmBoost = document.querySelector("#confirm-boost");
const supporterName = document.querySelector("#supporter-name");
const amountGrid = document.querySelector("#amount-grid");

function loadTeams() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    return Array.isArray(saved) && saved.length ? saved : structuredClone(defaultTeams);
  } catch {
    return structuredClone(defaultTeams);
  }
}

function saveTeams() {
  localStorage.setItem(storageKey, JSON.stringify(teams));
}

function money(amount) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0
  }).format(amount);
}

function getSortedTeams() {
  return [...teams].sort((a, b) => b.total - a.total);
}

function getFlagUrl(team) {
  return `https://flagcdn.com/${team.code}.svg`;
}

function getSize(team, index) {
  const sorted = getSortedTeams();
  const max = Math.max(sorted[0]?.total || 1, 1);
  const ratio = Math.sqrt(team.total / max);
  const base = index === 0 ? 33 : 8 + ratio * 14;
  return Math.max(index === 0 ? 29 : 9, Math.min(index === 0 ? 36 : 22, base));
}

function getRingPosition(index, total) {
  if (index === 0) {
    return { x: 50, y: 50, ring: 0 };
  }

  const ringOneCount = Math.min(6, total - 1);
  const ringTwoCount = Math.min(10, Math.max(total - 1 - ringOneCount, 0));
  const innerStart = 1;
  const outerStart = 1 + ringOneCount;

  let ring = 1;
  let ringIndex = index - innerStart;
  let ringCount = ringOneCount;
  let radiusX = 27;
  let radiusY = 26;
  let angleOffset = -90;

  if (index >= outerStart) {
    ring = 2;
    ringIndex = index - outerStart;
    ringCount = ringTwoCount || 1;
    radiusX = 43;
    radiusY = 40;
    angleOffset = -78;
  }

  const angle = angleOffset + (360 / ringCount) * ringIndex;
  const radians = angle * Math.PI / 180;
  const wobble = ring === 1 ? 2.5 : 3.5;

  return {
    x: 50 + Math.cos(radians) * radiusX + Math.sin(radians * 2) * wobble,
    y: 50 + Math.sin(radians) * radiusY + Math.cos(radians * 1.5) * wobble,
    ring
  };
}

function renderBoard() {
  const sorted = getSortedTeams();

  board.innerHTML = `
    <div class="ring-guide ring-one" aria-hidden="true"></div>
    <div class="ring-guide ring-two" aria-hidden="true"></div>
    ${sorted.map((team, index) => renderTile(team, index, sorted.length)).join("")}
  `;
}

function renderTile(team, index, total) {
  const position = getRingPosition(index, total);
  const size = getSize(team, index).toFixed(2);
  const isLeader = index === 0;

  return `
    <article class="flag-node ${isLeader ? "is-leader" : ""} ring-${position.ring}" style="--x: ${position.x}%; --y: ${position.y}%; --size: ${size}vmin" tabindex="0" aria-label="${team.name}, ${money(team.total)} boosted">
      <div class="flag-visual" aria-hidden="true">
        <img src="${getFlagUrl(team)}" alt="" loading="lazy" />
      </div>
      <div class="flag-overlay">
        <div>
          <h2 class="flag-name">${team.name}</h2>
          <p class="flag-score">${money(team.total)} • ${team.supporters} fan${team.supporters === 1 ? "" : "s"}</p>
        </div>
        <button class="boost-button" data-boost="${team.code}" type="button">Boost</button>
      </div>
    </article>
  `;
}

function renderStats() {
  const sorted = getSortedTeams();
  const leader = sorted[0];
  const totalBoosts = teams.reduce((sum, team) => sum + team.total, 0);
  document.querySelector("#leader-label").textContent = `Center leader: ${leader.name}`;
  document.querySelector("#total-label").textContent = `Total boosts: ${money(totalBoosts)}`;
}

function renderLeaderboard() {
  leaderboardList.innerHTML = getSortedTeams().map((team, index) => `
    <li class="leader-row">
      <span class="leader-rank">${index + 1}</span>
      <div class="leader-country">
        <strong><img src="${getFlagUrl(team)}" alt="" loading="lazy" /> ${team.name}</strong>
        <span>${money(team.total)} • latest: ${escapeHtml(team.last)}</span>
      </div>
      <strong>${index === 0 ? "Center" : `Ring ${getRingPosition(index, teams.length).ring}`}</strong>
    </li>
  `).join("");
}

function render() {
  renderBoard();
  renderStats();
  renderLeaderboard();
}

function openBoostModal(teamCode) {
  const team = teams.find(item => item.code === teamCode);
  if (!team) return;

  activeTeamCode = teamCode;
  selectedAmount = 5;
  supporterName.value = "";
  modalFlag.innerHTML = `<img src="${getFlagUrl(team)}" alt="${team.name} flag" />`;
  modalTitle.textContent = team.name;
  amountGrid.querySelectorAll("button").forEach(button => {
    button.classList.toggle("is-selected", Number(button.dataset.amount) === selectedAmount);
  });

  if (typeof modal.showModal === "function") {
    modal.showModal();
  } else {
    modal.setAttribute("open", "");
  }
}

function addBoost() {
  const team = teams.find(item => item.code === activeTeamCode);
  if (!team) return;

  const message = supporterName.value.trim();
  team.total += selectedAmount;
  team.supporters += 1;
  team.last = message || `${money(selectedAmount)} fan boost added`;
  saveTeams();
  render();
  modal.close();
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

board.addEventListener("click", event => {
  const button = event.target.closest("[data-boost]");
  if (!button) return;
  openBoostModal(button.dataset.boost);
});

board.addEventListener("touchstart", event => {
  const node = event.target.closest(".flag-node");
  if (!node) return;
  document.querySelectorAll(".flag-node.is-open").forEach(item => item.classList.remove("is-open"));
  node.classList.add("is-open");
}, { passive: true });

amountGrid.addEventListener("click", event => {
  const button = event.target.closest("button[data-amount]");
  if (!button) return;
  selectedAmount = Number(button.dataset.amount);
  amountGrid.querySelectorAll("button").forEach(item => item.classList.remove("is-selected"));
  button.classList.add("is-selected");
});

confirmBoost.addEventListener("click", addBoost);

leaderboardToggle.addEventListener("click", () => {
  const isOpen = leaderboardPanel.classList.toggle("is-open");
  leaderboardToggle.setAttribute("aria-expanded", String(isOpen));
});

closeLeaderboard.addEventListener("click", () => {
  leaderboardPanel.classList.remove("is-open");
  leaderboardToggle.setAttribute("aria-expanded", "false");
});

document.querySelector("#reset-demo").addEventListener("click", () => {
  localStorage.removeItem(storageKey);
  teams = structuredClone(defaultTeams);
  render();
});

render();

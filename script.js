const defaultTeams = [
  { code: "pt", name: "Portugal", flag: "🇵🇹", total: 48, supporters: 13, last: "RimZ says Ronaldo forever" },
  { code: "br", name: "Brazil", flag: "🇧🇷", total: 42, supporters: 11, last: "Joga bonito" },
  { code: "ar", name: "Argentina", flag: "🇦🇷", total: 39, supporters: 9, last: "Vamos!" },
  { code: "fr", name: "France", flag: "🇫🇷", total: 31, supporters: 7, last: "Allez les Bleus" },
  { code: "ca", name: "Canada", flag: "🇨🇦", total: 27, supporters: 8, last: "Toronto is showing up" },
  { code: "bd", name: "Bangladesh", flag: "🇧🇩", total: 22, supporters: 6, last: "Bangladesh on the board" },
  { code: "ma", name: "Morocco", flag: "🇲🇦", total: 18, supporters: 4, last: "Atlas Lions energy" },
  { code: "jp", name: "Japan", flag: "🇯🇵", total: 16, supporters: 4, last: "Samurai Blue" },
  { code: "de", name: "Germany", flag: "🇩🇪", total: 15, supporters: 3, last: "Never count them out" },
  { code: "es", name: "Spain", flag: "🇪🇸", total: 13, supporters: 3, last: "La Roja" },
  { code: "gb-eng", name: "England", flag: "🏴", total: 12, supporters: 3, last: "It might be coming home" },
  { code: "nl", name: "Netherlands", flag: "🇳🇱", total: 9, supporters: 2, last: "Orange wave" },
  { code: "mx", name: "Mexico", flag: "🇲🇽", total: 8, supporters: 2, last: "Vamos México" },
  { code: "us", name: "United States", flag: "🇺🇸", total: 7, supporters: 2, last: "USA boost" },
  { code: "it", name: "Italy", flag: "🇮🇹", total: 6, supporters: 1, last: "Azzurri" },
  { code: "kr", name: "South Korea", flag: "🇰🇷", total: 5, supporters: 1, last: "Red Devils" },
  { code: "ng", name: "Nigeria", flag: "🇳🇬", total: 4, supporters: 1, last: "Super Eagles" },
  { code: "eg", name: "Egypt", flag: "🇪🇬", total: 3, supporters: 1, last: "Pharaohs" }
];

const storageKey = "worldFlagBattleTeamsV2";
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

function getBasis(team) {
  const total = teams.reduce((sum, item) => sum + item.total, 0) || 1;
  const share = team.total / total;
  return Math.max(8, Math.min(34, share * 100 * 2.35));
}

function renderBoard() {
  board.innerHTML = getSortedTeams().map(team => {
    const basis = getBasis(team).toFixed(2);
    return `
      <article class="flag-tile" style="--basis: ${basis}%" tabindex="0" aria-label="${team.name}, ${money(team.total)} boosted">
        <div class="flag-visual" aria-hidden="true">${team.flag}</div>
        <div class="flag-overlay">
          <div>
            <h2 class="flag-name">${team.name}</h2>
            <p class="flag-score">${money(team.total)} • ${team.supporters} fan${team.supporters === 1 ? "" : "s"}</p>
          </div>
          <button class="boost-button" data-boost="${team.code}" type="button">Boost ${team.flag}</button>
        </div>
      </article>
    `;
  }).join("");
}

function renderStats() {
  const sorted = getSortedTeams();
  const leader = sorted[0];
  const totalBoosts = teams.reduce((sum, team) => sum + team.total, 0);
  document.querySelector("#leader-label").textContent = `Leader: ${leader.flag} ${leader.name}`;
  document.querySelector("#total-label").textContent = `Total boosts: ${money(totalBoosts)}`;
}

function renderLeaderboard() {
  leaderboardList.innerHTML = getSortedTeams().map((team, index) => `
    <li class="leader-row">
      <span class="leader-rank">${index + 1}</span>
      <div class="leader-country">
        <strong>${team.flag} ${team.name}</strong>
        <span>${money(team.total)} • latest: ${escapeHtml(team.last)}</span>
      </div>
      <strong>${getBasis(team).toFixed(1)}%</strong>
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
  modalFlag.textContent = team.flag;
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
  const tile = event.target.closest(".flag-tile");
  if (!tile) return;
  document.querySelectorAll(".flag-tile.is-open").forEach(item => item.classList.remove("is-open"));
  tile.classList.add("is-open");
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

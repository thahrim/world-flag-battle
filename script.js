const defaultTeams = [
  { code: "pt", name: "Portugal", flag: "🇵🇹", total: 48, supporters: 13, last: "RimZ says Ronaldo forever" },
  { code: "ca", name: "Canada", flag: "🇨🇦", total: 27, supporters: 8, last: "Toronto is showing up" },
  { code: "br", name: "Brazil", flag: "🇧🇷", total: 42, supporters: 11, last: "Joga bonito" },
  { code: "ar", name: "Argentina", flag: "🇦🇷", total: 39, supporters: 9, last: "Vamos!" },
  { code: "fr", name: "France", flag: "🇫🇷", total: 31, supporters: 7, last: "Allez les Bleus" },
  { code: "bd", name: "Bangladesh", flag: "🇧🇩", total: 22, supporters: 6, last: "Bangladesh on the board" },
  { code: "ma", name: "Morocco", flag: "🇲🇦", total: 18, supporters: 4, last: "Atlas Lions energy" },
  { code: "jp", name: "Japan", flag: "🇯🇵", total: 16, supporters: 4, last: "Samurai Blue" },
  { code: "de", name: "Germany", flag: "🇩🇪", total: 15, supporters: 3, last: "Never count them out" },
  { code: "es", name: "Spain", flag: "🇪🇸", total: 13, supporters: 3, last: "La Roja" },
  { code: "gb-eng", name: "England", flag: "🏴", total: 12, supporters: 3, last: "It might be coming home" },
  { code: "nl", name: "Netherlands", flag: "🇳🇱", total: 9, supporters: 2, last: "Orange wave" }
];

const storageKey = "worldFlagBattleTeamsV1";
let teams = loadTeams();
let activeTeamCode = null;
let selectedAmount = 5;

const flagsGrid = document.querySelector("#flags-grid");
const leaderboardList = document.querySelector("#leaderboard-list");
const modal = document.querySelector("#boost-modal");
const modalFlag = document.querySelector("#modal-flag");
const modalTitle = document.querySelector("#modal-title");
const confirmBoost = document.querySelector("#confirm-boost");
const supporterName = document.querySelector("#supporter-name");
const countrySearch = document.querySelector("#country-search");
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

function getFlagSize(team) {
  const max = Math.max(...teams.map(item => item.total), 1);
  const ratio = team.total / max;
  return Math.round(54 + ratio * 72);
}

function renderStats() {
  const sorted = getSortedTeams();
  const leader = sorted[0];
  const totalBoosts = teams.reduce((sum, team) => sum + team.total, 0);
  const totalSupporters = teams.reduce((sum, team) => sum + team.supporters, 0);

  document.querySelector("#top-team-name").textContent = `${leader.flag} ${leader.name}`;
  document.querySelector("#hero-flag").textContent = leader.flag;
  document.querySelector("#total-boosts").textContent = money(totalBoosts);
  document.querySelector("#total-progress").style.width = `${Math.min(100, 18 + totalBoosts / 4)}%`;
  document.querySelector("#countries-count").textContent = teams.length;
  document.querySelector("#supporters-count").textContent = totalSupporters;
  document.querySelector("#biggest-boost").textContent = money(leader.total);
  document.querySelector("#year").textContent = new Date().getFullYear();
}

function renderFlags() {
  const query = countrySearch.value.trim().toLowerCase();
  const filteredTeams = getSortedTeams().filter(team => team.name.toLowerCase().includes(query));

  flagsGrid.innerHTML = filteredTeams.map(team => `
    <article class="flag-card">
      <div class="flag-emoji" style="font-size: ${getFlagSize(team)}px" aria-hidden="true">${team.flag}</div>
      <div class="flag-meta">
        <strong>${team.name}</strong>
        <span>${money(team.total)} boosted by ${team.supporters} fan${team.supporters === 1 ? "" : "s"}</span>
        <p class="supporter-line">Latest: ${escapeHtml(team.last)}</p>
        <button class="button button-secondary" data-boost="${team.code}">Boost ${team.flag}</button>
      </div>
    </article>
  `).join("");
}

function renderLeaderboard() {
  leaderboardList.innerHTML = getSortedTeams().map((team, index) => `
    <li class="leader-row">
      <span class="leader-rank">${index + 1}</span>
      <div class="leader-country">
        <strong>${team.flag} ${team.name}</strong>
        <span>${team.supporters} supporter${team.supporters === 1 ? "" : "s"}</span>
      </div>
      <strong>${money(team.total)}</strong>
    </li>
  `).join("");
}

function render() {
  renderStats();
  renderFlags();
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

flagsGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-boost]");
  if (!button) return;
  openBoostModal(button.dataset.boost);
});

amountGrid.addEventListener("click", event => {
  const button = event.target.closest("button[data-amount]");
  if (!button) return;
  selectedAmount = Number(button.dataset.amount);
  amountGrid.querySelectorAll("button").forEach(item => item.classList.remove("is-selected"));
  button.classList.add("is-selected");
});

confirmBoost.addEventListener("click", addBoost);
countrySearch.addEventListener("input", renderFlags);

document.querySelector("#reset-demo").addEventListener("click", () => {
  localStorage.removeItem(storageKey);
  teams = structuredClone(defaultTeams);
  render();
});

render();

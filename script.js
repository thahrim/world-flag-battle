const defaultTeams = [
  { code: "pt", flagCode: "pt", name: "Portugal", group: "K", total: 48, supporters: 13, last: "RimZ says Ronaldo forever" },
  { code: "br", flagCode: "br", name: "Brazil", group: "C", total: 44, supporters: 12, last: "Joga bonito" },
  { code: "ar", flagCode: "ar", name: "Argentina", group: "J", total: 42, supporters: 11, last: "Vamos!" },
  { code: "fr", flagCode: "fr", name: "France", group: "I", total: 39, supporters: 10, last: "Allez les Bleus" },
  { code: "es", flagCode: "es", name: "Spain", group: "H", total: 36, supporters: 9, last: "La Roja" },
  { code: "gb-eng", flagCode: "gb-eng", name: "England", group: "L", total: 34, supporters: 8, last: "It might be coming home" },
  { code: "be", flagCode: "be", name: "Belgium", group: "G", total: 31, supporters: 7, last: "Red Devils" },
  { code: "ca", flagCode: "ca", name: "Canada", group: "B", total: 29, supporters: 8, last: "Toronto is showing up" },
  { code: "ma", flagCode: "ma", name: "Morocco", group: "C", total: 27, supporters: 7, last: "Atlas Lions energy" },
  { code: "mx", flagCode: "mx", name: "Mexico", group: "A", total: 25, supporters: 6, last: "Vamos México" },
  { code: "us", flagCode: "us", name: "United States", group: "D", total: 24, supporters: 6, last: "USA boost" },
  { code: "de", flagCode: "de", name: "Germany", group: "E", total: 23, supporters: 5, last: "Never count them out" },
  { code: "nl", flagCode: "nl", name: "Netherlands", group: "F", total: 22, supporters: 5, last: "Orange wave" },
  { code: "co", flagCode: "co", name: "Colombia", group: "K", total: 21, supporters: 5, last: "Colombia on the board" },
  { code: "ch", flagCode: "ch", name: "Switzerland", group: "B", total: 20, supporters: 5, last: "Swiss boost" },
  { code: "hr", flagCode: "hr", name: "Croatia", group: "L", total: 19, supporters: 4, last: "Croatia support" },
  { code: "uy", flagCode: "uy", name: "Uruguay", group: "H", total: 18, supporters: 4, last: "La Celeste" },
  { code: "jp", flagCode: "jp", name: "Japan", group: "F", total: 17, supporters: 4, last: "Samurai Blue" },
  { code: "sn", flagCode: "sn", name: "Senegal", group: "I", total: 16, supporters: 4, last: "Lions of Teranga" },
  { code: "dz", flagCode: "dz", name: "Algeria", group: "J", total: 15, supporters: 3, last: "Desert Warriors" },
  { code: "ec", flagCode: "ec", name: "Ecuador", group: "E", total: 14, supporters: 3, last: "La Tri" },
  { code: "py", flagCode: "py", name: "Paraguay", group: "D", total: 13, supporters: 3, last: "Paraguay boost" },
  { code: "au", flagCode: "au", name: "Australia", group: "D", total: 12, supporters: 3, last: "Socceroos" },
  { code: "se", flagCode: "se", name: "Sweden", group: "F", total: 12, supporters: 3, last: "Sweden support" },
  { code: "no", flagCode: "no", name: "Norway", group: "I", total: 11, supporters: 3, last: "Norway boost" },
  { code: "at", flagCode: "at", name: "Austria", group: "J", total: 11, supporters: 2, last: "Austria boost" },
  { code: "tr", flagCode: "tr", name: "Turkey", group: "D", total: 10, supporters: 2, last: "Türkiye support" },
  { code: "ci", flagCode: "ci", name: "Ivory Coast", group: "E", total: 10, supporters: 2, last: "Les Éléphants" },
  { code: "za", flagCode: "za", name: "South Africa", group: "A", total: 9, supporters: 2, last: "Bafana Bafana" },
  { code: "kr", flagCode: "kr", name: "South Korea", group: "A", total: 9, supporters: 2, last: "Red Devils" },
  { code: "cz", flagCode: "cz", name: "Czechia", group: "A", total: 8, supporters: 2, last: "Czechia boost" },
  { code: "ba", flagCode: "ba", name: "Bosnia and Herzegovina", group: "B", total: 8, supporters: 2, last: "Bosnia boost" },
  { code: "qa", flagCode: "qa", name: "Qatar", group: "B", total: 7, supporters: 2, last: "Qatar support" },
  { code: "ht", flagCode: "ht", name: "Haiti", group: "C", total: 7, supporters: 1, last: "Haiti boost" },
  { code: "gb-sct", flagCode: "gb-sct", name: "Scotland", group: "C", total: 7, supporters: 1, last: "Scotland support" },
  { code: "cw", flagCode: "cw", name: "Curacao", group: "E", total: 6, supporters: 1, last: "Curacao boost" },
  { code: "tn", flagCode: "tn", name: "Tunisia", group: "F", total: 6, supporters: 1, last: "Tunisia support" },
  { code: "eg", flagCode: "eg", name: "Egypt", group: "G", total: 6, supporters: 1, last: "Pharaohs" },
  { code: "ir", flagCode: "ir", name: "Iran", group: "G", total: 5, supporters: 1, last: "Iran boost" },
  { code: "nz", flagCode: "nz", name: "New Zealand", group: "G", total: 5, supporters: 1, last: "All Whites" },
  { code: "cv", flagCode: "cv", name: "Cape Verde", group: "H", total: 5, supporters: 1, last: "Cape Verde boost" },
  { code: "sa", flagCode: "sa", name: "Saudi Arabia", group: "H", total: 5, supporters: 1, last: "Saudi support" },
  { code: "iq", flagCode: "iq", name: "Iraq", group: "I", total: 4, supporters: 1, last: "Iraq boost" },
  { code: "jo", flagCode: "jo", name: "Jordan", group: "J", total: 4, supporters: 1, last: "Jordan support" },
  { code: "cd", flagCode: "cd", name: "DR Congo", group: "K", total: 4, supporters: 1, last: "Leopards" },
  { code: "uz", flagCode: "uz", name: "Uzbekistan", group: "K", total: 4, supporters: 1, last: "Uzbekistan boost" },
  { code: "gh", flagCode: "gh", name: "Ghana", group: "L", total: 4, supporters: 1, last: "Black Stars" },
  { code: "pa", flagCode: "pa", name: "Panama", group: "L", total: 4, supporters: 1, last: "Panama support" }
];

const storageKey = "worldFlagBattleTeamsV6WorldCupOnly";
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

function cloneTeams(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadTeams() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    return Array.isArray(saved) && saved.length === defaultTeams.length ? saved : cloneTeams(defaultTeams);
  } catch (error) {
    return cloneTeams(defaultTeams);
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
  return cloneTeams(teams).sort((a, b) => b.total - a.total || a.name.localeCompare(b.name));
}

function getFlagUrl(team) {
  return `https://flagcdn.com/w320/${team.flagCode || team.code}.png`;
}

function getSize(team, index) {
  const sorted = getSortedTeams();
  const max = Math.max(sorted[0]?.total || 1, 1);
  const ratio = Math.sqrt(team.total / max);

  if (index === 0) return 28;
  if (index <= 8) return Math.max(13, 18 * ratio);
  if (index <= 22) return Math.max(9.5, 13 * ratio);
  return Math.max(6.8, 9.5 * ratio);
}

function isCompactBoard() {
  return window.matchMedia("(max-width: 760px)").matches;
}

function getRingPosition(index, total) {
  const compact = isCompactBoard();
  const centerY = compact ? 58 : 52;

  if (index === 0) return { x: 50, y: centerY, ring: 0 };

  const rings = compact ? [
    { count: 8, radiusX: 28, radiusY: 17, offset: -90 },
    { count: 14, radiusX: 36, radiusY: 28, offset: -78 },
    { count: Math.max(total - 23, 1), radiusX: 40, radiusY: 37, offset: -84 }
  ] : [
    { count: 8, radiusX: 25, radiusY: 22, offset: -90 },
    { count: 14, radiusX: 41, radiusY: 35, offset: -78 },
    { count: Math.max(total - 23, 1), radiusX: 50, radiusY: 45, offset: -84 }
  ];

  let remainingIndex = index - 1;
  let ringNumber = 1;
  let ring = rings[0];

  for (let i = 0; i < rings.length; i += 1) {
    if (remainingIndex < rings[i].count) {
      ringNumber = i + 1;
      ring = rings[i];
      break;
    }
    remainingIndex -= rings[i].count;
  }

  const angle = ring.offset + (360 / ring.count) * remainingIndex;
  const radians = angle * Math.PI / 180;

  return {
    x: 50 + Math.cos(radians) * ring.radiusX,
    y: 52 + Math.sin(radians) * ring.radiusY,
    ring: ringNumber
  };
}

function renderBoard() {
  const sorted = getSortedTeams();
  board.innerHTML = `
    <div class="ring-guide ring-one" aria-hidden="true"></div>
    <div class="ring-guide ring-two" aria-hidden="true"></div>
    <div class="ring-guide ring-three" aria-hidden="true"></div>
    ${sorted.map((team, index) => renderTile(team, index, sorted.length)).join("")}
  `;
}

function renderTile(team, index, total) {
  const position = getRingPosition(index, total);
  const size = getSize(team, index).toFixed(2);
  const isLeader = index === 0;

  return `
    <article class="flag-node ${isLeader ? "is-leader" : ""} ring-${position.ring}" data-team="${team.code}" style="--x:${position.x}%;--y:${position.y}%;--size:${size}vmin" tabindex="0" aria-label="${team.name}, ${money(team.total)} boosted">
      <div class="flag-visual" aria-hidden="true">
        <img src="${getFlagUrl(team)}" alt="" loading="lazy" onerror="this.closest('.flag-node').classList.add('flag-failed')" />
        <span>${team.name.slice(0, 2).toUpperCase()}</span>
      </div>
      <div class="flag-overlay">
        <div>
          <h2 class="flag-name">${team.name}</h2>
          <p class="flag-score">Group ${team.group} • ${money(team.total)}</p>
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
  document.querySelector("#total-label").textContent = `${teams.length} World Cup teams • ${money(totalBoosts)} boosted`;
}

function renderLeaderboard() {
  leaderboardList.innerHTML = getSortedTeams().map((team, index) => `
    <li class="leader-row">
      <span class="leader-rank">${index + 1}</span>
      <div class="leader-country">
        <strong><img src="${getFlagUrl(team)}" alt="" loading="lazy" /> ${team.name}</strong>
        <span>Group ${team.group} • ${money(team.total)} • latest: ${escapeHtml(team.last)}</span>
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
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

board.addEventListener("click", event => {
  const button = event.target.closest("[data-boost]");
  if (button) {
    openBoostModal(button.dataset.boost);
    return;
  }

  const node = event.target.closest(".flag-node[data-team]");
  if (!node || !isCompactBoard()) return;
  openBoostModal(node.dataset.team);
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
  teams = cloneTeams(defaultTeams);
  render();
});

window.addEventListener("resize", () => {
  render();
});

render();

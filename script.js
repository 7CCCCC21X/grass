const prices = [
  { percent: "3%", value: 0.0001264525 },
  { percent: "5%", value: 0.0002107542 },
  { percent: "10%", value: 0.0004215084 },
  { percent: "15%", value: 0.0006322626 },
  { percent: "20%", value: 0.0008430168 },
];

function calculate() {
  const amount = parseFloat(document.getElementById("amount").value);
  const tbody = document.getElementById("results");
  tbody.innerHTML = "";
  prices.forEach(p => {
    const total = (amount * p.value).toFixed(4);
    const row = `<tr><td>${p.percent}</td><td>${p.value.toFixed(10)}</td><td>$${total}</td></tr>`;
    tbody.innerHTML += row;
  });
}

calculate();

// 读取 leaderboard.txt 并建立地址 -> 排名映射
let leaderboardMap = {};

fetch("data/leaderboard.txt")
  .then(res => res.text())
  .then(text => {
    const lines = text.split(/\\r?\\n/);
    lines.forEach(line => {
      const [rank, address, points] = line.split(",");
      if (address) {
        leaderboardMap[address.trim().toLowerCase()] = {
          rank: rank.trim(),
          points: points.trim()
        };
      }
    });
  });

function searchAddress() {
  const input = document.getElementById("address").value.trim().toLowerCase();
  const result = leaderboardMap[input];
  const output = document.getElementById("searchResult");
  if (result) {
    output.innerHTML = `✅ 地址排名：#${result.rank}，草数量：${result.points}`;
  } else {
    output.innerHTML = "❌ 地址未找到，请检查输入或稍后重试。";
  }
}

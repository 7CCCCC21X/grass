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
  prices.forEach((p) => {
    const total = (amount * p.value).toFixed(4);
    const row = `<tr><td>${p.percent}</td><td>${p.value.toFixed(10)}</td><td>$${total}</td></tr>`;
    tbody.innerHTML += row;
  });
}
calculate();

// ----------- 新的 JSON 行排行榜解析 -----------

let leaderboard = {}; // address => { name, rank, points }

const leaderboardFiles = [
  "data/leaderboard-part.txt",
  "data/leaderboard-part1.txt",
  "data/leaderboard-part2.txt",
];

Promise.all(
  leaderboardFiles.map((file) =>
    fetch(file).then((res) => res.text())
  )
).then((results) => {
  results.forEach((text) => {
    const lines = text.split(/\\r?\\n/);
    lines.forEach((line) => {
      try {
        if (line.trim() === "") return;
        const data = JSON.parse(line);
        const address = data.address.trim().toLowerCase();
        if (!leaderboard[address] || Number(data.points) > Number(leaderboard[address].points)) {
          leaderboard[address] = {
            name: data.name,
            rank: data.rank,
            points: data.points,
          };
        }
      } catch (e) {
        console.warn("无法解析行:", line);
      }
    });
  });
  document.getElementById("searchResult").textContent = "请输入地址进行查询";
}).catch(() => {
  document.getElementById("searchResult").textContent = "❌ 加载排行榜失败";
});

function searchAddress() {
  const addr = document.getElementById("address").value.trim().toLowerCase();
  const result = leaderboard[addr];
  const output = document.getElementById("searchResult");

  if (!addr) {
    output.textContent = "请输入地址";
  } else if (result) {
    output.innerHTML = `✅ 地址绑定域名：<b>${result.name}</b><br>草数量：<b>${result.points}</b><br>排名：<b>#${result.rank}</b>`;
  } else {
    output.innerHTML = `❌ 地址未找到`;
  }
}

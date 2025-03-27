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
    const row = `<tr><td>${p.percent}</td><td>${p.value.toFixed(
      10
    )}</td><td>$${total}</td></tr>`;
    tbody.innerHTML += row;
  });
}
calculate();

// ---------- 排名查询部分 ----------

let leaderboard = {};

const leaderboardFiles = [
  "data/leaderboard-part.txt",
  "data/leaderboard-part1.txt",
  "data/leaderboard-part2.txt",
];

// 加载所有排行榜文件
Promise.all(
  leaderboardFiles.map((file) => fetch(file).then((res) => res.text()))
).then((results) => {
  results.forEach((text) => {
    const lines = text.split(/\\r?\\n/);
    lines.forEach((line) => {
      const [rank, address, points] = line.split(",");
      if (rank && address && points) {
        leaderboard[address.trim().toLowerCase()] = {
          rank: rank.trim(),
          points: points.trim(),
        };
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
    output.innerHTML = `✅ 地址排名：<b>#${result.rank}</b>，草数量：<b>${result.points}</b>`;
  } else {
    output.innerHTML = `❌ 地址未找到`;
  }
}

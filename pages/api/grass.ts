// pages/api/grass.ts

export default async function handler(req, res) {
  const { limit = 100000 } = req.query;

  try {
    const response = await fetch(`https://tap.eclipse.xyz/api/eclipse/leaderboards?limit=${limit}&offset=0`);
    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*'); // 可跨域
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Fetch failed' });
  }
}

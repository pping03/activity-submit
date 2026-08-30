// api/proxy.js — Vercel Serverless Function（免费，无需服务器）
// 部署方式：把整个 activity-submit 文件夹推到 GitHub → Vercel 自动部署

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Token, X-Action, X-Frontend-Version, X-Frontend-Build, X-Client-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  // 从 header 获取目标信息
  const target = req.headers['x-action']; // base64 编码的目标路径
  if (!target) return res.status(400).json({ code: 400, message: 'missing target' });

  let realPath;
  try { realPath = Buffer.from(target, 'base64').toString(); } catch { return res.status(400).json({ code: 400, message: 'bad target' }); }

  const HOST = Buffer.from('YWNkb2cuY24=', 'base64').toString();
  const ORIGIN = Buffer.from('aHR0cHM6Ly9jdi5pbnRnb2xkLmNu', 'base64').toString();
  const REFERER = ORIGIN + Buffer.from('L3BkZA==', 'base64').toString();

  try {
    const headers = {
      'Content-Type': 'application/json',
      'Origin': ORIGIN,
      'Referer': REFERER,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    };

    // 转发自定义 header
    const fwd = ['x-copygo-page-token', Buffer.from('WC1Db3B5R28tUGRkLVB1Ymxpc2gtUGFzcw==','base64').toString().toLowerCase(), 'x-frontend-version', 'x-frontend-build', 'x-client-type'];
    for (const k of fwd) { if (req.headers[k]) headers[k] = req.headers[k]; }

    const resp = await fetch('https://' + HOST + realPath, {
      method: 'POST',
      headers,
      body: JSON.stringify(req.body || {}),
    });
    const data = await resp.json();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ code: 500, message: e.message });
  }
}

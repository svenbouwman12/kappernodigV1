export default function handler(_req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.status(200).json({ ok: true, time: new Date().toISOString() })
}




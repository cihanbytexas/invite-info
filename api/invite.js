export default async function handler(req, res) {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ error: "Davet kodu (code) gerekli!" });
    }

    const url = `https://discord.com/api/v10/invites/${code}?with_counts=true&with_expiration=true`;

    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: "Geçersiz davet veya erişim hatası" });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: "Sunucu hatası", details: err.message });
  }
}

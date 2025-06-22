export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    const formBody = new URLSearchParams(req.body).toString();

    const response = await fetch('https://cinepoles.ct.ws/save_booking.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formBody
    });

    const result = await response.text();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Proxy Error: " + error.message);
  }
}

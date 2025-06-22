export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    let body = '';

    // Collect form data manually from the request stream
    await new Promise((resolve, reject) => {
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', resolve);
      req.on('error', reject);
    });

    const response = await fetch('https://cinepoles.ct.ws/save_booking.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: body
    });

    const result = await response.text();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Proxy Error: " + error.message);
  }
}

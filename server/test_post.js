const fetch = require('node-fetch'); // Assuming we can use native fetch in newer node or require if installed

async function testPost() {
  try {
    const response = await fetch('http://localhost:3001/api/quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        week_id: 'week-1',
        name: 'Test User',
        email: 'test@example.com',
        phone: '1234567890',
        score: 5
      })
    });
    const data = await response.json();
    console.log("POST Response:", data);
  } catch (err) {
    console.error("POST Error:", err);
  }
}

testPost();

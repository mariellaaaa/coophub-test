const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors({ origin: 'http://localhost:4200 '}));

app.use(express.json());

app.post('/api/login', (req, res) => {
	console.log('Data received from frontend');
	console.log(req.body);

	res.status(200).json({ ok: true });
});

app.listen(PORT, () => {
	console.log(`Backend running on http://localhost:${PORT}`)
})

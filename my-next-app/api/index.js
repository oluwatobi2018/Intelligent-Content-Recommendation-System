// api/index.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from API!');
});

app.listen(PORT, () => {
  console.log(`API is running on port ${PORT}`);
});

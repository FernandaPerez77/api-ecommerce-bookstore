const express = require('express');

const app = express();
const PORT = process.env.PORT || 5100;

app.get('/', (req, res) => {
    res.send('Hello BookStore API');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
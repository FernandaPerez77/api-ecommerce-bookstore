const express = require('express');
const app = express();

// Forzamos el 5100 directo para saltarnos cualquier variable oculta
const PORT = 5100; 

app.get('/', (req, res) => {
    res.send('Hello BookStore API');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
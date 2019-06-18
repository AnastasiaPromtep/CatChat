const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, function() {
    console.log(`Cat chat meowing on port ${port}`);
});

const express = require('express');
const cors = require('cors');
const index = require('./database/index');

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);

app.listen(5000);
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Product = require('./Product'); // Import mô hình Product

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Các tác vụ CRUD sẽ được thêm vào đây

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

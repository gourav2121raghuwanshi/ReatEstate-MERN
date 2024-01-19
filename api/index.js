const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();
const app = express();
const userroute = require('./routes/user.route.js')
const authRouter = require('./routes/authRoute.js');
// middlewares

app.use(express.json())


// database connection
mongoose.connect(process.env.DBURL)
    .then(() => console.log("connected to DataBase"))
    .catch((error) => {
        console.log(`Error occure in Database Connection : ${error}`)
    })

app.listen(process.env.PORT, () => {
    console.log(`server is running on port 3000 `);
})

app.use('/api/user', userroute);
app.use('/api/auth', authRouter);



app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error"

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
});
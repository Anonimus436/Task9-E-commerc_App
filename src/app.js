require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const cookies = require("cookie-parser")
const {apiLimiter} = require("./middlewares/rateLimitMiddleware");
const helmet = require("helmet");
const cors = require("cors");
const xssSanitize = require("./middlewares/xssMiddleware");
const path = require("path");

app.use(express.json())
app.use(express.urlencoded({extended : true}));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(cookies())

// protct from xss
app.use(xssSanitize);

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", "https://api.yourdomain.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            frameAncestors: ["'none'"], // Prevent clickjacking
            formAction: ["'self'"] // Restrict form submissions
        },
    },
    crossOriginEmbedderPolicy: false,
    hsts: {
        maxAge: 31536000, // 1 year
        includeSubDomains: true,
        preload: true
    },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
}));


app.use(cors ({
    origin : ["http://localhost:5167"]
}))


app.use(apiLimiter);

// Authentication Endpoints
app.use("/api/auth", require("./routes/authRoutes"));

//  Product Endpoints
app.use("/api/products", require("./routes/productRoutes"));

// Cart Endpoints 
app.use("/api/cart", require("./routes/cartRoutes"));

// Order Endpoints 
app.use("/api/orders", require("./routes/orderRoutes"));

// Review Endpoints 
app.use("/api/reviews", require("./routes/reviewRoutes"));

// User Endpoints
app.use("/api/users", require("./routes/userRoutes"));

// SuperAdmin Endpoints
app.use("/api/Admin" , require("./routes/adminRoutes"));

// Error Middleware
app.use(require("./middlewares/errorMiddleware"));

// Not Found
app.use(require("./middlewares/notFoundMiddleware")) ;

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
    .then(res => {
        console.log("Connected to database done")
        app.listen(PORT, () => {
            console.log(`Server is running on: http://localhost:${PORT}`)
        })
    })
    .catch(err => {
        console.log("Error:", err.message)
    })

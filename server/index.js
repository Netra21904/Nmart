import express from 'express';
import cors from 'cors';  
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/connectDB.js';
import userRouter from './route/user.route.js';
import categoryRouter from './route/category.route.js';
import uploadRouter from './route/upload.router.js';
import subCategoryRouter from './route/subCategory.route.js';
import productRouter from './route/product.route.js';
import cartRouter from './route/cart.route.js';
import addressRouter from './route/address.route.js';
import orderRouter from './route/order.route.js';

const app = express();

// CORS configuration
app.use(cors({
  origin: 'https://nmart-client.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Middleware Setup
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Set the PORT
const PORT = process.env.PORT || 8080;

// Root endpoint
app.get("/", (request, response) => {
    response.json({
        message: "Server is running on port " + PORT
    });
});

// Routes
app.use('/api/user', userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/file", uploadRouter);
app.use("/api/subcategory", subCategoryRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use('/api/order', orderRouter);


// Connect to the Database and Start the Server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port", PORT);
    });
}).catch(err => {
    console.error("Failed to connect to DB:", err);
});

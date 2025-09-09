import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: "http://localhost:5173/",
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma"
    ],
    credentials: true
}));
app.use(urlencoded(true));
app.use(cookieParser());
app.use(express.json());


export default app;
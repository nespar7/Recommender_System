const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const userRoute = require("./routes/user");

dotenv.config();

async function connectDB() {
	try {
		await mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("MongoDB connected");
	} catch (err) {
		console.log(err);
	}
}

connectDB();

// middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("common"));

app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/user", userRoute);

app.get("/", (req, res) => {
	res.send("Welcome to homepage");
});

app.listen(3004, () => {
	console.log("Server is running on port 3004");
});

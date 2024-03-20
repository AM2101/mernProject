import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect('mongodb://localhost:27017/loginRegisterDB',{
    useNewUrlParser: true,
    useUnifiedTopology:true
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)


//login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await User.findOne({ email: email });
        if (user) {
            // If user found, check password
            if (password === user.password) {
                res.send({ message: "Login Successful", user });
            } else {
                res.send({ message: "Password mismatch" });
            }
        } else {
            res.send({ message: "User not registered" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send({ message: "Internal server error" });
    }
});


//register route
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.send({ message: "User already registered" });
        }
        
        // Create a new user instance
        const newUser = new User({
            name: name,
            email: email,
            password: password
        });
        
        // Save the new user to the database
        const savedUser = await newUser.save();
        res.send({ message: "Successfully registered", user: savedUser });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).send({ message: "Internal server error" });
    }
});

app.listen(9002, ()=>{
    console.log('be started at port 9002');
})
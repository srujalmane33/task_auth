import express from 'express';
import mongoose from 'mongoose';
import UserModel from './models/User.js';
import router from './routes/auth.route.js';



const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send("working on this server tessting");
});

// app.post('/register', async (req, res) => {
//     const { name, email, password } = req.body;

//     const existingUser = await UserModel.findOne({email: email});
//     if(existingUser){
//         return res.status(400).json({
//             message: "User with this email already exists"
//         });
//     }

//     try {
//         const User = await new UserModel({
//             name: name,
//             email: email,
//             password: password
//         });
//         await User.save();
//         res.status(201).send("User registered successfully");
//     }
//     catch (error) {
//         res.status(500).json({
//             message: error.message
//         });
//     }

// })

app.use("/api/auth", router)

app.listen(3000);


//  catch (error) {

//   res.status(500).json({

//     success: false,

//     message: error.message
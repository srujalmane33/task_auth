import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";

const JWT_SECRT = " dfdfadfdsfasdfa";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await UserModel.findOne({ email: email });
  if (existingUser) {
    return res.status(400).json({
      message: "User with this email already exists",
    });
  }
  const salt = 12;
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const User = await new UserModel({
      name: name,
      email: email,
      password: hashedPassword,
    });
    await User.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "password is wrong",
      });
    }

    const token = jwt.sign(
      {
        // id: user._id,
        email: user.email,
      },
      JWT_SECRT,
    );
    res.status(200).json({
      message: "login successfull",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

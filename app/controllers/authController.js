import { NextResponse } from "next/server";
import User from "../Models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// User Register
export const register = async (req) => {
  const { name, email, password } = await req.json();

  try {
    let user = await User.findOne({ email });

    if (user)
      return NextResponse.json({
        message: "User already exists",
        success: false,
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({
      message: "User Created Successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// User Login
export const login = async (req) => {
  const { email, password } = await req.json();

  try {
    let user = await User.findOne({ email });

    if (!user)
      return NextResponse.json({ message: "User not exist", success: false });

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return NextResponse.json({
        message: "Invalid Creadentials",
        success: false,
      });

    const token = jwt.sign({ id: user._id }, "adfg234()", { expiresIn: "1d" });

    return NextResponse.json({
      message: `Welcome back ${user.name}`,
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error.message);
  }
};

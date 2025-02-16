import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

//signup controller
export const signupController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        msg: "All fields are required",
        success: false,
        error: true,
      });
    }
    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(400).json({
        msg: "User already exists",
        success: false,
        error: true,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await createUser.save();

    return res.status(200).json({
      msg: "user created successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      msg: error.message || "Internal server error",
    });
  }
};

// login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        msg: "email and password are required",
        error: true,
        success: false,
      });
    }

    const findUser = await User.findOne({ email });

    if (!findUser) {
      return res.status(401).json({
        msg: "Invalid credentials",
        success: false,
        error: true,
      });
    }

    const isMatch = await bcrypt.compare(password, findUser.password);

    if (!isMatch) {
      return res.status(401).json({
        msg: "Invalid credentials",
        success: false,
        error: true,
      });
    }

    const token = generateToken(findUser._id, findUser.role);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({
      msg: "Login successful",
      token: token,
      user: findUser.username,
      role: findUser.role,
      userId: findUser._id,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal server error",
    });
  }
};

//logout
export const logoutController = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 0,
    });

    return res.status(200).json({
      msg: "Logout successful",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal server error",
    });
  }
};

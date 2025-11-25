import jwt from 'jsonwebtoken'
import userModel from '../models/User.js'

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

// Register User
export async function registerUser(req, res) {
    const { fullName, email, password, profileImageUrl } = req.body
    // console.log(req.body)

    // Validation: Check for missing fields
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    try {
        // Check if email already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' })
        }

        // Create the user
        const user = await userModel.create({
            fullName,
            email,
            password,
            profileImageUrl
        });
        res.status(201).json({ id: user._id, user, token: generateToken(user._id) })
    }
    catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err.message })
    }
}

// Login User
export async function loginUser(req, res) {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    try {
        const user = await userModel.findOne({ email })
        if (!user || (!await user.comparePassword(password))) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        res.status(200).json({ id: user._id, user, token: generateToken(user._id) })
    }
    catch (err) {
        res.status(500).json({ message: 'Error login user', error: err.message })
    }
}

// Get All User Info
export async function getUserInfo(req, res) {
    try {
        const user = await userModel.findById(req.user.id).select('-password')

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message })
    }
}
import User from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const signup = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        const user = await User.findOne({ email })
        if (user) {
            return res.status(409).json({ message: "User already exist, login", success: false });
        }

        let userDoc = new User({ name, email, password })
        userDoc.password = await bcrypt.hash(password, 3);
        await userDoc.save()

        return res.status(201).json({ message: "Signup successfully", success: true });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}
const login = async (req, res) => {

    try {
        let { email, password } = req.body;
        const user = await User.findOne({ email })
        console.log(user);

        if (!user) {
            return res.status(403).json({ message: "Incorrect Email or Password", success: false });
        }

        const isPasswordEqual = await bcrypt.compare(password, user.password)
        console.log(isPasswordEqual)

        if (isPasswordEqual == false) {
            return res.status(403).json({ message: "Incorrect Email or Password", success: false });
        }

        let payload = {"email": email,"_id": user._id}
        let key = "secret"
        let options = {expiresIn: '24h'}

        const token = jwt.sign(payload, key, options)

        return res.status(200).json({ message: "Login Success", token, name: user.name, email });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}
export {
    signup,
    login
}
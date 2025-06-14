import jwt from 'jsonwebtoken';

const ensureAuthenticated = (req, res, next) => {

    try {
        const token = req.headers["authorization"];

        if (!token) {
            return res.status(403).json({ message: "token is required" })
        }

        let decodedToken = jwt.verify(token, process.env.SECRET_KEY)

        req.user = decodedToken;
        next()
        // if(decodedToken.role == "admin"){
        //     next();
        // }
        // else {
        //     return res.status(403).json({ message: "unauthorized access" })

        // }

    }
    catch (err) {
        return res.status(403).json({ message: "token is invalid or expired" })

    }
}
export default ensureAuthenticated;
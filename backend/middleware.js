const jwt = require("jsonwebtoken")

function authMiddleware(req,res,next) {
    const token = req.headers.token 
    if(!token) {
        res.status(403).json({
            message : "you are not logged in" 
        })
        return 
    }
    const decoded = jwt.verify(token , process.env.JWT_SECRET)
    const username = decoded.username 
    const userId = decoded.userId
    if(!username || !userId) {
        res.status(403).json({
            message : "token malformed"
        })
        return 
    }
    req.username = username 
    req.userId = userId
    next() 
}

module.exports = {
    authMiddleware 
}


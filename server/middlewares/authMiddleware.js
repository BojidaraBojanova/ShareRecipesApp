const jwt = require('../lib/jsonwebtoken');

const { SECRET_KEY} = require('../config');

exports.authMiddleware = async(req, res, next) => {
    const token = req.cookies['user'];

    if(!token){
        return next();
    }

    try{
        const decodedToken = await jwt.verify(token, SECRET_KEY);

        req.user = decodedToken;
        res.locals.isAuthenticated = true;

        next();
    }catch(error){
        res.clearCookie('user');
    }
};

exports.isAuth = (req, res, next) => {
    if(!req.user){
        return res.status(401).json({ error: 'Unauthorized' });
    }

    next();
}

exports.isGuest = (req, res, next) => {
    if(req.user){
        return res.status(401).json({ error: 'User is already authenticated'})
    }

    next();
}
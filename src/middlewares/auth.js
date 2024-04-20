const jwt = require('express-jwt')
const secret = process.env.JWT_SECRET

const validateToken = (req) => {
    let { authorization } = req.headers;

    if (authorization) {
        let { type, token } = authorization.split(' ')
        return (type === 'Token' || type === 'Bearer') ? token : null
    }
}

const auth = jwt.expressjwt({
    secret,
    algorithms: ['HS256'],
    userPropety: 'user',
    validateToken
})

module.exports = auth
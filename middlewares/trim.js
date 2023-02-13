module.exports = () => (req, res, next) => {
    for (let key in req.body) {
        req.body[key] = req.body[key].trim();
    }
    next();
};

function errorHandler(err, req, res, next){
    return res.status(err.status || 500).json({
        error: {
            message: err.message || 'Server is not responding'
        }
    });
};

module.exports = errorHandler;
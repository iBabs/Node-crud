const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error for debugging purposes

    // Check if the response has already been sent
    if (res.headersSent) {
        return next(err); // Let Express handle the error if response is already sent
    }

    // Send an error response to the client
    res.status(500).json({
        error: 'Internal Server Error'
    });
};

export default errorHandler;
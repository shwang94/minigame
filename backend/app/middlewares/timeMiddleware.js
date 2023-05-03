const timeMiddleware = (request, response, next) => {
    console.log(`${request.method}-${request.originalUrl} at ${new Date()}`);
    next();
}
module.exports = { timeMiddleware };
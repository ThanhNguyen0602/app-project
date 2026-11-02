class AppError extends Error {
    constructor(message,starusCode = 500){
        super(message);

        this.statusCode = this.statusCode;
        this.isOperational = true;

        Error.captureStackTrace(this,this.constructor);
    }
}

module.export = AppError;
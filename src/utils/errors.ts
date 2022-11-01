import {Request, Response, NextFunction} from 'express';

export const handleError = (req: Request, res: Response, error: any) => {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    console.log('error')
    res.status(status).json({
        status: status,
        message: message,
        stack: error.stack,
    });
}
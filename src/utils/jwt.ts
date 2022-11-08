import { compare, genSaltSync, hash } from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export const hashPassword = async (password: string) => {
    const salt = genSaltSync(10)
    return await hash(password, salt)
}

export const comparePassword = async (password: string, hash: string) => {
    return await compare(password, hash)
}

export const generateToken = (payload: any) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
}

export const verifyToken = (req: Response, res: Response, next: NextFunction) => {
    try {
        jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            req['user'] = decoded;
        });
    } catch (error) {
        next(error);
    }
}

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, next);
    if (req['user'].isAdmin) {
        next();
    } else {
        return res.status(403).json({ message: "Forbidden" });
    }
};

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, next);
    next();
};


export const verifyEmpresa = (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, next);
    if (req['user'].empresas.includes(+req.params.empresa_id) || req['user'].isAdmin) {
        next();
    } else {
        return res.status(403).json({ message: "Forbidden" });
    }
};
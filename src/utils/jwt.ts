import { compare, genSaltSync, hash } from 'bcrypt'
import * as jwt from 'jsonwebtoken'

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

export const verifyToken = (token: string | undefined) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}


//Usuarios y autenticación

import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { createError } from "../utils/errors";
import {
  comparePassword,
  generateToken,
  hashPassword,
  verifyToken,
} from "../utils/jwt";

const prisma = new PrismaClient();

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password, isAdmin, empresas } = req.body;
    const hashedPassword = await hashPassword(password);

    //Validates if empresa exists
    const empresasValidas = await prisma.empresa.findMany({
      where: { id: { in: empresas } },
    });
    if (empresasValidas.length !== empresas.length) {
      return next(createError("Empresas not found", 404));
    }

    const usuario = await prisma.usuario.create({
      data: {
        username: username,
        password: hashedPassword,
        isAdmin: isAdmin || undefined,
        empresas: {
          connect: empresas.map((empresa: number) => ({ id: empresa })),
        },
      },
    });
    res.status(201).json(usuario);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
  try {
    const { username, password } = req.body;
    const usuario = await prisma.usuario.findUnique({
      where: { username },
      include: {
        empresas: true,
      },
    });
    if (!usuario) {
      return next(createError("Usuario not found", 404));
    }
    const isPasswordValid = await comparePassword(password, usuario.password);
    if (!isPasswordValid) {
      return next(createError("Invalid password", 401));
    }

    const token = generateToken({
      id: usuario.id,
      username: usuario.username,
      isAdmin: usuario.isAdmin,
      empresas: usuario.empresas.map((empresa) => empresa.id),
    });
    res
      .cookie("token", token, {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json(usuario);
  } catch (error) {
    next(error);
  }
};

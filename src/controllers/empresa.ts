import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

const prisma = new PrismaClient();

export const getEmpresas = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const empresas = await prisma.empresa.findMany();
        res.json(empresas);
    } catch (error) {
        next(error)
    }
};

export const getEmpresa = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const empresa = await prisma.empresa.findUnique({
            where: { id: +id },
        });
        if (!empresa) {
            return res.status(404).json({ message: "Empresa not found" });
        }
        res.json(empresa);
    } catch (error) {
        next(error);
    }
};

export const createEmpresa = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { nombre } = req.body;
        const empresa = await prisma.empresa.create({
            data: {
                nombre: nombre,
            },
        });
        res.status(200).json(empresa);
    } catch (error) {
        next(error);
    }
};

export const updateEmpresa = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { nombre, direccion, telefono } = req.body;
        const empresa = await prisma.empresa.update({
            where: { id: Number(id) },
            data: {
                nombre: nombre || undefined,
            },
        });
        res.status(200).json(empresa);
    } catch (error) {
        next(error);
    }
}

export const deleteEmpresa = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const empresa = await prisma.empresa.delete({
            where: { id: Number(id) },
        });
        res.status(200).json(empresa);
    } catch (error) {
        next(error);
    }
};
import {PrismaClient} from '@prisma/client'
import {Router} from 'express'
import {

    getEmpresa,
    getEmpresas,
    createEmpresa,
    updateEmpresa,
    deleteEmpresa

} from '../controllers/empresa'

const prisma = new PrismaClient()

const router = Router()

router.get('/', getEmpresas)
router.get('/:id', getEmpresa)
router.post('/', createEmpresa)
router.put('/:id', updateEmpresa)
router.delete('/:id', deleteEmpresa)

export default router

import {PrismaClient} from '@prisma/client'
import {Router} from 'express'
import {

    getEmpresa,
    getEmpresas,
    createEmpresa,
    updateEmpresa,
    deleteEmpresa,
    getEmpresasUser

} from '../controllers/empresa'
import {
    createEmpresaSchema,
    updateEmpresaSchema,
    deleteEmpresaSchema,
    getEmpresaSchema
} from '../schemas/empresa.schema'
import {validate} from '../utils/validation'

const prisma = new PrismaClient()

const router = Router()

router.get('/', getEmpresas)
router.get('/user', getEmpresasUser)
router.get('/:id', validate(getEmpresaSchema), getEmpresa)
router.post('/', validate(createEmpresaSchema), createEmpresa)
router.put('/:id', validate(updateEmpresaSchema), updateEmpresa)
router.delete('/:id', validate(deleteEmpresaSchema), deleteEmpresa)

export default router

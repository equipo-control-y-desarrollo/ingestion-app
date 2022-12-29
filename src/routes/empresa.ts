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
import { verifyAdmin } from '../utils/jwt'

const prisma = new PrismaClient()

const router = Router()

router.get('/', verifyAdmin,getEmpresas)
router.get('/user', getEmpresasUser)
router.get('/:id', [validate(getEmpresaSchema), verifyAdmin], getEmpresa)
router.post('/', [validate(createEmpresaSchema), verifyAdmin], createEmpresa)
router.put('/:id', [validate(updateEmpresaSchema), verifyAdmin], updateEmpresa)
router.delete('/:id', [validate(deleteEmpresaSchema), verifyAdmin], deleteEmpresa)

export default router

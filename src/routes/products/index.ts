import { Router } from "express";
import { createProduct, deleteProduct, getProductById, listProducts, updateProduct } from "../../controllers/products/productController";
import { validateData } from "../../middlewares/validationMiddleware";
// import {z} from "zod"
import { createProductSchema, updateProductSchema, productsTable } from "../../db/productSchema";

// const createProductSchema = z.object({
//     name: z.string(),
//     price: z.number()
// })



const router = Router()

router.get('/', listProducts)

router.get('/:id', getProductById)

router.post("/", validateData(createProductSchema), createProduct)

router.delete("/:id", deleteProduct)

router.put("/:id", validateData(updateProductSchema), updateProduct)

export default router
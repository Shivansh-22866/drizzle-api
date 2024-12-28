import { Router } from "express";
import { createProduct, deleteProduct, getProductById, listProducts, updateProduct } from "../../controllers/products/productController.js";
import { validateData } from "../../middlewares/validationMiddleware.js";
// import {z} from "zod"
import { createProductSchema, updateProductSchema, productsTable } from "../../db/productSchema.js";
import { verifySeller, verifyToken } from "../../middlewares/authMiddleware.js";

// const createProductSchema = z.object({
//     name: z.string(),
//     price: z.number()
// })



const router = Router()

router.get('/', listProducts)

router.get('/:id', getProductById)

router.post("/", verifyToken, verifySeller, validateData(createProductSchema), createProduct)

router.delete("/:id", verifyToken, verifySeller, deleteProduct)

router.put("/:id", verifyToken, verifySeller, validateData(updateProductSchema), updateProduct)

export default router
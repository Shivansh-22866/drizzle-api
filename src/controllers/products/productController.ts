import { Request, Response } from "express"
import { db } from "../../db/index.js"
import { productsTable } from "../../db/productSchema.js"
import { eq } from "drizzle-orm"
import _ from "lodash"
export async function listProducts(req: Request, res: Response) {
    try {
        const products = await db.select().from(productsTable)
        res.status(200).json({"Products": products})
    }

    catch(e) {
        res.status(500).json({error: e})
    }
}

export async function getProductById(req: Request, res: Response) {
    try {
        const {id} = req.params
        const [product] = await db.select().from(productsTable).where(eq(productsTable.id, parseInt(id)))
        if(!product) {
            res.status(404).json({error: "Product not found"})
            return
        }
        res.status(200).json({"Product": product})
    }

    catch(e) {
        res.status(500).json({error: e})
    }
}

export async function createProduct(req: Request, res: Response) {
    try {
        const [product] =await db.insert(productsTable).values(req.cleanBody).returning()
        res.status(201).json({"Product": product})
    }

    catch(e) {
        res.status(500).json({error: e})
    }
}

export async function updateProduct(req: Request, res: Response) {
    try {
        const {id} = req.params
        const [product] = await db.update(productsTable).set(req.cleanBody).where(eq(productsTable.id, parseInt(id))).returning()
        if(!product) {
            res.status(404).json({error: "Product not found"})
            return
        }
        res.status(200).json({"Product": product})
    }

    catch(e) {
        res.status(500).json({error: e})
    }
}

export async function deleteProduct(req: Request, res: Response) {
    try {
        const {id} = req.params
        const [deletedProduct] = await db.delete(productsTable).where(eq(productsTable.id, parseInt(id))).returning()
        if(!deletedProduct) {
            res.status(404).json({error: "Product not found"})
            return
        }
        res.status(204).json({"Product": deleteProduct})

    }

    catch(e) {
        res.status(500).json({error: e})
    }
}
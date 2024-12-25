import { Request, Response } from "express"
export function listProducts(req: Request, res: Response) {
    res.send('List of products')
}

export function getProductById(req: Request, res: Response) {
    res.send({id: req.params.id})
}

export function createProduct(req: Request, res: Response) {
    res.send("New product created")
}

export function updateProduct(req: Request, res: Response) {
    res.send("Product updated")
}

export function deleteProduct(req: Request, res: Response) {
    res.send("Product deleted")
}
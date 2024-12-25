import express from 'express'
import productsRoutes from "./routes/products/index"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.use("/products", productsRoutes)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
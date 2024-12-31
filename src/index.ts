import express from 'express'
import productsRoutes from "./routes/products/index.js"
import authRoutes from "./routes/auth/index.js"
import orderRoutes from './routes/orders/index.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.use("/products", productsRoutes)
app.use('/auth', authRoutes)
app.use('/orders', orderRoutes)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
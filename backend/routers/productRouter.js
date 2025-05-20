import express from 'express';
import * as productController from '../controllers/productController.js';


const productRouter = express.Router()


productRouter.post("/", productController.createProduct)
productRouter.get("/", productController.fetchProducts)
productRouter.get("/:pid", productController.fetchProductById)
productRouter.put("/:pid", productController.updateProduct)
productRouter.delete("/:pid", productController.deleteProduct)

export default productRouter;
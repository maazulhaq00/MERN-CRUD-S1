import express from 'express';
import * as productController from '../controllers/productController.js';
import upload from '../middlewares/multerSetup.js';


const productRouter = express.Router()


productRouter.post("/", upload.single('image'), productController.createProduct)
productRouter.get("/", productController.fetchProducts)
productRouter.get("/:pid", productController.fetchProductById)
productRouter.put("/:pid", upload.single('image'), productController.updateProduct)
productRouter.delete("/:pid", productController.deleteProduct)

export default productRouter;
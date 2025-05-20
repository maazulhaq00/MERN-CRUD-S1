import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    pname: String,
    pprice: Number,
    pdesc: String
});

const Product = mongoose.model("Product", productSchema);

export default Product;
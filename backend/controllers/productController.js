import Product from '../modals/product.js'


const createProduct = async (req, res) => {

    // let pname = req.body.name;
    // let pprice = req.body.pprice;
    // let pdesc = req.body.pdesc;

    let { name, description, price, image, category } = req.body;

    const product = await Product.create({
        name, description, price, image, category
    })

    res.json({ product })
}

const fetchProducts = async (req, res) => {

    const products = await Product.find().populate("category");

    res.json({ products })
}

const fetchProductById = async (req, res) => {

    const pid = req.params.pid;

    const product = await Product.findById(pid).populate("category");

    res.json({ product })
}

const updateProduct = async (req, res) => {

    const pid = req.params.pid;

    const { name, description, price, image, category } = req.body;

    await Product.findByIdAndUpdate(pid, {
        name, description, price, image, category
    })

    const product = await Product.findById(pid);

    res.json({ product })
}

const deleteProduct = async (req, res) => {

    const pid = req.params.pid

    await Product.findByIdAndDelete(pid);

    res.json({ messgae: "Record deleted succcessfully" })

}

export {
    createProduct, fetchProducts, fetchProductById, updateProduct, deleteProduct
}
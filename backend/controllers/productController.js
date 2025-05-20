import Product from '../modals/product.js'


const createProduct = async (req, res)=>{

    // let pname = req.body.name;
    // let pprice = req.body.pprice;
    // let pdesc = req.body.pdesc;

    let {pname, pprice, pdesc} = req.body;

    const product = await Product.create({
        pname,
        pprice,
        pdesc
    })

    res.json({product})
}

const fetchProducts = async (req, res)=> {

    const products = await Product.find();

    res.json({products})
}

const fetchProductById = async (req, res)=> {

    const pid = req.params.pid;

    const product = await Product.findById(pid);

    res.json({product})
}

const updateProduct = async (req, res) => {

    const pid = req.params.pid;

    const {pname, pprice, pdesc} = req.body;

    await Product.findByIdAndUpdate(pid, {
        pname, pprice, pdesc
    })

    const product = await Product.findById(pid);

    res.json({ product})
}

const deleteProduct = async (req, res) => {
    
    const pid = req.params.pid

    await Product.findByIdAndDelete(pid);

    res.json({messgae: "Record deleted succcessfully"})

}

export {
    createProduct, fetchProducts, fetchProductById, updateProduct, deleteProduct
}
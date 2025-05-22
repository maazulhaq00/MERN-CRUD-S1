import Category from "../modals/category.js";


const createCategory = async (req, res)=>{

    let {categoryname} = req.body;

    const category = await Category.create({
        categoryname
    })

    res.json({category})
}

const fetchCategories = async (req, res)=> {

    const categories = await Category.find();

    res.json({categories})
}

const fetchCategoryById = async (req, res)=> {

    const id = req.params.id;

    const category = await Category.findById(id);

    res.json({category})
}

const updateCategory = async (req, res) => {

    const id = req.params.id;

    const {categoryname} = req.body;

    await Category.findByIdAndUpdate(id, {
        categoryname
    })

    const category = await Category.findById(id);

    res.json({ category})
}

const deleteCategory = async (req, res) => {
    
    const id = req.params.id

    await Category.findByIdAndDelete(id);

    res.json({messgae: "Record deleted succcessfully"})

}

export {
    createCategory, fetchCategories, fetchCategoryById, updateCategory, deleteCategory
}
import { useCallback, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    Box, Button, Card, Container, Divider, Stack, Typography,
    TextField,
    Unstable_Grid2 as Grid, IconButton, Alert, MenuItem
} from '@mui/material';
import * as React from 'react';

import axios from 'axios';
import { useNavigate, useNavigation } from 'react-router-dom';

const AddProduct = () => {
    const navigate = useNavigate()
    const [categoryArr, setCategoryArr] = useState([]);
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
        category: ''
    })
    const [alert, setAlert] = useState({
        message: "",
        type: ""
    })
    const fetchCategories = async () => {
        let res = await axios.get("http://localhost:3001/categories")

        setCategoryArr(res.data.categories);
    }
    useEffect(() => {
        fetchCategories()
    }, [])
    const handleProductChange = (e) => {
        let { name, value } = e.target;
        setProduct((pre) => {
            return {
                ...pre,
                [name]: value
            }
        })
    }

    const handleProductImageChange = (e) => {
        setProduct((pre) => {
            return {
                ...pre,
                image: e.target.files[0]
            }
        })
    }
    const handleProductSubmit = async () => {
        try {

            let formData = new FormData();

            formData.append("name", product.name)
            formData.append("description", product.description)
            formData.append("price", product.price)
            formData.append("image", product.image)
            formData.append("category", product.category)


            await axios.post("http://localhost:3001/products", formData)
            navigate("/products")
        }
        catch (e) {
            setAlert({
                message: err.message,
                type: "error"
            })
        }
    }

    return (
        <>
            <Helmet>
                <title>
                    Ecomm - Admin
                </title>
            </Helmet>
            <Box
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="xl">

                    <Stack spacing={3}>
                        <Stack
                            alignItems="flex-start"
                            direction="row"
                            justifyContent="space-between"
                            spacing={3}
                        >
                            <Typography variant="h4">
                                Create Product
                            </Typography>

                        </Stack>
                        <div>
                            <Alert severity={alert.type}>{alert.message}</Alert>

                            {/* Category Form */}
                            <Card sx={{ p: 3 }}>

                                <Stack spacing={3}>
                                    <TextField
                                        fullWidth
                                        label="Product Name"
                                        name="name"
                                        value={product.name}
                                        onChange={handleProductChange}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Product Description"
                                        name="description"
                                        value={product.description}
                                        onChange={handleProductChange}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Product Price"
                                        name="price"
                                        value={product.price}
                                        onChange={handleProductChange}
                                    />
                                    <TextField
                                        type='file'
                                        fullWidth
                                        label="Product Image"
                                        name="image"
                                        onChange={handleProductImageChange}
                                    />

                                    <TextField
                                        fullWidth
                                        label="Select Category"
                                        name="category"
                                        value={product.category}
                                        onChange={handleProductChange}
                                        select
                                    >
                                        {categoryArr.map((category) => (
                                            <MenuItem
                                                key={category._id}
                                                value={category._id}
                                            >
                                                {category.categoryname}
                                            </MenuItem>
                                        ))}
                                    </TextField>


                                    <Box sx={{ mt: 3 }}>
                                        <Button
                                            color="primary"
                                            size="medium"
                                            type="submit"
                                            variant="contained"
                                            onClick={handleProductSubmit}
                                        >
                                            Add Product
                                        </Button>
                                    </Box>
                                </Stack>

                            </Card>

                        </div>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

export default AddProduct;

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

    const [categoryArr, setCategoryArr] = useState([]);

    const fetchCategories = async () => {
        let res = await axios.get("http://localhost:3001/categories")

        setCategoryArr(res.data.categories);
    }

    useEffect(()=> {
        fetchCategories()
    }, [])


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
                                    />
                                    <TextField
                                        fullWidth
                                        label="Product Description"
                                        name="description"
                                    />
                                    <TextField
                                        fullWidth
                                        label="Product Price"
                                        name="price"
                                    />
                                    <TextField
                                        fullWidth
                                        label="Product Image"
                                        name="image"
                                    />

                                    <TextField
                                        fullWidth
                                        label="Select Category"
                                        name="category"
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

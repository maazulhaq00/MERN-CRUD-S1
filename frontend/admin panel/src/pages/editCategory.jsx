import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    Box, Button, Card, Container, Divider, Stack, Typography,
    TextField,
    Unstable_Grid2 as Grid, IconButton, Alert
} from '@mui/material';
import * as React from 'react';


import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditCategory = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [category, setCategory] = useState({
        categoryname: ""
    })

    const [alert, setAlert] = useState({
        message: "",
        type: ""
    })

    let fetchData = async () => {
        let response = await axios.get(`http://localhost:3001/categories/${id}`);
        console.log(response);
        setCategory({
            ...response.data.category
        })
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleCategoryChange = (e) => {
        let { name, value } = e.target;

        setCategory((preCat) => {
            return {
                ...preCat,
                [name]: value
            }
        })
    }
    const handleCategorySubmit = async () => {
        let response = await axios.put(`http://localhost:3001/categories/${id}`, category)

        navigate('/categories');

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
                                Edit Category
                            </Typography>

                        </Stack>
                        <div>
                            <Alert severity={alert.type}>{alert.message}</Alert>

                            {/* Category Form */}
                            <Card sx={{ p: 3 }}>

                                <Stack spacing={3}>
                                    <TextField
                                        fullWidth
                                        label="Category Name"
                                        name="categoryname"
                                        value={category.categoryname}
                                        onChange={handleCategoryChange}
                                    />
                                    <Box sx={{ mt: 3 }}>
                                        <Button
                                            color="primary"
                                            size="medium"
                                            type="submit"
                                            variant="contained"
                                            onClick={handleCategorySubmit}
                                        >
                                            Update Category
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

export default EditCategory;

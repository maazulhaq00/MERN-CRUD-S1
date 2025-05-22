import { useCallback, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    Box, Button, Card, Container, Divider, Stack, Typography,
    TextField,
    Unstable_Grid2 as Grid
} from '@mui/material';
import * as React from 'react';

import axios from 'axios';

const Categories = () => {

    const [category, setCategory] = useState({
        categoryname: ""
    })

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

        let response = await axios.post("http://localhost:3001/categories", category)

        console.log(response)

    }

    return (
        <>
            <Helmet>
                <title>
                    Orders | Carpatin Free
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
                                Categories
                            </Typography>

                        </Stack>
                        <div>
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
                                            Add Category
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

export default Categories;

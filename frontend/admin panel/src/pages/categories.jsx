import { useCallback, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    Box, Button, Card, Container, Divider, Stack, Typography,
    TextField,
    Unstable_Grid2 as Grid, IconButton, Alert
} from '@mui/material';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';

const Categories = () => {
    const [category, setCategory] = useState({
        categoryname: ""
    })
    const [categories, setCategories] = useState([]);
    const [alert, setAlert] = useState({
        message: "",
        type: ""
    })
    let fetchData = async () => {
        let response = await axios.get("http://localhost:3001/categories");
        console.log(response);
        setCategories(response.data.categories)
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
        try {
            let response = await axios.post("http://localhost:3001/categories", category)
            // console.log(response)
            setCategory({
                categoryname: ""
            })
            setAlert({
                message: "Category Added",
                type: "success"
            })
            fetchData()

        }
        catch (err) {
            setAlert({
                message: err.message,
                type: "error"
            })
        }


    }

    const handleCategoryDelete = async (id) => {
        let response = await axios.delete(`http://localhost:3001/categories/${id}`)

        fetchData()
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
                                Categories
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
                                            Add Category
                                        </Button>
                                    </Box>
                                </Stack>

                            </Card>
                            {/* Categories Table */}

                            <Card sx={{ p: 3 }}>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left">Category Name</TableCell>
                                                <TableCell align="center"></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {categories.map((item) => (
                                                <TableRow
                                                    key={item._id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {item.categoryname}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <IconButton aria-label="delete" color='error' onClick={() => handleCategoryDelete(item._id)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                        <IconButton aria-label="delete" color='success'>
                                                            <EditIcon />
                                                        </IconButton>                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Card>
                        </div>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

export default Categories;

import { useCallback, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Button, Card, Container, Divider, Stack, Typography } from '@mui/material';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import axios from 'axios';

const Products = () => {

    const [products, setProducts] = useState([]);

    let fetchData = async () => {
        let response = await axios.get("http://localhost:3001/products");
        console.log(response);
        setProducts(response.data.products)
    }

    useEffect(() => {
        fetchData();
    }, [])

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
                                Products
                            </Typography>
                            <Button
                                color="primary"
                                size="large"
                                variant="contained"
                            >
                                Add
                            </Button>
                        </Stack>
                        <div>
                            <Card>
                                {/* TABLE STARTS HERE */}
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center"></TableCell>
                                                <TableCell align="center">Title</TableCell>
                                                <TableCell align="center">Price</TableCell>
                                                <TableCell align="center">Description</TableCell>
                                                <TableCell align="center">Catgory</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {products.map((product) => (
                                                <TableRow
                                                    key={product._id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {product.image}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">
                                                        {product.name}
                                                    </TableCell>
                                                    <TableCell align="center">{product.price}</TableCell>
                                                    <TableCell align="left">{product.description}</TableCell>
                                                    <TableCell align="left">{product.category.categoryname}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                {/* TABLE ENDS HERE */}

                            </Card>
                        </div>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

export default Products;

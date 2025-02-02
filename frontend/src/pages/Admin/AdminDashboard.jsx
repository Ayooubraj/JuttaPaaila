import React, { useContext, useState, useEffect } from 'react';
import { AdminAuthContext } from '../../context/AdminAuthContext';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar'; // Import Snackbar from Material-UI
import './AdminDashboard.css';

const AdminDashboard = () => {
    const { isAdminAuthenticated, logout } = useContext(AdminAuthContext);
    const [product, setProduct] = useState({ name: '', category: '', price: '', image: null });
    const [products, setProducts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
    };

    const handleImageChange = (e) => {
        setProduct(prevProduct => ({ ...prevProduct, image: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('category', product.category);
        formData.append('price', product.price);
        formData.append('image', product.image);

        try {
            if (isEditing) {
                await axios.put(`http://localhost:5000/products/${product._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setSuccessMessage('Product updated successfully!');
                setIsEditing(false);
            } else {
                await axios.post('http://localhost:5000/products', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setSuccessMessage('Product added successfully!');
            }
            setProduct({ name: '', category: '', price: '', image: null });
            fetchProducts();
        } catch (error) {
            setError('Error saving product: ' + error.message);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/products', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setProducts(response.data);
        } catch (error) {
            setError('Error fetching products: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`http://localhost:5000/products/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                fetchProducts();
            } catch (error) {
                setError('Error deleting product: ' + error.message);
            }
        }
    };

    const handleEdit = (product) => {
        setProduct(product);
        setIsEditing(true);
    };

    useEffect(() => {
        if (isAdminAuthenticated) {
            fetchProducts();
        }
    }, [isAdminAuthenticated]);

    // Snackbar close handler
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div className="admin-dashboard">
            {isAdminAuthenticated ? (
                <>
                    <h1>Admin Dashboard</h1>
                    <button onClick={logout}>Logout</button>
                    <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Product Name"
                            value={product.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="category"
                            placeholder="Category"
                            value={product.category}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={product.price}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <button type="submit">{isEditing ? 'Update Product' : 'Add Product'}</button>
                    </form>

                    <h2>Existing Products</h2>
                    <ul>
                        {products.map(prod => (
                            <li key={prod._id}>
                                <h3>{prod.name}</h3>
                                <p>Category: {prod.category}</p>
                                <p>Price: ₨ {prod.price}</p>
                                <img src={`http://localhost:5000/${prod.image}`} alt={prod.name} style={{ width: '100px' }} />
                                <button onClick={() => handleEdit(prod)}>Edit</button>
                                <button onClick={() => handleDelete(prod._id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <div className="admin-login">
                    <h2>Please log in as Admin</h2>
                    <p>You must log in to access the admin dashboard.</p>
                </div>
            )}

            {/* Snackbar for success messages */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={successMessage}
            />
        </div>
    );
};

export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import './Profile.css'; // Import the CSS file

const Profile = () => {
    const { user, token } = useAuth();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);

    useEffect(() => {
        if (user) {
            setFullName(user.name || '');
            setEmail(user.email || ''); // Assuming user.email holds the email
        }
    }, [user]);

    const handleUpdateName = async (e) => {
        e.preventDefault();
        try {
            await axios.put('http://localhost:5000/api/auth/profile', { name: fullName }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Name updated successfully');
            setIsEditingName(false); // Close the editing mode
        } catch (error) {
            console.error('Update error:', error);
            alert('Failed to update name');
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        try {
            await axios.put('http://localhost:5000/api/auth/profile', { password }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Password updated successfully');
            setIsEditingPassword(false); // Close the editing mode
        } catch (error) {
            console.error('Update error:', error);
            alert('Failed to update password');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            try {
                await axios.delete('http://localhost:5000/api/auth/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert('Account deleted successfully');
                // Redirect to login or home page
            } catch (error) {
                console.error('Delete error:', error);
                alert('Failed to delete account');
            }
        }
    };

    return (
        <div className="profile-container">
            <h2>Profile Information</h2>
            <div className="profile-field">
                <label>Name:</label>
                {isEditingName ? (
                    <form onSubmit={handleUpdateName}>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                        <button type="submit" className="update-button">Save</button>
                    </form>
                ) : (
                    <div className="profile-value">
                        <span>{fullName}</span>
                        <button onClick={() => setIsEditingName(true)} className="edit-button">Edit</button>
                    </div>
                )}
            </div>
            <div className="profile-field">
                <label>Email:</label>
                <div className="profile-value">
                    <span>{email}</span>
                </div>
            </div>
            <div className="profile-field">
                <label>Password:</label>
                {isEditingPassword ? (
                    <form onSubmit={handleUpdatePassword}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" className="update-button">Save</button>
                    </form>
                ) : (
                    <div className="profile-value">
                        <span>********</span> {/* Hide password */}
                        <button onClick={() => setIsEditingPassword(true)} className="edit-button">Edit</button>
                    </div>
                )}
            </div>
            <button onClick={handleDelete} style={{ marginTop: '10px', color: 'red' }}>
                Delete Account
            </button>
        </div>
    );
};

export default Profile; 
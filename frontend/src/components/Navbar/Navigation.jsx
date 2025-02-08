// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import './Navbar.css';
// import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';
// import { useAuth } from '../../context/AuthContext';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';
// import { authAPI } from '../../axios';

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

// const Navbar = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showProfile, setShowProfile] = useState(false);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: '',
//     severity: 'success'
//   });
  
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     console.log('Searching for:', searchQuery);
//   };

//   const handleLogout = async () => {
//     try {
//       await authAPI.logout();
      
//       // Clear local state
//       logout();
//       setShowProfile(false);
      
//       setSnackbar({
//         open: true,
//         message: 'Logged out successfully!',
//         severity: 'success'
//       });
      
//       navigate('/login');
//     } catch (error) {
//       console.error('Logout error:', error);
//       setSnackbar({
//         open: true,
//         message: 'Error logging out. Please try again.',
//         severity: 'error'
//       });
//     }
//   };

//   const handleCloseSnackbar = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setSnackbar({ ...snackbar, open: false });
//   };

//   const toggleProfile = () => {
//     setShowProfile(!showProfile);
//   };

//   // Close profile dropdown when clicking outside
//   React.useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (showProfile && !event.target.closest('.navbar__profile')) {
//         setShowProfile(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [showProfile]);

//   return (
//     <nav className="navbar">
//       <div className="navbar__logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
//         <img src={require('../../assets/images/juttapaaila.png')} alt="Logo" />
//       </div>

//       <ul className="navbar__links">
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/product">Products</Link></li>
//         <li><Link to="/about">About</Link></li>
//         <li><Link to="/contact">Contact</Link></li>
//         {user ? (
//           <>
//             <li className="navbar__profile" onClick={toggleProfile}>
//               <FaUserCircle className="avatar-icon" />
//               <span>{user.name}</span>
//             </li>
//             {showProfile && (
//               <div className="profile-dropdown">
//                 <div className="profile-info">
//                   <h3>{user.name}</h3>
//                   <p>{user.email}</p>
//                 </div>
//                 <button onClick={handleLogout} className="logout-button">
//                   Logout
//                 </button>
//               </div>
//             )}
//           </>
//         ) : (
//           <li><Link to="/login">Login</Link></li>
//         )}
//       </ul>

//       <div className="navbar__search">
//         <form onSubmit={handleSearch}>
//           <input
//             type="text"
//             placeholder="Search for plants or tools"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <button type="submit">Search</button>
//         </form>
//       </div>

//       <Link to="/cart" className="navbar__cart">
//         <div className="cart-icon-container">
//           <FaShoppingCart className="cart-icon" />
//           <span className="cart-label">Cart</span>
//         </div>
//       </Link>

//       <Snackbar 
//         open={snackbar.open} 
//         autoHideDuration={3000} 
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <Alert 
//           onClose={handleCloseSnackbar} 
//           severity={snackbar.severity}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </nav>
//   );
// };

// export default Navbar;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Navigation = () => {
  const [user, setUser] = useState(null); // Simulate user authentication state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate login (Replace with actual authentication logic)
    setUser({ email: "user@example.com", password: "password123" });
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">JuttaPaaila</h1>
      <div className="relative">
        {user ? (
          <div>
            <button onClick={() => setDropdownOpen(!dropdownOpen)}>
              <FaUserCircle size={24} />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg p-2">
                <p className="px-4 py-2">Email: {user.email}</p>
                <p className="px-4 py-2">Password: {user.password}</p>
                <button
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-200"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="bg-blue-500 px-4 py-2 rounded" onClick={handleLogin}>
            Log in
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const AdminUser = mongoose.model('AdminUser', new mongoose.Schema({
    username: String,
    password: String,
}));

const createAdminUser = async () => {
    const adminUser = new AdminUser({
        username: 'admin',
        password: await bcrypt.hash('admin', 10), // Replace 'yourpassword' with your desired password
    });

    await adminUser.save();
    console.log('Admin user created');
    mongoose.connection.close();
};

mongoose.connect('mongodb+srv://testuser:testuser@cluster0.utjnwiu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        createAdminUser();
    })
    .catch(err => console.error(err)); 
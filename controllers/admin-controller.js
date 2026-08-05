const User = require('../models/User');

const adminPage = (req, res) => {
    res.json({
        message: 'Welcome to the Admin Page'
    });
};

const approveAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, { role: 'admin' }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: `${updatedUser.userName} is now an admin`,
            user: updatedUser
        });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
};

module.exports = { adminPage, approveAdmin };

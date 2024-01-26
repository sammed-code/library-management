const {BookModal, UserModal} = require('../models');

exports.getAllUsers = async (req, res) => {
    const users = await UserModal.find();

    if (users.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No User Found"
        })
    }

    res.status(200).json({
        success: true,
        data: users
    })
};

exports.getSingleUserById = async (req, res) => {
    const {id} = req.params;

    const user = await UserModal.findById({_id: id});

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User Not Found With Given ID"
        })
    }

    return res.status(200).json({
        success: true,
        data: user
    })
};


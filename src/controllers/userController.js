const User = require('../models/User');

// GET all users
const getUsers = async(req,res)=>{
    try{

        const users = await User.find();

        res.json(users);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }
};

// POST create user
const createUser = async(req,res)=>{
    try{

        const user = await User.create(req.body);

        res.status(201).json(user);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }
};


// GET user by id
const getUserById = async(req,res)=>{
    try{

        const user = await User.findById(req.params.id);

        if(!user){
            return res.status(404).json({
                message:'User not found'
            });
        }

        res.json(user);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }
};

// PUT update user
const updateUser = async(req,res)=>{
    try{

        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );

        res.json(user);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }
};

// DELETE user
const deleteUser = async(req,res)=>{
    try{

        await User.findByIdAndDelete(req.params.id);

        res.json({
            message:'User deleted'
        });

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }
};

module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
};
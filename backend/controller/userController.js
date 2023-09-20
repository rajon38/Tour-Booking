import User from '../models/User.js'



//update user
export const updateUser = async(req,res)=>{

    const id = req.params.id

    try {

        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: req.body
        }, {new:true})

        res.status(200).json({success:true, message:'Successfully Updated', data: updatedUser})

    } catch (error) {
        res.status(500).json({success:false, message:'failed to update. Try again'})
    }
}

//deleted user
export const deleteUser = async (req,res)=>{
    const id = req.params.id

    try {
        await User.findByIdAndUpdate(id)
        res.status(200).json({success:true, message:'Successfully Deleted'})

    } catch (error) {
        res.status(500).json({success:false, message:'failed to update. Try again'})
    }
}

//getSingle user
export const getSingleUser = async(req,res)=>{
    const id = req.params.id

    try {
        const user = await User.findById(id)
        res.status(200).json({success:true, data: user})

    } catch (error) {
        res.status(500).json({success:false, message:'Not found. Try again'})
    }
}

//getAll User
export const getAllUser = async(req,res)=>{

    try {
        const users = await User.find({})
        res.status(200).json({success:true, data: users})
    } catch (error) {
        res.status(500).json({success:false, message:'Not found. Try again'})
    }
}

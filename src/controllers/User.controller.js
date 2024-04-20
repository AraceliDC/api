const User = require('../modules/User.models')
const bcrypt = require('bcrypt')

const singUp = async(req, res) => {
    try {
        const { email } = req.body;
         
        const userExist = await User.findOne( { email })

        if (!userExist){
            const user = new User(req.body)
            user.hashPassword(req.body.password) //encriptando la password
            const response = await user.save()// guardo el nuevo usuario en la base de datos

            return res.json({
                message: 'user was created successfully',
                detail: response
            })
        }
    } catch (error) {
        return res.json({
            message: 'error',
            detail: error.message
        })
    }
}


const getAllUsers = async (req, res)=>{
    try {
        const response = await User.find();
        if (response){
            return res.json({
                message: 'users',
                detail: response
            })
        }
    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.message
        })
    }
}

const logIn = async(req,res) => {
    try {
        const {firstname, password} = req.body
        const user = await User.findOne({ firstname }) // se busca en la bd si existe, si está se guarda en la variable
        const correctPassword = user === null? false : await bcrypt.compare(password, user.correctPassword)
        if (!(user && password)){
            return res.json({
                message:'invalid user or password'
            })
        }else{
            return res.json({
                message:'OK',
                detail: {
                    user,
                    token: user.generateJWT()
                }
            })
        }
    } catch (error) {
        
    }
}

const updateUser = async (req, res) =>{
    try {
        const newData = req.body;
        const response = await User.findByIdAndUpdate(
            newData.id,
            {$set: newData},
            {new: true}
        )

        if (response) {
            return res.json({
                message: 'usuario actualizado exitosamente',
                detail: response
            })
        }
    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.message
        })
    }
}

const deleteUser = async (req, res)=>{
    try {
        const response = await User.findByIdAndDelete(req.body.id)

        if (response){
            return res.json({
                message: 'ha sido eliminado exitosamente'
            })
        }
    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.message
        })
    }
}

module.exports = {
    singUp,
    getAllUsers,
    logIn,
    updateUser,
    deleteUser
}
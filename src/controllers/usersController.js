import usersModel from "../models/usersModel.js";

//** Métodos para el CRUD **/

//Mostrar todos los registros
export const getAllUsers = async(req, res) => {
    try {
        const users = await usersModel.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.json({message: error.message});
    };
};
//Mostrar un registro 
export const getUser = async (req,res) => {
    try {
        const user = await usersModel.findAll({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(user[0]);
    } catch (error) {
        res.json({message: error.message});
    };
};
//Crear un registro 
export const createUser = async (req, res) => {
    try {
        await usersModel.create(req.body);
        res.status(200).json({"message": "Registro creadeo correctamente"});
    } catch (error) {
        res.json({message: error.message});
    };
};
//Actualizar un registro
export const updateUser = async (req, res) => {
    try {
        usersModel.update(req.body, {
            where: {id: req.params.id}
        });
        res.status(200).json({
            "message": "¡Registro actualizado correctamente"
        });
    } catch (error) {
        res.json({message: error.message});
    }
};
//Eliminar un registro
export const deleteUser= async (req, res) => {
    try {
        usersModel.destroy({
            where: { id : req.params.id}
        });
        res.status(200).json({
            "message": "¡Registro eliminado correctamente"
        });
    } catch (error) {
        res.json({message: error.message});
    };
};
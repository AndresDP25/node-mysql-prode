import usersModel from "../models/usersModel.js";
import loginModel from "../models/loginModel.js";
import bcrypt from "bcryptjs";

//Crear un registro
export const register = async (req, res) => {
  try {
    const { username, password, fullname, email } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await usersModel.findAll({
      where: {
        email: email,
      },
    });
    if (user[0]) {
      res.json({ message: "email existente" });
    } else {
      await usersModel.create({
        username: username,
        hash: hash,
        fullname: fullname,
        email: email,
      });
      res.status(200).json({ message: "Registro creado correctamente" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Verificamos login
export const login = async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await loginModel.findAll({
      where: {
        email: email,
      },
    });
    if (user[0]) {
      const validPass = await bcrypt.compare(password, user[0].dataValues.hash);
      if (validPass) {
        res.status(200).json("Valid Email and pass!");
      } else {
        res.json("Wrong pass!");
      }
    } else {
      res.status(404).json("User not found!");
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

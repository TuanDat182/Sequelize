require('dotenv').config();
const { User, UserProfile } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const createError = require("http-errors");

class UserController {
    register = async (req, res, next) => {
        try {
            const data = req.body;
            const existingUser = await User.findOne({
                where: { email: data.email }
            });
            if (existingUser) throw createError.Conflict("Email đã tồn tại");

            const hash_password = await bcrypt.hash(data.password, 10);

            const user = await User.create({ email: data.email, password: hash_password, role: data.role });

            const token = jwt.sign({ id: user.id, role: user.role }, process.env.SECRET_KEY, { expiresIn: "15m" });

            return res.status(200).json({ message: "Đăng nhập thành công", token: token });
        } catch (err) {
            next(err);
        }
    }

    login = async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email: email } });

            if (!user) throw createError.Unauthorized("Email hoặc mật khẩu không chính xác");

            //kiểm tra password
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) throw createError.Unauthorized("Email hoặc mật khẩu không chính xác");

            const token = jwt.sign({ id: user.id, role: user.role }, process.env.SECRET_KEY, { expiresIn: "15m" });

            return res.status(200).json({ message: "Đăng nhập thành công", token: token });
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController;
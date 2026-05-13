const { User, UserProfile } = require("../models");
const createError = require("http-errors");

class UserProfileController {
    uploadAvatar = async (req, res, next) => {
        if (!req.file) return res.status(400).json({ message: " Yêu cầu chọn hình" });

        const userId = req.user.id;

        const imagePath = `/images/${req.file.filename}`;

        const profile = await UserProfile.create({
            user_id: userId,
            image: imagePath,
            display_name: "New User"
        });

        return res.json({
            message: "Upload success",
            data: profile,
        });
    }

    showProfile = async (req, res, next) => {
        try {
            const userId = req.user.id;

            if (!userId) throw createError.Unauthorized("Không tìm thấy user");

            const profile = await UserProfile.findOne({
                where: {
                    user_id: userId
                }
            });

            return res.status(201).json({ message: "success", data: profile });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = UserProfileController;
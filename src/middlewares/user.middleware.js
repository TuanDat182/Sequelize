class UserMiddleware {

    validateEmail(email) {
        if (!email) {
            return {
                isValid: false,
                message: "Email is required"
            };
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return {
                isValid: false,
                message: "Email is invalid"
            };
        }

        return {
            isValid: true,
            message: "Valid email"
        };
    }

    checkValidate

    checkEmail = async (req, res, next) => {
        try {
            const { email } = req.body;

            const result = this.validateEmail(email);
            if (!result.isValid) return res.status(400).json({ message: result.message });

            next()
        } catch (err) {
            return res.status(500).json({ message: "Server error" + err });
        }
    }


    //Kiểm tra định dạng password
    validatePassword(password) {
        if (!password) {
            return {
                isValid: false,
                message: "Password is required"
            };
        }

        if (password.length < 8) {
            return {
                isValid: false,
                message: "Password must be at least 8 characters"
            };
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

        if (!passwordRegex.test(password)) {
            return {
                isValid: false,
                message: "Password must include uppercase, lowercase, number and special character"
            };
        }

        return {
            isValid: true,
            message: "Valid password"
        };
    }
    checkPassword = (req, res, next) => {
        const { password } = req.body;
        const result = this.validatePassword(password);

        if (!result.isValid) return res.json({ message: result.message });

        next();
    }
}

module.exports = UserMiddleware;
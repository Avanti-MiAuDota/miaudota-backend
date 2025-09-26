import { AuthService } from "../services/authService.js";

export const AuthController = {
    async login(req, res) {
        try {
            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({ message: "Email e senha são obrigatórios." });
            }

            const result = await AuthService.login(email, senha);

            res.status(200).json(result);
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    },
};

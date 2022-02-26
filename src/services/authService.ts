import { getCustomRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AuthRepository from '../repositories/authRepository';

class UserService {
    public async authenticateByLogin({ login, password }: { login: string; password: string; }): Promise<any> {
        const authRepository = getCustomRepository(AuthRepository);

        const user = await authRepository.findOne({ where: { login } });

        if (!user) throw new Error('Usuário e/ou Senha inválidos !');

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) throw new Error('Usuário e/ou Senha inválidos !');

        const token = jwt.sign({ id: user.id }, (process.env.JWTSECRET as string), { expiresIn: process.env.JWTEXPIRESIN })

        return { user, token };
    }

    public async authenticateByEmail({ email, password }: { email: string; password: string; }): Promise<any> {
        const authRepository = getCustomRepository(AuthRepository);

        const user = await authRepository.findOne({ where: { email } });

        if (!user) throw new Error('Usuário e/ou Senha inválidos !');

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) throw new Error('Usuário e/ou Senha inválidos !');

        const token = jwt.sign({ id: user.id }, (process.env.JWTSECRET as string), { expiresIn: process.env.JWTEXPIRESIN })

        return { user, token };
    }
}

export default new UserService();

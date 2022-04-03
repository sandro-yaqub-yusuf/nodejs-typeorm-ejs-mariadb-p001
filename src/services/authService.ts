import * as database from '../database';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const authRepository = database.dataSource.getRepository(User);

class UserService {
    public async authenticateByLogin({ login, password }: { login: string; password: string; }): Promise<any> {
        const user = await authRepository.findOneBy({ login });

        if (!user) throw new Error('Usuário e/ou Senha inválidos !');

        const isValidPassword = bcrypt.compare(password, user.password);

        if (!isValidPassword) throw new Error('Usuário e/ou Senha inválidos !');

        const token = jwt.sign({ id: user.id }, (process.env.JWTSECRET as string), { expiresIn: process.env.JWTEXPIRESIN })

        return { user, token };
    }

    public async authenticateByEmail({ email, password }: { email: string; password: string; }): Promise<any> {
        const user = await authRepository.findOneBy({ email });

        if (!user) throw new Error('Usuário e/ou Senha inválidos !');

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) throw new Error('Usuário e/ou Senha inválidos !');

        const token = jwt.sign({ id: user.id }, (process.env.JWTSECRET as string), { expiresIn: process.env.JWTEXPIRESIN })

        return { user, token };
    }
}

export default new UserService();

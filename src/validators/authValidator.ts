import { checkSchema } from 'express-validator';

export const login = checkSchema({
    login: {
        trim: true,
        escape: true,
        isLength: { 
            options: { min: 5, max: 30 },
            errorMessage: 'O Login precisa ter pelo menos 5 caracteres e no máximo 30 caracteres !'
        }
    },
    password: {
        trim: true,
        isLength: { 
            options: { min: 6, max: 30 },
            errorMessage: 'A Senha precisa ter pelo menos 6 caracteres e no máximo 30 caracteres !'
        }
    }
});

import { checkSchema } from 'express-validator';

export const update = checkSchema({
    name: {
        trim: true,
        escape: true,
        isLength:{
            options: { min: 2, max: 50 }
        },
        errorMessage: 'O Tipo de Usuário precisa ter pelo menos 2 caracteres e no máximo 50 caracteres !'
    }
});

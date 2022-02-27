import { checkSchema } from 'express-validator';

export const store = checkSchema({
    name: {
        trim: true,
        escape: true,
        isLength:{ 
            options: { min: 2, max: 25 },
            errorMessage: 'O nome da Página precisa ter pelo menos 2 caracteres e no máximo 25 caracteres !'
        }
    },
    orderShow: {
        custom: { options: orderShow => { return orderShow > 0; } },
        errorMessage: 'A Ordem é obrigatória !'
    }
});

export const update = checkSchema({
    name: {
        trim: true,
        escape: true,
        isLength:{ 
            options: { min: 2, max: 25 },
            errorMessage: 'O nome da Página precisa ter pelo menos 2 caracteres e no máximo 25 caracteres !'
        }
    },
    orderShow: {
        custom: { options: orderShow => { return orderShow > 0; } },
        errorMessage: 'A Ordem é obrigatória !'
    }
});

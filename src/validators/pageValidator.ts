import * as expressValidator from 'express-validator';

export const store = expressValidator.checkSchema({
    name: {
        trim: true,
        escape: true,
        isLength:{ 
            options: { min: 2, max: 30 },
            errorMessage: 'O nome da Página precisa ter pelo menos 2 caracteres e no máximo 30 caracteres !'
        }
    },
    orderShow: {
        custom: { options: orderShow => { return orderShow > 0; } },
        errorMessage: 'A Ordem é obrigatória !'
    }
});

export const update = expressValidator.checkSchema({
    name: {
        trim: true,
        escape: true,
        isLength:{ 
            options: { min: 2, max: 30 },
            errorMessage: 'O nome da Página precisa ter pelo menos 2 caracteres e no máximo 30 caracteres !'
        }
    },
    orderShow: {
        custom: { options: orderShow => { return orderShow > 0; } },
        errorMessage: 'A Ordem é obrigatória !'
    }
});

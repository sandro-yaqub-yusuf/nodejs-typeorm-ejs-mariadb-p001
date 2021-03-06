import * as expressValidator from 'express-validator';

export const store = expressValidator.checkSchema({
    name: {
        trim: true,
        escape: true,
        isLength: {
            options: { min: 2, max: 30 },
            errorMessage: 'O nome do Menu precisa ter pelo menos 2 caracteres e no máximo 30 caracteres !'
        }
    },
    orderShow: {
        custom: { options: orderShow => { return orderShow > 0; } },
        errorMessage: 'A Ordem é obrigatória !'
    },
    url: {
        trim: true,
        isLength:{ 
            options: { min: 1, max: 255 },
            errorMessage: 'O link (URL) do Menu precisa ter pelo menos 1 caracter e no máximo 255 caracteres !'
        }
    }
});

export const update = expressValidator.checkSchema({
    name: {
        trim: true,
        escape: true,
        isLength: {
            options: { min: 2, max: 30 },
            errorMessage: 'O nome do Menu precisa ter pelo menos 2 caracteres e no máximo 30 caracteres !'
        }
    },
    orderShow: {
        custom: { options: orderShow => { return orderShow > 0; } },
        errorMessage: 'A Ordem é obrigatória !'
    },
    url: {
        trim: true,
        isLength:{ 
            options: { min: 1, max: 255 },
            errorMessage: 'O link (URL) do Menu precisa ter pelo menos 1 caracter e no máximo 255 caracteres !'
        }
    }
});

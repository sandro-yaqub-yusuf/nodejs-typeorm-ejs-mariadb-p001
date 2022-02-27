import { checkSchema } from 'express-validator';

export const store = checkSchema({
    userTypeId: {
        in: 'body',
        isIn: { options: [[1, 2, 3]] },
        errorMessage: 'O Tipo de Usuário precisa ser 1, 2 ou 3 !'
    },
    name: {
        trim: true,
        escape: true,
        isLength:{
            options: { min: 2, max: 100 },
            errorMessage: 'O Nome precisa ter pelo menos 2 caracteres e no máximo 100 caracteres !'
        }
    },
    email: {
        isEmail: true,
        errorMessage: 'O E-mail é inválido !'
    },
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
    },
    passwordConfirm: {
        trim: true,
        custom: {
            options: (value: string, { req }) => (value === req.body.password)
        },
        errorMessage: 'A Senha de confirmação precisa igual a Senha digitada !'
    },
    terms: {
        in: 'body',
        isIn: { options: [[0, 1]] },
        errorMessage: 'O Termo precisar ser 0 ou 1 !'
    }
});

export const update = checkSchema({
    userTypeId: {
        in: 'body',
        isIn: { options: [[1, 2, 3]] },
        errorMessage: 'O Tipo de Usuário precisa ser 1, 2 ou 3 !'
    },
    name: {
        trim: true,
        escape: true,
        isLength:{
            options: { min: 2, max: 100 },
            errorMessage: 'O Nome precisa ter pelo menos 2 caracteres e no máximo 100 caracteres !'
        }
    },
    email: {
        isEmail: true,
        errorMessage: 'O E-mail é inválido !'
    },
    login: {
        trim: true,
        escape: true,
        isLength: {
            options: { min: 5, max: 30 },
            errorMessage: 'O Login precisa ter pelo menos 5 caracteres e no máximo 30 caracteres !'
        }
    },
    terms: {
        in: 'body',
        isIn: { options: [[0, 1]] },
        errorMessage: 'O Termo precisar ser 0 ou 1 !'
    }
});

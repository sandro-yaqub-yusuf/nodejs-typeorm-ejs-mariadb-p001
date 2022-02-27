import { checkSchema } from 'express-validator';

export const store = checkSchema({
    name: {
        trim: true,
        escape: true,
        isLength: {
            options: { min: 2, max: 200 },
            errorMessage: 'O nome da Imagem precisa ter pelo menos 2 caracteres e no máximo 200 caracteres !'
        }
    },
    imageWidth: {
        custom: { options: imageWidth => { return imageWidth > 0; } },
        errorMessage: 'A largura (em pixel) da Imagem é obrigatória !'
    },
    imageHeight: {
        custom: { options: imageHeight => { return imageHeight > 0; } },
        errorMessage: 'A altura (em pixel) da Imagem é obrigatória !'
    }
});

export const update = checkSchema({
    name: {
        trim: true,
        escape: true,
        isLength: {
            options: { min: 2, max: 200 },
            errorMessage: 'O nome da Imagem precisa ter pelo menos 2 caracteres e no máximo 200 caracteres !'
        }
    },
    imageWidth: {
        custom: { options: imageWidth => { return imageWidth > 0; } },
        errorMessage: 'A largura (em pixel) da Imagem é obrigatória !'
    },
    imageHeight: {
        custom: { options: imageHeight => { return imageHeight > 0; } },
        errorMessage: 'A altura (em pixel) da Imagem é obrigatória !'
    }
});

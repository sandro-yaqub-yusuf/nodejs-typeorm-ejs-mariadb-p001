# NodeJS com TYPESCRIPT, Template Engine EJS e Banco de Dados MARIADB - Projeto 001

* Linguagem principal: Typescript
* Outras linguagens: HTML5, CSS3 e Javascript
* Frameworks utilizadas: TYPESCRIPT, NODEMON, TS-NODE, TS-NODE-DEV, EXPRESS, EXPRESS-SESSION, EXPRESS-VALIDATOR, EJS, TYPEORM, REFLECT-METADATA, MYSQL2, MULTER, SHARP, BCRYPTJS, CORS, JSONWEBTOKEN, NODEMAILER, COPYFILES, PATH e DOTENV
* Banco de Dados utilizado: MariaDB
* Editor utilizado: Visual Studio Code
* Informações extras: Necessita conhecimentos médios NodeJS, Javascript e Typescript

----

## Descrição:

Projeto em NODEJS (site em HTML5, CSS3, Javascript e Typescript) com BD MariaDB para gerenciar usuários e páginas web com FRONT-END (Site) e BACK-END (Painel de Controle Administrativo).

----

## Instalação Global dos pacotes para o NODEJS:

1. Instalar o NODEJS (última versão LTS) do site oficial (https://nodejs.org)
2. Instalar a linguagem TYPESCRIP, utilize o seguinte comando: 
   npm install -g typescript
3. Instalar a biblioteca NODEMON, utilize o seguinte comando: 
   npm install -g nodemon
4. Instalar a biblioteca TS-NODE, utilize o seguinte comando: 
   npm install -g ts-node
5. Instalar a biblioteca TYPEORM, utilize o seguinte comando: 
   npm install -g typeorm
6. Instalar a biblioteca NCU, utilize o seguinte comando: 
   npm i -g npm-check-updates

----

## Instalação direta dos pacotes para o NODEJS:

1. Caso você tenha instalado as bibliotecas globais, rode o seguinte comando na pasta do projeto:
   npm install

----

## Instalação na pasta do projeto (caso queira instalar as bibliotecas do projeto individualmente) dos pacotes para o NODEJS:

01. Instalar a biblioteca extra ao TYPESCRIPT no NODEJS: 
    npm install -D @types/node
02. Instalar a biblioteca EXPRESS para NODEJS: 
    npm install express
03. Instalar a biblioteca extra ao EXPRESS no NODEJS: 
    npm install -D @types/express
04. Instalar a biblioteca EXPRESS-SESSION para NODEJS: 
    npm install express-session
05. Instalar a biblioteca extra ao EXPRESS-SESSION para NODEJS: 
    npm install -D @types/express-session
06. Instalar a biblioteca EXPRESS-VALIDATOR para NODEJS: 
    npm install express-validator
07. Instalar a biblioteca extra ao EXPRESS-VALIDATOR para NODEJS: 
    npm install -D @types/express-validator
08. Instalar a biblioteca EJS para NODEJS: 
    npm install ejs
09. Instalar a biblioteca extra ao EJS no NODEJS: 
    npm install -D @types/ejs
10. Instalar a biblioteca TYPEORM para NODEJS: 
    npm install typeorm
11. Instalar a biblioteca REFLECT-METADATA para NODEJS: 
    npm install reflect-metadata
12. Instalar a biblioteca MYSQL2 para NODEJS: 
    npm install mysql2
13. Instalar a biblioteca MULTER para NODEJS: 
    npm install multer
14. Instalar a biblioteca extra ao MULTER para NODEJS: 
    npm install -D @types/multer
15. Instalar a biblioteca SHARP para NODEJS: 
    npm install sharp
16. Instalar a biblioteca extra ao SHARP para NODEJS: 
    npm install -D @types/sharp
17. Instalar a biblioteca BCRYPTJS para NODEJS: 
    npm install bcryptjs
18. Instalar a biblioteca extra ao BCRYPTJS para NODEJS: 
    npm install -D @types/bcryptjs
19. Instalar a biblioteca CORS para NODEJS: 
    npm install cors
20. Instalar a biblioteca extra ao CORS para NODEJS: 
    npm install -D @types/cors
21. Instalar a biblioteca JSONWEBTOKEN para NODEJS: 
    npm install jsonwebtoken
22. Instalar a biblioteca extra ao JSONWEBTOKEN para NODEJS: 
    npm install -D @types/jsonwebtoken
23. Instalar a biblioteca NODEMAILER para NODEJS: 
    npm install nodemailer
24. Instalar a biblioteca extra ao NODEMAILER para NODEJS: 
    npm install -D @types/nodemailer
25. Instalar a biblioteca PATH no NODEJS: 
    npm install path
26. Instalar a biblioteca DOTENV para NODEJS:
    npm install dotenv
27. Instalar a biblioteca TS-NODE-DEV para NODEJS:
    npm install -D ts-node-dev

----

## Banco de Dados:

1. Criar um banco de dados com o nome de que você definiu no arquivo ".env" com o COLLATE "utf8mb4_general_ci"
2. Existem 2 formas de criar as tabelas e seus respectivos dados
3. Se você instalou todas as bibliotecas do NODE JS, rode o seguinte comando para criar as tabelas e dados:
   npm run typeorm migration:run
4. Ou, utilizando um software de acesso ao BD, rode o script "ScriptDB.sql" para criar as tabelas e dados

----

## Para rodar o projeto:

1. Crie o arquivo ".env" a partir do arquivo ".env-example" e preencha os dados solicitados
2. Abra um terminal ou prompt de comando na pasta do projeto e digite:
   npm run start-dev
3. Abra um browser e digite na URL:
   localhost:5001
4. Este projeto está configurado na porta 5001 no arquivo ".env"
5. Utilize a seguinte URL para ter acesso ao painel administrativo:
   localhost:5001/admin
6. O usuário é "admin" e a senha é "123@qwe"

----

## Sobre o Autor:

SANDRO YAQUB YUSUF - Analista & Programador Sênior FULL-STACK - Trabalha com desenvolvimento de softwares desde 1990, passando pelas linguagens COBOL, CLIPPER, VISUAL BASIC 6, ASP Clássico, ASP.NET Framework, ASP.NET Core, PHP (Laravel) e NodeJS. Possui conhecimentos em banco de dados como SQL-SERVER, ORACLE, MySQL, MariaDB, MongoDB e SQLite. Também possui conhecimentos em HTML5, CSS3, TYPESCRIPT e JAVASCRIPT. Para as frameworks de desenvolvimento de FRONT-END, possui conhecimentos em ANGULAR, VUEJS e REACT JS. Pratica o modelo CLEAN ARCHITECTURE usando os conhecimentos em DDD, SOLID e TDD.

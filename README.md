# NodeJS com TYPESCRIPT, Template Engine EJS e Banco de Dados MARIADB - Projeto 001

* Versão do NODEJS utilizado: 16.15.1 LTS
* Linguagem principal utilizada: Typescript 4.7.x
* Outras linguagens utilizadas: HTML5, CSS3 e Javascript
* Frameworks utilizadas: TYPESCRIPT, NODEMON, TS-NODE, TS-NODE-DEV, EXPRESS, EXPRESS-SESSION, EXPRESS-VALIDATOR, EJS, TYPEORM, REFLECT-METADATA, MYSQL2, MULTER, SHARP, BCRYPTJS, CORS, JSONWEBTOKEN, NODEMAILER, COPYFILES, PATH e DOTENV
* Banco de Dados utilizado: MariaDB 10.5.x
* Editor utilizado: Visual Studio Code
* Informações extras: Necessita conhecimentos médios NodeJS, Javascript, Typescript e Banco de Dados

----

## Descrição:

Projeto em NODEJS (site em HTML5, CSS3, Javascript e Typescript) com BD MariaDB para gerenciar Páginas Web e Usuários com FRONT-END (Site) e BACK-END (Painel de Controle Administrativo).

----

## Instalação Global dos pacotes para o NODEJS:

1. Instalar o NVM de acordo com o seu SO do git oficial (https://github.com/nvm-sh/nvm) e depois de instalado, saia do terminal e entre novamente e verifique se o mesmo foi instalado com o seguinte comando => nvm -v
2. Instalar o NODEJS versão 16.15.1 LTS do site oficial (https://nodejs.org) com o seguinte comando => nvm install 16.15.1
3. Ativar o NODEJS com o seguinte comando => nvm use 16.15.1
4. Atualizar o NPM para a versão mais recente com o seguinte comando => npm install -g npm@latest
5. Instalar o NCU com o seguinte comando => npm install -g npm-check-updates
6. Instalar a linguagem TYPESCRIP, utilize o seguinte comando => npm install typescript
7. Instalar a biblioteca TS-NODE, utilize o seguinte comando => npm install ts-node
8. Instalar a biblioteca TYPEORM, utilize o seguinte comando => npm install typeorm
9. Instalar a biblioteca NODEMON, utilize o seguinte comando => npm install -D nodemon

----

## Instalação direta dos pacotes para o NODEJS:

1. Caso você tenha instalado as bibliotecas globais, rode o seguinte comando na pasta do projeto => npm install

----

## Instalação na pasta do projeto (caso queira instalar as bibliotecas do projeto individualmente) dos pacotes para o NODEJS:

01. Instalar a biblioteca extra ao TYPESCRIPT no NODEJS => npm install -D @types/node
02. Instalar a biblioteca EXPRESS para NODEJS => npm install express
03. Instalar a biblioteca extra ao EXPRESS no NODEJS => npm install -D @types/express
04. Instalar a biblioteca EXPRESS-SESSION para NODEJS => npm install express-session
05. Instalar a biblioteca extra ao EXPRESS-SESSION para NODEJS => npm install -D @types/express-session
06. Instalar a biblioteca EXPRESS-VALIDATOR para NODEJS => npm install express-validator
07. Instalar a biblioteca EJS para NODEJS => npm install ejs
08. Instalar a biblioteca extra ao EJS no NODEJS => npm install -D @types/ejs
09. Instalar a biblioteca TYPEORM para NODEJS => npm install typeorm
10. Instalar a biblioteca REFLECT-METADATA para NODEJS => npm install reflect-metadata
11. Instalar a biblioteca MYSQL2 para NODEJS => npm install mysql2
12. Instalar a biblioteca MULTER para NODEJS => npm install multer
13. Instalar a biblioteca extra ao MULTER para NODEJS => npm install -D @types/multer
14. Instalar a biblioteca SHARP para NODEJS => npm install sharp
15. Instalar a biblioteca extra ao SHARP para NODEJS => npm install -D @types/sharp
16. Instalar a biblioteca BCRYPTJS para NODEJS => npm install bcryptjs
17. Instalar a biblioteca extra ao BCRYPTJS para NODEJS => npm install -D @types/bcryptjs
18. Instalar a biblioteca CORS para NODEJS => npm install cors
19. Instalar a biblioteca extra ao CORS para NODEJS => npm install -D @types/cors
20. Instalar a biblioteca JSONWEBTOKEN para NODEJS => npm install jsonwebtoken
21. Instalar a biblioteca extra ao JSONWEBTOKEN para NODEJS => npm install -D @types/jsonwebtoken
22. Instalar a biblioteca NODEMAILER para NODEJS => npm install nodemailer
23. Instalar a biblioteca extra ao NODEMAILER para NODEJS => npm install -D @types/nodemailer
24. Instalar a biblioteca PATH no NODEJS => npm install path
25. Instalar a biblioteca DOTENV para NODEJS => npm install copyfiles
26. Instalar a biblioteca DOTENV para NODEJS => npm install dotenv

----

## Banco de Dados:

1. Criar um banco de dados com o nome de que você definiu no arquivo ".env" com o COLLATE "utf8mb4_general_ci"
2. Existem 2 formas de criar as tabelas e seus respectivos dados
3. Se você instalou todas as bibliotecas do NODE JS, rode o seguinte comando para criar as tabelas e dados => npm run typeorm migration:run
4. Ou, utilizando um software de acesso ao BD, rode o script "ScriptDB.sql" para criar as tabelas e dados

----

## Para rodar o projeto:

1. Crie o arquivo ".env" a partir do arquivo ".env-example" e preencha os dados solicitados
2. Abra um terminal ou prompt de comando na pasta do projeto e digite => npm run start-dev
3. Abra um browser e digite na URL => localhost:5001
4. Este projeto está configurado na porta 5001 no arquivo ".env"
5. Utilize a seguinte URL para ter acesso ao painel administrativo => localhost:5001/admin
6. O usuário é "admin" e a senha é "123@qwe"

----

## Sobre o Autor:

SANDRO YAQUB YUSUF - Analista & Programador Sênior FULL-STACK - Trabalha com desenvolvimento de softwares desde 1990, passando pelas linguagens COBOL, CLIPPER, VISUAL BASIC 6, ASP Clássico, ASP.NET Framework, ASP.NET Core, PHP (Laravel) e NodeJS. Possui conhecimentos em banco de dados como SQL-SERVER, ORACLE, MySQL, MariaDB, MongoDB e SQLite. Também possui conhecimentos em HTML5, CSS3, TYPESCRIPT e JAVASCRIPT. Para as frameworks de desenvolvimento de FRONT-END, possui conhecimentos em ANGULAR, VUEJS e REACT JS. Pratica o modelo CLEAN ARCHITECTURE usando os conhecimentos em DDD, SOLID, TDD e LGPD.

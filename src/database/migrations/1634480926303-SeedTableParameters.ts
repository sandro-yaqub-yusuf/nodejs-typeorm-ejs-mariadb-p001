import {MigrationInterface, QueryRunner} from 'typeorm';

export class SeedTableParameters1634480926303 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO parameters (attribute, value) VALUES
            ('ADMIN-DESCRIPTION', 'Site para gerenciar Páginas e Usuários - Desenvolvido pela empresa KITAB INFORMÁTICA LTDA - ME.'),
            ('ADMIN-LOGO-NAME-HTML5', '<b>CYBER WEB - ADM</b>'),
            ('ADMIN-LOGO-URL-IMAGE', '/images/admin/admin_logo.png'),
            ('ADMIN-TITLE', 'CYBER WEB - ADMIN SITE'),
            ('SITE-DESCRIPTION', 'Site para gerenciar Páginas e Usuários - Desenvolvido pela empresa KITAB INFORMÁTICA LTDA - ME.'),
            ('SITE-TITLE', 'CYBER WEB - SITE'),
            ('SITE-LOGO-NAME-HTML5', '<h1>CYBER WEB</h1>'),
            ('SITE-LOGO-URL-IMAGE', ''),
            ('SITE-HEADER-BANNER-SHOW', 'YES'),
            ('SITE-HEADER-BANNER-BUTTON-NAME-HTML5', 'ADMIN'),
            ('SITE-HEADER-BANNER-BUTTON-URL', '/admin'),
            ('SITE-HEADER-BANNER-TEXT-LINE1-HTML5', '<h2>SITE PARA GERENCIAR PÁGINAS E USUÁRIOS</h2>'),
            ('SITE-HEADER-BANNER-TEXT-LINE2-HTML5', '<p>Faça o acesso ao Paínel Administrativo para configurar o contéudo deste site.</p>'),
            ('SITE-HEADER-WRAPPER-IMAGE-CSS3', "'background-image: url(site/zerofour/images/bg01.png), url(site/zerofour/images/header.jpg);'"),
            ('SITE-CONTENT-TITLE-TEXT-HTML5', '<h2>This is an important Heading</h2>'),
            ('SITE-PROMO-SHOW', 'YES'),
            ('SITE-PROMO-BUTTON-NAME-HTML5', 'Quem Somos'),
            ('SITE-PROMO-BUTTON-URL', '/pagina/1'),
            ('SITE-PROMO-TEXT-HTML5', '<h2>Quer saber quem somos ? Clique no botão !!!</h2>'),
            ('SITE-PROMO-WRAPPER-IMAGE-CSS3', "'background-image: url(site/zerofour/images/overlay.png), url(site/zerofour/images/promo.jpg);'"),
            ('SITE-FOOTER-CONTACT', 'NO'),
            ('SITE-FOOTER-SOCIAL-MEDIA-SHOW', 'YES'),
            ('SITE-FOOTER-FACEBOOK-URL', '#'),
            ('SITE-FOOTER-INSTAGRAM-URL', '#'),
            ('SITE-FOOTER-LINKEDIN-URL', '#'),
            ('SITE-FOOTER-TWITTER-URL', '#'),
            ('SITE-FOOTER-WHATSAPP-SHOW', 'YES'),
            ('SITE-FOOTER-WHATSAPP-NUMBER-HTML5', '(99) 99999-9999'),
            ('SITE-FOOTER-INFO-LINE1-HTML5', 'Endereço - Linha 1'),
            ('SITE-FOOTER-INFO-LINE2-HTML5', 'Endereço - Linha 2'),
            ('SITE-FOOTER-INFO-LINE3-HTML5', 'São Paulo - SP - CEP 99999-999'),
            ('SITE-FOOTER-INFO-LINE4-HTML5', 'CNPJ: 99.999.999/9999-99'),
            ('SITE-FOOTER-INFO-TITLE-HTML5', '<h2>Endereço</h2>');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM users_types;`);
    }
}

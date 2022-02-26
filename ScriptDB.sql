-- --------------------------------------------------------
-- Servidor:                     localhost
-- Versão do servidor:           10.5.8-MariaDB-log - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              11.3.0.6337
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Copiando estrutura para tabela cyberwebdb.gallery_images
CREATE TABLE IF NOT EXISTS `gallery_images` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `image_width` smallint(6) NOT NULL DEFAULT 1,
  `image_height` smallint(6) NOT NULL DEFAULT 1,
  `image_url` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Copiando dados para a tabela cyberwebdb.gallery_images: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `gallery_images` DISABLE KEYS */;
INSERT INTO `gallery_images` (`id`, `name`, `image_width`, `image_height`, `image_url`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 'Banner exemplo para as páginas', 1200, 350, '/images/admin/banner_page.jpg', '2022-01-01 09:00:00.000000', '2022-01-01 09:00:00.000000', NULL);
/*!40000 ALTER TABLE `gallery_images` ENABLE KEYS */;

-- Copiando estrutura para tabela cyberwebdb.menus
CREATE TABLE IF NOT EXISTS `menus` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  `url` varchar(255) NOT NULL,
  `order_show` tinyint(2) NOT NULL DEFAULT 1,
  `open_another_tab` tinyint(1) NOT NULL DEFAULT 0,
  `site_enable` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Copiando dados para a tabela cyberwebdb.menus: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `menus` DISABLE KEYS */;
INSERT INTO `menus` (`id`, `name`, `url`, `order_show`, `open_another_tab`, `site_enable`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 'Quem Somos', '/pagina/1', 2, 0, 1, '2022-01-01 09:00:00.000000', '2022-01-01 09:00:00.000000', NULL),
	(2, 'Parceiros', '/pagina/2', 1, 1, 1, '2022-01-01 09:00:00.000000', '2022-01-01 09:00:00.000000', NULL);
/*!40000 ALTER TABLE `menus` ENABLE KEYS */;

-- Copiando estrutura para tabela cyberwebdb.migrations
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;

-- Copiando dados para a tabela cyberwebdb.migrations: ~13 rows (aproximadamente)
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` (`id`, `timestamp`, `name`) VALUES
	(1, 1634480926101, 'CreateTableUsersTypes1634480926101'),
	(2, 1634480926102, 'CreateTableUsers1634480926102'),
	(3, 1634480926103, 'CreateTableParameters1634480926103'),
	(4, 1634480926104, 'CreateTableGalleryImages1634480926104'),
	(5, 1634480926105, 'CreateTableMenus1634480926105'),
	(6, 1634480926106, 'CreateTablePages1634480926106'),
	(7, 1634480926201, 'CreateForeignKeyTableUsers1634480926201'),
	(8, 1634480926301, 'SeedTableUsersTypes1634480926301'),
	(9, 1634480926302, 'SeedTableUsers1634480926302'),
	(10, 1634480926303, 'SeedTableParameters1634480926303'),
	(11, 1634480926304, 'SeedTableGalleryImages1634480926304'),
	(12, 1634480926305, 'SeedTableMenus1634480926305'),
	(13, 1634480926306, 'SeedTablePages1634480926306');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;

-- Copiando estrutura para tabela cyberwebdb.pages
CREATE TABLE IF NOT EXISTS `pages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  `content` text DEFAULT NULL,
  `order_show` tinyint(2) NOT NULL DEFAULT 1,
  `open_another_tab` tinyint(1) NOT NULL DEFAULT 0,
  `site_enable` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Copiando dados para a tabela cyberwebdb.pages: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `pages` DISABLE KEYS */;
INSERT INTO `pages` (`id`, `name`, `content`, `order_show`, `open_another_tab`, `site_enable`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 'Quem Somos', '<img src="/images/admin/banner_page.jpg"/><div><br><br></div><h5><span style="font-weight: bolder;">1. The standard Lorem Ipsum passage, used since the 1500s</span></h5><div><span style="font-weight: bolder;"><br></span></div><div>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</div><div><br></div><div><h5><span style="font-weight: bolder;">2. Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</span></h5><div><span style="font-weight: bolder;"><br></span></div><div>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</div></div><div><br></div><div><h5><span style="font-weight: bolder;">3. 1914 translation by H. Rackham</span></h5><div><br></div><div>"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"</div></div><div><br></div><div><h5><span style="font-weight: bolder;">4. Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</span></h5><div><br></div><div>"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."</div></div>', 1, 0, 1, '2022-01-01 09:00:00.000000', '2022-01-01 09:00:00.000000', NULL),
	(2, 'Parceiros', '<img src="/images/admin/banner_page.jpg"/><div><br><br></div><h5><span style="font-weight: bolder;">1. The standard Lorem Ipsum passage, used since the 1500s</span></h5><div><span style="font-weight: bolder;"><br></span></div><div>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</div><div><br></div><div><h5><span style="font-weight: bolder;">2. Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</span></h5><div><span style="font-weight: bolder;"><br></span></div><div>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</div></div><div><br></div><div><h5><span style="font-weight: bolder;">3. 1914 translation by H. Rackham</span></h5><div><br></div><div>"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"</div></div><div><br></div><div><h5><span style="font-weight: bolder;">4. Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</span></h5><div><br></div><div>"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."</div></div>', 2, 1, 1, '2022-01-01 09:00:00.000000', '2022-01-01 09:00:00.000000', NULL),
	(3, 'Eventos', '<img src="/images/admin/banner_page.jpg"/><div><br><br></div><h5><span style="font-weight: bolder;">1. The standard Lorem Ipsum passage, used since the 1500s</span></h5><div><span style="font-weight: bolder;"><br></span></div><div>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</div><div><br></div><div><h5><span style="font-weight: bolder;">2. Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</span></h5><div><span style="font-weight: bolder;"><br></span></div><div>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</div></div><div><br></div><div><h5><span style="font-weight: bolder;">3. 1914 translation by H. Rackham</span></h5><div><br></div><div>"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"</div></div><div><br></div><div><h5><span style="font-weight: bolder;">4. Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</span></h5><div><br></div><div>"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."</div></div>', 3, 0, 1, '2022-01-01 09:00:00.000000', '2022-01-01 09:00:00.000000', NULL);
/*!40000 ALTER TABLE `pages` ENABLE KEYS */;

-- Copiando estrutura para tabela cyberwebdb.parameters
CREATE TABLE IF NOT EXISTS `parameters` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `attribute` varchar(100) NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4;

-- Copiando dados para a tabela cyberwebdb.parameters: ~33 rows (aproximadamente)
/*!40000 ALTER TABLE `parameters` DISABLE KEYS */;
INSERT INTO `parameters` (`id`, `attribute`, `value`) VALUES
	(1, 'ADMIN-DESCRIPTION', 'Site para gerenciar Páginas e Usuários - Desenvolvido pela empresa KITAB INFORMÁTICA LTDA - ME.'),
	(2, 'ADMIN-LOGO-NAME-HTML5', '<b>CYBER WEB - ADM</b>'),
	(3, 'ADMIN-LOGO-URL-IMAGE', '/images/admin/admin_logo.png'),
	(4, 'ADMIN-TITLE', 'CYBER WEB - ADMIN SITE'),
	(5, 'SITE-DESCRIPTION', 'Site para gerenciar Páginas e Usuários - Desenvolvido pela empresa KITAB INFORMÁTICA LTDA - ME.'),
	(6, 'SITE-TITLE', 'CYBER WEB - SITE'),
	(7, 'SITE-LOGO-NAME-HTML5', '<h1>CYBER WEB</h1>'),
	(8, 'SITE-LOGO-URL-IMAGE', ''),
	(9, 'SITE-HEADER-BANNER-SHOW', 'YES'),
	(10, 'SITE-HEADER-BANNER-BUTTON-NAME-HTML5', 'ADMIN'),
	(11, 'SITE-HEADER-BANNER-BUTTON-URL', '/admin'),
	(12, 'SITE-HEADER-BANNER-TEXT-LINE1-HTML5', '<h2>SITE PARA GERENCIAR PÁGINAS E USUÁRIOS</h2>'),
	(13, 'SITE-HEADER-BANNER-TEXT-LINE2-HTML5', '<p>Faça o acesso ao Paínel Administrativo para configurar o contéudo deste site.</p>'),
	(14, 'SITE-HEADER-WRAPPER-IMAGE-CSS3', '\'background-image: url(site/zerofour/images/bg01.png), url(site/zerofour/images/header.jpg);\''),
	(15, 'SITE-CONTENT-TITLE-TEXT-HTML5', '<h2>This is an important Heading</h2>'),
	(16, 'SITE-PROMO-SHOW', 'YES'),
	(17, 'SITE-PROMO-BUTTON-NAME-HTML5', 'Quem Somos'),
	(18, 'SITE-PROMO-BUTTON-URL', '/pagina/1'),
	(19, 'SITE-PROMO-TEXT-HTML5', '<h2>Quer saber quem somos ? Clique no botão !!!</h2>'),
	(20, 'SITE-PROMO-WRAPPER-IMAGE-CSS3', '\'background-image: url(site/zerofour/images/overlay.png), url(site/zerofour/images/promo.jpg);\''),
	(21, 'SITE-FOOTER-CONTACT', 'NO'),
	(22, 'SITE-FOOTER-SOCIAL-MEDIA-SHOW', 'YES'),
	(23, 'SITE-FOOTER-FACEBOOK-URL', '#'),
	(24, 'SITE-FOOTER-INSTAGRAM-URL', '#'),
	(25, 'SITE-FOOTER-LINKEDIN-URL', '#'),
	(26, 'SITE-FOOTER-TWITTER-URL', '#'),
	(27, 'SITE-FOOTER-WHATSAPP-SHOW', 'YES'),
	(28, 'SITE-FOOTER-WHATSAPP-NUMBER-HTML5', '(99) 99999-9999'),
	(29, 'SITE-FOOTER-INFO-LINE1-HTML5', 'Endereço - Linha 1'),
	(30, 'SITE-FOOTER-INFO-LINE2-HTML5', 'Endereço - Linha 2'),
	(31, 'SITE-FOOTER-INFO-LINE3-HTML5', 'São Paulo - SP - CEP 99999-999'),
	(32, 'SITE-FOOTER-INFO-LINE4-HTML5', 'CNPJ: 99.999.999/9999-99'),
	(33, 'SITE-FOOTER-INFO-TITLE-HTML5', '<h2>Endereço</h2>');
/*!40000 ALTER TABLE `parameters` ENABLE KEYS */;

-- Copiando estrutura para tabela cyberwebdb.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_type_id` int(10) unsigned NOT NULL DEFAULT 3,
  `login` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `terms` tinyint(1) NOT NULL DEFAULT 0,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx1_users_user_type_id_foreign` (`user_type_id`) USING BTREE,
  CONSTRAINT `fk1_users_user_type_id_foreign` FOREIGN KEY (`user_type_id`) REFERENCES `users_types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Copiando dados para a tabela cyberwebdb.users: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `user_type_id`, `login`, `password`, `name`, `email`, `terms`, `image_url`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 1, 'admin', '$2a$08$dRy2ylTiWt/Tzk1v6PECEevrOVCiJGtVS7qYJWxBtozsdgdz0BJYu', 'Administrador', 'admin@teste.com', 1, '/images/admin/user.jpg', '2022-01-01 09:00:00.000000', '2022-01-01 09:00:00.000000', NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

-- Copiando estrutura para tabela cyberwebdb.users_types
CREATE TABLE IF NOT EXISTS `users_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Copiando dados para a tabela cyberwebdb.users_types: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `users_types` DISABLE KEYS */;
INSERT INTO `users_types` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 'Administrador', '2022-01-01 09:00:00.000000', '2022-01-01 09:00:00.000000', NULL),
	(2, 'Operador', '2022-01-01 09:00:00.000000', '2022-01-01 09:00:00.000000', NULL),
	(3, 'Somente Consulta', '2022-01-01 09:00:00.000000', '2022-01-01 09:00:00.000000', NULL);
/*!40000 ALTER TABLE `users_types` ENABLE KEYS */;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

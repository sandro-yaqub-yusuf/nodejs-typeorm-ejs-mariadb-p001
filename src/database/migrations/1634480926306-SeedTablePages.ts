import * as typeorm from 'typeorm';

export class SeedTablePages1634480926306 implements typeorm.MigrationInterface {
    public async up(queryRunner: typeorm.QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO pages (id, name, content, order_show, open_another_tab, site_enable, created_at, updated_at, deleted_at) VALUES
            (1, 'Quem Somos', '<img src="/images/admin/banner_page.jpg"/><div><br><br></div><h5><span style="font-weight: bolder;">1. The standard Lorem Ipsum passage, used since the 1500s</span></h5><div><span style="font-weight: bolder;"><br></span></div><div>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</div><div><br></div><div><h5><span style="font-weight: bolder;">2. Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</span></h5><div><span style="font-weight: bolder;"><br></span></div><div>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</div></div><div><br></div><div><h5><span style="font-weight: bolder;">3. 1914 translation by H. Rackham</span></h5><div><br></div><div>"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"</div></div><div><br></div><div><h5><span style="font-weight: bolder;">4. Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</span></h5><div><br></div><div>"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."</div></div>', 1, 0, 1, '2022-01-01 09:00:00', '2022-01-01 09:00:00', NULL),
            (2, 'Parceiros', '<img src="/images/admin/banner_page.jpg"/><div><br><br></div><h5><span style="font-weight: bolder;">1. The standard Lorem Ipsum passage, used since the 1500s</span></h5><div><span style="font-weight: bolder;"><br></span></div><div>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</div><div><br></div><div><h5><span style="font-weight: bolder;">2. Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</span></h5><div><span style="font-weight: bolder;"><br></span></div><div>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</div></div><div><br></div><div><h5><span style="font-weight: bolder;">3. 1914 translation by H. Rackham</span></h5><div><br></div><div>"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"</div></div><div><br></div><div><h5><span style="font-weight: bolder;">4. Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</span></h5><div><br></div><div>"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."</div></div>', 2, 1, 1, '2022-01-01 09:00:00', '2022-01-01 09:00:00', NULL),
            (3, 'Política de Privacidade', '<img src="/images/admin/banner_page.jpg"/><div><br><br></div><h5><span style="font-weight: bolder;">1. POLÍTICA DE PRIVACIDADE GLOBAL</span></h5><div><span style="font-weight: bolder;"><br></span></div><div>"Este documento tem por finalidade estabelecer as regras para tratamento de dados que incluem, exemplificativamente, as operações de coleta, produção, recepção, classificação, utilização, acesso, reprodução, transmissão, distribuição, processamento, arquivamento, armazenamento, eliminação, avaliação ou controle da informação, modificação, comunicação, transferência, difusão ou extração dos dados coletados dos USUÁRIOS, além do registro de suas atividades, de acordo com as leis aplicáveis."</div><div><span style="font-weight: bolder;"><br></span></div><div>"Quando o USUÁRIO aceita essa Política de Privacidade confere sua livre e expressa concordância com os termos aqui estipulados."</div><div><br></div><h5><span style="font-weight: bolder;">2. Glossário</span></h5><div><br></div><div>"1.1. Para os fins deste documento, devem ser consideradas as seguintes definições e descrições para seu melhor entendimento:"</div><div><br></div><div>"<b>Conta:</b> é a forma através da qual o USUÁRIO é representado ao acessar determinadas áreas restritas, funcionalidades exclusivas dos sites, aplicativos e serviços oferecidos pelo por este site, geralmente correspondendo a um conjunto de dados que representa o USUÁRIO (como dados cadastrais) e outros dados relevantes para garantir relação mais apropriada e completa deste site com o USUÁRIO (como registro de atividades efetuadas pelo USUÁRIO nos sites, aplicativos e serviços oferecidos pelo site)."</div><div><br></div><div>"<b>Cookies:</b> pequenos arquivos ou pacotes de dados enviados pelo site ao dispositivo do USUÁRIO para identificá-lo e coletar informações que auxiliarão este site a aprimorar os serviços prestados aos USUÁRIO."</div><div><br></div><div>"<b>Credenciais:</b> é o conjunto de dados que o USUÁRIO usa para se autenticar quando acessa determinadas áreas restritas e/ou funcionalidades exclusivas dos sites, aplicativos e serviços oferecidos pelo site. Geralmente tais dados são login e senha, mas podem incluir dados adicionais que auxiliem no processo de autenticação."</div><div><br></div><div>"<b>Dados:</b> conjunto de dados Anonimizados e dados Pessoais."</div><div><br></div><div>"<b>Dados Anonimizados:</b> são informações que, isoladamente ou em conjunto com outros dados Anonimizados, não permitem a identificação de uma pessoa, considerando a utilização de meios técnicos razoáveis e disponíveis na ocasião de seu tratamento. Podem incluir gênero, idade e geolocalização (como a cidade em que se encontra) e dados estatísticos."</div><div><br></div><div>"<b>Dados Pessoais:</b> são informações relacionadas à pessoa natural identificada ou identificável. Podem incluir, por exemplo, nome, endereço, e-mail, telefone, número de cartão de débito/crédito, endereço IP e dados de geolocalização."</div><div><br></div><div>"<b>Endereço IP:</b> endereço de Internet Protocol associado ao dispositivo usado pelo USUÁRIO. Cada Endereço IP corresponde a um conjunto alfanumérico que, junto com outras informações, ajuda a identificar unicamente o dispositivo que o USUÁRIO está usando para acessar a internet e, portanto, para acessar sites, aplicativos e serviços oferecidos por este site."</div><div><br></div><div>"<b>Legislação Aplicável:</b> significa a legislação aplicável ao relacionamento entre o site e o USUÁRIO, que pode variar por conta de (i) local de prestação dos serviços; (ii) local de residência ou moradia de uma das Partes, incluindo o próprio USUÁRIO; (iii) outros fatores apontados em legislações específicas. Este site detém representação em diversos países, estando sujeito, além da legislação brasileira, a diversos outros normativos, dentre os quais o Regulamento Geral de Proteção de Dados – General Data Protection Regulation (GDPR), em inglês."</div><div><br></div><div>"<b>Logs:</b> registros de atividades dos USUÁRIOS efetuados nos sites, aplicativos e serviços prestados por este site."</div><div><br></div><div>"<b>Política de Privacidade:</b> significa, em conjunto, esta Política de Privacidade Global e seus anexos, bem como demais documentos expressamente referenciados nesta Política de Privacidade Global."</div><div><br></div><div>"<b>USUÁRIOS:</b> pessoas que acessam ou interagem com as funcionalidades oferecidas pelos sites, aplicativos e serviços oferecidos pelo site. O USUÁRIO deverá ter capacidade legal para aceitar e consentir com a presente Política de Privacidade e demais documentos do site. Caso não detenha tal capacidade, o USUÁRIO declara ter obtido previamente todas as autorizações necessárias para aceitar esta Política de Privacidade e demais documentos apresentados por este site."</div><div><br></div><h5><span style="font-weight: bolder;">3. Coleta dos Dados</span></h5><div><br></div><div>"Coletamos os dados do USUÁRIO conforme ele nos fornece, de forma direta ou indireta, no acesso e uso dos sites, aplicativos e serviços oferecidos por este site ou por parceiros que tenham sido devidamente autorizados por este site (e que seguem as diretrizes de privacidade de dados deste site de acordo com a presente política). Também explicamos no que consistem os Cookies e como o USUÁRIO pode gerenciá-los."</div>', 3, 0, 1, '2022-01-01 09:00:00', '2022-01-01 09:00:00', NULL),
            (4, 'Eventos', '<img src="/images/admin/banner_page.jpg"/><div><br><br></div><h5><span style="font-weight: bolder;">1. The standard Lorem Ipsum passage, used since the 1500s</span></h5><div><span style="font-weight: bolder;"><br></span></div><div>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</div><div><br></div><div><h5><span style="font-weight: bolder;">2. Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</span></h5><div><span style="font-weight: bolder;"><br></span></div><div>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</div></div><div><br></div><div><h5><span style="font-weight: bolder;">3. 1914 translation by H. Rackham</span></h5><div><br></div><div>"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"</div></div><div><br></div><div><h5><span style="font-weight: bolder;">4. Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</span></h5><div><br></div><div>"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."</div></div>', 4, 0, 1, '2022-01-01 09:00:00', '2022-01-01 09:00:00', NULL);
        `);
    }
    
    public async down(queryRunner: typeorm.QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM pages;`);
    }
}

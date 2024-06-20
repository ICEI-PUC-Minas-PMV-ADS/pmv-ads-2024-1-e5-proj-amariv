# Implantação do Software

O sistema foi implantado com sucesso na plataforma **https://www.hostinger.com.br/**. Os links da aplicação são os seguintes: 

1. www.amariv.com - Destinado aos clientes da entidade. Nesse ambiente os usuários poderão cadastrar seus pedidos de coleta de materiais recicláveis;
2. www.admin.amariv.com - Este ambiente é restrito ao administrador da plataforma, servidor da entidade responsável por receber os pedidos de coleta, aprovando-os ou não, estipular o limite de coletas por dia, e as demais funcionalidades exigididas quando da definição dos requisitos.
3. www.func.amariv.com - Nessa parte os funcionários da entidade terão acesso às funcionalidades que lhes competem, como ver as coletas do dia, as rotas de coleta, entre outras.

A API foi implantada em um servidor vps dedicado operando o sistema operacional **Ubuntu**, também foi utilizado utilizado banco de dados MSSQL Server.

## Processo de Implantação

Para a hospedagem do banco de dados:

1. Aquisição do domínio "amariv.com";
2. Contratação do serviço de hospedagem, com o servidor VPS;
3. Configuração do servidor, com a instalação das dependências necessárias;
4. Realização do deploy da aplicação;
5. Extensivos testes da plataforma.

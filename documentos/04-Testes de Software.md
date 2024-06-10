# Planos de Testes de Software


<h2>Requisitos Funcionais</h2>
O plano de testes foi desenvolvido utilizando uma metodologia que abrange todos os requisitos funcionais e não funcionais do sistema  é um técnica utilizada para o desenvolvimento rápido de software.

 Requisito Funcional  | Cenário | Pré-Condição | Dado | Quando | Então |
| -   |   -     |      -       |  -   |  -     |  -    |
|RF-001 | O administrador irá efetuar o cadastramento de uma conta de usuário cliente ou profissional | O administrador irá acessar a página de cadastro | O administrador irá preencher os dados no formulário de cadastro de cliente | O administrador clica no botão de cadastrar | o app realiza o cadastro com os dados necessários e retorna uma mensagem de sucesso.|
|RF-002 | O administrador altera os dados originais do formulário de alteração de conta|  O usuário deverá estar previamente cadastrado | administrador entra com os novos dados no formulário | o administrador clica no botão de alterar os dados  | O sistema altera os dados daquele usuário especifico e retorna uma mensagem de sucesso.|
|RF-003 | O administrador filtrar a  lista de usuários  | o usuário deverá estar previamente cadastrado  | o administrador clica no botão de exlusão do usuário que está localizado ao final da lista | O administrador confirma a exclusão clicando em um botão de confirmar que será gerado após o click no botão de exclusão. | O usuário será excluído do sistema. |
|RF-004 | O usuário cadastrar uma conta usando a sua conta do google   | o usuário possuir uma conta válida do google | o usuário na tela de login clicar em cadastrar conta pelo google | o usuário confirmar as informações e clicar em salvar | Uma nova conta será criada com os dados daquele usuário|
|RF-005 | O usuário irá criar uma conta no sistema | o usuário deverá possuir um email | O usuário irá clicar em nova conta e será redirecionado para a página de criação de conta | O usuário clicar em salvar com os campos obrigátorios preenchidos | A conta será criada no sistema.|
|RF-006 | O usuário irá efetuar o login no sistema | Ter uma conta previamente cadastrada | O usuário digitar corretamente seu login e senha | O usuário clicar no botão de logar | será redirecionado para a página principal do sistema |
|RF-007 | O usuário irá agendar uma coleta de materiais cadastrados  | o usuário deverá cadastrar a coleta em um dia e horário disponíveis | o usuário deve enviar o agendamento da coleta | O usuário preenche os dados e escolhe o endereço e clica no botão de cadastrar | A coleta é cadastrada, e permanece na espera por confirmação.|
|RF-008 |O usuário irá agendar uma coleta de materiais cadastrados sem a necessidade de login  | o usuário deverá cadastrar a coleta em um dia e horário disponíveis cadastrando um endereço | o usuário deve enviar o agendamento da coleta | O usuário preenche os dados e cadastra o endereço e clica no botão de enviar agendamento | A coleta é cadastrada, e permanece na espera por confirmação, resposta por telefone.|
|RF-009 | O administrador deverá confirmar ou cancelar uma coleta agendada | Uma coleta deverá estar previamente cadastrada | o administrador confirme ou cancele a coleta |  o administrador efetuar a mudança na coleta  | O agendamento deve ter seu status alterado e enviar uma mensagem para o usuário envolvido. |
|RF-010 | O administrador poderá agendar uma coleta | o administrador deverá cadastrar a coleta em uma data e horário disponíveis | Cadastro do agendamento da coleta | O administrador confirma a coleta cadastrada | Será enviada uma mensagem para o usuário previamente cadastrado. |
|RF-011 | Adiministrador irá cadastrar um rota em uma data especifica | Deverá existir coletas cadastradas previamente para a criação da rota | Dado que exista coletas para gerar um rota  | O administrador organiza as coletas gerando uma rota e clicando em salvar | A coleta deverá ser registrada gerando um alerta para o usuário profisisonal(Motorista) |
|RF-012 | O usuário funcionario e o administrador poderão visualizar as rotas cadastradas | deverá existir rotas previamente cadastradas | Dado a visualização na página de rotas em formato de lista| usuário ou administrador acessar a página de rotas e clicar em um rota especifica | o usuário deverá ser redirecionado a página da rota selecionada|
|RF-013 | O usuário funcionario e o administrador poderão alterar as rotas cadastradas | deverá existir rotas previamente cadastradas | Dado a visualização da rota podendo ser alterado| usuário ou administrador ou o usuário alterar a rota e clicar em confirmar alteração |A rota deverá ser alterada e o sistema deverá enviar um aviso para os usuários envolvidos.|
|RF-014 | O usuário poderá alterar o status da coleta | Deverá existir uma coleta previamente cadastrada | coleta seja selecionada e o status alterado | o usuário confirmar a alteração da coleta | A coleta deverá ter seu status alterado e o sistema deverá emitir um aviso para os usuários envolvidos. |
|RF-015 | O administrador deverá definir um limite de coleta diario ou um limite de coleta em uma data especifica | O administrador acessar as configurações do agendamento da coleta | o limite de coleta for alterado | quando cadastro de coleta for acessado | deverá ser exibida o número de coletas da data especifica. |
|RF-016 | O administrador visualisar o histórico de coletas na página de coletas | deve existir coletas antigas cadastradas | o administrador usar a consulta no formulário de pesquisa de coletas | o botão de pesquisar coletas for clicado | Dever ser exibido uma lista com coletas antigas e novas |
|RF-017 | O administrador visualisar o histórico de coletas na página de coletas | deve existir coletas antigas cadastradas | o administrador usar a consulta no formulário de pesquisa de coletas e utilizar os filtros | As coletas forem filtradas e exibidas | Dever ser exibido todas as coletas de acordo com o filtro selecionado |
|RF-018 | O admnistrador cadastrar materiais previamente na página de cadastro de materiais | acessar o formulário de cadastro de materiais  | todos os campos obrigatórios forem preenchidos  | Quando o botão de salvar o material for clicado  | Deve ser salvo no sistema o material que foi cadastrado. |
|RF-019 |o usuário deverá cadastrar um material que já estiver cadastrado no banco de dados ou um novo material que não exista no cadastro.| acessar a página de cadastro de coletas, estando logado ou não.  | todos os campos obrigatórios para cadastro de materiais forem devidamente preenchidos ou um material já cadastrado selecionado | Quando o botão de cadastro de material para aquela coleta especifica for clicado. | Deve ser salvo na lista de cadastro da coleta e após o agendamento da coleta for salvo os materiais devem ser salvos no banco de dados.|
|RF-020 | Recuperação de senha | Ser previamento cadastrado na plataforma | O sistema oferece a opção de recuperar senha | O usuário seleciona a opção "esqueci minha senha"  | É enviado um e-mail com o protocolo de recuperação de senha.|

        
<h2>Plano de teste Requisitos Não-Funcionais do sistema </h2>

| RF  | Cenário | Pré-Condição | Dado | Quando | Então |
| -   |   -     |      -       |  -   |  -     |  -    |
|RF-001 | Exibir a rota mais rápida ao usuário | Selecionar uma rota cadastrada no sistema | Dado que foi selecionado a rota a ser seguida | A rota for exibida na página de rota| Exibir a rota mais curta entre as coletas cadastradas |




# Evidências de Testes de Software

Apresente imagens e/ou vídeos que comprovam que um determinado teste foi executado, e o resultado esperado foi obtido. Normalmente são screenshots de telas, ou vídeos do software em funcionamento.

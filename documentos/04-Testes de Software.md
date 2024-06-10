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
.

<br>**Teste 01:** Cadastro de funcionários. 
<br>**Requisito:** RF-01.
<br>**Critérios:** O Administrador deve ser capaz de cadastrar novo funcionário no sistema. 
<br>**Estado:** Passou. 
<br>**Descrição:** Uma vez logado no sistema, o administrador deverá, na barra de navegação lateral, selecionar a guia “Funcionários”. Na tela “Funcionários”, deverá acionar o botão “Adicionar funcionário”. Uma vez acionado o botão, surgirá na tela um formulário de cadastro de funcionário. Após preencher o formulário com as informações do novo funcionário, há as opções de “salvar” e “cancelar”. Selecionando qualquer das duas opções o formulário será fechado, se optou por salvar, surgirá um card na tela de funcionários com o novo funcionário cadastrado; se optou por cancelar, a operação será cancelada e as informações do formulário são apagadas.
<br>**Imagens do teste:** 
 ![Imagem](/documentos/img/testes/1.jpg) 


<br>**Teste 02:** Cadastro de funcionários. 
<br>**Requisito:** RF-02.
<br>**Critérios:** O Administrador deve ser capaz de alterar os dados dos funcionários. 
<br>**Estado:** Passou. 
<br>**Descrição:** Na tela “Funcionários”, no card de um funcionário, ao selecionar a opção “Editar”, é aberto um formulário editável com as informações do funcionário. Após realizar as informações, basta selecionar o botão “salvar” para atualizar as informações. O card com as informações do funcionário será atualizada. 
<br>**Imagens do teste:** 
 ![Imagem](/documentos/img/testes/2-1.jpg)

 ![Imagem](/documentos/img/testes/2-2.jpg)


<br>**Teste 03:** Exclusão de funcionário. 
<br>**Requisito:** RF-03.
<br>**Critérios:** O Administrador deve ser capaz de excluir um funcionário. 
<br>**Estado:** Passou. 
<br>**Descrição:** Na página “Funcionários”, basta selecionar a opção “Excluir” no card do funcionário que se deseja remover. Uma vez ativada, o funcionário é removido da base o card com suas informações é excluído.
<br>**Imagens do teste:** 
![Imagem](/documentos/img/testes/3-1.jpg)

![Imagem](/documentos/img/testes/3-2.jpg)


<br>**Teste 04:** Cadastro/login de cliente com conta Google. 
<br>**Requisito:** RF-04.
<br>**Critérios:** O usuário cliente deverá ser capaz de se cadastrar e realizar login na plataforma utilizando sua conta do Google.
<br>**Estado:** Passou. 
<br>**Descrição:** Na página inicial, há a opção de usar sua conta Google. Ao selecionar essa opção é carregado no sistema as informações necessárias a partir do disponível na plataforma do Google.
<br>**Imagens do teste:** 
![Imagem](/documentos/img/testes/4.jpg)

<br>**Teste 05:** Cadastro de cliente no sistema. 
<br>**Requisito:** RF-05.
<br>**Critérios:** O usuário cliente deverá ser capaz de cadastrar-se no sistema, informando pessoalmente suas informações.
<br>**Estado:** Passou. 
<br>**Descrição:** Na página inicial, após selecionar a opção “Cadastre-se”, é aberto um formulário no qual o cliente poderá inserir suas informações para realizar seu cadastro na plataforma, tais como: nome, e-mail e senha. 
<br>**Imagens do teste:** 
![Imagem](/documentos/img/testes/5.jpg)


<br>**Teste 06:** Login. 
<br>**Requisito:** RF-06.
<br>**Critérios:** O usuário deverá ser capaz de realizar login na plataforma a partir de seu e-mail e senha informados no cadastro. 
<br>**Estado:** Passou. 
<br>**Descrição:** Na página inicial, basta inserir o e-mail e senha informados no cadastro, acionar o botão “Entrar” que, no caso de as informações estarem corretas, o usuário será redirecionado para o ambiente interno da plataforma. 
<br>**Imagens do teste:**
![Imagem](/documentos/img/testes/6.jpg)

<br>**Teste 07:** Cadastro de coleta de material reciclável. 
<br>**Requisito:** RF-07.
<br>**Critérios:** Uma vez logado no sistema, o usuário deverá ser capaz de registrar um pedido de coleta de material reciclável. 
<br>**Estado:** Passou. 
<br>**Descrição:** Na página de coleta, o usuário deverá preencher seus dados pessoais, e os dados do endereço em que a coleta será realizada. Em seguida, deverá selecionar a data/hora que lhe é mais conveniente para receber a equipe de coleta, informando nos campos próprios. Após isto, deverá selecionar o botão “verificar disponibilidade”, em que lhe será informado se a data/hora escolhida poderá ser atendida pela AMARIV. Logo abaixo, o usuário deverá informar quais os materiais ele tem disponível para coleta, informando o tipo de material e o peso. Finalizando o cadastro de materiais, basta selecionar a opção “Enviar agendamento”.  
<br>**Imagens do teste:**
![Imagem](/documentos/img/testes/7.jpg)

<br>**Teste 08:** Cadastro de coleta de material sem necessidade de login. 
<br>**Requisito:** RF-08.
<br>**Critérios:** O usuário deverá ser capaz de registrar um pedido de coleta de material reciclável sem a necessidade de cadastrar-se na plataforma ou realizar login. 
<br>**Estado:** Passou. 
<br>**Descrição:** Na página inicial, na parte superior da barra lateral, há a opção de criar um agendamento sem a necessidade de cadastro ou login. Ao selecionar essa opção, o usuário será redirecionado para um ambiente similar ao ambiente do Teste 07, no qual ele deverá informar os dados necessários à coleta: nome, endereço, data/hora e materiais. 
<br>**Imagens do teste:**
![Imagem](/documentos/img/testes/8.jpg)

![Imagem](/documentos/img/testes/8-1.jpg)

![Imagem](/documentos/img/testes/8-2.jpg)

<br>**Teste 09:** Aprovação/cancelamento de coleta.
<br>**Requisito:** RF-09.
<br>**Critérios:** O Administrador deverá ser capaz de aprovar ou rejeitar um pedido de coleta. 
<br>**Estado:** Passou. 
<br>**Descrição:** Na página de coletas o Administrador poderá, no card de cada coleta, recusá-la ou aceitá-la, bastando clicar nos botões “Recusar” ou “Aceitar”. 
<br>**Imagens do teste:**
![Imagem](/documentos/img/testes/9-1.jpg)

![Imagem](/documentos/img/testes/9-2.jpg)

<br>**Teste 10:** Cadastro/alteração de coleta pelo Administrador.
<br>**Requisito:** RF-10.
<br>**Critérios:** O administrador deverá ser capaz de registrar um pedido de coleta, ou mesmo alterar um pedido de coleta cadastrado no sistema. 
<br>**Estado:** Passou. 
<br>**Descrição:** Nos casos de pedidos feitos por telefone, ou presencialmente na sede da AMARIV, o Administrador poderá, na página “Coletas”, realizar a inserção das informações e cadastro do pedido de coleta, da maneira descrita no Teste 07. Bem como, após cadastro, poderá excluir o pedido de coleta feito. 
<br>**Imagens do teste:**
![Imagem](/documentos/img/testes/10.jpg)


<br>**Teste 11:** Criação de rota de coletas. 
<br>**Requisito:** RF-11.
<br>**Critérios:** O Administrador deverá de capaz de criar uma rota de coleta de materiais, a partir dos pedidos de coleta cadastrados no sistema. 
<br>**Estado:** Passou. 
<br>**Descrição:** Para criar uma rota de coleta de materiais, basta o Administrador informar o funcionário responsável pelas coletas do dia, a quantidade máxima de coletas aprovada para o dia e o dia da coleta. Em seguida, poderá selecionar as coletas cadastradas para o dia selecionado. 
<br>**Imagens do teste:**
![Imagem](/documentos/img/testes/11.jpg)


<br>**Teste 12:** Visualização de rota de coleta.  
<br>**Requisito:** RF-12.
<br>**Critérios:** Os usuários Administrador e Funcionário deverão ser capazes de visualizar a rota de coleta cadastrada. 
<br>**Estado:** Passou. 
<br>**Descrição:** Na página de rotas, poderá ser vista a rota prevista para o dia, com o itinerário aprovado previamente. Há o campo de rota atual, no qual o funcionário pode ver qual o próximo ponto de coleta, bem como o botão “Finalizar” para informar que aquela coleta foi realizada e que deverá seguir para o próximo ponto. Logo abaixo estarão dispostos os próximos pontos de coleta da rota. 
<br>**Imagens do teste:**
![Imagem](/documentos/img/testes/12.jpg)


<br>**Teste 13:** Alteração de rota.   
<br>**Requisito:** RF-13.
<br>**Critérios:** O usuário Funcionário deverá ser capaz de alterar a rota de coleta cadastrada.
<br>**Estado:** Passou. 
<br>**Descrição:** No mesmo ambiente do Teste 12, o funcionário poderá reordenar as coletas previstas para a rota, bastando, para isso, mover para cima ou para baixo na lista para reorganizar a ordem das coletas. 
<br>**Imagens do teste:**
![Imagem](/documentos/img/testes/13-1.jpg)
![Imagem](/documentos/img/testes/13-2.jpg)

<br>**Teste 14:** Alteração do status da coleta.  
<br>**Requisito:** RF-14.
<br>**Critérios:** O usuário Funcionário deverá ser capaz de alterar o status de um pedido de coleta. 
<br>**Estado:** Passou. 
<br>**Descrição:** Ao selecionar uma coleta cadastrada, será possível alterar seu estado, mudando-a de posição na rota, marcar como realizada ou cancelar. 
<br>**Imagens do teste:**
![Imagem](/documentos/img/testes/14.jpg)

![Imagem](/documentos/img/testes/14-1.jpg)


<br>**Teste 15:** Limitação da quantidade de coletas. 
<br>**Requisito:** RF-15.
<br>**Critérios:** O Administrador deverá ser capaz de limitar a quantidade de coletas que poderão ser atendidas em um dia específico. 
<br>**Estado:** Passou. 
<br>**Descrição:** Na página de criação de rotas de coleta, basta informar a quantidade máxima desejada de coletas no campo “Limite”, na guia “Detalhes do roteiro”.  
<br>**Imagens do teste:**
![Imagem](/documentos/img/testes/15.jpg)


<br>**Teste 16:** Visualização do histórico de coletas. 
<br>**Requisito:** RF-16.
<br>**Critérios:** O Administrador deverá ser capaz de visualizar o histórico de coletas realizadas. 
<br>**Estado:** Passou. 
<br>**Descrição:** Na página de coletas, estarão disponíveis os cards com as coletas cadastradas, constando ainda suas respectivas informações, como data, status, nome do cliente, horário programado, materiais cadastrados etc. 
<br>**Imagens do teste:**
![Imagem](/documentos/img/testes/16.jpg)


<br>**Teste 17:** Filtro do histórico de coletas. 
<br>**Requisito:** RF-17.
<br>**Critérios:** O Administrador deverá ser capaz de filtrar o histórico de coletas por data, material, status ou funcionário.
<br>**Estado:** Passou. 
<br>**Descrição:** Na mesma página de coletas, demonstrada no Teste 16, na seção “Filtro”, basta selecionar o parâmetro desejado, como por exemplo: nome do funcionário responsável, material, status e período. Basta selecionar o campo desejado e inserir a informação que deseja utilizar como filtro que as informações serão atualizadas automaticamente. 
<br>**Imagens do teste:**
![Imagem](/documentos/img/testes/18-1.jpg)

![Imagem](/documentos/img/testes/9-1.jpg)


<br>**Teste 18:** Cadastro de materiais.  
<br>**Requisito:** RF-18.
<br>**Critérios:** O usuário Administrador e Funcionário deverão ser capazes de cadastrar novos materiais que poderão ser entregues pelo usuário cliente. Esses materiais são os que serão aceitos pela equipe de coleta.
<br>**Estado:** Passou. 
<br>**Descrição:** Na página de materiais, basta acionar o botão “Adicionar material”, no canto superior direito, que surgirá na tela um formulário para cadastro de material. No formulário, deverão ser inseridas as informações relativas à descrição e tipo de material. Após salvar, o novo material ficará disponível em um card na tela. De igual forma, também é possível excluir ou editar um material cadastrado.
<br>**Imagens do teste:**

![Imagem](/documentos/img/testes/18.jpg)

![Imagem](/documentos/img/testes/18-1.jpg)

![Imagem](/documentos/img/testes/18-2.jpg)

<br>**Teste 19:** Cadastro de materiais em coleta 
<br>**Requisito:** RF-19.
<br>**Critérios:** O usuário cliente deverá ser capaz de cadastrar os materiais que serão por ele entregues no pedido de coleta. 
<br>**Estado:** Passou. 
<br>**Descrição:** Na página de cadastro de coleta, após inserir suas informações pessoais, data e hora da coleta, o usuário poderá inserir as informações dos materiais que serão coletados. Para tanto, deverá selecionar o botão “Adicionar material”, que abrirá um pequeno formulário em que o usuário poderá selecionar, dentre os materiais cadastrados pelo administrador e/ou funcionário como aptos à coleta, bem como o peso dos materiais a serem coletados. Após salvar as informações, elas ficarão disponíveis em um card específico para aquele material. Serão criados tantos cards quanto a quantidade de materiais diferentes fora informada pelo usuário. 
<br>**Imagens do teste:**

![Imagem](/documentos/img/testes/19.jpg)

![Imagem](/documentos/img/testes/19-1.jpg)

![Imagem](/documentos/img/testes/19-2.jpg)

![Imagem](/documentos/img/testes/19-3.jpg)


<br>**Teste 20:** Recuperação de senha. 
<br>**Requisito:** RF-20.
<br>**Critérios:** O usuário deverá ser capaz de solicitar a recuperação de senha.
<br>**Estado:** Passou. 
<br>**Descrição:** Na página inicial, próximo ao formulário de login, há a opção de “esqueci minha senha”, que ao ser selecionado redicionará o usuário ao ambiente de recuperação. Neste ambiente, o usuário informa o e-mail utilizado no seu cadastro, aciona o botão “enviar” que fará com que o sistema envie para o e-mail um protocolo para a recuperação de senha. 
<br>**Imagens do teste:**

![Imagem](/documentos/img/testes/20.jpg)

![Imagem](/documentos/img/testes/20-1.jpg)



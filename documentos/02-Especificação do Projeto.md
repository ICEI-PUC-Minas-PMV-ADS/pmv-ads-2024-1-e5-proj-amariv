# Especificações do Projeto

## Personas

| ![persona 1-edit](/documentos/img/lucio-amariv.jpg) | Lúcio Heleno Barbosa, 32 anos                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| Ocupação                                                                                                                 | Diretor Financeiro da AMARIV                                                                                           |
| Aplicativos                                                                                                   | WhatsApp, Google Maps                                                                   |
| Motivações                                                                                                               | A importância social e ecológica do seu trabalho               |
| Frustrações                                                                                                             | Deficiências no planejamento impedem que o trabalho alcance máxima eficiência |

| ![persona 1-edit](/documentos/img/delair.jpg) | Delair Pereira de Freitas, 47 anos                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| Ocupação                                                                                                                 | Catador de materiais recicláveis                                                                                           |
| Aplicativos                                                                                                   | WhatsApp, Instagram                                                                   |
| Motivações                                                                                                               | Buscar o retorno financeiro através do seu trabalho                                                                                                                                                   |
| Frustrações                                                                                                             | Por vezes não consegue o retorno financeiro esperado por não conseguir realizar a máxima quantidade de coletas por falta de planejamento adequado                                                   |

| ![persona 1-edit](/documentos/img/klaus.jpg) | Klaus Ernst Müller, 28 anos                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| Ocupação                                                                                                                 | Cientista de dados                                                                                           |
| Aplicativos                                                                                                   | Instagram, Power BI, Spotify                                                                   |
| Motivações                                                                                                               | Acredita que a preservação do meio-ambiente é imprescindível para a construção de um futuro saudável                                                                                                                                                   |
| Frustrações                                                                                                             | Pensa que poderia contribuir mais com a preservação do meio-ambiente                                                   |


## Histórias de Usuários

| Eu como...`PERSONA`      | ...quero/desejo...`FUNCIONALIDADE`                                                                                              | ... para...`MOTIVO/VALOR`                                                                                |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Lúcio Heleno Barbosa | Cadastrar contas para os funcionários usarem o sistema | Gerenciar o uso da ferramenta                         |
| Lúcio Heleno Barbosa | Alterar os dados cadastrados nas contas dos usuários para corrigir algumas informações incorretas| Manter a usabilidade da aplicação                               |
| Lúcio Heleno Barbosa | Excluir as contas dos usuários inativos                 | Manter o sistema enxuto                                       |
|Klaus Ernst Müller | Entrar no sistema usando sua conta do Google | Cadastrar coletas de forma mais prática |
| Todas as personas | Cadastrar minha conta utilizando e-mail | Garantir que minhas ações são contabilizadas | 
| Todas as personas | Entrar no sistema usando e-mail e senha cadastrado | Garantir o acesso às funcionalidades adequadas |
| Klaus Ernst Müller | Cadastrar um pedido de coleta de materiais recicláveis | Descartar de forma adequada meus resíduos | 
| Lúcio Heleno Barbosa | Planejar as rotas mais eficientes para a coleta | Otimizar o uso dos recursos da associação | 
| Klaus Ernst Müller | Cancelar minha solicitação de coleta | Caso haja algum imprevisto | 
| Klaus Ernst Müller | Cadastrar uma coleta de materiais sem a necessidade de criar uma conta | Descartar de forma adequada meus resíduos e preservar minhas informações e privacidade |
| Lúcio Heleno Barbosa | Criar a rota de coleta de um dia específico | Deixar o cronograma organizado para o motorista executar a rota | 
| Delair Pereira de Freitas | Visualizar a rota | Me organizar e planejar o dia | 
| Delair Pereira de Freitas | Alterar a rota definida | Me adaptar às condições adversas, como o trânsito, por exemplo |
| Delair Pereira de Freitas | Alterar o estado das coletas | Identificar se a coleta foi feita, ou se foi cancelada, ou se ainda está pendente |
| Lúcio Heleno Barbosa | Especificar o limite de coleta para determinado dia | Não exceder a capacidade da equipe |
| Lúcio Heleno Barbosa | Visualizar o histórico de coleta | Gerenciar o desempenho da associação |
| Lúcio Heleno Barbosa | Filtrar o histórico de coletas por data, material, status ou funcionário | Administrar as atividades da associação e planejar o emprego da equipe |
| Lúcio Heleno Barbosa | Cadastrar materiais na base de dados | Gerar relatórios sobre o que foi coletado e auxiliar na tomada de decisões |
| Klaus Ernst Müller | Cadastrar materiais que estarão em uma coleta específica | Auxiliar no planejamento das operações da associação |
| Todas as personas | Receber notificações sobre alterações durante as coletas | Tomar ciência das alterações e tomar decisões corretivas | 
| Todas as personas | Receber aletas e notificações sobre alterações nas rotas de coleta | Auxiliar na tomada de decisões frente a obstáculos não previstos| 
| Lúcio Heleno Barbosa | Gerar relatórios com filtros de informações | Auxiliar na organização e tomada de decisões de planejamento|
| Lúcio Heleno Barbosa | Gerar relatórios sobre a quantidade de entregas, filtrando por data, status, funcionário e material | Acompanhar o desempenho da equipe e planejar a coleta de material de modo que forneça o maior retorno financeiro possível |


Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto
/documentos/img/lucio-amariv.jpg

## Arquitetura e Tecnologias

Segue abaixa a tabela com as tecnologia utilizadas.

|Função						         | Ferramenta                                                           |
|---------------------|----------------------------------------------------------------------|
|IDE						            | Visual Studio Code(Frontend), Eclipse PHP(Backend)	                  |
|Linguagem Frontend			| Typescript											                                                |
|Linguagem Backend			 | PHP													                                                     |
|Framework Frontend			| React													                                                   |
|Framework Backend			 | Laravel												                                                  |
|Banco de dados				   | MySQL													                                                   |

Para o desenvolvimento do sistema usaremos a arquitetura MVC para a backend e para o frontend iremos usar uma arquitetura baseada na arquitetura flux.

![arquitetura aplicação](/documentos/img/Arquitetura_da_aplicacao2.png)

![arquitetura backend](/documentos/img/Arquitetura_do_backend.png)

![arquitetura frontend](/documentos/img/Arquitetura_do_frontend.png)

## Project Model Canvas

Colocar a imagem do modelo construído apresentando a proposta de solução.

> **Links Úteis**:
> Disponíveis em material de apoio do projeto

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

|ID           | Descrição do Requisito  | Prioridade |
|:---:|---|:---:|
|RF-01| Permitir que o administrador cadastre contas de Funcionários| Alta | 
|RF-02|	Permitir que o Administrador altere os dados cadastrados das contas dos funcionários | Alta |
|RF-03|	Permitir que o Administrador exclua usuários cadastrados |	Alta |
|RF-04|	Permitir que o usuário cadastre sua própria conta de Cliente usando sua conta do Google |	Baixa |
|RF-05|	Permitir que o usuário cadastre sua própria conta de Cliente | Alta | 
|RF-06|	Permitir que o usuário realize login através de seu e-mail e senha |	Alta |
|RF-07|	Permitir que o usuário Cliente faça o cadastro de coletas de materiais recicláveis	| Alta | 
|RF-08|	Permitir o cadastro de coletas de Materiais Recicláveis, sem a necessidade de criação de conta |	Alta | 
|RF-09|	Permitir o administrador aprovar uma coleta cadastrada |	Alta | 
|RF-10|	Permitir o administrador cadastrar, alterar ou cancelar uma coleta |	Alta | 
|RF-11|	Permitir o administrador a criar uma rota de coletas para uma data especifica |	Alta | 
|RF-12|	Permitir o usuário funcionário e Administrador a visualização da rota cadastrada |	Alta | 
|RF-13|	Permitir o usuário funcionário a alteração da rota cadastrada |	Alta | 
|RF-14|	Permitir o usuário funcionário a alteração do status das coletas |	Alta |
|RF-15|	Permitir que o administrador defina um limite de coletas em uma data especifica | Média |
|RF-16|	Permitir o administrador a visualização do histórico de coletas |	Média |
|RF-17|	Filtro do histórico de coletas por data, material, status ou funcionário |	Alta | 
|RF-18|	Permitir o usuário administrador ou funcionário o cadastro de materiais na base de dados |	Alta | 
|RF-19|	Permitir que os usuários cadastrem materiais que estarão em uma coleta especifica |	Alta | 
|RF-20|	O sistema deverá gerar alerta e enviar notificação para os usuários em qualquer alteração feita no cadastro de coletas |	Média |
|RF-21|	O sistema deverá gerar alerta e enviar notificação para os usuários em qualquer alteração feita na rota de coletas |	Média |
|RF-22|	Gerar relatório com os materiais coletados, filtrando por data, tipo e funcionário |	Baixa |
|RF-23|	Gerar relatório com a quantidade de entregas , filtrando por data, status e funcionário e material |	Baixa |

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF - 01| O sistema deverá criar a rota mais rápida ao selecionar os endereços cadastrados na rota | Alta |

Com base nas Histórias de Usuário, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

- [Requisitos Funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos Não Funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).
Lembre-se que cada requisito deve corresponder à uma e somente uma
característica alvo da sua solução. Além disso, certifique-se de que
todos os aspectos capturados nas Histórias de Usuário foram cobertos.

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição |
|---|---|
|01| O projeto deverá ser entregue até o fim do primeiro semestre de 2024 |
|02| A equipe não poderá terceirizar o desenvolvimento |
|03| O desenvolvimento deverá respeitar o orçamento acordado com o cliente |

Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)

## Diagrama de Casos de Uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos, que utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. Ele contempla a fronteira do sistema e o detalhamento dos requisitos funcionais com a indicação dos atores, casos de uso e seus relacionamentos. 

As referências abaixo irão auxiliá-lo na geração do artefato “Diagrama de Casos de Uso”.

> **Links Úteis**:
> - [Criando Casos de Uso](https://www.ibm.com/docs/pt-br/elm/6.0?topic=requirements-creating-use-cases)
> - [Como Criar Diagrama de Caso de Uso: Tutorial Passo a Passo](https://gitmind.com/pt/fazer-diagrama-de-caso-uso.html/)
> - [Lucidchart](https://www.lucidchart.com/)
> - [Astah](https://astah.net/)
> - [Diagrams](https://app.diagrams.net/)

## Modelo ER (Projeto Conceitual)

![Modelo ER](/documentos/img/modelo_er.png)

## Diagrama de classes

![Diagrama de classes](/documentos/img/Diagrama_de_classes.png)

## Projeto da Base de Dados

![Projeto da Base de Dados](/documentos/img/Diagrama_de_dados.png)


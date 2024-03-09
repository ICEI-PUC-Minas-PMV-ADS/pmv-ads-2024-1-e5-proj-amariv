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
| Lúcio Heleno Barbosa | Cadastrar contas para os funcionários usarem o sistema  | Gerenciar o uso da ferramenta                         |
| Lúcio Heleno Barbosa | Alterar os dados cadastrados nas contas dos usuarios para corrigir algumas informações incorretas                 | Manter a usabilidade da aplicação                                       |
| Lúcio Heleno Barbosa | Excluir as contas dos usuários inativos                 | Manter o sistema enxuto                                       |
| Leonardo Jacques         | Verificar as criptomoedas que estão valorizadas no momento de maneira rápida                                                    | Necessita de agilidade, visto que não tem muito tempo para se dedicar ao estudo mais avançado do mercado |
| Rafael Luis              | Uma ferramenta de fácil visualização da cotação das criptomoedas                                                                | Agilizar a tomada de decisão de qual moeda investir                                                      |
| Rafael Luis              | Realizar a pesquisa do valor de uma criptomoeda específica                                                                      | Localizar rapidamente uma moeda que já é de seu interesse ou de sua carteira                             |
| Rafael Luis              | Utilizar a ferramenta também pelo celular                                                                                       | Se manter informado em momentos que não tiver acesso ao desktop                                          |
| Rafael Luis              | Cadastrar sua carteira composta por criptoativos e moedas fiduciárias e comparar valores fazendo conversões de forma rápida     | cotar o valor de sua carteira em uma moeda ou criptoativo de sua escolha                                 |

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

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Permitir que o usuário cadastre tarefas | ALTA | 
|RF-002| Emitir um relatório de tarefas no mês   | MÉDIA |

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em um dispositivos móvel | MÉDIA | 
|RNF-002| Deve processar requisições do usuário em no máximo 3s |  BAIXA | 

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

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |

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

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.

Sugestão de ferramentas para geração deste artefato: LucidChart e Draw.io.

A referência abaixo irá auxiliá-lo na geração do artefato “Modelo ER”.

> - [Como fazer um diagrama entidade relacionamento | Lucidchart](https://www.lucidchart.com/pages/pt/como-fazer-um-diagrama-entidade-relacionamento)

## Projeto da Base de Dados

O projeto da base de dados corresponde à representação das entidades e relacionamentos identificadas no Modelo ER, no formato de tabelas, com colunas e chaves primárias/estrangeiras necessárias para representar corretamente as restrições de integridade.

# **Lar Canino (Back-End)**

O Back-End do Lar Canino tem como objetivo a criação das APIs que serão consumidas pelo Front geral e, posteriormente, pela seção administrativa do site do Lar Canino.

## **Índice:**

1. [Sobre o projeto](#sobre-o-projeto-lar-canino);
2. [Principais desafios](#principais-desafios);
3. [Tecnologias/linguagens utilizadas](#tecnologiaslinguagens-utilizadas);
4. [Instruções](#instruções);
5. [Rotas disponíveis](#rotas-disponiveis);
6. [Status](#status);
7. [Contato](#contato);

## **Sobre o projeto Lar Canino (Back-End)**

Já tinha tentado fazer a parte do consumo das informações dos cães criando minha própria API, porém, não tive sucesso da primeira vez e deixei essa tentativa na gaveta por um tempo. <br/>
Na mentoria da Devaria, recebi como desafio essa tarefa novamente. <br/>
Pelos meus testes no Postman, consegui reproduzir as tarefas solicitadas, mas agora vou continuar evoluindo este projeto para criar a parte "administrativa" onde será possível realizar o cadastro de novos cães, atualizar informações dos cães existentes, excluir algum registro de um cão etc.<br/>

## **Principais desafios**

- Analisar e entender a documentação das atualizações do Next para poder construir as APIs;

## **Tecnologias/linguagens utilizadas:**

<div style="display: inline_block" align="center"><br />
    <img src="https://img.shields.io/badge/Next-8A2BE2?style=for-the-badge&logo=nextdotjs&logoColor=white" height="35px" alt="Next.Js" align="center" />
    <img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" height="35px" alt="Typescript" align="center" />
    <img src="https://img.shields.io/badge/Node-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" height="35px" alt="Node.Js" align="center" />
</div><br />

## **Instruções**

1. Alternativa 1:
    * Acesse [aqui](https://lar-canino.vercel.app/) para ver a API integrada com o Front do site para o público-geral do Lar Canino;

2. Alternativa 2:
    * Para testar diretamente a API:
        * Clone o projeto:

            ` git clone https://github.com/lettyviana/lar-canino-backend.git `

        * Instale as dependências necessárias:

            ` npm i `

        * Configure as variáveis de ambiente

## **Rotas disponíveis**

OBS. Ainda estou testando e ajustando

## **Admin**
### Dashboard

#### <span style="color:yellow">POST</span>: Rota que os admins usam para cadastrar novos usuários
`/api/dashboard/novo-usuario`

```json
    {
        "username": "nomedeusuario",
        "email": "e-mail",
        "password": "senha",
        // quando o campo role não é passado, o usuário cadastrado adquire automaticamente o role "manager"
        "role": "admin" || "manager"
    }
```

#### <span style="color:royalblue">PUT</span>: Rota que os admins usam para editar suas próprias informações. Apenas o nome de usuário é alterável.
`/api/dashboard/66c784d775c52eed43aade28`

```json
    {
        "username": "adminletty"
    }
```

#### <span style="color:lime">GET</span>: Rota para obter a lista de todos os usuários cadastrados
`/api/dashboard/usuarios`

#### <span style="color:lime">GET</span>: Rota para obter os dados do admin
`/api/dashboard`

## **Managers**
### Dashboard

#### <span style="color:yellow">POST</span>: Rota que os gerentes usam para cadastrar um novo cão
`/api/dashboard/dogs/cadastrar-cao`

```json
    {
        "name": "Nome",
        "breed": "Raça",
        "image": "imagem - string",
        "imageDescription": "Descrição da imagem, contendo Nome - idade - Raça - Cor da pelagem",
        "gender": "Sexo",
        "age": Idade (int),
        "behavior": [
            "Comportamento 1",
            "Comportamento 2",
            "Comportamento 3"
        ],
        "innoculations": "Inoculação, se houver",
        "diseases": "Doença, se houver",
        "parasites": "Parasitas, se houver",
        "description": "Breve descrição sobre o cão"
    }
```

#### <span style="color:lime">GET</span>: Rota que os gerentes usam para obter os dados do registro de um cão
`/api/dashboard/dogs/[id do cão]`

#### <span style="color:royalblue">PUT</span>: Rota que os gerentes usam para atualizar as informações de um cão
`/api/dashboard/dogs/editar-registro/[id do cão]`

```json
    {
        "name": "Nome",
        "breed": "Raça",
        "image": "imagem - string",
        "imageDescription": "Descrição da imagem, contendo Nome - idade - Raça - Cor da pelagem",
        "gender": "Sexo",
        "age": Idade (int),
        "behavior": [
            "Comportamento 1",
            "Comportamento 2",
            "Comportamento 3"
        ],
        "innoculations": "Inoculação, se houver",
        "diseases": "Doença, se houver",
        "parasites": "Parasitas, se houver",
        "description": "Breve descrição sobre o cão"
    }
```

#### <span style="color:salmon">DELETE</span>: Rota para excluir o registro de um cão
`/api/dogs?id=[id do registro do cão a ser excluído]`

## **Cães - Rota pública usada pelo front**

#### <span style="color:lime">GET</span>: Rota para obter a lista de cães já cadastrados
`/api/dogs`


## **Status**
- [x] Funcional;
- [ ] Em andamento: Criação de painel de administrador para poder usar as demais funções da API de cadastrar novos cães, atualizar informações, excluir algum registro etc.


## **Contato**
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/leticiaviana-trad-dev/)
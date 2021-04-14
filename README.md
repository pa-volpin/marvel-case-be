# Bem vindo ao app [***Marvel App***](https://marvel-app-volpin.herokuapp.com/)

A aplicação batizada como Marvel App foi desenvolvida de acordo com o desafio proposto pela Stone, com o objetivo de colocar em evidência, as habilidades técnicas no desenvolvimento de software web.

O objetivo do projeto foi desenvolver uma aplicação, onde a partir do consumo da API da Marvel o usuário tem acesso ao conteúdo do universo Marvel (personagens, histórias, séries, entre outros). Compondo o defasio e experiência do usuário, há o desenvolvimento de uma solução back-end que possibilita o cadastro de novos usuários e adiciona a funcionalidade de armazenar os personagens favoritos do usuário.

Acesse o app Marvel App Volpin pelo link abaixo:

https://marvel-app-volpin.herokuapp.com/

## Como iniciar o uso da aplicação ?

1. Clique no link acima
2. Faça o cadastro com seus dados
3. Confirme seu email
4. Faça seu login e acesse todas as funcionalidades 

## Principais elementos

O projeto foi composto dos seguintes elementos:

- Login
- Cadastro
- Recuperação de senha
- Perfil do usuário
- Barra de navegação
- Galerias de cards da Marvel
- Galerias de cards com filtros, barra de pesquisa e paginação
- Pagina de detalhes de personagem

### OBS: 
- As Galerias de cards são compostas por filtros, barra de pesquisa e paginação para melhor usabilidade
- Os cards de personagem são compostos por icones de "like" e "ver detalhes"

## Arquitetura do projeto

O projeto em primeiro nível foi dividido em:

- [***Front-end***](https://github.com/pa-volpin/marvel-case-fe)
- [***Back-end***](https://github.com/pa-volpin/marvel-case-be)

### Arquitetura e Tecnologias Front-end

- Arquitetura modular (motivado pelo conceito de micro front-ends)
- ReactJS
- Taiwind CSS
- Redux Saga
- React Router DOM
- Axios
- Typescript

### Arquitetura e Tecnologias Back-end

- Arquitetura MSC (Model, Service, Control)
- Banco de dados relacional MYSQL
- ORM Sequelize
- NodeJS
- Express
- Bcrypt
- Bodymen
- Rescue
- Javascript
- Aws SDK

## Operação

- AWS EC2 (hospedagem da API e banco de dados)
- AWS RDS (serviço do banco de dados relacional)
- AWS SES (serviço de mailing para recuperação de senha/ confirmação de email)
- Heroku (hospedagem da Interface Front-end)

## Metodologias utilizadas

- Kanban

## Ferramentas de desenvolvimento

- Git e GitHub para versionamento
- VSCode como editor

## Conclusão

O projeto foi concluído com as funcionalidades exigidas e alguns serviços adicionais que foram pensados no intuito de garantir mais segurança e melhor experiência do usuário.

### Aprendizados:
- Aprendizado de novas funcinalidades
- Novas experiências com serviços de hospedagem
- Otimização e gestão do tempo
- Organização de tarefas para cumprir prazo/requisitos

### Pontos a melhorar futuramente
- Construção de testes
- Maior componentização da página de detalhes
- Otimização de imagem  para reduzir tamanho
- Semântica HTML

## Desenvolvedores

- Paulo Afonso Volpin ([perfil](https://github.com/pa-volpin))

## Repositório base do desafio (Stone)

https://gist.github.com/jeansflores/5f4746ce1129e27da6f451069780ccf7

# orm-sequelize

## 📋 Índice
- [📖 Sobre](#-Sobre)
- [🚀 Tecnologias utilizadas](#-Tecnologias-utilizadas)
- [📌 Como executar o projeto](#-Como-executar-o-projeto)
- [💻 Comandos do sequelize-cli usados](#-Comandos-do-sequelize-cli-usados)
- [🎓 Certificados](#-Certificados)

## 📖 Sobre
Projeto desenvolvido durante os cursos [Curso de ORM com NodeJS: API com Sequelize e MySQL](https://cursos.alura.com.br/course/orm-nodejs-api-sequelize-mysql) da Alura.

> Diagrama usado de referência do projeto:
![Diagrama](assets/diagram.png)

Recebemos uma lista de funcionalidades que o cliente deseja implementar, agora que o CRUD básico foi feito e o sistema está funcionando. Durante o projeto vamos analisar esta lista e transformar esses requisitos em novas funcionalidades: 

- [✅] O cliente não gostaria que registros importantes do sistema, como as Pessoas, sejam apagados definitivamente do banco de dados. 
- [✅] Para deixar a interface mais limpa, o cliente gostaria que na lista de Pessoas, por padrão, fossem exibidos somente os usuários ativos.
- [✅] Foram percebidas algumas falhas de validação dos formulários por parte do front-end, o que resultou em dados de email inválidos no banco. É desejável que essa validação não seja responsabilidade exclusiva do front.
- [✅] É importante poder consultar todas as matrículas confirmadas referentes a estudante X de forma rápida.
- [✅] O cliente gostaria de poder consultar as turmas abertas por intervalo de data, para não receber informações desnecessárias (como turmas antigas).
- [❌] O cliente quer poder consultar as matrículas por turma e saber quais delas estão lotadas, para organizar melhor as matrículas.
- [❌] O cliente gostaria que, uma vez que o cadastro de um estudante fosse desativado, todas as matrículas relativas a este estudante automaticamente passassem a constar como “canceladas”.

## 🚀 Tecnologias utilizadas
O projeto foi desenvolvido utilizando as seguintes tecnologias:

- [Node.js](https://nodejs.org/en)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [Sequelize](https://sequelize.org/)
- [sequelize-cli](https://github.com/sequelize/cli)
- [Docker](https://www.docker.com/)

## 📌 Como executar o projeto

Primeiro é preciso subir uma instância do mysql:
```bash
docker pull mysql

docker run 
  --name english-school
  -p 3306:3306
  -e MYSQL_ROOT_PASSWORD=root
  -e MYSQL_DATABASE=english-school
  -d mysql

docker start english-school
```

Execute o projeto node:
```bash
npm run dev
```
## 💻 Comandos do sequelize-cli usados

```bash
## 1️⃣ Curso de ORM com NodeJS: API com Sequelize e MySQL

# Criando o modelo e a migração de Pessoas
npx sequelize-cli model:create --name Pessoas --attributes nome:string,ativo:boolean,email:string,role:string

# Inserindo as migrations pendentes no banco de dados
npx sequelize-cli db:migrate

# Gerando um novo arquivo de seed para o modelo Pessoas
npx sequelize-cli seed:generate --name demo-pessoa

# Inserindo os dados das seeds no banco
npx sequelize-cli db:seed:all

# Criando os novos modelos e migrações
npx sequelize-cli model:create --name Niveis --attributes descr_nivel:string

npx sequelize-cli model:create --name Turmas --attributes data_inicio:dateonly

npx sequelize-cli model:create --name Matriculas --attributes status:string

# Depois de fazer as associações e referências no código, basta rodar:
npx sequelize-cli db:migrate

# criando os seeds para popular as tabelas
npx sequelize-cli seed:generate --name demo-nivel

npx sequelize-cli seed:generate --name demo-turmas

npx sequelize-cli seed:generate --name demo-matriculas

# Inserindo os dados das seeds no banco
npx sequelize-cli db:seed:all
```

```bash
## 2️⃣ Curso de ORM com NodeJS: avançando nas funcionalidades do Sequelize

# Criando as migrações para adicionar a nova coluna nas tabelas
npx sequelize-cli migration:generate --name add-column-pessoas
npx sequelize-cli migration:generate --name add-column-niveis
npx sequelize-cli migration:generate --name add-column-turmas
npx sequelize-cli migration:generate --name add-column-matriculas

# Rodando as migrations
npx sequelize-cli db:migrate
```

## 🎓 Certificados
### [ORM com NodeJS: API com Sequelize e MySQL](https://cursos.alura.com.br/certificate/d72a0efc-d5bf-4d51-8fd0-220fba2f7908?lang=pt_BR)

# orm-sequelize

Diagrama usado de referência do projeto
![Diagrama](assets/diagram.png)


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

Comandos [sequelize-cli](https://github.com/sequelize/cli) usados:

```bash
# Criando o modelo e a migração de Pessoas
npx sequelize-cli model:create --name Pessoas --attributes nome:string,ativo:boolean,email:string,role:string

# Inserindo as migrations pendentes no banco de dados
npx sequelize-cli db:migrate

# Gerando um novo arquivo de seed para o modelo Pessoas
npx sequelize-cli seed:generate --name demo-pessoa

# Inserindo os dados das seeds no banco
npx sequelize-cli db:seed:all
```
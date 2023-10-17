# orm-sequelize

```bash
docker pull mysql

docker run 
  --name english-school
  -p 3306:3306
  -e MYSQL_ROOT_PASSWORD=root
  -e MYSQL_DATABASE=english-school
  -d mysql

docker run english-school
```

Comandos sequelize usados:

```bash
npx sequelize-cli model:create --name Pessoas --attributes nome:string,ativo:boolean,email:string,role:string

npx sequelize-cli db:migrate
```
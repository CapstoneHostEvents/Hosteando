"use strict";
/*

dockerfile
docker build -t hello_world_express_node  .

Crie uma pasta vazia, e entre nela com o "cd"
$ yarn init -y
$ yarn add typescript @types/node -D
$ yarn add express uuid
$ yarn add @types/uuid -D
$ yarn add -D @types/express
$ yarn add ts-node-dev -D
"scripts": {
    "dev": "ts-node-dev src/app.ts"
}
$ yarn tsc --init


yarn add typeorm reflect-metadata pg dotenv
ts config -> {
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "strictPropertyInitialization": false,
}
    
docker run --name postgres-kenzie -e POSTGRES_USER=caio -e POSTGRES_PASSWORD=1234 -p 5432:5432 -d postgres:14.3-alpine

yarn typeorm migration:create src/migrations/initialMigration

yarn typeorm migration:generate src/migrations/createTables -d src/data-source.ts

yarn typeorm migration:run -d src/data-source.ts

docker exec api_entrega_s5 yarn typeorm migration:run -d src/data-source.ts

attention data source db_user .....

yarn add express-async-errors
importar no app express-async-errors
fazer middleware, chamar app.use ndo middleware e criar pasta error e fazer extend do error para appError

yarn add bcryptjs

yarn add @types/bcryptjs


test

yarn add -D jest@27.5.1 ts-jest @types/jest supertest @types/supertest sqlite3

yarn jest --init

De uma maneira resumida, o comando cria o arquivo base de configuração dos testes, o jest.config.ts

Enter: Gera o script de "test" no package.json.
Y: Gera o arquivo de configuração do jest em TS.
Enter: Escolhe o Node como ambiente de testes.
Enter: O jest não vai criar relatórios de cobertura dos testes.
Enter: Escolhe o v8 como provedor.
Enter: Evita o que o jest limpe algumas configurações antes de cada teste.
Vamos ainda adicionar mais duas opções ao arquivo jest.config.ts:

"preset": "ts-jest",
"testMatch": ["**/ /*/*/ /**/ /*.spec.ts"],

import { describe, expect, test, beforeAll, afterAll, it } from "@jest/globals";
 */

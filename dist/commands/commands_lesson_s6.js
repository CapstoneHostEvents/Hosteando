"use strict";
/*
Introdução
Nessa altura do aprendizado, com todas as tecnologias que já tivemos contato pode ficar um pouco confuso o processo de começar um projeto do zero.

Baseado nisso, essa atividade busca esclarecer os primeiros passos na criação de um novo projeto back-end usando as seguintes tecnologias:

NodeJS
TypeScript
Express
TypeORM
PostgreSQL
Demais bibliotecas:

TS Node Dev
reflect-metadata (requisito do TypeORM)
pg (requisito do TypeORM)
dotenv (variáveis de ambiente)
express-async-errors (tratar erros no express usando funções assíncronas nos controllers/services)
Mapeamento
Os passos serão bem resumidos, pois todos eles foram vistos com mais detalhes nas aulas até agora.

O que essa atividade vai cobrir como passos iniciais:

Inicializando o Gerenciador de Pacotes
Dependências de Desenvolvimento Básicas
Dependências Básicas
Inicializando as Configurações do TypeScript
Criando uma Estrutura de Pastas pelo Terminal
Configurando o tsconfig.json
.gitignore Básico
Scripts: Fluxo de Desenvolvimento e TypeORM CLI
Configuração Básica: Variáveis de Ambiente
Configuração Básica: DataSource (TypeORM)
Tratamento de Erros e o AppError
Middleware Básico para Tratamento de Erros
Roteamento Básico
app.ts Básico
Primeira Migration
Modelo Básico de Service
Modelo Básico de Controler
1. Inicializando o Gerenciador de Pacotes
          

    yarn init -y
          

      Copiar para àrea de transferência
2. Dependências de Desenvolvimento Básicas
        

    yarn add -D typescript ts-node-dev @types/express @types/node
        

       Copiar para àrea de transferência
3. Dependências Básicas
           

    yarn add express typeorm reflect-metadata pg dotenv express-async-errors
           
4. Inicializando as Configurações do TypeScript
           

    yarn tsc --init
           

       Copiar para àrea de transferência
5. Criando uma Estrutura de Pastas pelo Terminal
           

    mkdir {src,@types,@types/express} && touch .env .env.example .gitignore @types/express/index.d.ts
           

       Copiar para àrea de transferência
            

    mkdir src/{controllers,entities,errors,interfaces,middlewares,migrations,routes,services,utils} && touch src/app.ts src/data-source.ts src/routes/index.ts
            

        Copiar para àrea de transferência
Esse conjunto de comandos, criará uma estrutura de pasta para uma aplicação simples, sinta-se livre para modificá-los como quiser.


6. Configurando o tsconfig.json
            

    {
        "compilerOptions": {
            "target": "es2016",
        +   "experimentalDecorators": true,
        +   "emitDecoratorMetadata": true,
            "module": "commonjs",
        +   "typeRoots": ["./node_modules/@types", "@types"],
        +   "outDir": "./dist",
            "esModuleInterop": true,
            "forceConsistentCasingInFileNames": true,
            "strict": true,
        +   "strictPropertyInitialization": false,
            "skipLibCheck": true
        }
    }

    // + -> Configurações que não são padrão!
            

        Copiar para àrea de transferência
7. .gitignore Básico
            

    /node_modules
    /dist
    .env
            

        Copiar para àrea de transferência
8. Scripts: Fluxo de Desenvolvimento e TypeORM CLI
            

    // package.json

    ...
    "scripts": {
        "dev": "ts-node-dev src/app.ts",
        "typeorm": "typeorm-ts-node-commonjs"
    },
    ...
            

        Copiar para àrea de transferência
9. Configuração Básica: Variáveis de Ambiente
            

    // .env.example

    // credenciais básicas de conexão com o banco de dados

    POSTGRES_USER="seuUsuarioPostgres"
    POSTGRES_PWD="suaSenhaPostgres"
    POSTGRES_DB="suaDatabasePostgres"
            

        Copiar para àrea de transferência
Dica!
Agora é um bom momento para criar sua database e popular o arquivo .env com as suas credenciais.

10. Configuração Básica: DataSource (TypeORM)
            

    // src/data-source.ts

    import { DataSource } from "typeorm";
    require('dotenv').config()
    
    export const AppDataSource = new DataSource({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PWD,
        database: process.env.POSTGRES_DB,
        synchronize: false,
        logging: true,
        entities: ["src/entities/*.ts"],
        migrations: ["src/migrations/*.ts"],
    })
    
    AppDataSource.initialize()
        .then(() => {
            console.log("Data Source initialized")
        })
        .catch((err) => {
            console.error("Error during Data Source initialization", err)
        })
            

        Copiar para àrea de transferência
11. Tratamento de Erros e o AppError
            

    // src/errors/appError.ts

    export class AppError extends Error {

        statusCode
    
        constructor(statusCode: number, message: string) {
            super()
            this.statusCode = statusCode
            this.message = message
        }
    }
            

        Copiar para àrea de transferência
12. Middleware Básico para Tratamento de Erros
            

    // src/middlewares/error.middleware.ts

    import { Request, Response, NextFunction } from 'express'
    import { AppError } from '../errors/appError';

    export const errorMiddleware = (err: any, request: Request, response: Response, _: NextFunction) => {
        
        if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: "error",
            code: err.statusCode,
            message: err.message,
        });
        }
    
        console.error(err);
    
        return response.status(500).json({
        status: "error",
        code: 500,
        message: "Internal server error",
        });
    }
            

        Copiar para àrea de transferência
13. Roteamento Básico
            

    // src/routes/index.ts

    import { Express } from 'express'
    
    export const appRoutes = (app: Express) => {
    
    }
            

        Copiar para àrea de transferência
14. app.ts Básico
            

    // src/app.ts

    import express from 'express'
    import { appRoutes } from './routes'
    import { errorMiddleware } from './middlewares/error.middleware'
    import { Request, Response } from 'express'
    
    const app = express()
    
    app.use(express.json())
    
    appRoutes(app)
    
    app.get('/', (req: Request, res: Response) => {
        
        res.status(200).json({
            message: "Hello World"
        })
    })
    
    app.use(errorMiddleware)
    
    app.listen(3000)
            

        Copiar para àrea de transferência
15. Criação da Primeira Migration
A criação da primeira Migration estabelece o uso das Migrations no banco de dados. Não precisamos ter de fato um modelo de dados pronto para dar esse passo.

            

    yarn typeorm migration:create src/migrations/initialMigration
    
    yarn typeorm migration:run -d src/data-source.ts
            

        Copiar para àrea de transferência
16. Modelo Básico de Service
            

    export const myService = async () => {

    }
    
    export default myService
            

        Copiar para àrea de transferência
17. Modelo Básico de Controller
            

    import { Request, Response } from 'express'

    const myController = async (req: Request, res: Response) => {
    
    }
    
    export const myController
            

    */

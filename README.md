# Criação de API

## Agora que temos todos os usecases, precisamos disponibilizar os endpoints para que possamos realizar uma compra.

### Disponibilize os seguintes endpoints:

```rest
POST /products
POST /clients
POST /checkout/
GET /invoice/<id>
```

- A linguagem de programação para este desafio é TypeScript

Implemente os testes end-to-end destes endpoints com a lib supertest, ao rodar o comando "npm run test" a aplicação deve executar todos os testes. Se tiver dúvidas de como usar o supertest acesse o módulo de Clean Arch no módulo Camada de API.

### Observação sobre tabela products

> - Uma vez que usamos o Sequelize neste módulo, tanto a tabela de product de product-adm quando a de store-catalog receberam o mesmo nome em models. Com isto, ao desenvolver o desafio de API, você deve encontrar o erro de inserção de product, pois o ORM criará apenas uma das tabelas e, ao inserir valores de product na tabela, ocorrerá um erro por falta de um campo específico.
>   - Pra solucionar isto, siga as instruções na [branch migrations](https://github.com/devfullcycle/fc-monolito/tree/migrations) do repositório deste módulo.
> - Para os testes de integração, substitua o 'await sequelize.sync({ force = True})' pelo 'await migration.up()' como exemplificado [aqui](https://github.com/devfullcycle/fc-monolito/blob/386b5a5a4ea1d20a8ba1de56b9babcefab469759/src/test-migrations/product-migrations.spec.ts#L29-L39).

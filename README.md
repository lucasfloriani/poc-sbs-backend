# POC SBS Backend

Backend do projeto POC SBS

## Instalação do projeto

### Programas necessários

- Adonis CLI
- Git
- Node
- Postgres

### Como iniciar o projeto

1. Clone o repositório para a sua máquina
2. Rode **npm install** na linha de comando dentro da pasta do projeto
3. Crie um banco de dados para a aplicação
4. Crie um arquivo **.env** com os dados de conexão com o banco criado e dados do usuário admin com base no arquivo **.env.example**
5. Rode as migrations na linha de comando com **adonis migration:run**
6. Rode as Seeds na linha de comando na seguinte sequencia:

```ssh
adonis seed --files="StateCitySeeder.js"
adonis seed --files="FuelTypeSeeder.js"
adonis seed --files="PaymentTypeSeeder.js"
adonis seed --files="AdminSeeder.js"
```

7. Inicie o backend pela linha de comando com **adonis serve --dev**

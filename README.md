# Sistema para Gerenciamento de Rebanho de Ovelhas

| Aluno                           | Matrícula   |
| ------------------------------- | ----------- |
| Emerson Henrique Comar          | 2221101007  |
| Grégory Steffani dos Santos     | 1911100026  |
| Luís Fernando Cerutti Valentini | 20230001310 |

## Documentação
- A documentação do projeto pode ser visualizada no `requisitos_aplicacao/documentacao.pdf`


## Como rodar o projeto (Docker Compose)

1. **Pré-requisitos:**
   - Docker e Docker Compose instalados ([Guia Docker](https://docs.docker.com/get-started/get-docker/))

2. **Configuração:**
   - Crie ou edite os arquivos `.env` conforme os exemplos abaixo:

    <details>
    <summary>Exemplo: <code>docker/.env</code></summary>

    ```
    POSTGRES_USER=seu_usuario
    POSTGRES_PASSWORD=sua_senha
    POSTGRES_DB=seu_banco
    PGADMIN_DEFAULT_EMAIL=admin@admin.com
    PGADMIN_DEFAULT_PASSWORD=admin
    ```
    </details>

    <details>
    <summary>Exemplo: <code>backend/.env</code></summary>

    ```
   DB_HOST=localhost
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_NAME=seu_banco
   DB_PORT=5432
   BCRYPT_SALT_ROUNDS=12
   JWT_SECRET=secret
   JWT_EXPIRE_TIME=4h
    ```
    </details>

3. **Subindo o ambiente:**
   ```bash
   cd docker
   docker compose up --build -d
   ```

4. **Acessos:**
   - **Frontend:** http://localhost:5173
   - **Backend:** http://localhost:3001
   - **PgAdmin:** http://localhost:5050  
     Login: admin@admin.com / admin
   - **Banco Postgres:**
     - Host: localhost
     - Porta: 5432
     - Usuário, senha e banco: conforme `docker/.env`

5. **Parar tudo:**
   ```bash
   docker compose down
   ```

**Os dados do banco são persistidos em `docker/dados_postgres`.**
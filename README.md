# Sistema para Gerenciamento de Rebanho de Ovelhas

## Requisitos da Aplicação

A documentação completa contendo todos os requisitos da aplicação está em `requisitos_aplicacao/documentacao.pdf`

## Como executar o projeto com Docker

Este projeto utiliza Docker e Docker Compose para facilitar a execução de um banco de dados PostgreSQL junto com o PgAdmin para gerenciamento.

### ✅ Pré-requisitos

Certifique-se de ter o Docker e o Docker Compose instalados na sua máquina:

    Instalar Docker: https://docs.docker.com/get-started/get-docker/
    Instalar Docker Compose: https://docs.docker.com/compose/install/

**⚠️ Aviso:** comandos como `docker compose up` ou `docker compose down` devem ser rodados no mesmo local onde o arquivo docker-compose.yml esta localizado.

**⚠️ Aviso:** O comando `docker compose` pode variar o binario dependo da distribuição ele pode ser `docker-compose` ou `docker compose`, verifique a documentação do seu sistema operacional.

### 📦 Subindo os containers
Clone o repositório:

    git clone git@github.com:grgoryolive/trabalho_integrador.git
Execute o Docker Compose:

    cd trabalho_integrador #Pasta onde esta o clone do repositorio
    docker-compose up -d
Isso irá iniciar dois containers:

    PostgreSQL rodando na porta 5432 
    PgAdmin 4 acessível via navegador em http://localhost:5050

### 🔐 Acessando o PgAdmin
Acesse http://localhost:5050 e use as credenciais abaixo para login:

    Email: admin@admin.com
    Senha: admin

Conectando ao banco no PgAdmin:

    Após o login, para adicionar o servidor PostgreSQL: 
    Clique com o botão direito em Servers > Create > Server 
    Aba General: 
    Name: PostgreSQL (ou o nome que preferir) 
    Aba Connection: 
    Host name/address: db 
    Port: 5432 
    Username: meuusuario 
    Password: minhasenha 
    Clique em Save para conectar.

### 📁 Volume de dados
Os dados do PostgreSQL são persistidos localmente na pasta ./dados_postgres, garantindo que não sejam perdidos ao reiniciar os containers.

### 🛑 Parar os containers
Para parar os serviços:

    docker-compose down

# Sistema de Visualização de Dados Educacionais

Este projeto tem como objetivo a criação de um sistema web voltado à visualização e gerenciamento de dados educacionais, como boletins e cursos, com funcionalidades de autenticação, organização por usuários e painel administrativo.

##Funcionalidades

- Cadastro e login de usuários com autenticação via token JWT
- Sistema de middlewares para proteger rotas
- Cadastro e listagem de boletins escolares
- Gerenciamento de cursos
- Organização modular de controllers, models, routes e views
- Integração com banco de dados relacional
- Frontend com visualização dinâmica dos dados

##Estrutura de Pastas

- `controllers/` – Lógica das requisições e controle das regras de negócio  
- `models/` – Definição dos modelos e esquemas do banco de dados  
- `routes/` – Rotas da aplicação divididas por funcionalidade  
- `middlewares/` – Verificações como autenticação de token  
- `views/` – Páginas HTML/JS utilizadas no frontend  
- `database/` – Conexão e configurações do banco de dados  
- `utils/` – Funções auxiliares  
- `public/` – Arquivos públicos como CSS, imagens etc  
- `boletins/` e `courses/` – Dados de exemplo ou submódulos da aplicação

##Autenticação

O sistema utiliza JWT para proteger rotas sensíveis, como a de visualização de boletins. Apenas usuários autenticados conseguem acessar essas rotas por meio de middleware de verificação de token.

##Tecnologias Utilizadas

- Node.js
- Express
- JSON Web Token (JWT)
- Banco de dados relacional (Ex: PostgreSQL, MySQL ou SQLite)
- HTML/CSS e JavaScript no frontend

##Instalação

```bash```
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
npm install
npm start

##Objetivo do Projeto de Pesquisa
Este projeto foi desenvolvido como parte do Projeto Integrador na disciplina de Estrutura de Dados, com foco em aplicar conceitos de organização de dados, segurança de acesso e boas práticas de desenvolvimento web no contexto da educação.

🧑‍💻 Integrantes
Nome 1

Nome 2

Nome 3
(Adicione todos os integrantes do grupo)
Link pelo Vercel:
https://modelo-aqwc.vercel.app/

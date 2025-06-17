# 🎨 E-commerce Challenge - Frontend

Interface de usuário desenvolvida com **Next.js** e **TailwindCSS** para o Desafio Técnico da Waving Test.  Este projeto consome a API do backend para criar uma experiência de e-commerce completa e responsiva.

## 🛠️ Tecnologias Utilizadas

-   **Framework:** [Next.js](https://nextjs.org/) (App Router) 
-   **Gerenciamento de Estado de Servidor:** [TanStack Query (React Query)](https://tanstack.com/query/latest) 
-   **Estilização:** [TailwindCSS](https://tailwindcss.com/) 
-   **Biblioteca de Componentes:** [shadcn/ui](https://ui.shadcn.com/) 
-   **Formulários:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
-   **Chamadas de API:** [Axios](https://axios-http.com/)

---

## 🏁 Rodando o Projeto

### Pré-requisitos
-   [Node.js](https://nodejs.org/) (versão 18 ou superior)
-   [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
-   **O backend do projeto precisa estar rodando para que o frontend funcione.**

### Guia de Instalação

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_REPOSITORIO_FRONTEND>
    cd <PASTA_DO_PROJETO>
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie o seu .env de acordo com o de exemplo `.env.example`.

    - *assim que rodar o frontend, precisará criar produtos e orders para que eles apareçam corretamente.*
    - *Certifique-se de que a variável `NEXT_PUBLIC_API_URL` no arquivo `.env` aponta para a URL correta do seu backend (ex: `http://localhost:3000`).*
    - *Certifique-se de logar via postman, pegar o token e colocar na variável `NEXT_PUBLIC_ADMIN_TOKEN` no arquivo `.env` para que seja possível acessar rotas de admin (criar produtos, update, delete etc).*

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

✅ Pronto! A aplicação estará rodando em `http://localhost:4000`.

## 🧠 Decisões Técnicas

-   **Gerenciamento de Estado:** Optei por usar React Query para todo o estado de servidor, como recomendado pelo desafio, para aproveitar seu cache e lógica de refetching. O estado de cliente (como o estado de autenticação) foi gerenciado com React Context para uma solução leve e nativa.
-   **Formulários:** A combinação de React Hook Form com Zod (via `@hookform/resolvers`) foi escolhida para criar formulários robustos, com validação de schemas e performance otimizada.
-   **Componentes:** A escolha pelo `shadcn/ui` permitiu a criação de uma UI consistente e acessível de forma rápida, focando na lógica de negócio.
---

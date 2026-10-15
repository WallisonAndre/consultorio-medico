# 🩺 Consultório Médico — Web

Cliente web desenvolvido em **React** para consumir a API de agendamentos de um consultório médico, como parte da disciplina de **Programação Orientada a Serviços (POS)** do IFRN.

A aplicação funciona como um cliente independente da API, permitindo que pacientes e administradores realizem suas respectivas operações por meio de uma interface web.

---

## 📋 Sobre o projeto

O sistema tem como objetivo facilitar o gerenciamento de consultas médicas, oferecendo funcionalidades específicas para dois perfis de usuários:

- **👤 Paciente:** cria uma conta, agenda consultas, acompanha atendimentos, avalia consultas concluídas e edita seu perfil.
- **🛠️ Administrador:** gerencia a agenda, confirma ou cancela agendamentos, cadastra médicos, serviços e horários, além de acompanhar as avaliações.

O menu e as ações disponíveis são definidos pelas **permissões do usuário**, como `pode('api.confirmar_agendamento')`, e não apenas pelo nome do grupo ao qual ele pertence.

## 🚀 Tecnologias utilizadas

| Tecnologia | Descrição |
|---|---|
| [React 19](https://react.dev/) | Biblioteca para construção da interface |
| [Vite 8](https://vite.dev/) | Ferramenta de desenvolvimento e build |
| [React Router 7](https://reactrouter.com/) | Gerenciamento das rotas da aplicação |
| [HeroUI v3](https://www.heroui.com/) | Biblioteca de componentes de interface |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utilitários para estilização |
| [Bootstrap Icons](https://icons.getbootstrap.com/) | Biblioteca de ícones |
| [oxlint](https://oxc.rs/docs/guide/usage/linter.html) | Ferramenta de análise estática do código |

## 🧩 Biblioteca de componentes

A interface utiliza o **[HeroUI v3](https://www.heroui.com/)**, por meio do pacote `@heroui/react`. Os estilos são disponibilizados separadamente pelo pacote `@heroui/styles`.

Entre os componentes utilizados estão:

`Alert`, `Button`, `Card`, `Checkbox`, `Chip`, `Description`, `Dropdown`, `FieldError`, `Form`, `Input`, `InputGroup`, `Label`, `ListBox`, `Modal`, `Select`, `Spinner`, `Switch`, `Tabs`, `TextArea` e `TextField`.

O helper `buttonVariants`, disponibilizado por `@heroui/styles`, permite aplicar estilos de botão a componentes como o `<Link>`.

## ✨ Funcionalidades

### 🔐 Autenticação e conta

- Tela inicial, login e cadastro de usuários.
- Recuperação de senha.
- Renovação automática do token de acesso (*refresh token*) e logout.
- Edição do perfil, incluindo nome e foto.
- Alteração de senha.

### 👤 Área do paciente

- Página inicial com a próxima consulta e acesso rápido ao agendamento.
- Agendamento dividido em etapas:
  1. Escolha do serviço.
  2. Seleção do médico.
  3. Escolha do horário.
  4. Confirmação dos dados.
  5. Envio do agendamento.
- Listagem de consultas separadas em **Próximos** e **Histórico**, com opção de carregar mais resultados.
- Detalhes da consulta e ações disponíveis conforme as permissões.
- Listagem e visualização dos perfis dos médicos, incluindo serviços e avaliações.
- Avaliação de consultas concluídas com nota de 1 a 5 estrelas e comentário.

### 🛠️ Área do administrador

- Visualização da agenda do dia, com filtro por médico.
- Gerenciamento de agendamentos pendentes de confirmação, incluindo confirmação e cancelamento.
- Consulta e filtragem de avaliações por médico e nota.
- Gerenciamento dos dados do negócio, incluindo nome, descrição e logotipo.
- Cadastro e edição de médicos, ativação e configuração de horários de disponibilidade por dia da semana.
- Cadastro e edição de serviços, com imagem, duração, preço e opção de ativação.

## ⚙️ Instalação e execução

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado.
- npm, instalado junto com o Node.js.
- Acesso à API utilizada pela aplicação.

### 1. Clone o repositório

```bash
git clone https://github.com/devigMurilo/consultorio-medico.git
```

Entre na pasta do projeto:

```bash
cd consultorio-medico
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo de exemplo:

```bash
cp env.example .env
```

No Windows, também é possível copiar o arquivo manualmente pelo explorador de arquivos ou utilizar:

```powershell
Copy-Item env.example .env
```

Edite o arquivo `.env` com os endereços e identificadores necessários:

```env
VITE_API_URL=https://sua-api.com/api
VITE_ORGANIZACAO=consultorio-medico
```

> **Importante:** substitua o endereço de exemplo pela URL real da API utilizada no projeto.

O arquivo `.env` não deve ser enviado ao Git. Utilize o `env.example` como modelo de configuração.

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

### 5. Acesse a aplicação

Abra no navegador o endereço indicado pelo Vite, normalmente:

[http://localhost:5173](http://localhost:5173)

## ☁️ Publicação na Vercel

O projeto pode ser publicado utilizando a [Vercel](https://vercel.com/).

1. Importe o repositório do GitHub na Vercel.
2. Configure as variáveis de ambiente `VITE_API_URL` e `VITE_ORGANIZACAO` em **Environment Variables**.
3. Utilize `npm run build` como comando de build.
4. Configure `dist` como diretório de saída, caso não seja detectado automaticamente.
5. Realize o deploy.

**Atenção:** as variáveis `VITE_*` são incorporadas à aplicação durante o build. Portanto, alterações nesses valores exigem uma nova compilação e publicação.

O arquivo `vercel.json` configura o redirecionamento das rotas para `index.html`. Isso permite que caminhos como `/consultas/9` funcionem corretamente ao acessar ou atualizar uma página diretamente, mesmo utilizando o React Router.

## 📁 Organização do código

A estrutura principal do projeto está organizada da seguinte maneira:

```text
src/
├── api/
│   └── client.js          # Requisições à API, token e mensagens de erro
├── AuthContext.js         # Contexto do usuário e suas permissões
├── AuthProvider.jsx       # Login, logout e carregamento do usuário
├── hooks/
│   └── useApi.js          # Busca de dados e paginação
├── formatos.js            # Formatação de datas, horas e preços em pt-BR
├── heroui.css             # Tema do HeroUI e cores da marca
├── components/            # Componentes reutilizáveis da interface
└── pages/                 # Páginas da aplicação
    ├── agendar/           # Etapas do fluxo de agendamento (C2 a C6)
    └── admin/             # Telas administrativas (A1 a A10)
```

As telas seguem os identificadores definidos na especificação do projeto, como `E1`, `C1` e `A1`.

## 🎓 Inspiração e créditos

Este projeto foi desenvolvido a partir do repositório de exemplo **[dvcirilo-ifrn/pos-escola-de-musica-web](https://github.com/dvcirilo-ifrn/pos-escola-de-musica-web)**, utilizado na disciplina de Programação Orientada a Serviços (POS) do IFRN — Campus São Paulo do Potengi.

A aplicação foi adaptada do contexto de uma escola de música para o gerenciamento de um consultório médico.

---

**Projeto acadêmico — Programação Orientada a Serviços (POS).**

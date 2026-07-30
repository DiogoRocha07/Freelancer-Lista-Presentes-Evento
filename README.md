# 🎁 Site e Lista de Presentes para Evento

> Projeto freelancer desenvolvido para uma cliente real, com foco em experiência do usuário, responsividade e implementação de regras de negócio.

Aplicação web criada para um chá de casa nova, permitindo que os convidados consultem informações do evento, visualizem a lista de presentes, pesquisem produtos, acessem links de lojas e reservem um item.

O sistema também possui uma regra de negócio para impedir que o mesmo presente seja reservado por mais de uma pessoa.

## 🌐 Projeto publicado

A aplicação está disponível online:

[**Acessar projeto na Vercel**](https://freelancer-lista-presentes-evento.vercel.app/)

## 📌 Contexto do projeto

Este projeto foi desenvolvido como trabalho freelancer para atender uma necessidade real.

A cliente precisava de uma página centralizada para apresentar as informações do evento e oferecer aos convidados uma forma simples de consultar e reservar presentes.

A solução foi construída com Next.js e integrada ao Supabase para armazenar os produtos e registrar as reservas.

## ✨ Funcionalidades

### Evento

- Apresentação das informações do evento
- Data, horário e localização
- Link externo para o local
- Navegação responsiva entre as seções
- Opção de presente por Pix

### Lista de presentes

- Lista dinâmica carregada a partir do Supabase
- Exibição de nome, imagem e preço
- Busca por nome ou preço
- Ordenação alfabética
- Ordenação por menor ou maior preço
- Carregamento progressivo com a opção “Ver mais”
- Links para produtos em lojas externas
- Otimização de imagens com `next/image`

### Reserva de presentes

- Seleção de presente por modal
- Formulário com nome e telefone
- Persistência da reserva no Supabase
- Validação no servidor para impedir reservas duplicadas
- Indicação visual de presentes indisponíveis
- Feedback de sucesso e erro
- Atualização periódica da disponibilidade
- Atualização ao retornar para a janela do navegador

### Confirmação de presença

- Formulário para confirmação dos convidados
- Validação dos dados
- Integração com o Supabase
- Feedback após o envio

## 🛠️ Tecnologias utilizadas

### Front-end

- Next.js 15
- React 19
- TypeScript
- CSS Modules
- Pages Router
- `next/image`

### Backend e banco de dados

- Next.js API Routes
- Supabase
- PostgreSQL
- Row Level Security — RLS

### Infraestrutura e ferramentas

- Vercel
- Git
- GitHub

## 🧩 Arquitetura da aplicação

```text
Navegador
    │
    ▼
Aplicação Next.js
    │
    ├── Componentes React
    ├── Hooks personalizados
    ├── Pages Router
    ├── API Routes
    └── Cliente Supabase
             │
             ▼
      Banco de dados Supabase
```

A interface consulta os presentes armazenados no Supabase.

Durante uma reserva, a aplicação envia os dados para uma API Route do Next.js. A rota verifica no servidor se o presente ainda está disponível antes de registrar a escolha.

## 🎯 Principal desafio técnico

Um dos principais desafios foi impedir que duas pessoas reservassem o mesmo presente.

Para resolver esse problema, a API verifica se o identificador do presente já está associado a uma reserva antes de realizar uma nova inserção.

Caso o presente já tenha sido escolhido, a aplicação retorna uma mensagem de erro amigável e atualiza o item como indisponível na interface.

Essa abordagem evita que a regra dependa apenas do estado visual no navegador.

## 🔄 Sincronização da disponibilidade

A disponibilidade dos presentes é atualizada por meio de:

- Consulta periódica ao banco de dados
- Atualização ao retornar para a janela do navegador
- Comunicação entre diferentes partes da interface
- Atualização local após uma nova reserva

Isso permite que os convidados visualizem quais itens ainda estão disponíveis durante a navegação.

## 🔗 Integração com lojas externas

Os produtos podem possuir links para páginas externas de lojas.

Esses links são abertos em uma nova guia e utilizam:

```html
target="_blank"
rel="noopener noreferrer"
```

A interface também informa que o preço e a disponibilidade podem variar no site de origem.

## 📱 Responsividade

A aplicação foi desenvolvida com foco em dispositivos móveis, considerando que grande parte dos convidados acessaria o site pelo celular.

Foram implementados:

- Menu responsivo
- Cards adaptáveis
- Modal de reserva
- Formulários otimizados para dispositivos móveis
- Controles com área adequada para toque
- Tipografia responsiva
- Navegação simplificada

## 📁 Organização do projeto

```text
src/
├── hooks/
├── lib/
│   ├── eventBus.ts
│   └── supabase.ts
├── pages/
│   ├── api/
│   ├── confirmacao/
│   ├── header/
│   ├── hero/
│   ├── local/
│   ├── pix/
│   ├── presentes/
│   ├── _app.tsx
│   ├── _document.tsx
│   └── index.tsx
├── styles/
└── types/
```

A estrutura separa páginas, integração com serviços externos, hooks, tipos e estilos.

## 🚀 Como executar localmente

### Pré-requisitos

- Node.js
- npm
- Projeto configurado no Supabase

### 1. Clone o repositório

```bash
git clone https://github.com/DiogoRocha07/Freelancer-Lista-Presentes-Evento.git
cd Freelancer-Lista-Presentes-Evento
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Utilize a URL e a chave pública do seu projeto no Supabase.

Nunca utilize uma `secret key` ou `service_role` em uma variável iniciada por `NEXT_PUBLIC_`.

### 4. Execute a aplicação

```bash
npm run dev
```

Acesse:

```text
http://localhost:3000
```

### 5. Gere o build de produção

```bash
npm run build
npm start
```

## 🔐 Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL pública do projeto no Supabase |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Chave pública usada pela aplicação |

O arquivo `.env.local` não deve ser enviado ao GitHub.

Para documentar as variáveis necessárias, o projeto pode possuir um `.env.example` sem valores reais.

## 📚 Aprendizados

Durante o desenvolvimento e a manutenção deste projeto, pratiquei:

- Desenvolvimento de uma solução para uma cliente real
- Levantamento e implementação de requisitos
- Criação de interfaces responsivas
- Integração entre Next.js e Supabase
- Criação de API Routes
- Implementação de regras de negócio no servidor
- Modelagem de dados relacionais
- Tratamento de estados de carregamento e erro
- Organização de componentes e hooks
- Tipagem com TypeScript
- Configuração de variáveis de ambiente
- Atualização de dependências
- Deploy de uma aplicação Next.js na Vercel

## 📌 Status do projeto

✅ Desenvolvimento concluído  
✅ Utilizado no evento da cliente  
✅ Banco de dados recuperado  
✅ Dependências atualizadas  
✅ Aplicação publicada novamente na Vercel  

O projeto está atualmente disponível como aplicação funcional e como registro de portfólio.

Melhorias futuras:

- Testes automatizados com Jest e React Testing Library
- Testes das API Routes
- Ampliação da validação dos formulários
- Ambiente de demonstração separado dos dados originais
- Integração contínua com GitHub Actions

## 👨‍💻 Autor

Desenvolvido por **Diogo Rocha** como projeto freelancer.

- [GitHub](https://github.com/DiogoRocha07)
- [LinkedIn](https://www.linkedin.com/in/diogo-rocha07/)

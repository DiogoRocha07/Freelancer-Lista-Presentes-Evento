# 🎁 Site e Lista de Presentes para Evento

> Projeto freelancer desenvolvido para uma cliente real, com foco em experiência do usuário, responsividade e implementação de regras de negócio.

Aplicação web criada para um chá de casa nova, permitindo que os convidados visualizassem uma lista de presentes, pesquisassem produtos, consultassem os links das lojas e reservassem um item.

O sistema foi desenvolvido para evitar que o mesmo presente fosse escolhido por mais de uma pessoa, mantendo a disponibilidade dos produtos atualizada durante a navegação.

## ✨ Funcionalidades

- Lista de presentes carregada a partir do Supabase
- Busca de produtos por nome ou preço
- Ordenação alfabética e por valor
- Carregamento progressivo de itens com a opção “Ver mais”
- Visualização de nome, imagem e preço dos presentes
- Links para compra em lojas externas
- Formulário de reserva com nome e telefone
- Validação no servidor para impedir reservas duplicadas
- Indicação visual de presentes já escolhidos
- Sincronização periódica da disponibilidade dos itens
- Atualização da lista ao retornar para a página
- Estados de carregamento, erro e indisponibilidade
- Formulário de confirmação de presença
- Interface responsiva para dispositivos móveis
- Otimização de imagens com `next/image`

## 🛠️ Tecnologias utilizadas

### Front-end

- Next.js 15
- React 19
- TypeScript
- CSS Modules

### Backend e dados

- Next.js API Routes
- Supabase
- Banco de dados relacional

### Ferramentas

- Git
- GitHub
- Vercel

## 🧩 Arquitetura da aplicação

```text
Navegador
    │
    ▼
Aplicação Next.js
    │
    ├── Componentes React
    ├── Hooks personalizados
    ├── API Routes
    └── Cliente Supabase
           │
           ▼
    Banco de dados Supabase
```

A interface consome os dados dos presentes armazenados no Supabase. As reservas são enviadas para uma API Route do Next.js, responsável por validar a disponibilidade do item antes de registrar a escolha.

## 🎯 Regra de negócio principal

Um dos principais desafios do projeto foi impedir que duas pessoas reservassem o mesmo presente.

Para isso, a API verifica no servidor se o identificador do presente já está associado a uma reserva antes de realizar uma nova inserção no banco de dados.

Quando o item já foi escolhido, a aplicação retorna uma mensagem amigável para o usuário e atualiza o estado visual do presente para indisponível.

Essa validação no servidor evita que a regra dependa apenas da interface do navegador.

## 🔄 Atualização da disponibilidade

A aplicação mantém a lista de presentes atualizada por meio de:

- Consulta periódica ao banco de dados
- Atualização ao retornar para a janela do navegador
- Comunicação entre diferentes partes da interface
- Atualização visual dos itens reservados

Dessa forma, os convidados conseguiam identificar quais presentes ainda estavam disponíveis.

## 🔗 Integração com lojas externas

Cada presente podia conter um link para uma loja externa, permitindo que o convidado acessasse diretamente a página do produto.

Os links eram abertos em uma nova guia e utilizavam atributos de segurança como:

```html
target="_blank"
rel="noopener noreferrer"
```

A interface também informava que preço e disponibilidade poderiam variar no site da loja.

## 📱 Responsividade

A aplicação foi desenvolvida com foco em dispositivos móveis, considerando que a maior parte dos convidados acessaria o site pelo celular.

A interface foi adaptada para diferentes tamanhos de tela, incluindo:

- Cards responsivos
- Formulários adaptados para dispositivos móveis
- Modal de reserva
- Busca e ordenação
- Navegação simplificada

## 📁 Organização do projeto

```text
src/
├── app/
│   ├── api/
│   ├── confirmar-presenca/
│   └── presentes/
├── components/
├── hooks/
├── lib/
├── types/
└── styles/
```

A estrutura separa componentes, hooks, tipos, integração com serviços externos e regras relacionadas às rotas da aplicação.

## 📚 Aprendizados

Durante o desenvolvimento deste projeto, pratiquei:

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
- Publicação de uma aplicação Next.js

## ⚠️ Status do projeto

O desenvolvimento foi concluído e a aplicação foi utilizada no evento da cliente.

Atualmente, o projeto está disponível apenas como código-fonte e registro de portfólio. O ambiente publicado foi desativado após a interrupção da instância utilizada no Supabase e a perda dos dados armazenados.

## 👨‍💻 Autor

Desenvolvido por **Diogo Rocha** como projeto freelancer.

[LinkedIn](https://www.linkedin.com/in/diogo-rocha07/)

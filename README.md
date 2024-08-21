# Ecommerce Mentoria 2

Este repositório contém um workspace Angular Nx com duas aplicações. Nx é um sistema de build inteligente, rápido e extensível que ajuda você a escalar e desenvolver monorepos de maneira eficaz.

## Sumário

- [Primeiros Passos](#primeiros-passos)
- [Aplicações](#aplicações)
  - [Ecommerce Mentoria 2](#ecommerce-mentoria-2)
  - [Ecommerce Admin](#ecommerce-admin)
- [Desenvolvimento](#desenvolvimento)
  - [Executando as aplicações](#executando-as-aplicações)
  - [Buildando as aplicações](#buildando-as-aplicações)
  - [Testes](#testes)

## Primeiros Passos

Para começar a trabalhar com o repositório, você precisará das seguintes ferramentas instaladas na sua máquina:

- [Node.js](https://nodejs.org/) (versão 20 ou superior)

### Clonando o Repositório

```bash
git clone https://github.com/jpsthome/ecommerce-mentoria-2.git
cd ecommerce-mentoria-2
```

### Instalando Dependências

```bash
npm install
```

## Aplicações

### Ecommerce Mentoria 2

- **Path**: `apps/ecommerce-mentoria-2`
- **Descrição**: Ecommerce Mentoria 2 é a aplicação padrão, projetada para fornecer a loja virtual para o cliente.
- [Acesse aqui](https://ecommerce-mentoria-2-beta.vercel.app/home)

### Ecommerce Admin

- **Path**: `apps/ecommerce-admin`
- **Descrição**: Ecommerce Admin é a aplicação onde é possível gerenciar os usuários da plataforma.
- [Acesse aqui](https://ecommerce-admin-one-xi.vercel.app/home)

## Desenvolvimento

### Executando as aplicações

Para executar as aplicações localmente:

```bash
npm run start
```

Esse comando irá executar as duas aplicações simultaneamente.

### Buildando as aplicações

Para buildar as aplicações para produção:

```bash
npm run build
```

### Testes

Para executar os testes dos arquivos alterados da aplicação:

```bash
npx nx affected:test
```

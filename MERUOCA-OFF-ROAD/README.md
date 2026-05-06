# Meruoca Off-Road 2026

Plataforma oficial de inscrições e gestão do 1º Trilhão Meruoca Off-Road.

## 🚀 Tecnologias
- **Frontend**: React 19 + Vite
- **Estilização**: Tailwind CSS + Shadcn UI
- **Backend**: Firebase (Firestore, Authentication, Hosting)
- **Estado**: Zustand + React Query

## 📦 Instalação e Execução
1. Clone o repositório
2. Instale as dependências: `npm install`
3. Configure as variáveis de ambiente:
   - Copie o arquivo `.env.example` para `.env`
   - Preencha com as credenciais do Firebase
4. Execute em desenvolvimento: `npm run dev`
5. Gere o build: `npm run build`

## 🚀 Deploy no Firebase
Para realizar o deploy no Firebase Hosting:
1. Certifique-se de estar logado: `npx firebase login`
2. Gere o build: `npm run build`
3. Execute o deploy: `npm run deploy` (ou `npx firebase deploy`)

## 🛠️ Estrutura do Projeto
- `src/components`: Componentes reutilizáveis da interface
- `src/pages`: Páginas principais da aplicação
- `src/lib/firebase.ts`: Configuração e inicialização do Firebase
- `src/store`: Gerenciamento de estado com Zustand

---
Desenvolvido para garantir performance e segurança no gerenciamento de inscrições.

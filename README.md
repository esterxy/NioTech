# ⚡ Niō Tech — Desenvolvimento de Software & Automação

<div align="center">
  <img src="public/logo/niotech-logo.svg" alt="Niō Tech Logo" width="320" />
  <p><em>Simplificamos a rotina de negócios, reduzindo custos e escalando resultados através de tecnologia de alto desempenho.</em></p>
</div>

---

## 🚀 Sobre a Niō Tech

A **Niō Tech** é uma consultoria e software house focada em construir o motor tecnológico por trás da eficiência operacional das empresas. Criamos soluções de software sob medida, automações inteligentes de rotinas e integração de sistemas complexos com o objetivo claro de eliminar tarefas repetitivas, reduzir custos operacionais e maximizar faturamento.

### Nossos Pilares de Soluções:
*   **💻 Softwares Sob Medida**: Aplicações web completas, APIs seguras e painéis de controle robustos desenhados especificamente para a operação do cliente.
*   **⚡ Sites de Alta Performance**: Landing Pages e sites institucionais otimizados para SEO e velocidade de carregamento em dispositivos móveis.
*   **🤖 Automação de Processos (RPA)**: Robôs e scripts de integração automatizada para eliminar planilhas manuais e digitações redundantes.
*   **🔗 Integração de Sistemas**: Conexões de APIs (CRM, ERPs, Gateways de Pagamento, WhatsApp Business) para unificar e fluir as informações corporativas.
*   **📊 Dashboards & BI**: Relatórios interativos em tempo real para centralizar dados contábeis, operacionais e financeiros.

---

## 🛠️ Stack Tecnológica

O projeto foi construído utilizando as ferramentas de desenvolvimento web mais modernas e de alto desempenho do ecossistema:

*   **Framework Principal**: [Angular v21](https://angular.dev/) (Standalone Components, Signals e SSR - Server-Side Rendering)
*   **Linguagem**: [TypeScript](https://www.typescript.org/)
*   **Estilização**: [Sass (SCSS)](https://sass-lang.com/) com Arquitetura de Design System (Variáveis CSS customizadas para suporte nativo a temas Claro/Escuro)
*   **Servidor Backend / SSR**: [Express](https://expressjs.com/) integrado ao Angular SSR para máxima performance de SEO e primeiro carregamento rápido
*   **Testes Unitários**: [Vitest](https://vitest.dev/) (Rápido e compatível com ferramentas modernas)
*   **Formatador**: [Prettier](https://prettier.io/)

---

## 📂 Estrutura do Projeto

```
nio-tech/
├── public/                 # Recursos estáticos servidos na raiz (logos, favicon, etc.)
│   └── logo/               # Identidade visual da marca (SVGs responsivos com suporte a temas)
├── src/
│   ├── app/
│   │   ├── core/           # Serviços de singleton, modelos e lógica central (ex: Meta.service)
│   │   ├── pages/          # Páginas e seções principais (Home, Projetos)
│   │   ├── shared/         # Componentes reutilizáveis (botões, navbar, footer, diretivas)
│   │   ├── app.config.ts   # Configurações globais do Angular
│   │   ├── app.routes.ts   # Roteamento da aplicação
│   │   └── app.ts          # Componente raiz da aplicação
│   ├── styles/             # Design System (variáveis, mixins, resets e estilos globais)
│   ├── main.ts             # Arquivo de entrada client-side
│   └── server.ts           # Arquivo de entrada server-side (SSR / Express)
```

---

## 💻 Como Executar o Projeto Localmente

### Pré-requisitos
Certifique-se de possuir o [Node.js](https://nodejs.org/) instalado na versão recomendada (v20+).

### 1. Clonar o repositório
```bash
git clone https://github.com/esterxy/NioTech.git
cd NioTech
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Executar o servidor de desenvolvimento
```bash
npm run start
# ou
npx ng serve
```
Acesse [http://localhost:4200](http://localhost:4200) no seu navegador. O servidor possui recarga rápida automática (Hot Reload) ao salvar alterações de arquivos.

### 4. Executar Testes Unitários
Os testes unitários são executados utilizando o Vitest:
```bash
npm run test
# ou
npx ng test
```

### 5. Compilar para Produção (Build)
Para gerar o pacote de produção otimizado com SSR:
```bash
npm run build
```
Os arquivos finais de compilação serão gerados dentro do diretório `dist/`.

Para testar o servidor SSR compilado localmente em produção:
```bash
npm run serve:ssr:niotech
```

---

## 🎨 Temas (Modo Escuro / Modo Claro)

A aplicação conta com um design moderno e suporte nativo a temas utilizando variáveis CSS dinâmicas injetadas na raiz do documento (`<html>` via `data-theme`). A lógica e os logos vetoriais (SVG) se alternam dinamicamente por meio de Angular Signals para garantir uma transição suave e consistência visual premium em qualquer resolução.

---

## 👥 Contribuição & Desenvolvimento

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça o commit de suas alterações (`git commit -m 'feat: Adiciona nova funcionalidade'`)
4. Envie a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

<div align="center">
  <p><strong>Niō Tech — Clean Code, Scalable Systems.</strong></p>
</div>

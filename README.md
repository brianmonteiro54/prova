# AWS DEA-C01 Simulados de Certificação

Aplicação React/Vite com **260 questões** bilíngues (Inglês/Português) para preparação do exame **AWS Certified Data Engineer — Associate (DEA-C01)**.

## ✨ Features

- **4 simulados completos** (65 questões cada)
- **Bilíngue**: cada questão em Inglês e Português
- **Explicações detalhadas** para cada uma das 4 alternativas (CORRETO/ERRADO)
- **Tela inicial** com seleção de simulado e indicação de domínios
- **Quiz interativo** com feedback imediato
- **Tela de resultados** com pontuação 0-1000 e desempenho por domínio
- **Tema escuro profissional** com paleta AWS

## 🎯 Conteúdo dos Simulados

| Simulado | Foco | Nível |
|----------|------|-------|
| **Simulado 1** | Fundamentos & Conceitos Core | Iniciante → Intermediário |
| **Simulado 2** | Cenários Reais de Prova | Intermediário |
| **Simulado 3** | Casos Avançados (Redshift, Glue, Kinesis) | Intermediário → Avançado |
| **Simulado 4** | Tópicos Avançados (Iceberg, Lake Formation, GDPR) | Avançado |

## 📊 Domínios Cobertos

- **Domínio 1**: Data Ingestion & Transformation (~34%)
- **Domínio 2**: Data Store Management (~26%)
- **Domínio 3**: Data Operations & Support (~22%)
- **Domínio 4**: Data Security & Governance (~18%)

## 🚀 Como Rodar

```bash
npm install
npm run dev
```

Acesse http://localhost:5173

## 📦 Build de Produção

```bash
npm run build
npm run preview
```

## 🎓 Critério de Aprovação

- **Pontuação mínima**: 720/1000 (~72%)
- **Tempo da prova real**: 130 minutos
- **65 questões** por simulado

## 📁 Estrutura do Projeto

```
src/
  ├── App.jsx           # Componente principal (Home, Quiz, Results)
  ├── main.jsx          # Entry point React
  ├── index.css         # Estilos globais e variáveis CSS
  └── data/
      ├── simulado1.js  # 65 questões (originais)
      ├── simulado2.js  # 65 questões
      ├── simulado3.js  # 65 questões
      └── simulado4.js  # 65 questões
```

---

**Boa sorte na sua certificação! ☁️**

# Notification App

Interface web para publicação e monitoramento de mensagens em filas e exchanges do RabbitMQ. Desenvolvida em Angular 20 com design minimalista e responsivo.

<img width="1917" height="871" alt="image" src="https://github.com/user-attachments/assets/7e979e4e-81ae-42c1-bb87-74820abe97df" />

---

## Funcionalidades

- **Publicar mensagens** via Exchange (com routing key) ou Queue diretamente
- **Suporte a wildcards** na routing key (`*` para uma palavra, `#` para zero ou mais)
- **Seleção de Content Type**: `application/json`, `text/plain`, `application/xml`
- **Listagem de mensagens recentes** recebidas pelo backend
- **Monitoramento de saúde** do serviço em tempo real (status no header)
- **Cópia rápida** do ID da mensagem publicada e do conteúdo de mensagens recebidas

---

## Tecnologias

| Tecnologia | Versão |
|---|---|
| Angular | 20.x |
| TypeScript | 5.9.x |
| Bootstrap | 5.3.2 |
| Font Awesome | 6.5.1 |
| RxJS | 7.8.x |

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- [Angular CLI](https://angular.io/cli) 20+

---

## Instalação e execução

```bash
# Clonar o repositório
git clone https://github.com/CesarAVB/notification-app.git
cd notification-app

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm start
```

A aplicação estará disponível em `http://localhost:4200`.

---

## Build para produção

```bash
npm run build
```

Os arquivos gerados estarão na pasta `dist/notification-app`.

---

## Configuração da API

A URL do backend é definida nos arquivos de ambiente:

| Arquivo | Uso |
|---|---|
| `src/environments/environment.ts` | Desenvolvimento |
| `src/environments/environment.prod.ts` | Produção |

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080'
};
```

### Endpoints esperados pelo frontend

| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/notifications/publish` | Publica uma mensagem |
| `GET` | `/notifications/recent` | Retorna mensagens recentes |
| `GET` | `/notifications/health` | Verifica saúde do serviço |

---

## Estrutura do projeto

```
src/
├── app/
│   ├── components/
│   │   ├── header/          # Header com status do serviço
│   │   ├── footer/          # Footer com links
│   │   ├── publish-form/    # Formulário de publicação
│   │   └── message-list/    # Lista de mensagens recentes
│   ├── models/
│   │   └── notification.model.ts   # Interfaces TypeScript
│   ├── services/
│   │   └── notification.ts         # Serviço HTTP
│   └── environments/
│       ├── environment.ts
│       └── environment.prod.ts
├── styles.css               # Design system global (CSS custom properties)
└── index.html
```

---

## Autor

**César Augusto Vieira Bezerra**

- GitHub: [github.com/CesarAVB](https://github.com/CesarAVB/)
- Portfólio: [portfolio.cesaraugusto.dev.br](https://portfolio.cesaraugusto.dev.br/)

---

© 2026 César Augusto Vieira Bezerra - Todos os direitos reservados.

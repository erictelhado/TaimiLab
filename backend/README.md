# TaimiLab Backend API

API REST para sistema de autenticação e gerenciamento de usuários construída com FastAPI e PostgreSQL.

## 🚀 Tecnologias

- **FastAPI** - Framework web moderno e rápido
- **PostgreSQL** - Banco de dados relacional
- **SQLAlchemy** - ORM para Python
- **JWT** - Autenticação com tokens
- **Pydantic** - Validação de dados
- **Uvicorn** - Servidor ASGI

## 📁 Estrutura do Projeto

```
backend/
├── app/
│   ├── config.py          # Configurações da aplicação
│   ├── main.py            # Aplicação principal FastAPI
│   ├── schemas.py         # Schemas Pydantic
│   └── utils/
│       └── auth.py        # Utilitários de autenticação
├── database/
│   └── connection.py      # Configuração do banco
├── models/
│   └── user.py           # Modelo de usuário
├── routers/
│   ├── auth.py           # Rotas de autenticação
│   ├── users.py          # Rotas de usuários
│   └── health.py         # Health check
├── services/
│   └── user_service.py   # Lógica de negócio de usuários
├── requirements.txt      # Dependências Python
├── Dockerfile           # Container do backend
└── init_db.py          # Script de inicialização
```

## 🔧 Configuração

### Variáveis de Ambiente

Copie `.env.example` para `.env` e configure:

```bash
# Database
DATABASE_URL=postgresql://taimilab:taimilab123@localhost:5432/taimilab_db
POSTGRES_USER=taimilab
POSTGRES_PASSWORD=taimilab123
POSTGRES_DB=taimilab_db

# JWT
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### Instalação

```bash
# Instalar dependências
pip install -r requirements.txt

# Executar aplicação
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## 📚 Endpoints da API

### Autenticação

- `POST /auth/login` - Fazer login
- `POST /auth/logout` - Fazer logout
- `GET /auth/me` - Obter usuário atual
- `POST /auth/refresh` - Renovar token

### Usuários

- `POST /users/` - Criar usuário
- `GET /users/me` - Obter perfil atual
- `PUT /users/me` - Atualizar perfil
- `DELETE /users/me` - Desativar conta
- `GET /users/` - Listar usuários

### Health Check

- `GET /health/` - Status da API
- `GET /health/ready` - Verificação de prontidão

## 🗄️ Banco de Dados

### Inicialização

```bash
# Executar script de inicialização
python init_db.py
```

### Usuários de Exemplo

- **Demo User:** `demo@endereco.de` / `Endereco123`
- **Admin User:** `admin@taimilab.com` / `Admin123`

## 🐳 Docker

```bash
# Executar com Docker Compose
docker-compose up backend postgres

# Apenas o backend
docker build -t taimilab-backend .
docker run -p 8000:8000 taimilab-backend
```

## 📖 Documentação

Acesse a documentação interativa da API:

- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

## 🔒 Segurança

- Senhas hasheadas com bcrypt
- Tokens JWT com expiração configurável
- CORS configurado para frontend
- Validação de dados com Pydantic
- Rate limiting implementado no frontend

## 🧪 Testes

```bash
# Executar testes (quando implementados)
pytest

# Com coverage
pytest --cov=app
```

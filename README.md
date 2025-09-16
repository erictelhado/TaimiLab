# TaimiLab

## Executando com Docker Compose

### Pré-requisitos
- Docker
- Docker Compose

### Como executar

1. **Clone o repositório** (se ainda não tiver feito):
```bash
git clone <url-do-repositorio>
cd TaimiLab
```

2. **Configure as variáveis de ambiente** (opcional):
```bash
cp .env.example .env
# Edite o arquivo .env conforme necessário
```

3. **Execute o projeto**:
```bash
# Para desenvolvimento
docker-compose up

# Para executar em background
docker-compose up -d

# Para parar os serviços
docker-compose down
```

4. **Acesse a aplicação**:
- Frontend: http://localhost:5173

### Comandos úteis

```bash
# Reconstruir as imagens
docker-compose build

# Ver logs
docker-compose logs -f

# Executar comandos no container
docker-compose exec frontend npm run build

# Limpar volumes e imagens
docker-compose down -v
docker system prune -a
```

### Estrutura do projeto
```
TaimiLab/
├── frontend/           # Aplicação React/Vite
│   ├── Dockerfile
│   ├── .dockerignore
│   └── ...
├── docker-compose.yml  # Configuração do Docker Compose
├── .env.example       # Exemplo de variáveis de ambiente
└── README.md
```
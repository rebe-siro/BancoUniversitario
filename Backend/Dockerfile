# ========== ETAPA DE CONSTRUCCIÓN ==========
FROM golang:1.21-alpine AS builder

WORKDIR /app

# 1. Copia los archivos de módulos
COPY go.mod go.sum ./

# 2. Descarga dependencias
RUN go mod download

# 3. Copia todo el código fuente
COPY . .

# 4. Compila la aplicación (ajusta el nombre del binario)
RUN CGO_ENABLED=0 GOOS=linux go build -o /bin/banco-universitario ./cmd/main.go

# ========== ETAPA DE PRODUCCIÓN ==========
FROM alpine:latest

WORKDIR /app

# 1. Copia el binario compilado
COPY --from=builder /bin/banco-universitario .

# 2. Variables de entorno (se sobrescriben con docker-compose)
ENV DB_HOST=db \
    DB_PORT=5432 \
    DB_USER=postgres \
    DB_PASSWORD=tu_password \
    DB_NAME=banco_db


EXPOSE 3000

# 4. Comando de inicio
CMD ["./banco-universitario"]
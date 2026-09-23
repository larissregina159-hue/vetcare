CREATE TABLE "clientes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "endereco" TEXT,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "animais" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "raca" TEXT,
    "sexo" TEXT NOT NULL,
    "dataNascimento" DATETIME,
    "peso" REAL,
    "cor" TEXT,
    "observacoes" TEXT,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "animais_clienteId_fkey"
        FOREIGN KEY ("clienteId")
        REFERENCES "clientes" ("id")
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE "veterinarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "crmv" TEXT NOT NULL,
    "especialidade" TEXT,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "consultas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "animalId" INTEGER NOT NULL,
    "veterinarioId" INTEGER NOT NULL,
    "dataConsulta" DATETIME NOT NULL,
    "motivo" TEXT NOT NULL,
    "diagnostico" TEXT,
    "observacoes" TEXT,
    "valorConsulta" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Agendada',
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "consultas_animalId_fkey"
        FOREIGN KEY ("animalId")
        REFERENCES "animais" ("id")
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT "consultas_veterinarioId_fkey"
        FOREIGN KEY ("veterinarioId")
        REFERENCES "veterinarios" ("id")
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE "vacinas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "valor" REAL NOT NULL
);

CREATE TABLE "vacinas_animais" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "animalId" INTEGER NOT NULL,
    "vacinaId" INTEGER NOT NULL,
    "veterinarioId" INTEGER,
    "dataAplicacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataProximaDose" DATETIME,
    "observacoes" TEXT,

    CONSTRAINT "vacinas_animais_animalId_fkey"
        FOREIGN KEY ("animalId")
        REFERENCES "animais" ("id")
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT "vacinas_animais_vacinaId_fkey"
        FOREIGN KEY ("vacinaId")
        REFERENCES "vacinas" ("id")
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT "vacinas_animais_veterinarioId_fkey"
        FOREIGN KEY ("veterinarioId")
        REFERENCES "veterinarios" ("id")
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE "medicamentos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "estoque" INTEGER NOT NULL DEFAULT 0,
    "valor" REAL NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "prescricoes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "consultaId" INTEGER NOT NULL,
    "medicamentoId" INTEGER NOT NULL,
    "dosagem" TEXT NOT NULL,
    "frequencia" TEXT NOT NULL,
    "duracao" TEXT NOT NULL,
    "observacoes" TEXT,

    CONSTRAINT "prescricoes_consultaId_fkey"
        FOREIGN KEY ("consultaId")
        REFERENCES "consultas" ("id")
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT "prescricoes_medicamentoId_fkey"
        FOREIGN KEY ("medicamentoId")
        REFERENCES "medicamentos" ("id")
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE "procedimentos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "valor" REAL NOT NULL
);

CREATE TABLE "procedimentos_animais" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "animalId" INTEGER NOT NULL,
    "veterinarioId" INTEGER NOT NULL,
    "procedimentoId" INTEGER NOT NULL,
    "dataProcedimento" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "observacoes" TEXT,
    "valor" REAL NOT NULL,

    CONSTRAINT "procedimentos_animais_animalId_fkey"
        FOREIGN KEY ("animalId")
        REFERENCES "animais" ("id")
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT "procedimentos_animais_veterinarioId_fkey"
        FOREIGN KEY ("veterinarioId")
        REFERENCES "veterinarios" ("id")
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT "procedimentos_animais_procedimentoId_fkey"
        FOREIGN KEY ("procedimentoId")
        REFERENCES "procedimentos" ("id")
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE "pagamentos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "consultaId" INTEGER,
    "valor" REAL NOT NULL,
    "formaPagamento" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pendente',
    "dataPagamento" DATETIME,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pagamentos_clienteId_fkey"
        FOREIGN KEY ("clienteId")
        REFERENCES "clientes" ("id")
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT "pagamentos_consultaId_fkey"
        FOREIGN KEY ("consultaId")
        REFERENCES "consultas" ("id")
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "clientes_cpf_key"
ON "clientes"("cpf");

CREATE UNIQUE INDEX "clientes_email_key"
ON "clientes"("email");

CREATE UNIQUE INDEX "veterinarios_crmv_key"
ON "veterinarios"("crmv");

CREATE UNIQUE INDEX "veterinarios_email_key"
ON "veterinarios"("email");

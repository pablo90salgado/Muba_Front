-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "HabitacionTipo" AS ENUM ('Individual', 'Doble', 'Triple', 'Compartida');

-- CreateEnum
CREATE TYPE "HabitacionEstado" AS ENUM ('Activa', 'EnMantenimiento', 'FueraDeServicio');

-- CreateEnum
CREATE TYPE "CamaEstado" AS ENUM ('Disponible', 'Ocupada', 'EnLimpieza', 'EnMantenimiento', 'Reservada');

-- CreateEnum
CREATE TYPE "ResidenteSexo" AS ENUM ('Masculino', 'Femenino', 'Otro');

-- CreateEnum
CREATE TYPE "ResidenteEstado" AS ENUM ('Activo', 'AusenciaTemporal', 'Egresado', 'Fallecido');

-- CreateEnum
CREATE TYPE "ResponsablePagoIva" AS ENUM ('RespInscripto', 'Monotributista', 'ConsFinal', 'Exento');

-- CreateEnum
CREATE TYPE "FinanciadorTipo" AS ENUM ('OSNacional', 'OSProvincial', 'Prepaga', 'Sindical');

-- CreateEnum
CREATE TYPE "PlanEstado" AS ENUM ('Vigente', 'Suspendido', 'DadoDeBaja');

-- CreateEnum
CREATE TYPE "ConvenioModalidad" AS ENUM ('ModuloFijo', 'DiaCama', 'Prestacion', 'Capitado');

-- CreateEnum
CREATE TYPE "DocumentoTipo" AS ENUM ('DNI', 'CarnetOS', 'Autorizacion', 'PoderLegal', 'Otro');

-- CreateEnum
CREATE TYPE "AuditoriaAccion" AS ENUM ('CREATE', 'READ', 'UPDATE', 'DELETE');

-- CreateEnum
CREATE TYPE "InstitucionTipo" AS ENUM ('GERIATRICO', 'CLINICA', 'OTRO');

-- CreateEnum
CREATE TYPE "PlanSaas" AS ENUM ('BASICO', 'ESTANDAR', 'PREMIUM');

-- CreateTable
CREATE TABLE "institucion" (
    "id" TEXT NOT NULL,
    "nombre" VARCHAR(150) NOT NULL,
    "cuit" VARCHAR(13) NOT NULL,
    "tipo" "InstitucionTipo" NOT NULL,
    "direccion" VARCHAR(255),
    "email_admin" VARCHAR(100) NOT NULL,
    "plan_saas" "PlanSaas" NOT NULL,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "institucion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edificio" (
    "id" TEXT NOT NULL,
    "institucion_id" TEXT NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "direccion" VARCHAR(255),
    "descripcion" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "edificio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "piso" (
    "id" TEXT NOT NULL,
    "edificio_id" TEXT NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "orden" INTEGER,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "piso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sector" (
    "id" TEXT NOT NULL,
    "piso_id" TEXT NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "sector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "habitacion" (
    "id" TEXT NOT NULL,
    "sector_id" TEXT NOT NULL,
    "numero" VARCHAR(20) NOT NULL,
    "tipo" "HabitacionTipo" NOT NULL,
    "amenities" JSONB,
    "precioReferencial" DECIMAL(12,2),
    "estado" "HabitacionEstado" NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "habitacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cama" (
    "id" TEXT NOT NULL,
    "habitacion_id" TEXT NOT NULL,
    "identificador" VARCHAR(20) NOT NULL,
    "estado" "CamaEstado" NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "cama_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "residente" (
    "id" TEXT NOT NULL,
    "institucion_id" TEXT NOT NULL,
    "dni" VARCHAR(15) NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "sexo" "ResidenteSexo" NOT NULL,
    "telefono" VARCHAR(30),
    "email" VARCHAR(100),
    "direccion_procedencia" VARCHAR(255),
    "foto_url" VARCHAR(500),
    "estado" "ResidenteEstado" NOT NULL,
    "fecha_ingreso" TIMESTAMP(3) NOT NULL,
    "fecha_egreso" TIMESTAMP(3),
    "alergias" TEXT,
    "restricciones_alimentarias" TEXT,
    "observaciones_medicas" TEXT,
    "medico_nombre" VARCHAR(100),
    "medico_matricula" VARCHAR(30),
    "medico_especialidad" VARCHAR(50),
    "medico_telefono" VARCHAR(30),
    "medico_email" VARCHAR(100),
    "eliminado" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "residente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "responsable_pago" (
    "id" TEXT NOT NULL,
    "residente_id" TEXT NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "relacion" VARCHAR(50),
    "cuit_cuil" VARCHAR(13),
    "condicion_iva" "ResponsablePagoIva",
    "direccion_fiscal" VARCHAR(255),
    "tipo_comprobante" TEXT,
    "email_facturacion" VARCHAR(100),
    "telefono" VARCHAR(30),
    "observaciones" TEXT,

    CONSTRAINT "responsable_pago_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacto_emergencia" (
    "id" TEXT NOT NULL,
    "residente_id" TEXT NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "relacion" VARCHAR(50) NOT NULL,
    "telefono_primario" VARCHAR(30) NOT NULL,
    "telefono_secundario" VARCHAR(30),
    "email" VARCHAR(100),
    "es_principal" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "contacto_emergencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "financiador" (
    "id" TEXT NOT NULL,
    "institucion_id" TEXT NOT NULL,
    "nombre" VARCHAR(150) NOT NULL,
    "cuit" VARCHAR(13) NOT NULL,
    "tipo" "FinanciadorTipo" NOT NULL,
    "direccion_fiscal" VARCHAR(255),
    "email_liquidaciones" VARCHAR(100),
    "telefono" VARCHAR(30),
    "persona_contacto" VARCHAR(100),
    "condiciones_pago" TEXT,
    "requisitos_facturacion" TEXT,
    "estado" TEXT NOT NULL DEFAULT 'Activo',

    CONSTRAINT "financiador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plan" (
    "id" TEXT NOT NULL,
    "financiador_id" TEXT NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "cobertura_dias" INTEGER,
    "servicios_incluidos" JSONB,
    "servicios_excluidos" JSONB,
    "coseguros" JSONB,
    "auditorias_requeridas" TEXT,
    "estado" "PlanEstado" NOT NULL,

    CONSTRAINT "plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "convenio" (
    "id" TEXT NOT NULL,
    "financiador_id" TEXT NOT NULL,
    "plan_id" TEXT,
    "servicio" VARCHAR(100) NOT NULL,
    "modalidad" "ConvenioModalidad" NOT NULL,
    "valor" DECIMAL(12,2) NOT NULL,
    "fecha_desde" TIMESTAMP(3) NOT NULL,
    "fecha_hasta" TIMESTAMP(3),

    CONSTRAINT "convenio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cobertura_residente" (
    "id" TEXT NOT NULL,
    "residente_id" TEXT NOT NULL,
    "financiador_id" TEXT NOT NULL,
    "plan_id" TEXT,
    "nro_afiliado" VARCHAR(50) NOT NULL,
    "fecha_vigencia_desde" TIMESTAMP(3) NOT NULL,
    "fecha_vigencia_hasta" TIMESTAMP(3),
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "carnet_url" VARCHAR(500),

    CONSTRAINT "cobertura_residente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asignacion_cama" (
    "id" TEXT NOT NULL,
    "residente_id" TEXT NOT NULL,
    "cama_id" TEXT NOT NULL,
    "fecha_desde" TIMESTAMP(3) NOT NULL,
    "fecha_hasta" TIMESTAMP(3),
    "motivo_cambio" TEXT,
    "usuario_id" TEXT NOT NULL,

    CONSTRAINT "asignacion_cama_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historial_estado_residente" (
    "id" TEXT NOT NULL,
    "residente_id" TEXT NOT NULL,
    "estado_anterior" "ResidenteEstado",
    "estado_nuevo" "ResidenteEstado" NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "motivo" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,

    CONSTRAINT "historial_estado_residente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documento" (
    "id" TEXT NOT NULL,
    "residente_id" TEXT NOT NULL,
    "tipo" "DocumentoTipo" NOT NULL,
    "descripcion" VARCHAR(255),
    "archivo_url" VARCHAR(500) NOT NULL,
    "fecha_carga" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "documento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" TEXT NOT NULL,
    "institucion_id" TEXT NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "rol_id" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "ultimo_login" TIMESTAMP(3),
    "intentos_fallidos" INTEGER NOT NULL DEFAULT 0,
    "bloqueado_hasta" TIMESTAMP(3),

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rol" (
    "id" TEXT NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "permisos" JSONB NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_log" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "accion" "AuditoriaAccion" NOT NULL,
    "entidad" VARCHAR(50) NOT NULL,
    "entidad_id" TEXT NOT NULL,
    "datos_anteriores" JSONB,
    "datos_nuevos" JSONB,
    "ip_address" VARCHAR(45),
    "user_agent" VARCHAR(255),
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "institucion_cuit_key" ON "institucion"("cuit");

-- CreateIndex
CREATE UNIQUE INDEX "institucion_email_admin_key" ON "institucion"("email_admin");

-- CreateIndex
CREATE UNIQUE INDEX "residente_institucion_id_dni_key" ON "residente"("institucion_id", "dni");

-- CreateIndex
CREATE UNIQUE INDEX "responsable_pago_residente_id_key" ON "responsable_pago"("residente_id");

-- CreateIndex
CREATE UNIQUE INDEX "financiador_institucion_id_cuit_key" ON "financiador"("institucion_id", "cuit");

-- CreateIndex
CREATE UNIQUE INDEX "cobertura_residente_residente_id_activa_key" ON "cobertura_residente"("residente_id", "activa");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_institucion_id_email_key" ON "usuario"("institucion_id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "rol_nombre_key" ON "rol"("nombre");

-- AddForeignKey
ALTER TABLE "edificio" ADD CONSTRAINT "edificio_institucion_id_fkey" FOREIGN KEY ("institucion_id") REFERENCES "institucion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "piso" ADD CONSTRAINT "piso_edificio_id_fkey" FOREIGN KEY ("edificio_id") REFERENCES "edificio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sector" ADD CONSTRAINT "sector_piso_id_fkey" FOREIGN KEY ("piso_id") REFERENCES "piso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "habitacion" ADD CONSTRAINT "habitacion_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cama" ADD CONSTRAINT "cama_habitacion_id_fkey" FOREIGN KEY ("habitacion_id") REFERENCES "habitacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "residente" ADD CONSTRAINT "residente_institucion_id_fkey" FOREIGN KEY ("institucion_id") REFERENCES "institucion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responsable_pago" ADD CONSTRAINT "responsable_pago_residente_id_fkey" FOREIGN KEY ("residente_id") REFERENCES "residente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacto_emergencia" ADD CONSTRAINT "contacto_emergencia_residente_id_fkey" FOREIGN KEY ("residente_id") REFERENCES "residente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financiador" ADD CONSTRAINT "financiador_institucion_id_fkey" FOREIGN KEY ("institucion_id") REFERENCES "institucion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan" ADD CONSTRAINT "plan_financiador_id_fkey" FOREIGN KEY ("financiador_id") REFERENCES "financiador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "convenio" ADD CONSTRAINT "convenio_financiador_id_fkey" FOREIGN KEY ("financiador_id") REFERENCES "financiador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "convenio" ADD CONSTRAINT "convenio_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cobertura_residente" ADD CONSTRAINT "cobertura_residente_residente_id_fkey" FOREIGN KEY ("residente_id") REFERENCES "residente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cobertura_residente" ADD CONSTRAINT "cobertura_residente_financiador_id_fkey" FOREIGN KEY ("financiador_id") REFERENCES "financiador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cobertura_residente" ADD CONSTRAINT "cobertura_residente_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asignacion_cama" ADD CONSTRAINT "asignacion_cama_residente_id_fkey" FOREIGN KEY ("residente_id") REFERENCES "residente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asignacion_cama" ADD CONSTRAINT "asignacion_cama_cama_id_fkey" FOREIGN KEY ("cama_id") REFERENCES "cama"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asignacion_cama" ADD CONSTRAINT "asignacion_cama_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historial_estado_residente" ADD CONSTRAINT "historial_estado_residente_residente_id_fkey" FOREIGN KEY ("residente_id") REFERENCES "residente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historial_estado_residente" ADD CONSTRAINT "historial_estado_residente_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documento" ADD CONSTRAINT "documento_residente_id_fkey" FOREIGN KEY ("residente_id") REFERENCES "residente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_institucion_id_fkey" FOREIGN KEY ("institucion_id") REFERENCES "institucion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


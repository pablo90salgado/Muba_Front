# Módulo 1: CRUD de Pacientes/Residentes

## 1. Resumen del Módulo

Este módulo constituye el núcleo del sistema. Gestiona la información completa de cada residente, incluyendo datos de facturación y cobertura médica.

## 2. Estructura de Datos (Schema Prisma)

### 2.1 Modelos Existentes (ya definidos)

- `Residente` - Datos personales, médicos, estado
- `ResponsablePago` - Datos fiscales para facturación
- `ContactoEmergencia` - Contactos de emergencia (múltiples)
- `CoberturaResidente` - Obra social con constraint único para 1 activa
- `Documento` - Archivos adjuntos (DNI, carnet, etc.)
- `HistorialEstadoResidente` - Historial de cambios de estado
- `AsignacionCama` - Relación residente-cama con fechas

### 2.2 Modelo a Agregar

```prisma
model HistorialCoberturaResidente {
  id            String   @id @default(uuid())
  residenteId   String   @map("residente_id")
  financiadorId String  @map("financiador_id")
  nroAfiliado   String   @map("nro_afiliado") @db.VarChar(50)
  fechaCambio   DateTime @default(now())
  motivo        String   @db.Text
  tipoCambio    String   // "ALTA", "MODIFICACION", "BAJA"

  @@map("historial_cobertura_residente")
}
```

## 3. Rutas API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/residentes` | Crear residente (wizard completo) |
| GET | `/residentes` | Listado paginado + filtros |
| GET | `/residentes/list` | Listado simple (para combos) |
| GET | `/residentes/:id` | Ficha completa con todas las secciones |
| PUT | `/residentes/:id` | Actualizar datos |
| DELETE | `/residentes/:id` | Soft delete |
| POST | `/residentes/search` | Búsqueda avanzada |
| POST | `/residentes/:id/estado` | Cambiar estado (libera cama) |
| GET | `/residentes/export` | Exportar Excel/PDF |
| POST | `/residentes/:id/foto` | Upload foto |
| POST | `/residentes/:id/documentos` | Upload documentos |

## 4. Reglas de Negocio

| Regla | Implementación |
|-------|----------------|
| DNI único | Validación en Model + constraint `@unique` en Prisma |
| Mínimo 1 contacto obligatorio | Validación en Controller antes de crear |
| Cambio estado → liberar cama | Transacción Prisma atómica |
| Historial de estados | Nunca se elimina, solo se agrega |
| Responsable hereda contacto principal | Lógica en Controller si no se especifica |
| Tipo comprobante según IVA | Sugerencia automática basada en `condicionIva` |

## 5. Workflow: Ingreso de Nuevo Residente

```
1. Paso 1 - Datos Personales
   ├── nombre, DNI*, fechaNacimiento*, sexo
   ├── foto (opcional)
   └── telefono, email, direccionProcedencia

2. Paso 2 - Contactos de Emergencia
   ├── Mínimo 1 contacto*
   └── nombre, relacion, telefonoPrimario*, telefonoSecundario, email, esPrincipal

3. Paso 3 - Cobertura/Obra Social
   ├── financiadorId* (del catálogo)
   ├── nroAfiliado*, planId
   ├── fechaVigenciaDesde*, fechaVigenciaHasta
   └── carnetUrl (opcional)

4. Paso 4 - Información Médica
   ├── medicoNombre, medicoMatricula, medicoEspecialidad
   ├── medicoTelefono, medicoEmail
   ├── alergias, restriccionesAlimentarias
   └── observacionesMedicas

5. Paso 5 - Datos de Facturación
   ├── responsablePago: nombre*, relacion
   ├── cuitCuil, condicionIva*, direccionFiscal
   ├── tipoComprobante (sugerido según IVA)
   ├── emailFacturacion, telefono
   └── observaciones

6. Paso 6 - Asignación de Cama
   ├── edificioId*, pisoId*, habitacionId*, camaId*
   └── fechaIngreso* (default: hoy)

7. Confirmación → Registro en historial de estados
```

## 6. Servicios/Models a Implementar

### 6.1 Residente.Model.mjs
- `create(data)` - Crea residente + contactos + cobertura + responsable + asignación cama
- `findById(id)` - Busca con todas las relaciones
- `findAll(filters, pagination)` - Listado con filtros
- `update(id, data)` - Actualiza datos
- `softDelete(id)` - Marca como eliminado
- `changeState(id, newState, motivo)` - Cambia estado + libera cama
- `search(query)` - Búsqueda por nombre, DNI, obra social, habitación, estado
- `export(format)` - Exporta Excel/PDF

### 6.2 Cama.Model.mjs
- `findAvailable(filters)` - Camas disponibles
- `assignToResidente(camaId, residenteId)` - Asigna cama
- `releaseFromResidente(camaId, motivo)` - Libera cama

### 6.3 Financiador.Model.mjs
- `findAll()` - Catálogo completo
- `findById(id)` - Detalle

## 7. Dependencias a Instalar

```bash
pnpm add express cors helmet morgan express-validator multer
pnpm add jsonwebtoken bcryptjs dotenv
pnpm add xlsx pdfkit
```

## 8. Estructura de Archivos a Crear

```
resources/
├── Residente/
│   ├── Residente.Controller.mjs
│   ├── Residente.Model.mjs
│   ├── Residente.Router.mjs
│   ├── Residente.Schema.mjs
│   └── Residente.Constant.mjs
├── Cama/
│   ├── Cama.Controller.mjs
│   ├── Cama.Model.mjs
│   ├── Cama.Router.mjs
│   ├── Cama.Schema.mjs
│   └── Cama.Constant.mjs
└── Financiador/
    ├── Financiador.Controller.mjs
    ├── Financiador.Model.mjs
    ├── Financiador.Router.mjs
    ├── Financiador.Schema.mjs
    └── Financiador.Constant.mjs
```

## 9. Pantallas Frontend (Referencia)

| Pantalla | Descripción |
|----------|-------------|
| Listado de residentes | Tabla paginada, búsqueda, filtros, exportación |
| Alta de residente | Wizard de 6 pasos |
| Ficha del residente | Tabs: Datos Personales, Contactos, Info Médica, Facturación, Cobertura, Documentos, Historial |
| Gestión de estados | Modal con fecha y motivo |
| Dashboard de camas | Vista visual de asignación |

## 10. Consideraciones Técnicas

- Búsqueda: Sin fuzzy por ahora (búsqueda exacta)
- Upload de archivos: Sistema de archivos local en `/files/`
- Validaciones: express-validator en routers
- Transacciones: Prisma `$transaction` para operaciones atómicas
- Soft delete: Campo `eliminado` en Residente

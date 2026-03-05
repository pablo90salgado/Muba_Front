import pkg from '@prisma/client'
const { PrismaClient } = pkg
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
const { Pool } = pg

const connectionString = process.env.DATABASE_URL || 'postgresql://muba_user:muba_pass@localhost:5432/muba_test?schema=public'
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

import seedInstituciones from './seed/00-instituciones.mjs'
import seedRoles from './seed/01-roles.mjs'
import seedUsers from './seed/02-users.mjs'
import seedEdificios from './seed/03-edificios.mjs'
import seedHabitaciones from './seed/04-habitaciones.mjs'
import seedCamas from './seed/05-camas.mjs'
import seedFinanciadores from './seed/06-financiadores.mjs'
import seedPlanes from './seed/07-planes.mjs'
import seedResidentes from './seed/08-residentes.mjs'

async function main () {
  console.log('[Seed] Starting test database seeding...')

  console.log('[Seed] Cleaning database...')
  await prisma.auditoriaLog.deleteMany()
  await prisma.historialEstadoResidente.deleteMany()
  await prisma.asignacionCama.deleteMany()
  await prisma.coberturaResidente.deleteMany()
  await prisma.documento.deleteMany()
  await prisma.contactoEmergencia.deleteMany()
  await prisma.responsablePago.deleteMany()
  await prisma.residente.deleteMany()
  await prisma.convenio.deleteMany()
  await prisma.plan.deleteMany()
  await prisma.financiador.deleteMany()
  await prisma.cama.deleteMany()
  await prisma.habitacion.deleteMany()
  await prisma.sector.deleteMany()
  await prisma.piso.deleteMany()
  await prisma.edificio.deleteMany()
  await prisma.usuario.deleteMany()
  await prisma.institucion.deleteMany()
  await prisma.rol.deleteMany()

  console.log('[Seed] Running seeders in order...\n')

  const { institucionDemo, institucionSecundaria } = await seedInstituciones(prisma)
  await seedRoles(prisma)
  const { usuarioAdmin } = await seedUsers(prisma, { institucionDemo, institucionSecundaria })
  const { edificio1, edificio2, piso1Edif1, piso2Edif1, piso1Edif2, sector1, sector2, sector3, sector4 } = await seedEdificios(prisma, { institucionDemo })
  const { habitacion1, habitacion2, habitacion3, habitacion4, habitacion5 } = await seedHabitaciones(prisma, { sector1, sector2, sector3, sector4 })
  const { cama1, cama2, cama3, cama4, cama5, cama6 } = await seedCamas(prisma, { habitacion1, habitacion2, habitacion3, habitacion4, habitacion5 })
  const { finan1, finan2, finan3 } = await seedFinanciadores(prisma, { institucionDemo })
  const { plan1, plan2, plan3, plan4 } = await seedPlanes(prisma, { finan1, finan2, finan3 })
  await seedResidentes(prisma, { institucionDemo, usuarioAdmin, finan1, finan2, finan3, plan1, plan2, plan3, plan4, cama1, cama2, cama3, cama4, cama5, cama6 })

  console.log('[Seed] Test database seeded successfully!')
  console.log('[Seed] Summary:')
  console.log('  - 2 Edificios')
  console.log('  - 3 Pisos')
  console.log('  - 4 Sectores')
  console.log('  - 5 Habitaciones')
  console.log('  - 9 Camas')
  console.log('  - 3 Roles')
  console.log('  - 3 Usuarios')
  console.log('  - 3 Financiadores')
  console.log('  - 4 Planes')
  console.log('  - 3 Residentes')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('[Seed] Error:', e)
    await prisma.$disconnect()
    process.exit(1)
  })

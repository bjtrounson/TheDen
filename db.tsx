import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient
}

//let prisma: PrismaClient

// check to use this workaround only in development and not in production
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }

  prisma = global.prisma
}

export default prisma
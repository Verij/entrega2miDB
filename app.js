const express = require('express')
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.get('/', (req, res)=>{
  res.send('HOLA MUNDO')
})

app.post(`/gasto`, async(req, res)=>{
  const {nombre, gasto, cant_miembros, activo} = req.body
  const result = await prisma.clubes.create({
    data: {
      nombre, gasto, cant_miembros, activo
    }
  })
  res.json(result)
})

app.get(`/gastos`, async(req,res)=>{
  const clubes = await prisma.clubes.findMany()
  res.json(clubes) 
})

app.put(`/gasto/:id`, async(req, res)=>{
  const {id} = req.params
  const {nombre, gasto, cant_miembros, activo} = req.body
  const post = await prisma.clubes.update({
    where: {id: id},
    data: {nombre, gasto, cant_miembros, activo}
  })
  res.json(post)
})

app.delete(`/gasto/:id`, async(req, res)=>{
  const {id} = req.params
  await prisma.clubes.delete({
    where: {id: id}
  })
  res.json('eliminado')
})

app.listen(3000, ()=>
console.log(`server ready at: localhost 3000`)
)
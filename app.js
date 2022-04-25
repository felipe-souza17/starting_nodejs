const express = require('express')
const { randomUUID } = require('crypto')
const fs = require('fs')

const app = express()

app.use(express.json())

let products = []

fs.readFile('products.json', 'utf-8', (err, data) => {
  if (err) throw err
  products = JSON.parse(data)
})

/*
  POST => Inserir um dado
  GET => Buscar um/mais dados
  PUT => Alterar um dado
  DELETE => Remover um dado
*/

/*
  Body => Sempre que eu quiser enviar dados para minha aplicação
  Params => /product/65415646651613543287
  Query => /product?id=6546565432198431&value=5412154121
*/

app.post('/products', (request, response) => {
  // Nome e preço => name e price

  const { name, price } = request.body

  const product = {
    name,
    price,
    id: randomUUID()
  }

  products.push(product)

  productFile()

  return response.json(product)
})

app.get('/products', (request, response) => response.json(products))

app.get('/products/:id', (request, response) => {
  const { id } = request.params
  const product = products.find(product => product.id === id)
  return response.json(product)
})

app.put('/products/:id', (request, response) => {
  const { id } = request.params
  const { name, price } = request.body

  const productIndex = products.findIndex(product => product.id === id)
  products[productIndex] = {
    ...products[productIndex],
    name,
    price
  }

  productFile()

  return response.json({ message: 'Produto alterado com sucesso' })
})

app.delete('/products/:id', (request, response) => {
  const { id } = request.params

  const productIndex = products.findIndex(product => product.id === id)

  products.splice(productIndex, 1)

  productFile()

  return response.json({ message: 'Produto removido com sucesso!' })
})

function productFile() {
  fs.writeFile('products.json', JSON.stringify(products), err => {
    if (err) throw err
    console.log('Produto inserido')
  })
}
app.listen(8080, () => console.log('Server rodando!'))

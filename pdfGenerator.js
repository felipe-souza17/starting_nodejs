const PDFGenerator = require('pdfkit')
const fs = require('fs')

class productListGenerator {
  constructor(productList) {
    this.productList = productList
  }

  generateTable(doc) {
    const tableTop = 100
    const nameX = 50
    const priceX = 250
    const idX = 350

    doc
      .fontSize(10)
      .text('Product Name', nameX, tableTop)
      .text('Price', priceX, tableTop)
      .text('ID', idX, tableTop)

    const items = this.productList
    let i = 0

    for (i = 0; i < items.length; i++) {
      const item = items[i]
      const y = tableTop + 25 + i * 25

      doc
        .fontSize(10)
        .text(item.name, nameX, y)
        .text(`$ ${item.price}`, priceX, y)
        .text(item.id, idX, y)
    }
  }

  generate() {
    let theOutput = new PDFGenerator()

    console.log(this.productList)

    const fileName = 'products.pdf'

    theOutput.pipe(fs.createWriteStream(fileName))

    this.generateTable(theOutput)

    theOutput.end()
  }
}

module.exports = productListGenerator

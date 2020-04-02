const fs = require('fs')
const path = require('path')

// Pasta com os arquivos do DB que serão agregados
const SRC_DIR = 'db'
const DIST_DIR = 'dist'
const FILENAME = 'db.json'

// Acumulará os dados de todos os itens
let db = {}


const srcDir = path.join(__dirname, SRC_DIR)

fs.readdirSync(srcDir).forEach(filename => {
    const items = require(path.join(srcDir, filename))
    db = {
        ...db,
        ...items
    }
})

// Caminho para a pasta de destino
const distDir = path.join(__dirname, DIST_DIR)

// Verifica a existência da pasta. Caso não exista, cria a pasta.
if (!fs.existsSync(distDir)) {
    console.log(`[RO-DB]: Pasta de destino para o DB consolidado não encontrado! Criando pasta '${DIST_DIR}'...`)
    fs.mkdirSync(distDir, { recursive: true })
}

console.log(`[RO-DB]: Escrevendo arquivo de DB consolidado '${FILENAME}', contendo ${Object.keys(db).length} itens...`)

// Salva o DB num arquivo
fs.writeFileSync(path.join(DIST_DIR, FILENAME), JSON.stringify(db, null, 4))
console.log(`[RO-DB]: Arquivo '${FILENAME}' gerado com sucesso.`)

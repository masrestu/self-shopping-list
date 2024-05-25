const productLists = [
    "Beras", "Biskuit", "Detergent Cair", "Hair Lotion Bayi", "Kecap", "Kopi Instant", "Larutan Penyegar", "Margarin", "Mie Instant", "Minyak Goreng", "Minyak Telon", "Obat Nyamuk Semprot", "Oli Rantai", "Pasta Gigi", "Pewangi Gantung", "Pewangi Ruangan", "Pewangi Setrika", "Sabun Bayi", "Sabun Cuci Piring", "Sabun Mandi", "Saus Cabe Botol", "Saus Pasta", "Saus Tiram", "Saus Tomat Botol", "Spaghetti", "Tepung Bakwan", "Tepung Original", "Tissue Basah"]
    
let unsetLists = localStorage.getItem("unsetLists") ? JSON.parse(localStorage.getItem("unsetLists")) : [...productLists]

const defaultObj = {}
unsetLists.forEach(v => defaultObj[v] = false)

let productObj = localStorage.getItem("productObj") ? JSON.parse(localStorage.getItem("productObj")) : Object.assign({}, defaultObj)

let miniLists = localStorage.getItem("miniLists") ? JSON.parse(localStorage.getItem("miniLists")) : []
let sayurLists = localStorage.getItem("sayurLists") ? JSON.parse(localStorage.getItem("sayurLists")) : []
let shopeeLists = localStorage.getItem("shopeeLists") ? JSON.parse(localStorage.getItem("shopeeLists")) : []

function generateProduct(listName, products) {
    // remove unwanted keys
    for (let i = 0; i < localStorage.length; i++) {
        if (['unsetLists', 'miniLists', 'sayurLists', 'shopeeLists'].includes(localStorage.key(i))) continue
        localStorage.removeItem(localStorage.key(i))
    }
    if (listName === "unset") {
        localStorage.setItem("unsetLists", JSON.stringify(products))
    } else if (listName === "mini") {
        localStorage.setItem("miniLists", JSON.stringify(products))
    } else if (listName === "sayur") {
        localStorage.setItem("sayurLists", JSON.stringify(products))
    } else if (listName === "shopee") {
        localStorage.setItem("shopeeLists", JSON.stringify(products))
    }

    products = products.sort()
    const list = document.getElementById(listName)
    list.innerHTML = ""
    products.forEach(product => {
        let bought = productObj[product] ? " bought" : ''
        let item = `<div class="item">
      <div class="product${bought}" onclick="toggleStrike(this)">
        <span>${product}</span>
      </div>
      <div class="buttons">`
        if (listName != 'unset') {
            item += `<button onclick="clicked(this)" class="bg-slate-100">❔</button>`
        }
        if (listName != 'shopee') {
            item += `<button onclick="clicked(this)" class="shopee-btn">&nbsp;</button>`
        }
        if (listName != 'sayur') {
            item += `<button onclick="clicked(this)" class="sayur-btn">&nbsp;</button>`
        }
        if (listName != 'mini') {
            item += `<button onclick="clicked(this)" class="mini-btn">&nbsp;</button>`
        }
        item += `<button onclick="clicked(this)" class="bg-red-900">❌</button>
      </div>
    </div>`
        list.innerHTML += item
    })
}

generateProduct("unset", unsetLists)
generateProduct("mini", miniLists)
generateProduct("sayur", sayurLists)
generateProduct("shopee", shopeeLists)

const buttons = document.querySelectorAll(".buttons button")

function clicked(button) {
    const listName = button.parentElement.parentElement.parentElement.id
    const productName = button.parentElement.parentElement.children[0].children[0].textContent
    const buttonText = button.textContent

    if (buttonText === "❌") {
        const cont = confirm("Hapus " + productName + "?")
        if (!cont) return
    }

    if (listName === "unset") {
        unsetLists = unsetLists.filter(product => product !== productName)
        generateProduct("unset", unsetLists)
    } else if (listName === "mini") {
        miniLists = miniLists.filter(product => product !== productName)
        generateProduct("mini", miniLists)
    } else if (listName === "sayur") {
        sayurLists = sayurLists.filter(product => product !== productName)
        generateProduct("sayur", sayurLists)
    } else if (listName === "shopee") {
        shopeeLists = shopeeLists.filter(product => product !== productName)
        generateProduct("shopee", shopeeLists)
    }

    if (button.classList.contains("shopee-btn")) {
        shopeeLists.push(productName)
        generateProduct("shopee", shopeeLists)
    } else if (button.classList.contains("sayur-btn")) {
        sayurLists.push(productName)
        generateProduct("sayur", sayurLists)
    } else if (button.classList.contains("mini-btn")) {
        miniLists.push(productName)
        generateProduct("mini", miniLists)
    } else if (buttonText === "❔") {
        unsetLists.push(productName)
        generateProduct("unset", unsetLists)
    }
}

const capitalize = str => str.toLowerCase().replace(/^\w/, c => c.toUpperCase())
const capitalizeFirstLetter = str => str.split(" ").map(capitalize).join(" ")

const addButton = document.getElementById("add")
addButton.addEventListener("click", () => {
    const newProduct = prompt("Add new product")
    if (newProduct) {
        unsetLists.push(capitalizeFirstLetter(newProduct))
        generateProduct("unset", unsetLists)
    }
})

const saveButton = document.getElementById("save")
saveButton.addEventListener("click", () => {
    const jsonText = JSON.stringify({ unsetLists, miniLists, sayurLists, shopeeLists })
    const name = "shoppinglist.json"
    const type = "text/plain"
    const blob = new Blob([jsonText], { type })
    const a = document.createElement("a")
    a.href = URL.createObjectURL(blob)
    a.download = name
    a.click()
    URL.revokeObjectURL(a.href)
})

const form = document.getElementById("upload")
const fileInput = document.getElementById("file")
const uploadSection = document.querySelector(".upload-form")

form.addEventListener("submit", e => {
    e.preventDefault()
    if (!fileInput.value.length) return
    const reader = new FileReader()
    reader.onload = e => {
        const json = JSON.parse(e.target.result)
        localStorage.setItem("unsetLists", JSON.stringify(json.unsetLists))
        localStorage.setItem("miniLists", JSON.stringify(json.miniLists))
        localStorage.setItem("sayurLists", JSON.stringify(json.sayurLists))
        localStorage.setItem("shopeeLists", JSON.stringify(json.shopeeLists))
        generateProduct("unset", json.unsetLists)
        generateProduct("mini", json.miniLists)
        generateProduct("sayur", json.sayurLists)
        generateProduct("shopee", json.shopeeLists)
    }
    reader.readAsText(fileInput.files[0])
    form.reset()
    uploadSection.style.display = "none"
})

const loadButton = document.getElementById("load")
loadButton.addEventListener("click", () => {
    uploadSection.style.display = "flex"
})

const toggleStrike = elm => {
    const productName = elm.textContent.trim()
    productObj[productName] = !(productObj[productName])
    localStorage.setItem("productObj", JSON.stringify(productObj))
    if (productObj[productName]) elm.classList.add('bought')
    else elm.classList.remove('bought')
}

const resetButton = document.getElementById("reset")
resetButton.addEventListener("click", () => {
    console.log("resetting state...")

    miniLists.forEach(v => unsetLists.push(v))
    sayurLists.forEach(v => unsetLists.push(v))
    shopeeLists.forEach(v => unsetLists.push(v))

    miniLists = []
    sayurLists = []
    shopeeLists = []

    localStorage.setItem("unsetLists", JSON.stringify(unsetLists))
    unsetLists.forEach(v => productObj[v] = false)
    localStorage.setItem("productObj", JSON.stringify(productObj))

    // localStorage.removeItem("unsetLists")
    localStorage.removeItem("miniLists")
    localStorage.removeItem("sayurLists")
    localStorage.removeItem("shopeeLists")
    
    window.location.reload()
})
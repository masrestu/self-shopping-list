const productLists = [
  "Beras", "Biskuit", "Detergent Cair", "Hair Lotion Bayi", "Kecap", "Kopi Instant", "Larutan Penyegar", "Margarin", "Mie Instant", "Minyak Goreng", "Minyak Telon", "Obat Nyamuk Semprot", "Oli Rantai", "Pasta Gigi", "Pewangi Gantung", "Pewangi Ruangan", "Pewangi Setrika", "Sabun Bayi", "Sabun Cuci Piring", "Sabun Mandi", "Saus Cabe Botol", "Saus Pasta", "Saus Tiram", "Saus Tomat Botol", "Spaghetti", "Tepung Bakwan", "Tepung Original", "Tissue Basah" ]

let unsetLists = localStorage.getItem("unsetLists") ? JSON.parse(localStorage.getItem("unsetLists")) : [...productLists]
let miniLists = localStorage.getItem("miniLists") ? JSON.parse(localStorage.getItem("miniLists")) : []
let sayurLists = localStorage.getItem("sayurLists") ? JSON.parse(localStorage.getItem("sayurLists")) : []
let shopeeLists = localStorage.getItem("shopeeLists") ? JSON.parse(localStorage.getItem("shopeeLists")) : []

function generateProduct(listName, products) {
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
    list.innerHTML += `<div class="item">
      <div class="product">
        <span>${product}</span>
      </div>
      <div class="buttons">
        <button onclick="clicked(this)" class="bg-slate-100">Un</button>
        <button onclick="clicked(this)" class="bg-orange-500">Sh</button>
        <button onclick="clicked(this)" class="bg-green-500">Sb</button>
        <button onclick="clicked(this)" class="bg-red-500">Al</button>
      </div>
    </div>`
  })
}

generateProduct("unset", unsetLists)
generateProduct("mini", miniLists)
generateProduct("sayur", sayurLists)
generateProduct("shopee", shopeeLists)

const buttons = document.querySelectorAll("button")

function clicked(button) {
  const listName = button.parentElement.parentElement.parentElement.id
  const productName = button.parentElement.parentElement.children[0].children[0].textContent
  if (listName === "unset") {
    unsetLists = unsetLists.filter(product => product !== productName)
    generateProduct("unset", unsetLists)
  } else if (listName === "mini") {
    miniLists.filter(product => product !== productName)
    generateProduct("mini", miniLists)
  } else if (listName === "sayur") {
    sayurLists.filter(product => product !== productName)
    generateProduct("sayur", sayurLists)
  } else if (listName === "shopee") {
    shopeeLists.filter(product => product !== productName)
    generateProduct("shopee", shopeeLists)
  }

  const buttonText = button.textContent
  if (buttonText === "Sh") {
    miniLists.push(productName)
    generateProduct("shopee", miniLists)
  } else if (buttonText === "Sb") {
    sayurLists.push(productName)
    generateProduct("sayur", sayurLists)
  } else if (buttonText === "Al") {
    shopeeLists.push(productName)
    generateProduct("mini", shopeeLists)
  } else if (buttonText === "Un") {
    unsetLists.push(productName)
    generateProduct("unset", unsetLists)
  }
}
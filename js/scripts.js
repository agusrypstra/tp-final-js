document.addEventListener('DOMContentLoaded', () =>{
    fetchData()
})
let cart = {

}
let articles = []
const fetchData = async ()=>{
    try {
        const res = await fetch('api.json')
        const data = await res.json()
        articles = data
        printArticles(data)
    } catch (error) {
        console.log(error);
    }
}

if(localStorage.getItem('cart')){
    cart = JSON.parse(localStorage.getItem('cart'))
}else{
    localStorage.setItem('cart',JSON.stringify(cart))
}

const fragment = document.createDocumentFragment();
const templateCard = document.getElementById("templateCard").content
const articleContainer = document.getElementById('articleContainer')
const templateCart = document.getElementById("templateCart").content
const cartCard = document.getElementById("cartCard").content
const cartArticles = templateCart.querySelector("#cartArticles")
const printArticles = data =>{
    data.forEach((article)=>{
        const clone = templateCard.cloneNode(true)
        clone.querySelector('img').src = `img/${article.id}.jpg`
        clone.querySelector('h5').textContent = article.name
        clone.querySelector('span').textContent = `$${article.price}`
        clone.querySelector('button').dataset.id = article.id
        fragment.appendChild(clone)
    })
    articleContainer.appendChild(fragment)
}

const filter = document.getElementById('filter')
filter.addEventListener('input', ()=>{
    console.log(filter.value)
    if(filter.value=='default'){
        articleContainer.innerHTML = ' '
        printArticles(articles)
    }else{
    articleContainer.innerHTML = ' '
    orderedArray = articles.filter(article => article.type == filter.value)
    printArticles(orderedArray)
    }
})

//CART

articleContainer.addEventListener('click', (e)=>{
    addArticle(e)
    showMessage(e)
})
const showMessage = e =>{
    const nameArticle = e.target.parentElement.querySelector('h5').textContent
    if (e.target.classList.contains("btn-secondary")) {
        Toastify({
            text: `${nameArticle} added to cart`,
            duration: 2500,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #bdc3c7, #2c3e50   )",
            }
          }).showToast();
    }
    
}
const addArticle = e =>{
    if(e.target.classList.contains("btn-secondary")){
        const item = e.target.parentElement
        setCart(item)
    }
    e.stopPropagation()
}
const setCart = e =>{
    const article = {
        id: e.querySelector('.btn-secondary').dataset.id,
        name: e.querySelector("h5").textContent,
        price: e.querySelector('span').textContent,
        img: e.querySelector('img').src,
        amount: 1
    }
    
    if(cart.hasOwnProperty(article.id)){
        article.amount = cart[article.id].amount + 1
    }
    cart[article.id] = {...article}
    console.log(cart);
}

const btnCart = document.getElementById('btnCart')
btnCart.addEventListener('click', (e)=>{
    e.preventDefault()
    printCart()
})

const printCart = () =>{
    if(Object.entries(cart).length === 0){
        Swal.fire({
            title: "Your cart is empty",
            icon: "info"
        })
    }else{
        Object.values(cart).forEach(art =>{
            const clone = cartCard.cloneNode(true)
            clone.querySelector('img').src = art.img
            clone.querySelector('h5').textContent = art.name
            clone.querySelector('#itemPrice').textContent = `${art.price}`
            clone.querySelector('#amount').textContent = `Cantidad: ${art.amount}`
            fragment.appendChild(clone)
        })
        cartArticles.innerHTML = " "
        cartArticles.appendChild(fragment)
    
        Swal.fire({
            template: '#templateCart'

        }).then((result) =>{
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Successfully purchased cart"
                })
            }
            if(result.isDenied){
                Swal.fire({
                    title:"Are you sure you want to clean your cart?",
                    template: "#templateConfirmation"
                }).then((result) =>{
                    if (result.isConfirmed) {
                        cart = {}
                        localStorage.setItem('cart',JSON.stringify(cart))
                    }
                })
            }
        })
    
    }
    
}

// DARK MODE

let darkMode

if(localStorage.getItem("darkMode")){
    darkMode = localStorage.getItem("darkMode")
}else{
    localStorage.setItem("darkMode","light")
    darkMode="light"
}
if(darkMode=="light"){
    document.body.classList.remove("darkMode")
}else{
    document.body.classList.add("darkMode")
}
const btnDarkMode = document.getElementById('btnDarkMode')
btnDarkMode.addEventListener('click', (e)=>{
    e.preventDefault()
    if(darkMode=="light"){
        document.body.classList.add("darkMode")
        darkMode="dark"
        localStorage.setItem("darkMode","dark")
    }else{
        document.body.classList.remove("darkMode")
        darkMode="light"
        localStorage.setItem("darkMode","light")
    }
})
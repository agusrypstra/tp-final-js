document.addEventListener('DOMContentLoaded', () =>{
    fetchData()
})
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

let cart = {

}

if(localStorage.getItem('cart')){
    cart = JSON.parse(localStorage.getItem('cart'))
}else{
    localStorage.setItem('cart',JSON.stringify(cart))
}

const articleContainer = document.getElementById('articleContainer')
const fragment = document.createDocumentFragment();
const templateCard = document.getElementById("templateCard").content

const printArticles = data =>{
    data.forEach((article)=>{
        const clone = templateCard.cloneNode(true)
        clone.querySelector('img').src = article.img
        clone.querySelector('h5').textContent = article.name
        clone.querySelector('span').textContent = article.price
        fragment.appendChild(clone)
    })
    articleContainer.appendChild(fragment)
}

const filter = document.getElementById('filter')
filter.addEventListener('input', ()=>{
    orderedArray = articles.filter(article => article.type == filter.value)
    orderedArray.forEach(e =>{
        const clone = templateCard.cloneNode(true)
        clone.querySelector('img').src = e.img
        clone.querySelector('h5').textContent = e.name
        clone.querySelector('span').textContent = e.price
        fragment.appendChild(clone)
    })
    articleContainer.innerHTML = ' '
    articleContainer.appendChild(fragment)
})

//CART

const buttonsCart = document.querySelectorAll("#addArticle")
buttonsCart.forEach(btn => {
    btn.addEventListener('click',(e)=>{
            const id = e.target.dataset.id
            if(articles[id-1].stock>0){

                const element = e.target.parentElement
                const img = element.querySelector("img").src
                const name = element.querySelector('h5').innerHTML
                const price = element.querySelector("span").innerHTML
                addArticle(img,name,price)

                
                Toastify({
                    text: "Added to cart",
                    className: "info",
                    duration:"2000",
                    style: {
                    background: "linear-gradient(to right, #bdc3c7, #2c3e50)",
                }
            }).showToast();
        }else{
            Toastify({
                text: "Sorre, we haven't stock of this article",
                className: "info",
                duration:"5000",
                style: {
                    background: "linear-gradient(to right, #eb3349 , #f45c43)",
                }
            }).showToast();
        }
        cartLength.innerHTML = cart.length
    })
});
const addArticle = (img,name,price) =>{
    
    console.log(img)
    if(cart.length==0){
        let articleToAdd = new Article(" ",name,price," "," "," ", img)
        cart.push(articleToAdd)
        localStorage.setItem('cart',JSON.stringify(cart))
    }else{
        for (let i = 0; i < cart.length; i++) {
            if(name == cart[i].name){
                    console.log("El objeto ya esta en el carrito");
            }else{

            }
    }
    }

}
document.getElementById("btnCart").addEventListener('click', (e)=>{
    e.preventDefault()
    let html = ` `
    let total=0
    for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
            const element = object[key];
            cart.forEach
        }
    }(e => {
        console.log(e)
        total+=e.price
        console.log(total)
        html+=`
        
            <div class="row g-0">
                <div class="col-md-4">
                    <img class="card-img-top" src="img/${e.id}.jpg" alt="${e.name}" />
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                    <h5 class="card-title">${e.name}</h5>
                    <p class="card-text price">$${e.price}</p>
                
                    <div class="d-inline-flex p-2">
                        <button class="btn btn-outline-danger">-</button>
                        <input type="number" value="1" class="form-control text-center">
                        <button class="btn btn-outline-success">+</button>
                    </div>
                </div>
            </div>
        `
    });
    Swal.fire({
        title: "Your cart",
        html: `<div class="card mb-3" style="max-width: 540px;">
        ${html}
        <div><h2>Total: ${total}</h2></div>
        </div>
        `,
        
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Buy cart!',
        denyButtonText: `Delete cart`,
        cancelButtonText: 'Close'
    }).then((result)=>{
        if(result.isConfirmed){
            if(cart.length==0){
                Swal.fire({
                    title:"Your cart is empty",
                    icon:"warning"
                })
            }else{
                Swal.fire({
                    title: 'Buy cart?',
                    text: "You won't be able to revert this!",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Buy',
                    cancelButtonText: 'No, cancel!',
                    reverseButtons: true
                  }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire(
                            'Cart purchased!',
                            '',
                            'success'
                          )
                    } else if (
                      /* Read more about handling dismissals below */
                      result.dismiss === Swal.DismissReason.cancel
                    ) {
                      swalWithBootstrapButtons.fire(
                        'Cancelled',
                        'Your imaginary file is safe :)',
                        'error'
                      )
                    }
            })
            }
        }else
        if(result.isDenied){
            cart = []
            localStorage.setItem('cart',JSON.stringify(cart))
            cartLength.innerHTML = cart.length
            Swal.fire({
                title:"Your cart is now empty"
            })
        }
    })
})

cartLength.innerHTML = cart.length

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
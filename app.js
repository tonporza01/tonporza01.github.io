let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Capuccino',
        img: 'imges/Product/LINE_ALBUM_ครั้ง 2 ที่ถ่ายเมนู ep 2_๒๓๐๔๒๗_46.jpg',
        price: 2.5
    },
    {
        id: 2,
        name: 'Caramal Macchiato',
        img: 'imges/Product/LINE_ALBUM_ครั้ง 2 ที่ถ่ายเมนู ep 2_๒๓๐๔๒๗_202.jpg',
        price: 3
    },
    {
        id: 3,
        name: 'Latte',
        img: 'imges/Product/LINE_ALBUM_ครั้ง 2 ที่ถ่ายเมนู ep 2_๒๓๐๔๒๗_70.jpg',
        price: 2.5
    },
    {
        id: 4,
        name: 'Americano',
        img: 'imges/Product/LINE_ALBUM_ถ่ายครั้งแรก_๒๓๐๕๑๑_188.jpg',
        price: 2.5
    }
];

let listCards = [];
function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="${value.img}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price}$</div>
            <button onclick="addToCard(${key})">Add to card</button>
        `;
        list.appendChild(newDiv);
    })
}
initApp();

function addToCard (key) {
    if(listCards[key] == null) {
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard (){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
            <div><img src="${value.img}"></div>
            <div>${value.name}</div>
            <div>${value.price.toLocaleString()}$</div>
            <div>
            <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
            <div class="count">${value.quantity}</div>
            <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>

            `;
            listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}
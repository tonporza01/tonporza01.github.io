let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

// Seach Bar 
const search = () => {
    const searchTerm = document.getElementById('input').value.toLowerCase();
    const list = document.getElementById('product-list');
    const productslist = document.querySelectorAll('.item');
    const pname = document.getElementsByTagName('h2');

    for(let i = 0; i < pname.length; i++){
        let match = productslist[i].getElementsByTagName('h2')[0];

        if(match){
            let textvalue = match.textContent || match.innerHTML

            if(textvalue.toLowerCase().indexOf(searchTerm) > -1){
                productslist[i].style.display = 'block';
            }else{
                productslist[i].style.display = 'none';
            }
        }
    }
}

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})


let products = [
    {
        id: 1,
        name: 'Iced Capuccino',
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
        name: 'Iced Latte',
        img: 'imges/Product/LINE_ALBUM_ครั้ง 2 ที่ถ่ายเมนู ep 2_๒๓๐๔๒๗_70.jpg',
        price: 2.5
    },
    {
        id: 4,
        name: 'Iced Americano',
        img: 'imges/Product/LINE_ALBUM_ถ่ายครั้งแรก_๒๓๐๕๑๑_188.jpg',
        price: 2.5
    },
    {
        id: 5,
        name: 'Black Mandarin',
        img: 'imges/Product/LINE_ALBUM_ถ่ายครั้งแรก 2_๒๓๐๔๒๗_283.jpg',
        price: 3
    },
    {
        id: 6,
        name: 'Iced Chocolate',
        img: 'imges/Product/LINE_ALBUM_ถ่ายครั้งแรก 2_๒๓๐๔๒๗_173.jpg',
        price: 2.5
    },
    {
        id: 7,
        name: 'Hot Americano',
        img: 'imges/Product/LINE_ALBUM_ถ่ายครั้งแรก_๒๓๐๕๑๑_203.jpg',
        price: 2
    },
    {
        id: 8,
        name: 'Hot Cuppuccino',
        img: 'imges/Product/LINE_ALBUM_ถ่ายครั้งแรก_๒๓๐๕๑๑_281.jpg',
        price: 2
    },
    {
        id: 9,
        name: 'Hot Latte',
        img: 'imges/Product/LINE_ALBUM_ครั้ง 2 ที่ถ่ายเมนู ep 2_๒๓๐๔๒๗_237.jpg',
        price: 2
    },
];

let listCards = [];
function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="${value.img}" loading="lazy">
            <h2 class="title">${value.name}</h2>
            <h3 class="price">${value.price}$</h3>
            <button onclick="addToCard(${key})">Add to card</button>
        `;
        list.appendChild(newDiv);
    })
}
initApp();

//  get cookie data cart
function checkCart(){
    var cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('listCards='));
    if(cookieValue){
        listCards = JSON.parse(cookieValue.split('=')[1]);
    }
}
checkCart();

function addToCard (key) {
    if(listCards[key] == null) {
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    // save to cookie
    let timeSave = "expires=Thu, 01 Jan 2025 00:00:00 GMT";
    document.cookie = "listCards="+JSON.stringify(listCards)+"; "+timeSave+"; path=/;";
    // reload list card
    reloadCard();
}
reloadCard()
function reloadCard (){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {        
        if(value !== null){
            const price = value.price !== null ? value.price : 0;
            totalPrice = totalPrice + price;
            count = count + value.quantity;

            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
            <div><img src="${value.img}"loading="lazy"></div>
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
    total.innerText = totalPrice.toLocaleString()+"$";
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    // save to local storage cookie new
    let timeSave = "expires=Thu, 01 Jan 2025 00:00:00 GMT";
    document.cookie = "listCards="+JSON.stringify(listCards)+"; "+timeSave+"; path=/;";
    reloadCard();
}
// Clear all cookies for fix Null Error in Chrome
// function deleteAllCookies() {
//     const cookies = document.cookie.split(";");

//     for (let i = 0; i < cookies.length; i++) {
//         const cookie = cookies[i];
//         const eqPos = cookie.indexOf("=");
//         const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
//         document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
//     }
// }
// deleteAllCookies()
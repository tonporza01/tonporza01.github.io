let listCard = document.querySelector('.listCard');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let body = document.querySelector('body');

let listCards = [];

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

reloadCard();
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
    total.innerText = totalPrice.toLocaleString()+"$";
    quantity.innerText = count;
}

// function changeQuantity(key, quantity){
//     if(quantity == 0){
//         delete listCards[key];
//     }else{
//         listCards[key].quantity = quantity;
//         listCards[key].price = quantity * products[key].price;
//     }
// //     // save to local storage cookie new
//     let timeSave = "expires=Thu, 01 Jan 2025 00:00:00 GMT";
//     document.cookie = "listCards="+JSON.stringify(listCards)+"; "+timeSave+"; path=/;";
//     reloadCard();
// }
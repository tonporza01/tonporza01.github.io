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
        if(value != null){
            const price = value.price !== null ? value.price : 0;
            totalPrice = totalPrice + price;
            count = count + value.quantity;
            
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
            <div><img src="${value.img}"></div>
            <div>${value.name}</div>
            <div>${value.price.toLocaleString()}$</div>
            <div>
            <div class="count">${value.quantity}</div>

            `;
            listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString()+"$";
    quantity.innerText = count;
}
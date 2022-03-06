if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
let wish = JSON.parse(localStorage.getItem("wish")) || [];


function ready() {

    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    // var cartItems = document.getElementsByClassName('cart-items')[0]
    // var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    var wishItems = document.getElementsByClassName('wish-items')[0]
    var wishItemNames = wishItems.getElementsByClassName('wish-item-title')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    var addToWishlistButtons = document.getElementsByClassName('wishlist-item-button')
    for (var i = 0; i < addToWishlistButtons.length; i++) {
        var button = addToWishlistButtons[i]
        button.addEventListener('click', addToWishlistClicked)
    }
    for (let i = 0; i < wish.length; i++) {
        let { prices, imageSrcs, titles } = wish[i];
        var wishRow = document.createElement('div')
        wishRow.classList.add('wish-row')
        var wishRowContents = `
        <div class="wish-item wish-column">
            <img class="wish-item-image" src="${imageSrcs}" width="100" height="100">
            <span class="wish-item-title">${titles}</span>
        </div>
        <span class="wish-price wish-column">${prices}</span>
        <div class="wish-quantity wish-column">
            <input class="wish-quantity-input" type="number" value="1">
        </div>`
        wishRow.innerHTML = wishRowContents
        wishItems.append(wishRow)
        wishRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
        wishRow.getElementsByClassName('wish-quantity-input')[0].addEventListener('change', quantityChanged)

    }
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addToWishlistClicked(event) {
    var buttons = event.target
    var shopItems = buttons.parentElement.parentElement
    var titles = shopItems.getElementsByClassName('shop-item-title')[0].innerText
    var prices = shopItems.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrcs = shopItems.getElementsByClassName('shop-item-image')[0].src
    addItemToWishlist(titles, prices, imageSrcs)
}

function addItemToCart(title, price, imageSrc) {
    // let obj = {
    //     title,
    //     price,
    //     imageSrc,
    // }
    // cart.push(obj);
    // localStorage.setItem("cart", JSON.stringify(cart));
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')

    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('Rs ', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = 'Rs ' + total
}

function addItemToWishlist(titles, prices, imageSrcs) {
    let obj = {
        titles,
        prices,
        imageSrcs,
    }
    wish.push(obj);
    localStorage.setItem("wish", JSON.stringify(wish));
    var wishItems = document.getElementsByClassName('wish-items')[0]
    var wishItemNames = wishItems.getElementsByClassName('wish-item-title')
    var wishRow = document.createElement('div')
    wishRow.classList.add('wish-row')

    for (var i = 0; i < wishItemNames.length; i++) {
        if (wishItemNames[i].innerText == title) {
            alert('This item is already added to the wishlist')
            return
        }
    }
    var wishRowContents = `
        <div class="wish-item wish-column">
            <img class="wish-item-image" src="${imageSrcs}" width="100" height="100">
            <span class="wish-item-title">${titles}</span>
        </div>
        <span class="wish-price wish-column">${prices}</span>
        <div class="wish-quantity wish-column">
            <input class="wish-quantity-input" type="number" value="1">
        </div>`
    wishRow.innerHTML = wishRowContents
    wishItems.append(wishRow)
    wishRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('wish-quantity-input')[0].addEventListener('change', quantityChanged)
}


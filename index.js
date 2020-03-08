const ul = document.querySelector('#myList');
let objectsInCart = [];
let objects = [];
let total = 0;

const orderBtn = document.getElementById('orderBtn')
const emptyCartBtn = document.getElementById('emptyCart')

orderBtn.addEventListener('click', sendOrder);
emptyCartBtn.addEventListener('click', emptyCart);

function emptyCart() {
  objectsInCart = [];

  var ul = document.getElementById("cart");
  document.body.removeChild(ul);

  let node = document.createElement("UL");
  node.setAttribute("id", "cart");
  document.body.appendChild(node);

  total = 0;

  let span = document.getElementById('total');
  span.innerHTML = ''
}

function sendOrder() {

  if (objectsInCart.length > 0) {

    alert('Order Successfully Proccessed!')
    localStorage.setItem('objectsOrdered', JSON.stringify(objectsInCart));
    objectsInCart = [];

    var ul = document.getElementById("cart");
    document.body.removeChild(ul);

    let node = document.createElement("UL");
    node.setAttribute("id", "cart");
    document.body.appendChild(node);

    total = 0;

    let span = document.getElementById('total');
    span.innerHTML = ''

    var win = window.open('orderProcessed.html', '_blank');
    win.focus();

  } else {
    alert('No Products Selected!')
  }
}

function objectNotInCart(objectName, objectQuantity) {

  for (let i = 0; i < objectsInCart.length; i++) {

    let object = objectsInCart[i];
    if (object.name === objectName) {

      object.quantity = parseInt(object.quantity) + parseInt(objectQuantity);
      var node = document.getElementById('p' + object.id);

      var input = document.getElementById('ci' + object.id);
      input.value = object.quantity
      node.innerText = object.name + ' ' + object.price;
      return false;
    }
  }
  return true;
}

$("#myList").on("click", "button", function () {
  let object;

  objects.forEach(obj => {
    if (obj.id == $(this)[0].id) {
      object = obj;
    }
  })

  let inputQuantity = document.getElementById('i' + object.id).value;

  if (inputQuantity < 0) {
    alert('Please Pick a number of 1 or above');
    document.getElementById('i' + object.id).value = 1;
    return;
  }

  if (objectNotInCart(object.name, inputQuantity)) {

    object.quantity = inputQuantity;

    objectsInCart.push(object)
    var node = document.createElement("LI");
    var paragraph = document.createElement('P');
    var input = document.createElement('INPUT');
    input.setAttribute('id', 'ci' + object.id)
    input.setAttribute('type', 'number');
    input.setAttribute('min', 0);
    input.value = inputQuantity

    paragraph.setAttribute('id', 'p' + object.id)
    node.setAttribute('class', 'listItem')
    node.setAttribute('id', object.id)

    paragraph.innerText = object.name + ' ' + object.price + ':- st';

    var btn = document.createElement('button');
    btn.innerHTML = 'Remove';
    btn.setAttribute('class', 'removeButton');
    btn.setAttribute('id', 'b' + object.id)

    var btnSetQuantity = document.createElement('button');
    btnSetQuantity.innerHTML = 'Set Quantity';
    btnSetQuantity.setAttribute('class', 'setQuantiy');
    btnSetQuantity.setAttribute('id', 'bq' + object.id);

    btnSetQuantity.addEventListener('click', function () {

      if (input.value < 0) {
        alert('Please Pick a number of 0 or above');
        input.value = object.quantity;
        return;
      }

      for (let i = 0; i < objectsInCart.length; i++) {
        if (input.value == 0) {
          objectsInCart.splice(i, 1);
          input.parentNode.remove();
        }
      }

      let priceOfObjectsRemoved = object.quantity * object.price;
      object.quantity = input.value;
      total = total - priceOfObjectsRemoved;

      total = total + parseInt(input.value) * parseInt(object.price);

      let span = document.getElementById('total');

      span.innerHTML = total;
    })


    node.appendChild(paragraph);
    node.appendChild(btn);
    node.appendChild(input);
    node.appendChild(btnSetQuantity);

    btn.addEventListener('click', function () {
      removeListItem(object.id);
    });

    document.getElementById("cart").appendChild(node);
  }

  calculateTotal(object.price, inputQuantity);
});

let listOfRemoveButtons = document.querySelectorAll('.removeButton');

function removeListItem(idNumber) {

  let listOfListItems = document.querySelectorAll('.listItem')

  listOfListItems.forEach((listItem) => {

    let removeButton = listItem.querySelector('.removeButton');

    if (removeButton.id == ('b' + idNumber)) {
      for (let i = 0; i < objectsInCart.length; i++) {
        object = objectsInCart[i];
        if (object.id == idNumber) {

          total = total - (object.price * object.quantity);

          let span = document.getElementById('total');

          span.innerHTML = total;

          objectsInCart.splice(i, 1);
        }
      }
      listItem.remove();
    }
  })
}

function calculateTotal(price, quantity) {
  let span = document.getElementById('total');
  total = (price * quantity) + total
  span.innerHTML = total;
}


const myRequest = new Request('data.json');
fetch(myRequest)
  .then(resp => resp.json())
  .then(data => {
    objects = data

    for (const object of data) {
      var node = document.createElement("LI");
      var input = document.createElement('INPUT');
      var button = document.createElement('button');
      input.setAttribute('id', 'i' + object.id)
      input.setAttribute('type', 'number')
      input.setAttribute('min', 0)
      button.setAttribute('id', object.id)
      button.innerHTML = 'Add to Cart'
      input.value = 1;
      var textnode = document.createTextNode(object.name);
      node.appendChild(textnode);
      node.appendChild(input);
      node.appendChild(button);
      document.getElementById("myList").appendChild(node);
      document.getElementById("myList").appendChild(input);
      document.getElementById("myList").appendChild(button);
    }
  })
  .catch(err => console.log(err));
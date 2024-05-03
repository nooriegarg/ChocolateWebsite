let addtolist =document.querySelector('.addtolist');
let closeBtn = document.querySelector('.add-to-bundle .close');
let body = document.querySelector('body');
let ChocoListHtml = document.querySelector(".grid-container");
let BundleListHtml = document.querySelector(".list-chocolate");
let totalpriceHtml = document.querySelector(".total");


let listChocolates = [];
let bundle = [];

addtolist.addEventListener('click', () =>{
    body.classList.toggle('active');
})

closeBtn.addEventListener('click', () =>{
    body.classList.toggle('active');
})

const addDataToHtml = () => {
    ChocoListHtml.innerHTML = '';
    if(listChocolates.length > 0){
        listChocolates.forEach(product => {
            let newChoco = document.createElement('div');
            newChoco.classList.add('grid-item');
            newChoco.dataset.id = product.id;
            newChoco.innerHTML = `<img src="${product.image}"><p>${product.name}</p><div class="price">${product.price}/-</div><button class="addList">ADD</button>`;
            ChocoListHtml.appendChild(newChoco);
        })
    }
}
ChocoListHtml.addEventListener('click',(event) =>{
    let Click = event.target;
    if(Click.classList.contains("addList")){
        let choco_id = Click.parentElement.dataset.id;
        addToList(choco_id);
    }
})

const addToList = (choco_id) =>{
    let positionInBundle = bundle.findIndex((value)=> value.choco_id==choco_id);
    if(bundle.length <= 0){
        bundle = [{
            choco_id: choco_id,
            quantity: 1
        }]
    }else if(positionInBundle < 0){
        bundle.push({
            choco_id: choco_id,
            quantity: 1
        });

    }else{
        bundle[positionInBundle].quantity = bundle[positionInBundle].quantity +1;
    }
    addChocoToBundle();
    //addToMemory();
}



const addChocoToBundle = () => {
    BundleListHtml.innerHTML = '';
    let totalquantity = 0;
    let totalprice = 0;
    if(bundle.length > 0 ){

        bundle.forEach(bundle =>{
            totalquantity = totalquantity + bundle.quantity;
            let total = document.createElement('div');
            total.classList.add('total');
            total.dataset.id = bundle.choco_id;
            let newbundle = document.createElement('div');
            newbundle.classList.add('item');
            newbundle.dataset.id = bundle.choco_id;
            let positonChoco = listChocolates.findIndex((value) => value.id ==bundle.choco_id);
            let info = listChocolates[positonChoco];
            let chocoprice = info.price * bundle.quantity;
            totalprice = totalprice + chocoprice;
            newbundle.innerHTML = `<div class="image">
            <img src="${info.image}">
            </div>
            <div class="name">${info.name}</div>
            <div class="totalPrice">${info.price * bundle.quantity}/-</div>
            <div class="quantity" data-id="${chocoprice}">
            <span class="minus">-</span>
            <span>${bundle.quantity}</span>
            <span class="plus">+</span>
            </div>`;

            if(totalquantity >8){
                alert("Cannot add more than 8 items in bundle!");
            }else{ 
                BundleListHtml.appendChild(newbundle);
            };
        })
    }
    showTotal(totalprice);
}

const showTotal = (totalprice) =>{
    totalpriceHtml.innerHTML = `<div class="total">
                                <hr>
                                <h3>Total price: ${totalprice}/-</h3>
                                </div>`;
   
    
}

BundleListHtml.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains("minus") || positionClick.classList.contains("plus")){
        let choco_id = positionClick.parentElement.dataset.id;
        let type = "minus";
        if(positionClick.classList.contains("plus")){
            type="plus";
        }
        console.log('clicked');
        changeQuantity(choco_id, type);
    }
})

const changeQuantity = (choco_id, type) =>{
    let positionInBundle = bundle.findIndex((value) => value.choco_id == choco_id);
    if(positionInBundle >= 0){
        switch(type){
            case "plus":
                bundle[positionInBundle].quantity = bundle[positionInBundle].quantity +1 ;
                console.log(bundle[positionInBundle].quantity);
                break;

            default:
                let valueChange = bundle[positionInBundle].quantity-1;
                if(valueChange > 0){
                    bundle[positionInBundle].quantity = valueChange;
                }else{
                    bundle.splice(positionInBundle,1);
                }
                console.log(bundle[positionInBundle].quantity);
                break;
        }
    }
}


const initapp =  () =>{
    //getting data from json file
    fetch("chocolates.json")
    .then(response => response.json())
    .then(data => {
        listChocolates = data;
        addDataToHtml();
    })
}
initapp();
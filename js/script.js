let ChocoListHtml = document.querySelector(".carousel");


let listChocolates = [];


const addDataToHtml = () => {
    ChocoListHtml.innerHTML = '';
    if(listChocolates.length > 0){
        listChocolates.forEach(product => {
            let newChoco = document.createElement('div');
            newChoco.classList.add('item');
            newChoco.dataset.id = product.id;
            newChoco.innerHTML = `<img src="${product.image}"><p>${product.name}</p><div class="price">${product.price}/-</div><button class="addList">ADD</button>`;
            ChocoListHtml.appendChild(newChoco);
        })
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
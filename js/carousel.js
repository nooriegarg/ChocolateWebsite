const initSlider = () => {
    const itemList = document.querySelector(".carousel .item");
    const slideButtons = document.querySelectorAll(".carousel .slide-button");

    slideButtons.forEach(button => {
        button.addEventListener("click", ()=> {
            const direction = button.id == "prev-slider" ? -1: 1;
            const scrollAmount = itemList.clientWidth * direction;
            itemList,scrollBy({left: scrollAmount, behavior: "smooth"})
        });
    });
}



window.addEventListener("load", initSlider);
import JSSlider from "./modules/JSSlider.js";

const init = function () {
    const imagesList = document.querySelectorAll('.gallery__item');
    imagesList.forEach(img => {
        img.dataset.sliderGroupName = Math.random() > 0.5 ? 'nice' : 'good';
    }); // za każdym przeładowaniem strony przydzielaj inną nazwę grupy dla zdjęcia

    // runJSSlider();
    const jsSlider = new JSSlider(".gallery__item");
    jsSlider.run()
}
// console.log(JSSlider);

document.addEventListener('DOMContentLoaded', init);


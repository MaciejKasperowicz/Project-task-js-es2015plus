export default class JSSlider {
    constructor(imagesSelector = ".gallery__item", sliderRootSelector = ".js-slider") {
        this.imagesSelector = imagesSelector;
        this.sliderRootSelector = sliderRootSelector;
        this.interval = 0;
    }
    run() {
        this.imagesList = document.querySelectorAll(this.imagesSelector);
        this.sliderRootElement = document.querySelector(this.sliderRootSelector);
        // this.initEvents(this.imagesList, this.sliderRootElement);
        this.initEvents();
        // initCustomEvents(imagesList, sliderRootElement, imagesSelector);
        this.initCustomEvents();
    }

    // initEvents(imagesList, sliderRootElement) {
    initEvents() {
        this.imagesList.forEach(item => {
            item.addEventListener('click', e => {
                this.fireCustomEvent(e.currentTarget, 'js-slider-img-click');
            });
        });

        // todo: 
        // utwórz event o nazwie [click], który ma uruchomić event [js-slider-img-next]
        // na elemencie [.js-slider__nav--next]
        const navNext = this.findElement('.js-slider__nav--next');
        if (navNext) {
            // this.launchCustomEventAfterInteraction(navNext, this.sliderRootElement, 'click', 'js-slider-img-next');
            navNext.addEventListener("click", () => this.fireCustomEvent(this.sliderRootElement, 'js-slider-img-next'))
        }

        // todo:
        // utwórz event o nazwie [click], który ma uruchomić event [js-slider-img-prev]
        // na elemencie [.js-slider__nav--prev]
        const navPrev = this.findElement('.js-slider__nav--prev');
        if (navPrev) {
            // this.launchCustomEventAfterInteraction(navPrev, this.sliderRootElement, 'click', 'js-slider-img-prev');
            navPrev.addEventListener("click", () => this.fireCustomEvent(this.sliderRootElement, 'js-slider-img-prev'))
        }

        // todo:
        // utwórz event o nazwie [click], który ma uruchomić event [js-slider-close]
        // tylko wtedy gdy użytkownik kliknie w [.js-slider__zoom]
        const zoom = this.findElement('.js-slider__zoom');
        if (zoom) {
            zoom.addEventListener('click', e => {
                if (e.target === e.currentTarget) {
                    this.fireCustomEvent(this.sliderRootElement, 'js-slider-close');
                }
            })
        }
    }

    findElement(selector) {
        return this.sliderRootElement.querySelector(selector);
    }

    fireCustomEvent(element, name) {
        console.log(element.className, '=>', name);

        const event = new CustomEvent(name, {
            bubbles: true,
        });

        element.dispatchEvent(event);
    }

    initCustomEvents() {
        this.imagesList.forEach(img => {
            img.addEventListener('js-slider-img-click', event => {
                // this.onImageClick(event, this.sliderRootElement, this.imagesSelector);
                this.onImageClick(event);
                // this.onStart()
            });
        });
        this.sliderRootElement.addEventListener('js-slider-img-next', this.onImageNext);
        this.sliderRootElement.addEventListener('js-slider-img-prev', this.onImagePrev);
        this.sliderRootElement.addEventListener('js-slider-close', this.onClose);

    }

    onImageClick(event) {
        // todo:  
        // 1. dodać klasę [js-slider--active], aby pokazać całą sekcję
        // 2. wyszukać ściężkę do klikniętego elementu i wstawić do [.js-slider__image]
        // 3. pobrać nazwę grupy zapisaną w dataset klikniętego elementu
        // 4. wyszukać wszystkie zdjęcia należące do danej grupy
        // 5. utworzyć na podsawie elementu [.js-slider__thumbs-item--prototype] zawartość dla [.js-slider__thumbs]
        // 6. zaznaczyć przy pomocy klasy [.js-slider__thumbs-image--current], który element jest aktualnie wyświetlany
        this.sliderRootElement.classList.add('js-slider--active');

        const src = event.currentTarget.querySelector('img').src;
        this.sliderRootElement.querySelector('.js-slider__image').src = src;

        const groupName = event.currentTarget.dataset.sliderGroupName;
        const thumbsList = document.querySelectorAll(`${this.imagesSelector}[data-slider-group-name=${groupName}]`);
        const prototype = document.querySelector('.js-slider__thumbs-item--prototype');
        thumbsList.forEach((item) => {
            const thumbElement = prototype.cloneNode(true);
            thumbElement.classList.remove('js-slider__thumbs-item--prototype');
            const thumbImg = thumbElement.querySelector('img');
            thumbImg.src = item.querySelector('img').src;
            if (thumbImg.src === src) {
                thumbImg.classList.add('js-slider__thumbs-image--current');
            }

            document.querySelector('.js-slider__thumbs').appendChild(thumbElement);
        })
        // this.onStart()
    }

    onImageNext() {
        console.log(this, 'onImageNext');
        // [this] wskazuje na element [.js-slider]

        // todo:
        // 1. wyszukać aktualny wyświetlany element przy pomocy [.js-slider__thumbs-image--current]
        // 2. znaleźć element następny do wyświetlenie względem drzewa DOM
        // 3. sprawdzić czy ten element istnieje
        // 4. przełączyć klasę [.js-slider__thumbs-image--current] do odpowiedniego elementu
        // 5. podmienić atrybut src dla [.js-slider__image]
        const currentClassName = 'js-slider__thumbs-image--current';
        const current = this.querySelector(`.${currentClassName}`);
        // console.log(current)
        // if (!current) {
        //     return
        // }
        const parentCurrent = current.parentElement;
        const nextElement = parentCurrent.nextElementSibling;
        if (nextElement && !nextElement.className.includes('js-slider__thumbs-item--prototype')) {
            const img = nextElement.querySelector('img')
            img.classList.add(currentClassName);

            this.querySelector('.js-slider__image').src = img.src;
            current.classList.remove(currentClassName);
        }

    }

    onImagePrev() {
        console.log(this, 'onImagePrev');
        // [this] wskazuje na element [.js-slider]

        // todo:
        // 1. wyszukać aktualny wyświetlany element przy pomocy [.js-slider__thumbs-image--current]
        // 2. znaleźć element poprzedni do wyświetlenie względem drzewa DOM
        // 3. sprawdzić czy ten element istnieje i czy nie posiada klasy [.js-slider__thumbs-item--prototype]
        // 4. przełączyć klasę [.js-slider__thumbs-image--current] do odpowiedniego elementu
        // 5. podmienić atrybut src dla [.js-slider__image]
        const currentClassName = 'js-slider__thumbs-image--current';
        const current = this.querySelector(`.${currentClassName}`);

        const parentCurrent = current.parentElement;
        const prevElement = parentCurrent.previousElementSibling;
        if (prevElement && !prevElement.className.includes('js-slider__thumbs-item--prototype')) {
            const img = prevElement.querySelector('img')
            img.classList.add(currentClassName);

            this.querySelector('.js-slider__image').src = img.src;
            current.classList.remove(currentClassName);
        }
    }

    onClose(event) {
        // todo:
        // 1. należy usunać klasę [js-slider--active] dla [.js-slider]
        // 2. należy usunać wszystkie dzieci dla [.js-slider__thumbs] pomijając [.js-slider__thumbs-item--prototype]
        event.currentTarget.classList.remove('js-slider--active');
        const thumbsList = this.querySelectorAll('.js-slider__thumbs-item:not(.js-slider__thumbs-item--prototype)');
        thumbsList.forEach(item => item.parentElement.removeChild(item));
    }


    onStart() {
        this.interval = setInterval(() => {
            this.fireCustomEvent(this.sliderRootElement, 'js-slider-img-next')
        }, 1500)
    }





}
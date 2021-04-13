export default class Slider {
    constructor(app, el) {
        this.el = el;

        this.handleClick = this.handleClick.bind(this);
        this.handleButton = this.handleButton.bind(this);
        this.setItemsSize = this.setItemsSize.bind(this);
        this.generateCards = this.generateCards.bind(this);

        this.counter = 0;
        this.carouselSlide = el.querySelector('.slider__slider');
        this.generateCards(this.carouselSlide);

        this.el.addEventListener('click', this.handleClick);
        window.onresize = this.setItemsSize;
    }

    handleClick(e) {
        const target = e.target;

        switch (true) {
            case (target.classList.contains('slider__button--prev') || target.closest('.slider__button--prev') != null):
                    this.handleButton(target.closest('.slider__button--prev'))
                break;
            case (target.classList.contains('slider__button--next') || target.closest('.slider__button--next') != null):
                    this.handleButton(target.closest('.slider__button--next'))
                break;
            
            default:
                break;
        }
    }

    getSize() {
        if (window.innerWidth > 1439) {
            return this.items[0].offsetWidth + 20;
        } 
        if (window.innerWidth > 767) {
            return this.items[0].offsetWidth + 13;
        }
        return this.items[0].offsetWidth + 11;
    }

    getLength() {
        if (window.innerWidth > 767 && this.counter > this.items.length - 7) {
            return true;
        } 
        if (window.innerWidth < 768 && this.counter > this.items.length - 5) {
            return true;
        }
        return false;
    }

    handleButton(button) {
        this.carouselSlide.style.transition = 'transform .4s';

        if (button.classList.contains('slider__button--prev')) {
            if (this.counter < 2) {
                this.el.querySelector('.slider__button--prev').disabled = true;
            };
            this.el.querySelector('.slider__button--next').disabled = false;
            this.counter--;
        } 

        if (button.classList.contains('slider__button--next')) {
            if (this.getLength()) {
                this.el.querySelector('.slider__button--next').disabled = true;
            };
            this.el.querySelector('.slider__button--prev').disabled = false;
            this.counter++;
        } 

        this.carouselSlide.style.transform = `translateX(-${ this.getSize() * this.counter }px)`;
    } 

    setItemsSize() {

        this.items.forEach(item => {
            if (window.innerWidth > 1439) {
                // item.style.width = `${this.el.querySelector('.slider__slider-wrapper').offsetWidth/5 - 4*20/5}px`;
                item.style.width = `${(this.el.querySelector('.slider__track').offsetWidth - 4*20)/5}px`;
                return;
            }
            if (window.innerWidth > 767) {
                // item.style.width = `${this.el.querySelector('.slider__track').offsetWidth/5 - 4*13/5}px`;
                item.style.width = `${(this.el.querySelector('.slider__track').offsetWidth - 4*13)/5}px`;
                return;
            }
            item.style.width = `${(this.el.querySelector('.slider__track').offsetWidth - 2*11)/3}px`;
        });
    }

    generateCards(wrapper) {
        fetch('../data.json')
            .then(response => {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' + response.status);
                        return;
                    }
                    response.json().then((data) => {
                        let content = '';
                        data.forEach(item => {
                            content += `
                                <div class="slider__slider-card">
                                    <a href="#" class="slider__image-wrapper">
                                        <img class="slider__image" src="${item.image}" alt="Some alt tag">
                                    </a>
                                    <a href="#" class="slider__product">${item.name}</a>
                                    <span class="slider__price">€ ${item.price}</span>
                                </div>
                            `
                        });

                        wrapper.insertAdjacentHTML('beforeend', content);
                        this.items = this.el.querySelectorAll('.slider__slider-card');
                        this.setItemsSize();
                      });
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }
}

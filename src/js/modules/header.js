import $ from 'jquery';

export default class Header {
    constructor(app, el) {
        this.el = el;

        this.handleClick = this.handleClick.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.el.addEventListener('click', this.handleClick);
        this.menuIsOpen = false;
    }

    handleClick(e) {
        const target = e.target;
    
        switch (true) {
            case (target.classList.contains('header__hamburger') || target.closest('.header__hamburger') != null):
                    this.toggleMenu(this.el);
                break;
            
            default:
                break;
        }
    }

    toggleMenu(el) {  
        $(el).find('.header__nav').fadeToggle();
        $(el).find('.header__logo').toggleClass('header__logo--open');
        $(el).find('.header__hamburger').toggleClass('header__hamburger--open');
        this.menuIsOpen = !this.menuIsOpen;
        
        if (this.menuIsOpen) {
            $(el).find('.header__hamburger-icon').html('<use xlink:href="#close-icon"></use>');
        } else {
            $(el).find('.header__hamburger-icon').html('<use xlink:href="#nav-icon"></use>');
        }
    }
}



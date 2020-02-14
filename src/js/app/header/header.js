export class Header {
    constructor() {
        this.element = document.querySelector('.js-header');
        this.OFFSET = 350;
    }

    checkPosition() {
        if (window.pageYOffset > this.OFFSET) {
            this.element.classList.add('fixed');
        } else {
            this.element.classList.remove('fixed');
        }
    }

    addListeners() {
        window.addEventListener('scroll', this.checkPosition.bind(this));
    }

    init() {
        this.addListeners();
    }
}
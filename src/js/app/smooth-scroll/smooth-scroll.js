export class SmoothScroll {
    constructor() {
        this.anchors = document.querySelectorAll('.js-smooth-scroll');
    }

    scroll(e) {
        let targetID = e.currentTarget.getAttribute('href');
        let targetPosition = document.querySelector(targetID).offsetTop;
        let startPosition = window.pageYOffset;
        let distance = targetPosition - startPosition;
        let duration = 1000;
        let start = null;

        var ease = function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) {
                return c / 2 * t * t * t + b;
            }
            t -= 2;
            return c / 2 * (t * t * t + 2) + b;
        };

        var step = function (timestamp) {
            if (!start) {
                start = timestamp;
            }
            var progress = timestamp - start;
            window.scrollTo(0, ease(progress, startPosition, distance, duration));
            if (progress < duration) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);

    }

    onClick(e) {
        e.preventDefault();
        this.scroll(e);
    }

    addListeners() {
        this.anchors.forEach(anchor => {
            anchor.addEventListener('click', this.onClick.bind(this));
        })
    }

    init() {
        this.addListeners();
    }
}


import { Audioplayer } from './audioplayer/audioplayer';
import { Slider } from './slider/slider';
import { Header } from './header/header';
import { SmoothScroll } from './smooth-scroll/smooth-scroll';

export default function () {
    const playerElements = document.querySelectorAll('.js-audioplayer');
    const players = [];
    const onPlaying = function () {
        players.forEach(pl => {
            if (pl !== this) {
                pl._pause();
            }
        });
    };

    playerElements.forEach(el => {
        let player = new Audioplayer(el);
        player.init();
        players.push(player);
        player.onPlay(onPlaying);
    });

    const slider = new Slider();
    slider.init();

    const header = new Header();
    header.init();

    const smoothScroll = new SmoothScroll();
    smoothScroll.init();
};

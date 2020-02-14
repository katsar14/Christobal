export class Audioplayer {
    constructor(element) {
        this.playerElement = element;
        this.audio = this.playerElement.querySelector('audio');
        this.progressBar = this.playerElement.querySelector('[data-action="progress"]');
        this.progress = this.progressBar.querySelector('.js-progress');
        this.volumeBar = this.playerElement.querySelector('[data-action="volume"]');
        this.volume = this.volumeBar.querySelector('.js-volume');
        this.duration = this.playerElement.querySelector('.js-duration');
        this.state = 'paused';
    }

    _onAudioEnd() {
        this.state = 'paused';
        this.audio.removeEventListener('ended', this._onAudioEnd.bind(this));
        this.playerElement.classList.remove('playing');
    }

    _setDuration() {
        let duration = this.audio.duration;
        let minutes = Math.floor(duration / 60);
        minutes < 10 ? minutes = '0' + minutes : '';
        let seconds = Math.floor(duration % 60);
        seconds < 10 ? seconds = '0' + seconds : '';
        this.duration.textContent = `${minutes}:${seconds}`
    }

    _play() {
        this.audio.play();
        this.state = 'playing';
        this.playerElement.classList.add('playing');
    }

    _pause() {
        this.audio.pause();
        this.state = 'paused';
        this.playerElement.classList.remove('playing');
    }

    _mute() {
        this.audio.muted = !this.audio.muted;
        this.audio.muted ? this.playerElement.classList.add('muted') : this.playerElement.classList.remove('muted');
    }

    _updateProgress(e) {
        let pos = (e.pageX  - this.progressBar.offsetLeft) / this.progressBar.offsetWidth;
        this.audio.currentTime = pos * this.audio.duration;
    }

    _updateVolume(e) {
        if (this.audio.muted) {
            this._mute();
        }
        let pos = (e.pageX  - this.volumeBar.offsetLeft) / this.volumeBar.offsetWidth;
        this.audio.volume = pos;
    }

    _onStateChange() {
        if (this.state === 'paused') {
            this._play();
        } else if (this.state === 'playing') {
            this._pause();
        }
    }

    _onClick(e) {
        let action = e.target.dataset.action || e.target.parentElement.dataset.action;
        if (!action) {
            return;
        }
        if (action === "playpause") {
            this._onStateChange();
        }

        if (action === "mute") {
            this._mute();
        }

        if (action === "progress") {
            this._updateProgress(e);
        }

        if (action === "volume") {
            this._updateVolume(e);
        }
    }

    _onTimeUpdate() {
        this.progress.style.width = Math.floor((this.audio.currentTime / this.audio.duration) * 100) + '%';

    }

    _onLoad() {
        this._setDuration();
    }

    _onVolumeUpdate() {
        let vol = this.audio.volume;
        this.audio.muted ? this.volume.style.width = '0' : this.volume.style.width = vol * 100 + '%';
    }

    onPlay(callback) {
        this.audio.addEventListener('playing', callback.bind(this));
    }

    _addListeners() {
        this.playerElement.addEventListener('click', this._onClick.bind(this));
        this.audio.addEventListener('timeupdate', this._onTimeUpdate.bind(this));
        this.audio.addEventListener('volumechange', this._onVolumeUpdate.bind(this));
        this.audio.addEventListener('loadeddata', this._onLoad.bind(this));
        this.audio.addEventListener('ended', this._onAudioEnd.bind(this));
    };

    init() {
        this._addListeners();
    }
}
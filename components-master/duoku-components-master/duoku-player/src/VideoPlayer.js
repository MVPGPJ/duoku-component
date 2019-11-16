let _vphtml =`
<div class="video-wrap">
  <video poster="" src=""
    webkit-playsinline="true"
    x-webkit-airplay="true"
    x5-playsinline="true"
    playsinline>
  您的浏览器不支持 video 标签。
  </video>
</div>
<div class="player-tips">
    <div class="playing">
      <svg class="icon-play" viewBox="0 0 36 36">
        <path d="M25.8 18c0 .6-.3 1.1-.8 1.3L12.5 27c-.2.1-.5.2-.8.2-.8 0-1.5-.6-1.5-1.5V10c0-.8.7-1.5 1.5-1.5.3 0 .5.1.8.2l12.7 7.9c.4.5.6.9.6 1.4z"></path>
      </svg>
    </div>
    <div class="waiting"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAACAElEQVRIie3XTUvUURTH8fEJwSmUtCJCzMhn9CW4cNFC8A20D6VlQbSqVYva5HsIIQyiTbSpNm4NSsho6yKCaOEiiNI+LeaQ1+uM4//fZJsO3M059/y+92Hm3POvVEoYqngXo1pGoxlgAMN1/FP2bKpOfBgDZaF92MBnjGaxMezEGMtiE5Gzgb4y4H5sx64eFQA/jZxt9BcGh8hicqSXm4Exn8xfLAUNoTashdAGOsI/jt0Y4+HrwNuYu4a2o0J60VvHP5vs4nr4RhLfSCzwRuKbbaDflzvPxI62cA3dWXw1BD+iG11YjtGl9vf6EnNWs9zO0NzCm333jiH8SFa8hrkkPojnuIf2Ortpx/2YM5j45/Ay0f2Gc3nyBFbst2V0NbyfBoaLeJhprWDysKQFrCcJhQsBXiX561gokryE+aLQyL2D97hZJv+PDCeaTejBtFpRGMckeloEHw3ddEyjWlF7YdirRD/xrAXQB2oFZicb8LqCzQS820Lwcmjl8N/g/KinWnjUk6F58Kj/G67gLs4eF3ACj5OKs3Qc0CH7H4kXuHQc4PxZPPAC/U34wYf6Xxpu45ajtjItgl5N7v1kgbwLkoagKDRtb5+gM4s36tHG8B2flGlvHd7Q90aN38zhURK/4kPp3wxOq/8JM5NcwUyd+HmcKgVtsqBqsuNSBf8XyEiy3RVQmkAAAAAASUVORK5CYII=" alt=""></div>
    <div class="warning">
      <svg class="icon-warning" viewBox="0 0 36 36">
        <path class="cls-1" d="M32.2,28.3L19.4,5.9c-0.1-0.2-0.3-0.4-0.5-0.5c-0.3-0.2-0.8-0.2-1.1-0.1
      c-0.4,0.1-0.7,0.4-0.9,0.7L4,28.3c-0.1,0.2-0.2,0.5-0.2,0.7c0,0.8,0.6,1.5,1.4,1.5c0,0,0,0,0,0h25.6c0.7,0,1.3-0.4,1.4-1.1
      C32.4,29,32.4,28.6,32.2,28.3z M20,26.6c0,0.8-0.7,1.5-1.5,1.5h-0.8c-0.8,0-1.5-0.7-1.5-1.5v-0.8c0-0.8,0.7-1.5,1.5-1.5h0.8
      c0.8,0,1.5,0.7,1.5,1.5V26.6z M20,20.5c0,1-0.7,1.9-1.5,1.9h-0.8c-0.8,0-1.5-0.8-1.5-1.9v-7.3c0-1,0.7-1.9,1.5-1.9h0.8
      c0.8,0,1.5,0.8,1.5,1.9V20.5z"></path>
      </svg>
    </div>
    <div class="replaying">
      <svg class="icon-replay" viewBox="0 0 36 36">
        <path d="M17.9 28c-4.9 0-9-3.6-9.8-8.3V19.4c0-.8.7-1.4 1.5-1.4s1.5.6 1.5 1.4c.8 3.8 4.5 6.2 8.3 5.4s6.2-4.5 5.4-8.3c-.7-3.2-3.5-5.6-6.9-5.6-1.8 0-3.6.7-4.8 2h1.3c.8 0 1.5.7 1.5 1.5s-.6 1.6-1.5 1.6h-4c-.8 0-1.5-.7-1.5-1.5v-4c0-.8.7-1.5 1.5-1.5.7 0 1.2.5 1.4 1.1C13.6 8.7 15.7 8 17.9 8c5.5 0 10 4.5 10 10s-4.4 10-10 10z"></path>
      </svg>
    </div>
</div>
<div class="player-controls">
  <div class="controls-left">
    <div class="switch play">
    <svg class="icon-play" viewBox="0 0 36 36">
        <path d="M25.8 18c0 .6-.3 1.1-.8 1.3L12.5 27c-.2.1-.5.2-.8.2-.8 0-1.5-.6-1.5-1.5V10c0-.8.7-1.5 1.5-1.5.3 0 .5.1.8.2l12.7 7.9c.4.5.6.9.6 1.4z"></path>
    </svg>
    <svg class="icon-pause" viewBox="0 0 36 36">
        <path d="M12 9h1c.6 0 1 .4 1 1v16c0 .6-.4 1-1 1h-1c-.6 0-1-.4-1-1V10c0-.6.4-1 1-1zm11 0h1c.6 0 1 .4 1 1v16c0 .6-.4 1-1 1h-1c-.6 0-1-.4-1-1V10c0-.6.4-1 1-1z"></path>
    </svg>
    <svg class="icon-stop" viewBox="0 0 36 36">
        <path d="M24 26H12c-1.1 0-2-0.9-2-2V12c0-1.1 0.9-2 2-2h12c1.1 0 2 0.9 2 2v12C26 25.1 25.1 26 24 26z"></path>
    </svg>
    <svg class="icon-replay" viewBox="0 0 36 36">
        <path d="M17.9 28c-4.9 0-9-3.6-9.8-8.3V19.4c0-.8.7-1.4 1.5-1.4s1.5.6 1.5 1.4c.8 3.8 4.5 6.2 8.3 5.4s6.2-4.5 5.4-8.3c-.7-3.2-3.5-5.6-6.9-5.6-1.8 0-3.6.7-4.8 2h1.3c.8 0 1.5.7 1.5 1.5s-.6 1.6-1.5 1.6h-4c-.8 0-1.5-.7-1.5-1.5v-4c0-.8.7-1.5 1.5-1.5.7 0 1.2.5 1.4 1.1C13.6 8.7 15.7 8 17.9 8c5.5 0 10 4.5 10 10s-4.4 10-10 10z"></path>
    </svg>
    </div>
    <div class="time-current">00:00</div>
  </div>
  <div class="process-bar">
    <div class="process-bg"></div>
    <div class="process-buffer"></div>
    <div class="process-line"></div>
  </div>
  <div class="controls-right">
    <div class="time-duration">00:00</div>
    <div class="mute-btn mute-off">
      <svg class="icon-music-off" viewBox="-2 -2 25 25">
        <path d="M16.714 15.593l-.01-.01a1 1 0 0 1-1.705-.708c0-.287.124-.542.317-.724C16.354 13.073 17 11.614 17 10s-.645-3.072-1.682-4.151A.993.993 0 0 1 15 5.125a1 1 0 0 1 1-1c.3 0 .561.139.744.348l.017-.016A7.969 7.969 0 0 1 19 10c0 2.178-.874 4.15-2.286 5.593zm-3.999 3.122a.956.956 0 0 1-.688.28c-.009 0-.018.005-.027.005a.984.984 0 0 1-.75-.357L5.818 15H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h3.818l5.432-3.643A.984.984 0 0 1 12 1c.009 0 .017.005.026.005a.954.954 0 0 1 .968.967c.001.01.006.018.006.028v16c0 .009-.005.017-.005.026a.959.959 0 0 1-.28.689zM6.75 6.643A.984.984 0 0 1 6 7H3v6h3c.304 0 .567.143.75.357l4.25 2.85V3.792L6.75 6.643z"></path>
      </svg>
      <svg class="icon-music-on" viewBox="-2 -2 25 25">
        <path fill="white" d="M16.394 12.566A5.88 5.88 0 0 0 17 10a5.97 5.97 0 0 0-1.682-4.151.993.993 0 0 1-.318-.724 1 1 0 0 1 1-1c.3 0 .561.139.745.348l.016-.016A7.969 7.969 0 0 1 19 10a7.934 7.934 0 0 1-1.116 4.055l-1.49-1.489zM11 3.792L8.978 5.149 7.62 3.792l3.63-2.435A.984.984 0 0 1 12 1c.009 0 .017.005.026.005a.954.954 0 0 1 .968.967c.001.01.006.018.006.028v7.171l-2-2V3.792zm7.864 14.072a.999.999 0 0 1-1.414 0L2.136 2.55a1 1 0 1 1 1.415-1.415L18.864 16.45a1 1 0 0 1 0 1.414zM3.171 5l2 2H3v6h3c.304 0 .567.143.75.357l4.25 2.85v-3.379l2 2V18c0 .009-.005.017-.005.027a.955.955 0 0 1-.967.968c-.01 0-.019.005-.028.005a.984.984 0 0 1-.75-.357L5.818 15H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.171z"></path>
      </svg>
    </div>
    <div class="fullscreen-btn fullscreen-on">
      <svg class="icon-fullscreen-on" version="1.1" viewBox="0 0 25 25">
        <path d="M19.7 19.7c-.2.2-.5.3-.7.3h-4c-.6 0-1-.4-1-1s.4-1 1-1h1.6l-3.3-3.3c-.4-.4-.3-1.1.1-1.4.4-.4 1-.4 1.4 0l3.3 3.3V15c0-.6.4-1 1-1s1 .4 1 1v4c-.1.2-.2.5-.4.7zM19 10c-.6 0-1-.4-1-1V7.4l-3.3 3.3c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4L16.6 6H15c-.6 0-1-.4-1-1s.4-1 1-1h4c.3 0 .5.1.7.3.2.2.3.5.3.7v4c0 .6-.4 1-1 1zM7.4 18H9c.6 0 1 .4 1 1s-.4 1-1 1H5c-.3 0-.5-.1-.7-.3-.2-.2-.3-.5-.3-.7v-4c0-.6.4-1 1-1s1 .4 1 1v1.6l3.3-3.3c.4-.4 1.1-.3 1.4.1.4.4.4 1 0 1.4L7.4 18zm1.9-7.3L6 7.4V9c0 .6-.4 1-1 1s-1-.4-1-1V5c0-.3.1-.5.3-.7.2-.2.5-.3.7-.3h4c.6 0 1 .4 1 1s-.4 1-1 1H7.4l3.3 3.3c.4.4.4 1 0 1.4-.4.4-1 .4-1.4 0z"></path>
      </svg>
      <svg class="icon-fullscreen-off" version="1.1" viewBox="0 0 25 25">
        <path fill="white" d="M16.4 9H18c.6 0 1 .4 1 1s-.4 1-1 1h-4c-.3 0-.5-.1-.7-.3-.2-.2-.3-.5-.3-.7V6c0-.6.4-1 1-1s1 .4 1 1v1.6l3.3-3.3c.4-.4 1.1-.3 1.4.1.4.4.4 1 0 1.4L16.4 9zM10 19c-.6 0-1-.4-1-1v-1.6l-3.3 3.3c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4L7.6 15H6c-.6 0-1-.4-1-1s.4-1 1-1h4c.3 0 .5.1.7.3.2.2.3.5.3.7v4c0 .5-.4 1-1 1zm0-8H6c-.6 0-1-.4-1-1s.4-1 1-1h1.6L4.3 5.7c-.4-.4-.4-1 .1-1.4.4-.4 1-.4 1.4 0L9 7.6V6c0-.6.4-1 1-1s1 .4 1 1v4c0 .3-.1.5-.3.7-.2.2-.5.3-.7.3zm4 2h4c.6 0 1 .4 1 1s-.4 1-1 1h-1.6l3.3 3.3c.4.4.4 1 0 1.4s-1 .4-1.4 0L15 16.4V18c0 .6-.4 1-1 1s-1-.4-1-1v-4c0-.3.1-.5.3-.7.2-.2.5-.3.7-.3z"></path>
      </svg>
    </div>
  </div>
</div>`
if (typeof Object.assign != 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) { // .length of function is 2
      'use strict';
      if (target == null) { // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) { // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}
import './video-player.scss'
import {VideoControl} from './VideoControl.js'

window._vpdebug=(/eruda=true/.test (window.location) || localStorage.getItem ('active-eruda') == 'true');

export function VideoPlayer(options) {
  var setting = {
    el: null,
    url: null,
    volume: 1,
    autoplay: false,
    loop: false,
    mute: false
  }
  this.setting = Object.assign(setting, options);

  this.init()
};

VideoPlayer.prototype.init = function () {
  let el = document.getElementById(this.setting.el)
  this._vpContainer = el || document.body;
  // console.log('this._vpContainer:', this._vpContainer);

  let vpEle = document.createElement('div');
  vpEle.className = 'video-player';
  vpEle.innerHTML = _vphtml;
  this._vpContainer.appendChild(vpEle);
  this._vp = vpEle;

  this._video = this._vp.querySelectorAll("video")[0];
  if (this.setting.preload) this._video.preload = this.setting.preload;
  if (this.setting.url) this._video.src = this.setting.url;
  if (this.setting.poster) this._video.poster = this.setting.poster;
  if (this.setting.volume != 1) this._video.volume = this.setting.volume;
  if (this.setting.autoplay) this._video.autoplay = this.setting.autoplay;
  if (this.setting.loop) this._video.loop = this.setting.loop;
  if (this.setting.mute) this._video.mute = this.setting.mute;
  if (this.setting.videoCSSWidth) this._video.style.width = this.setting.videoCSSWidth;
  if (this.setting.videoCSSHeight) this._video.style.height = this.setting.videoCSSHeight;
  if (this.setting.videoWidth) this._video.width = this.setting.videoWidth;
  if (this.setting.videoHeight) this._video.height = this.setting.videoHeight;
  if (this.setting.x5VideoPlayerType) this._video.setAttribute('x5-video-player-type','h5')

  this.videoControl = new VideoControl(this._vp, this._video, this.setting);
  this.videoControl.init();
}

if (process.env.NODE_ENV === "development") {
  let meta=document.createElement('meta');
  meta.name='viewport';
  meta.content="width=device-width, initial-scale=1.0, maximum-scale=1.0";
  document.head.appendChild(meta);

  let vconsole=document.createElement('script');
  vconsole.src='//ycimg.m.duoku.com/cimages/img/promo/gametemplate/common/js/vconsole.min.js';
  document.body.appendChild(vconsole);

  var options = {
    el: "video_wrap",
    url: './movie.mp4',// //videos.akqa.com/work/nike/nba-connected-jersey/film.mp4
    poster: './video_default.jpg',
    autoplay: false,
    loop: false,
    volume: 1,
    mute: false,
    preload:"meta"
  }
  var vp = new VideoPlayer(options);
}

/**
 * Create by .
 * User: liutinghai
 * Date: 2018/5/28
 * Time: 18:32
 */

import  css from './duoku-slider.css';

export function duokuSlider (options) {
  var requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame
  var options = options
  //最外面的容器
  var $container = document.getElementById (options.container)
  //所有图片的集合
  var $duokuSliderImgs
  var imgWidth
  var imgsCount
  //上一张点击按钮
  var $duokuSliderPrev
  //下一张点击按钮
  var $duokuSliderNext
  //每张图片对应的小圆点集合
  var $duokuSliderDots
  var index = 1
  var timer
  
  /**
   * _createImgsWrapper 创建图片包裹
   * @param num
   * @private
   */
  function _createImgsWrapper () {
    var $imgsWrapper = document.createElement('div')
    $imgsWrapper.setAttribute ('id', 'imgs-wrapper')
    $imgsWrapper.style.width = options.imgWidth + 'px';
    $imgsWrapper.style.height = options.imgHeight + 'px';
    var $imgs = document.createElement ('div')
    $imgs.style.left = '0px'
    $imgs.setAttribute ('id', 'duoku-slider-imgs')
    
    $imgs.innerHTML = $container.innerHTML
    $container.innerHTML = ''
    $imgsWrapper.appendChild($imgs)
    $container.appendChild ($imgsWrapper)
    $duokuSliderImgs = document.getElementById ('duoku-slider-imgs')
    imgWidth = $container.getElementsByTagName ('img')[0].width
    imgsCount = $container.getElementsByTagName ('img').length
    $imgs.style.width = ( imgsCount + 2 ) * imgWidth + 'px'
  }
  
  function cloneImg () {
    var $imgStart = $container.getElementsByTagName ('img')[0].cloneNode(true);
    $duokuSliderImgs.appendChild($imgStart);
    $duokuSliderImgs.insertBefore($container.getElementsByTagName ('img')[imgsCount-1].cloneNode(true),
    $container.getElementsByTagName ('img')[0]);
    $duokuSliderImgs.style.transform = 'translate(' + - imgWidth + 'px, 0)'
    $duokuSliderImgs.style.transition = 'transform .0s ease'
  }
  
  /**
   * 创建buttons 每张图片对应的圆点
   * @param num
   * @private
   */
  function _createDots (num) {
    var $div = document.createElement ('div')
    $div.setAttribute ('id', 'duoku-slider-dot')
    var spans = '<span data-index="1" class="on" ></span>'
    for (var i = 2; i < (imgsCount + 1); i++) {
      spans += '<span data-index="' + i + '"  ></span>'
    }
    $div.innerHTML = spans
    $container.appendChild ($div)
    $div.style.left = ($container.clientWidth-345)/ 2  + 'px'
    $duokuSliderDots = document.getElementById ('duoku-slider-dot').getElementsByTagName ('span')
  }
  
  /**
   * 上一张 下一张按钮
   * @private
   */
  function _createButtons () {
    var $a = document.createElement ('a')
    $a.setAttribute ('id', 'duoku-slider-prev')
    $a.setAttribute ('class', 'duoku-slider-arrow')
    $a.innerHTML = options.preHTML
    var $a1 = document.createElement ('a')
    $a1.setAttribute ('id', 'duoku-slider-next')
    $a1.setAttribute ('class', 'duoku-slider-arrow')
    $a1.innerHTML = options.nextHTML
    $a.style.top = ($container.clientHeight / 2 - 50) + 'px'
    $a1.style.top = ($container.clientHeight / 2 - 50) + 'px'
    $container.appendChild ($a)
    $container.appendChild ($a1)
    $duokuSliderPrev = document.getElementById ('duoku-slider-prev')
    $duokuSliderNext = document.getElementById ('duoku-slider-next')
  }
  
  /**
   * 动画切换
   * @param offset
   */
  function animate (offset) {
    var newLeft = offset
    $duokuSliderImgs.style.transform = 'translate(' + newLeft + 'px, 0)'
    $duokuSliderImgs.style.transition = 'transform .3s ease-in-out'
    console.log('x:' + newLeft);
    var timer = setTimeout(function () {
      //arrive real left,so need  move to last img position
      if(newLeft === 0){
        var realRightX = - imgsCount * imgWidth;
        $duokuSliderImgs.style.transform = 'translate(' + realRightX + 'px, 0)'
        $duokuSliderImgs.style.transition = 'transform .0s ease'
      }
  
      // arrive real right , so need move to start img position
      if(newLeft === -imgWidth * imgsCount){
        $duokuSliderImgs.style.transform = 'translate(' + -imgWidth + 'px, 0)'
        $duokuSliderImgs.style.transition = 'transform .0s ease'
      }
      
      clearTimeout(timer);
    },400);
    
  }
  
  
  
  /**
   * 播放
   */
  function play () {
     timer = setInterval(function() {
         $duokuSliderNext.onclick();
     }, 5000)
  }
  
  /**
   * 停止播放
   */
  function stop () {
    clearInterval (timer)
  }
  
  /**
   * 设置图片对应的图标样式
   * @private
   */
  function _setDotsStyle () {
    for (var i = 0; i < $duokuSliderDots.length; i++) {
      if (parseInt($duokuSliderDots[i].dataset["index"]) === index ) {
         $duokuSliderDots[i].className = 'on'
      }else{
        $duokuSliderDots[i].className ="";
      }
    }
  }
  
  /**
   * 设置圆点事件
   * @private
   */
  function _setDotEvent () {
    for (var i = 0; i < $duokuSliderDots.length; i++) {
      (function (i) {
        $duokuSliderDots[i].onclick = function () {
          var clickIndex = parseInt (this.dataset["index"])
          var offset = imgWidth * clickIndex
          animate (-offset)
          index = clickIndex
          _setDotsStyle()
        }
      }) (i)
    }
  }
  
  /**
   * 页面渲染
   * @private
   */
  function _render () {
    _createImgsWrapper ()
    _createDots ()
    _createButtons ()
    cloneImg();
  }
  
  /**
   * 获取当前图片X偏移量
   * @returns {number}
   * @private
   */
  function _getCurrentOffestX () {
    var x = parseInt ($duokuSliderImgs.style.transform.replace ('translate(', '')
      .replace (')', '').replace (/px/g, '').split (',')[0])
    return x;
  }
  /**
   * 事件处理
   * @private
   */
  function _events () {
    _setDotEvent ()
    $container.onmouseover = stop
    $container.onmouseout = play
    
    /**
     * 上一张切换点击事件
     */
    $duokuSliderPrev.onclick = function () {
      index += 1
      if (index > imgsCount) {
        index = 1
      }
      _setDotsStyle ()
      animate (_getCurrentOffestX()+ (-imgWidth))
    }
    /**
     * 下一张切换点击事件
     */
    $duokuSliderNext.onclick = function () {
      index -= 1
      if (index < 1) {
        index = imgsCount
      }
      animate (_getCurrentOffestX() + imgWidth)
      _setDotsStyle ()
    }
  }
  
  _render ()
  _events ()
  
  if (options.autoPlay) {
    play ()
  }
}

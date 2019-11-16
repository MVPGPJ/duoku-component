/**
 * Create by .
 * User: liutinghai
 * Date: 2019/3/7
 * Time: 10:24
 */


function Swipper (options) {
  for(let o in options){
    this[o] = options[o]
  }
  this.lastIndex = 0;
  this.currentIndex = 1;
  this.init();
}

Swipper.prototype = {
  init:function () {
    var $container = document.getElementById(this.id);
    this.app = window.app = new PIXI.Application(240, 380, {backgroundColor : 0x1099bb});
    $container.appendChild(this.app.view);
    this.loading();
    this.load();
    // this.setTicker();
    this.autoPlay&&this.play();
    this.addCircle(5)
    //补间动画插件
    this.charm = new Charm(PIXI);
  },
  loading:function () {
    var self = this;
    let TextureCache = PIXI.utils.TextureCache;
    let Texture = PIXI.Texture;
    let Rectangle = PIXI.Rectangle;
    let AnimatedSprite = PIXI.extras.AnimatedSprite;
  
    let imgURL = "./img/dnf.png";

//加载图像，加载完成后执行setup函数
    PIXI.loader.add (imgURL).load (setup);
    function setup () {
      //获取纹理
      let base = TextureCache[imgURL];
      //第一个纹理
      let texture0 = new Texture (base);
      texture0.frame = new Rectangle (0, 0, 80, 143);
      //第二个纹理
      let texture1 = new Texture (base);
      texture1.frame = new Rectangle (80, 0, 80, 143);
      //第三个纹理
      let texture2 = new Texture (base);
      texture2.frame = new Rectangle (160, 0, 80, 143);
      //第四个纹理
      let texture3 = new Texture (base);
      texture3.frame = new Rectangle (240, 0, 80, 143);
      //创建纹理数组
      let textures = [texture0, texture1, texture2, texture3];
      //创建动画精灵
      let pixie = new PIXI.extras.AnimatedSprite (textures);
      //设置动画精灵的速度
      pixie.animationSpeed = 0.05;
      //把动画精灵添加到舞台
      pixie.x = self.app.view.width / 2 - 20;
      pixie.y = self.app.view.height / 2 - 71.5;
      self.app.stage.addChild (pixie);
      //播放动画精灵
      pixie.play ();
      g_events.on ('loaded', function () {
        pixie.visible = false
      })
    }
  },
  /**
   * 加载资源
   */
  load: function () {
    var self = this;
    const loader = new PIXI.loaders.Loader();
    loader.add('p1','./img/1.jpg')
      .add('p2','./img/2.jpg')
      .add('p3','./img/3.jpg')
      .add('p4','./img/4.jpg')
      .add('p5','./img/5.jpg')
      .add('next','./img/next.png')
      .add('pre','./img/pre.png');
    loader.on('progress',function (target,obj) {
      console.log(target.progress,"url:" + obj.url)
    })
    this.sprites = [];
    loader.load((loader, resources) => {
      setTimeout(()=>{
        g_events.fire('loaded');
        for(let i=0;i<5;i++){
          let tmp = new PIXI.Sprite(resources['p'+(i+1)].texture);
          if(i===0){
            tmp.y = 10;
            tmp.x = 10;
          }else{
            tmp.y = 10;
            tmp.x = 240;
          }
          this.sprites.push(tmp);
          this.app.stage.addChild(tmp)
        }
      
        let pre = new PIXI.Sprite(resources.pre.texture)
        let next = new PIXI.Sprite(resources.next.texture)
        pre.scale.x = 0.3
        pre.scale.y = 0.3
        next.scale.x = 0.3
        next.scale.y = 0.3
        pre.x =10
        pre.y = 60
        next.x = 170
        next.y = 60
        this.app.stage.addChild(pre,next)
      
        pre.interactive = true;
        pre.buttonMode = true;
        pre.on('click',function () {
          console.log('pre')
          self.pre();
        })
      
        next.interactive = true;
        next.buttonMode = true;
        next.on('click',function () {
          console.log('next')
          self.next();
        })
      },500)
    });
    
  },
  
  /**
   * 自动播放
   */
  setTicker: function () {
    var self = this;
    this.ticker = this.app.ticker.add(function () {
      self.sprites.forEach(function (obj) {
        obj.x -= 0.5;
        if(obj.x < -230){
          obj.x = 4*230;
        }
      })
    })
    this.ticker.stop();
  },
  
  play:function (){
    this.ticker.start();
  },
  
  addCircle:function (num) {
    for(let i=0;i< num;i++){
      let graphics = new PIXI.Graphics();
      graphics.beginFill(0xFFFF0B, 0.5);
      let x = 100+i*15;
      console.log(`x:`+ x)
      graphics.drawCircle(x, 170,5);
      graphics.endFill();
      this.app.stage.addChild(graphics);
    }
  },
  
  next:function () {
    this.charm.slide(this.sprites[this.lastIndex], -230, 10, 40);
    this.charm.slide(this.sprites[this.currentIndex], 10, 10, 60,'smoothstep');
    this.loop()
    this.lastIndex = this.currentIndex;
    this.currentIndex ++;
    if(this.currentIndex > 4){
      this.currentIndex = 0;
    }
  },
  
  pre:function () {
    this.charm.slide(this.sprites[this.lastIndex], 460, 10, 40);
    this.charm.slide(this.sprites[this.currentIndex], 10, 10, 60,'smoothstep');
    this.loop()
    this.lastIndex = this.currentIndex;
    this.currentIndex --;
    if(this.currentIndex<0){
      this.currentIndex = 4;
    }
  },
  
  loop:function () {
    // 循环调用gameLoop
    requestAnimationFrame(this.loop.bind(this));
    //更新补间
    this.charm.update();
    // 渲染舞台
    this.app.renderer.render(this.app.stage);
  }
}

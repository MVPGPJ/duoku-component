/**
 * Create by .
 * User: liutinghai
 * Date: 2019/3/6
 * Time: 16:31
 */

//设置别名
let TextureCache = PIXI.utils.TextureCache;
let Texture = PIXI.Texture;
let Rectangle = PIXI.Rectangle;
let AnimatedSprite = PIXI.extras.AnimatedSprite;

let imgURL = "./img/dnf.png";

//加载图像，加载完成后执行setup函数
PIXI.loader.add(imgURL).load(setup);

function setup() {
  //获取纹理
  let base = TextureCache[imgURL];
  
  //第一个纹理
  let texture0 = new Texture(base);
  texture0.frame = new Rectangle(0, 0, 80, 143);
  //第二个纹理
  let texture1 = new Texture(base);
  texture1.frame = new Rectangle(80, 0, 80, 143);
  //第三个纹理
  let texture2 = new Texture(base);
  texture2.frame = new Rectangle(160, 0, 80, 143);
  //第四个纹理
  let texture3 = new Texture(base);
  texture3.frame = new Rectangle(240, 0, 80, 143);
  
  //创建纹理数组
  let textures = [texture0, texture1, texture2,texture3];
  //创建动画精灵
  let pixie = new PIXI.extras.AnimatedSprite(textures);
  //设置动画精灵的速度
  pixie.animationSpeed=0.05;
  
  //把动画精灵添加到舞台
  pixie.x = app.view.width/2-20;
  pixie.y = app.view.height/2-71.5;
  app.stage.addChild(pixie);
  //播放动画精灵
  pixie.play();
  g_events.on('loaded',function () {
    pixie.visible = false
  })
  
}
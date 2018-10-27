 
    canvas = document.getElementById("abc");
    const context = canvas.getContext("2d");

    canvas.width =1000;
    canvas.height =550;

    const backImg = new Image();
    backImg.src = "https://img3.wikia.nocookie.net/__cb20140313121023/once-upon-a-time-roleplay/images/5/50/Wiki-background";

    const heroImg = new Image();
    heroImg.src = "https://www.colthat.com/media/catalog/product/cache/1/image/541x/040ec09b1e35df139433887a97daa66f/5/3/5324.png";

    const villainImg = new Image();
    villainImg.src = "https://i.pinimg.com/originals/28/03/5a/28035a70b4954a4998d1ad733b07577f.png";


     const rand = function(num) {
     return Math.floor(Math.random() * num) + 1;
     };




    const hero = {
		x: 10,
		y: 400,
		xDelta:0,
        yDelta:0,
		width: 100,
		height: 150,
		image: heroImg,
		draw: function() {
            context.drawImage(this.image,this.x,this.y,this.width,this.height)
        },
		update: function(){
            const fakeModeX = (this.x+this.xDelta)%(canvas.width - this.width);
            const fakeModeY = (this.y+this.yDelta)%(canvas.height-this.height);
            this.x=( fakeModeX < 0 ? canvas.width - this.width + fakeModeX : fakeModeX);
            this.y=(fakeModeY< 0 ? canvas.height -this.height+fakeModeY:  fakeModeY );

        }
     };
     


     const createVillain = function(count, canvasWidth, canvasHeight){
        const base = [];

        for (let i = 0; i <count; i++) {
            const  widthVillain  = 70;
            const heightVillain = 140; 
            base[base.length] =  {
                width: widthVillain ,
                height: heightVillain ,
                x:rand(canvasWidth-widthVillain ),
                y:rand(canvasHeight-heightVillain ),
                delta: 5,
                xDir:1,
                yDir:1,
                image:villainImg,
                draw: function() {
                    context.drawImage(this.image,this.x,this.y,this.width,this.height);
                },
                update: function(){   
                    this.x += this.xDir * this.delta;
                    this.y += this.yDir * this.delta;
                    if(this.x >= canvas.width-this.width){
                     this.xDir = -1;
                   } else if(this.x <= 0){
                     this.xDir = 1;
                    }
              
                    if(this.y >= canvas.height-this.height){
                     this.yDir = -1;
                    }else if(this.y <= 0) {
                     this.yDir = 1;
                   }
                    
                }
            }

    };
    
    return base;

    };  



    const leftKey = 37;
    const upKey = 38;
    const rightKey = 39;
    const downKey = 40;

    document.addEventListener('keydown', function(event) {
        const n = 6;
        console.log(hero.x, hero.xDelta, hero.y, hero.yDelta)



        if(event.keyCode === rightKey) {
            hero.xDelta=n;
        };
        
       if (event.keyCode===leftKey){
            hero.xDelta=-n;
        };

        




       

        if(event.keyCode === upKey){
            hero.yDelta=-n;
        };
        if(event.keyCode === downKey){
            hero.yDelta=n;
        };
        



        if(event.keyCode === rightKey&&event.keyCode ===upKey) {
            hero.xDelta=n;
            hero.yDelta=-n;
        };
        if(hero.x>=canvas.width-hero.width&&hero.y>=canvas.height-hero.height){
            hero.x=0;
            hero.y=0;
        }else if(event.keyCode === rightKey&&event.keyCode ===downKey) {
            hero.xDelta=n;
            hero.yDelta=n;
           
        };
        if(hero.x<=0&&hero.y+hero.height<=0){
            hero.x=canvas.width-hero.width;
            hero.y=canvas.height-hero.height;


        };



        
        if(event.keyCode === leftKey&&event.keyCode ===downKey) {
            hero.xDelta=-n;
            hero.yDelta=n;
           
        };
        if(hero.x<=0&&hero.y+hero.height<=0){
            hero.x=canvas.width-hero.width;
            hero.y=canvas.height-hero.height;

        } else if(event.keyCode === leftKey&&event.keyCode === upKey) {
            hero.xDelta=-n;
            hero.yDelta=-n;
            
           
        };
        if(hero.x>=canvas.width-hero.width&&hero.y>=canvas.height-hero.height){
            hero.y=0;
            hero.x=canvas.width-hero.width;
        };
        
    }, false);

    document.addEventListener('keyup', function(event) {
       
            hero.xDelta=0;
            hero.yDelta=0;
    }, false);


const createdVillain = createVillain(2,canvas.width,canvas.height) ;
       
const draw =function(){
    hero.draw();
    for (let i = 0; i < createdVillain.length; i++) {
        createdVillain[i].draw();
    }
};
   
const update =function(){
    hero.update();
    for (let i = 0; i < createdVillain.length; i++) {
        createdVillain[i].update();
    }
};

    const die = function(){
        for (let i = 0; i < createdVillain.length; i++) {
        if(hero.x < createdVillain[i].x +createdVillain[i].width/2  && hero.x + hero.width/2 > createdVillain[i].x &&
        hero.y < createdVillain[i].y + createdVillain[i].height/2 && hero.y + hero.height/2 > createdVillain[i].y ){
            hero.x=10;
            hero.y=400;
            hero.xDelta=0;
            hero.yDelta=0;
            alert("Game Over!!!!");

            }
    };
}

    const loop = function(){
        context.drawImage(backImg, 0, 0,canvas.width,canvas.height);
        draw();
        update();
        die();
        requestAnimationFrame(loop);
        
    };
    loop();

    
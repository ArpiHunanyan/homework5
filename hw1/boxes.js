
    const canvas = document.getElementById("hw5");
    canvas.width = 1000;
    canvas.height = 700;

    const context = canvas.getContext("2d");
   
    

    const rand = function(num) {
     return Math.floor(Math.random() * num) + 1;
    };

    const colorArray  = ["#220033","#000333","#707070","#003333","#820031"];

    const createBoxes = function(count, canvasWidth, canvasHeight){
        const base = [];

        for (let i = 0; i <count; i++) {
            const  widthBox = 30;
            const heightBox = 30; 
            base[base.length] =  {
                width: widthBox,
                height: heightBox,
                x:rand(canvasWidth-widthBox),
                y:rand(canvasHeight-heightBox),
                delta: 5,
                xDir:1,
                yDir:1,
                color:colorArray[rand(5)-1],
                draw: function() {
                    context.fillStyle = this.color;
                    context.fillRect(this.x,this.y,this.width,this.height);
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

    const createdBoxes= createBoxes(15,canvas.width,canvas.height) ;
       
    const draw =function(boxes){
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].draw();
           }
    };

    const update =function(boxes){
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].update();
           }
    };



    

    const loop = function(){

        context.clearRect(0,0,canvas.width,canvas.height);
           
        draw(createdBoxes);
                
        update(createdBoxes);
       
       requestAnimationFrame(loop);
    };

    loop();
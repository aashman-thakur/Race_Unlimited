var gs='home',mode='normal'
var cd=0,pcd=0,score=0,carSpeed=3
var carGroup,car,w2


function preload(){
    bg=loadImage('home.png')
    pb=loadImage('play.png')
    cr=loadImage('credits.png')
    qm=loadImage('qm.png')
    crwi=loadImage('cr.png')
    ari=loadImage('arrow.png')
    about=loadImage('about.png')
    pc=loadImage('playscreen.png')
    ri=loadImage('reset.png')
    red=loadImage('carr.png')
    blue=loadImage('carb.png')
    green=loadImage('cargr.png')
    gray=loadImage('carg.png')
    yellow=loadImage('cary.png')
    pause=loadImage('puase.png')

}

function setup(){
    createCanvas(360,640)
    carGroup=createGroup()
    pbs=createSprite(width/2,height/2,20,20)
    pbs.addImage(pb)
    crs=createSprite(width/2-100,height/2+200)
    crs.addImage(cr)
    qs=createSprite(width/2+100,height/2+200)
    qs.addImage(qm)
    aw=createSprite(width/2,height/2)
    aw.addImage(about)
    aw.visible=false
    awb=createSprite(width/2-120,height/2+275)
    awb.addImage(ari)
    awb.rotation=-90
    awb.scale=0.5
    awb.visible=false
  
    crw=createSprite(width/2,height/2)
    crw.addImage(crwi)
    crw.visible=false
    crb=createSprite(width/2-100,height/2-160)
    crb.addImage(ari)
    crb.rotation=-90
    crb.scale=0.8
    crb.visible=false

   
    la=createSprite(width/2-100,height/2+230)
    la.addImage(ari)
    la.rotation=-90
    la.scale=0.8
    la.visible=false
    ra=createSprite(width/2+100,height/2+230)
    ra.addImage(ari)
    ra.rotation=90
    ra.scale=0.8
    ra.visible=false
    rb=createSprite(width/2,height/2+230)
    rb.addImage(ri)
    rb.scale=0.8
    rb.visible=false
    pbb=createSprite(width/2-100,height/2+160)
    pbb.addImage(ari)
    pbb.rotation=-90
    pbb.scale=0.5
    pbb.visible=false


    w1=createSprite(width/2,height/2-220,350,20)
    w1.visible=false
    w2=createSprite(width/2,height/2+115,350,10)
    w2.visible=false

    p=createSprite(width/2,height/2+70,10,10)
    p.addImage(red)
    p.setCollider('rectangle',0,0,40,80)
    p.visible=false

}

function draw(){
    background(bg)
    
    if(gs==='home'){
        pbs.visible=true
        qs.visible=true
        crs.visible=true
        crw.visible=false
        crb.visible=false
        aw.visible=false
        awb.visible=false
        la.visible=false
        ra.visible=false
        rb.visible=false
        pbb.visible=false
        p.visible=false

        
        if(mousePressedOver(crs)){
            gs='credits'
        }
        if(mousePressedOver(qs)){
            gs='about'
        }
        if(mousePressedOver(pbs)){
            gs='play'
        }

        reset()
        }
    if(gs==='credits'){
        crw.visible=true
        crb.visible=true
        if(mousePressedOver(crb)){
            gs='home'
        }
    }
    if(gs==='about'){
        aw.visible=true
        awb.visible=true
        if(mousePressedOver(awb)){
            gs='home'
        }
    }
    if(gs==='play'){
        pbs.visible=false
        qs.visible=false
        crs.visible=false
        background(pc)
        la.visible=true
        ra.visible=true
        rb.visible=true
        pbb.visible=true
        p.visible=true
        controls()
        spawnCars()
        for(var i=0;i<carGroup.length;i++){
           if(carGroup.get(i).y>height/2+60){
                carGroup.get(i).destroy()
           }
        }
    }
    if(gs==='end'){
        background(pc)
        car.velocityY=0
        car.lifetime=-1
        p.visible=false
        textSize(20)
        textFont('Courier')
        fill(0)
    text('Game Over!',width/2-20,height/2+170)
    if(mousePressedOver(rb)){
        gs='play'
    }
    if(mousePressedOver(pbb)){
        gs='home'
    }
    }

    drawSprites()
}

function controls(){
    score+=1
    cd-=1
    pcd-=1
    p.bounceOff(w1)
    p.bounceOff(w2)

    textSize(20)
    textFont('Courier')
    fill(0)
    text('score:'+Math.round(score/60),width/2-20,height/2+170)

    if(mousePressedOver(la)&&cd<0&&p.x!=100){
        p.x-=80
        cd=5
    }
    if(mousePressedOver(ra)&&cd<0&&p.x!=260){
       p.x+=80
       cd=5
    }
    if(mousePressedOver(pbb)){
        gs='home'
    }
    if(mousePressedOver(rb)){
        reset()
    }

    if(score%3===0){
        carSpeed+=0.01
    }

    if(p.isTouching(carGroup)){
        gs='end'
    }
}

function reset(){
    p.x=180
    score=0
    carGroup.destroyEach()
    carSpeed=3
}

function spawnCars(){
    if(frameCount%100===0){
        r1=Math.round(random(1,3))
        r2=Math.round(random(1,4))
        console.log(r1)
        car=createSprite(0,height/2-220,10,10)
        car.velocityY=carSpeed
        carGroup.add(car)
        car.setCollider('rectangle',0,0,40,80)

        switch(r1){
            case 1:car.x=100
            break
            case 2:car.x=180
            break
            case 3:car.x=260
            default:break
        }
        
        switch(r2){
            case 1:car.addImage(blue)
            break
            case 2:car.addImage(green)
            break
            case 3:car.addImage(gray)
            break
            case 4:car.addImage(yellow)
            default:break
            
        }
       
    }
}

class Collider {
    constructor(x = 0, y = 0, radius = 1, directionX = 1, directionY = 1){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.directionX = directionX;
        this.directionY = directionY;
        this.hit = false;
    }

    move(context){
        this.x += this.directionX;
        this.y += this.directionY;
        if( this.x+this.radius >= context.canvas.width || this.x-this.radius <= 0 ){
            this.directionX *= -1;
        }

        if( this.y+this.radius >= context.canvas.height || this.y-this.radius <= 0 ){
            this.directionY *= -1;
        }
    }

    draw(context){
        context.beginPath();

        context.strokeStyle = this.hit ? "#FF0000" : "#000";

        context.arc(
            this.x,
            this.y,
            this.radius,
            0,
            2 * Math.PI
        );

        context.stroke();
    }
}
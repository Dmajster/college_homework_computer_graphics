class Point {    
    constructor(x = 0, y = 0) {
        this.selected = false;
        this.x = x;
        this.y = y;
    }
}

class AproximatedPoint extends Point {
    Draw(context, radius = 5){
        context.beginPath();
        context.arc(this.x-radius,this.y-radius,radius,0,2*Math.PI);
        context.fill();
    }
}

class InterpolatedPoint extends Point {
    Draw(context, size = 20){
        context.fillRect(
            this.x-size/2, 
            this.y-size/2, 
            size/2, 
            size/2
        )
    }
}

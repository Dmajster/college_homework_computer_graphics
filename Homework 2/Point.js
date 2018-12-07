class Point {    
    constructor(x = 0, y = 0) {
        this.selected = false;
        this.x = x;
        this.y = y;
    }
}

class AproximatedPoint extends Point {
    constructor(x = 0, y = 0, radius = 5){
        super(x, y);
        this.radius = radius;
    }
    
    Draw(context){
        context.beginPath();
        context.arc(this.x,this.y,this.radius,0,2*Math.PI);
        context.fill();
    }

    Clicked(mouse){
        return Math.sqrt(
            Math.pow(mouse.x-this.x,2) +
            Math.pow(mouse.y-this.y,2)
        ) < this.radius;
    }
}

class InterpolatedPoint extends Point {
    constructor(x = 0, y = 0, size = 10){
        super(x, y);
        this.size = size;
    }

    Draw(context){
        context.fillRect(
            this.x-this.size/2, 
            this.y-this.size/2, 
            this.size, 
            this.size
        )
    }

    Clicked(mouse){
        return  mouse.x > this.x - this.size/2 && 
                mouse.y > this.y - this.size/2 && 
                mouse.x < this.x + this.size/2 && 
                mouse.y < this.y + this.size/2;
    }
}

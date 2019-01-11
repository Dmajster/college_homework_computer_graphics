class Quadtree {
    constructor(x, y, width, height, colliders = []) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.colliders = colliders;
        this.children = [];
        this.expansionCheck();
    }

    expansionCheck() {
        if (this.colliders.length > 2) {
            this.expand();
            this.redelegateColliders();
        }
    }

    expand() {
        this.children = [
            new Quadtree(
                this.x,
                this.y,
                this.width / 2,
                this.height / 2
            ),
            new Quadtree(
                this.x + this.width / 2,
                this.y,
                this.width / 2,
                this.height / 2
            ),
            new Quadtree(
                this.x,
                this.y + this.height / 2,
                this.width / 2,
                this.height / 2
            ),
            new Quadtree(
                this.x + this.width / 2,
                this.y + this.height / 2,
                this.width / 2,
                this.height / 2
            )
        ];
    }

    aabb(x1,y1,w1,h1,x2,y2,w2,h2){
        return (x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2)
    }

    redelegateColliders() {
        this.colliders.forEach(collider => {
            let index = (collider.x > this.x + this.width / 2 ? 1 : 0) + (collider.y > this.y + this.height / 2 ? 2 : 0);
            this.children[index].colliders.push(collider);
        });
        this.colliders = [];

        this.children.forEach(child => child.expansionCheck());
    }

    collisionCheck(){
        if(this.children.length > 0){
            this.children.forEach(child => child.collisionCheck());
            return;
        }

        if(this.colliders.length < 2){
            return;
        }

        let a = this.colliders[0];
        let b = this.colliders[1];
        
        if(Math.sqrt( Math.pow(a.x-b.x,2) + Math.pow(a.y-b.y,2)) < a.radius+b.radius){
            a.hit = true;
            b.hit = true;
        }
    }

    draw(context) {
        this.children.forEach(child => child.draw(context));

        context.beginPath();

        context.strokeStyle = "#000";

        context.rect(
            this.x,
            this.y,
            this.width,
            this.height
        );

        //context.fillText(this.colliders.length, this.x+this.width/2, this.y+this.height/2); 
        
        context.stroke();
    }
}

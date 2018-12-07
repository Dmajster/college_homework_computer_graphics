class Curve {
    constructor(i0, a0, a1, i1) {
        this.points = [
            new InterpolatedPoint(i0.x, i0.y),
            new AproximatedPoint(a0.x, a0.y),
            new AproximatedPoint(a1.x, a1.y),
            new InterpolatedPoint(i1.x, i1.y)
        ];
        this.i0 = this.points[0];
        this.a0 = this.points[1];
        this.a1 = this.points[2];
        this.i1 = this.points[3];
        
        this.color = "#000000";
        this.collisionPoints = [];
    }

    GetIndex(point){
        return this.points.findIndex( checkedPoint => checkedPoint.x == point.x && checkedPoint.y == point.y );
    }

    Lerp(a, b, t) {
        return (1 - t) * a + t * b;
    }

    LerpPoint(p0, p1, t){
        return new Point(
            this.Lerp(p0.x,p1.x,t),
            this.Lerp(p0.y,p1.y,t)
        )
    }

    DrawCurvePoint(t){
        return this._DrawCurvePoint(this.points, t);
    }

    _DrawCurvePoint(points, t){
        let newPoints = [];
        for( let i = 0; i < points.length-1; i++ ){
            newPoints.push(this.LerpPoint(
                points[i],
                points[i+1],
                t
            ))
        }
        return newPoints.length == 1 ? newPoints[0] : this._DrawCurvePoint(newPoints,t);
    }

    DrawCurve(gap){
        context.beginPath();
        context.moveTo(this.i0.x,this.i0.y);
        for( let i = 0; i < 1; i+=gap){
            let point = this.DrawCurvePoint(i);
            context.lineTo(point.x,point.y);
            this.collisionPoints.push(point);
        }
        context.lineTo(this.i1.x, this.i1.y);
        context.stroke();
    }


    Draw(context) {
        context.beginPath();
        context.moveTo(this.i0.x,this.i0.y);
        context.lineTo(this.a0.x,this.a0.y);
        context.moveTo(this.i1.x,this.i1.y);
        context.lineTo(this.a1.x,this.a1.y);
        context.stroke();

        context.strokeStyle=this.color;
        this.DrawCurve(0.01);
        context.strokeStyle="#000000";

        context.fillStyle="#2468d6";
        this.i0.Draw(context);
        this.i1.Draw(context);
        this.a0.Draw(context);
        this.a1.Draw(context);
        context.fillStyle="#000000";
    }
}
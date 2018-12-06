class Curve {
    constructor(i0, a0, a1, i1) {
        this.i0 = new InterpolatedPoint(i0.x, i0.y);
        this.i1 = new InterpolatedPoint(i1.x, i1.y);
        this.a0 = new AproximatedPoint(a0.x, a0.y);
        this.a1 = new AproximatedPoint(a1.x, a1.y);
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
        return this._DrawCurvePoint([this.i0, this.a0, this.a1, this.i1], t);
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
        }
        context.stroke();
    }


    Draw(context) {
        this.DrawCurve(0.1);
        this.i0.Draw(context);
        this.i1.Draw(context);
        this.a0.Draw(context);
        this.a1.Draw(context);
    }
}
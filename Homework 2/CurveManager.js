class CurveManager {
    constructor() {
        this.points = [];
        this.curves = [];
    }

    AddPoint(point) {
        this.points.push(point);
        this.CreateCurves();
    }

    CreateCurves(){
        this.curves = [];

        if(this.points.length < 4)
            return;

        this.curves.push(
            new Curve(
                this.points[0],
                this.points[1],
                this.points[2],
                this.points[3]
            )
        );

        for( let i = 3; i < this.points.length-3; i+=3 ){
            this.curves.push(
                new Curve(
                    this.points[i],
                    this.points[i+1],
                    this.points[i+2],
                    this.points[i+3]
                )
            )
        }
    }

    Draw(context) {
        this.curves.forEach(curve => curve.Draw(context))
    }
}
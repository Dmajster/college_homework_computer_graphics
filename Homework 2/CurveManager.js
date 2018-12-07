class CurveManager {
    constructor() {
        this.points = [];
        this.curves = [];
        this.activePoint = null;
        this.selected = false;
    }

    AddPoint(point) {
        this.points.push(point);
        this.CreateCurves();
    }

    MovePoint(point, position){
        point.x = position.x;
        point.y = position.y;
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

    Clicked(mouse) {
        for( let curve of this.curves ){
            for( let point of curve.points ){
                if(point.Clicked(mouse)){
                    this.selected = true;
                    this.activePoint = this.points.find( (checkedPoint) => checkedPoint.x == point.x && checkedPoint.y == point.y)
                    console.log(this.points,point);
                    console.log(this.activePoint);
                    return true;
                }
            }
        }
        return false;
    }

    Draw(context) {
        this.curves.forEach(curve => curve.Draw(context))
    }
}
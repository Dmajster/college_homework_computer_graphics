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
        this.MakeCoherent(point);
        this.CreateCurves();
    }

    GetIndex(point){
        return this.points.findIndex( checkedPoint => checkedPoint.x == point.x && checkedPoint.y == point.y );
    }

    GetCurveIndex(point){
        for( let curve of this.curves ){
            let index = curve.GetIndex(point);
            if( index != -1 ){
                return index;
            }
        }
        return -1;
    }

    IsAproximatedPoint(point){
        let index = this.GetCurveIndex(point);

        if( index == 1 || index == 2){
            return true;
        }
        
        return false;
    }

    Angle(point1, point2) {
        return Math.atan2(point2.y - point1.y, point2.x - point1.x) * 180 / Math.PI;
    }

    Distance(point1, point2) {
        return Math.sqrt(Math.pow(point2.x-point1.x,2)+Math.pow(point2.y-point1.y,2));
    }

    Lengthdir(point, distance, direction){
        return new Point(
            point.x + distance * Math.cos(direction / 180 * Math.PI),
            point.y + distance * Math.sin(direction / 180 * Math.PI)
        )
    }

    MakeCoherent(point){
        if( !this.IsAproximatedPoint(point) )
            return;

        let index = this.GetIndex(point);
        let curveIndex = this.GetCurveIndex(point);

        if( curveIndex == 1 && index > 2 ){
            let interpolationPoint = this.points[index-1];
            let otherAproximationPoint = this.points[index-2];
            let newPosition = this.Lengthdir(
                interpolationPoint,
                this.Distance(point,interpolationPoint),
                this.Angle(point,interpolationPoint)
            );

            otherAproximationPoint.x = newPosition.x;
            otherAproximationPoint.y = newPosition.y;
        } else if( curveIndex == 2 && index < this.points.length-2 ) {
            let interpolationPoint = this.points[index+1];
            let otherAproximationPoint = this.points[index+2];
            let newPosition = this.Lengthdir(
                interpolationPoint,
                this.Distance(point,interpolationPoint),
                this.Angle(point,interpolationPoint)
            );

            otherAproximationPoint.x = newPosition.x;
            otherAproximationPoint.y = newPosition.y;
        }
    }

    MovePoint(point, position){
        let positionDelta = {
            x: position.x - point.x,
            y: position.y - point.y
        }

        if( this.IsAproximatedPoint(point) ){
            this.MakeCoherent(point);
        } else {
            let index = this.GetIndex(point);
            
            if( index > 0){
                this.points[index-1].x += positionDelta.x;
                this.points[index-1].y += positionDelta.y;
            }
            if( index < this.points.length-1 ){
                this.points[index+1].x += positionDelta.x;
                this.points[index+1].y += positionDelta.y;
            }
        }
        
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
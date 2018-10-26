class Transformation
{
    constructor(matrix = new Matrix4f()) {
        this.matrix = matrix
        this.matrix.values[Matrix4f.getIndex(0,0)] = 1;
        this.matrix.values[Matrix4f.getIndex(1,1)] = 1;
        this.matrix.values[Matrix4f.getIndex(2,2)] = 1;
        this.matrix.values[Matrix4f.getIndex(3,3)] = 1;
    }

    translate(vector) {
        this.matrix.values[Matrix4f.getIndex(3,0)] = vector.x;
        this.matrix.values[Matrix4f.getIndex(3,1)] = vector.y;
        this.matrix.values[Matrix4f.getIndex(3,2)] = vector.z;
    }

    scale(vector) {
        this.matrix.values[Matrix4f.getIndex(0,0)] = vector.x;
        this.matrix.values[Matrix4f.getIndex(1,1)] = vector.y;
        this.matrix.values[Matrix4f.getIndex(2,2)] = vector.z;
    }

    rotateX(angle) {
        this.matrix.values[Matrix4f.getIndex(1,1)] = Math.cos(angle); this.matrix.values[Matrix4f.getIndex(2,1)] = -Math.sin(angle);
        this.matrix.values[Matrix4f.getIndex(1,2)] = Math.sin(angle); this.matrix.values[Matrix4f.getIndex(2,2)] = Math.cos(angle);
    }

    rotateY(angle) {
        this.matrix.values[Matrix4f.getIndex(0,0)] = Math.cos(angle); this.matrix.values[Matrix4f.getIndex(2,0)] = Math.sin(angle);
        this.matrix.values[Matrix4f.getIndex(0,2)] = -Math.sin(angle); this.matrix.values[Matrix4f.getIndex(2,2)] = Math.cos(angle);
    }

    rotateZ(angle) {
        this.matrix.values[Matrix4f.getIndex(0,0)] = Math.cos(angle); this.matrix.values[Matrix4f.getIndex(1,0)] = -Math.sin(angle);
        this.matrix.values[Matrix4f.getIndex(0,1)] = Math.sin(angle); this.matrix.values[Matrix4f.getIndex(1,1)] = Math.cos(angle);
    }

    static transformPoint(input) {
        let transformedPoint = new Transformation();

        let newTransform = new Transformation();
        newTransform.translate(new Vector4f(1.25,0,0));
        transformedPoint.matrix = Matrix4f.multiply(newTransform.matrix, transformedPoint.matrix );

        newTransform = new Transformation();
        newTransform.rotateZ(Math.PI/3);
        transformedPoint.matrix = Matrix4f.multiply(newTransform.matrix, transformedPoint.matrix );

        newTransform = new Transformation();
        newTransform.translate(new Vector4f(0,0,4.15));
        transformedPoint.matrix = Matrix4f.multiply(newTransform.matrix, transformedPoint.matrix );

        newTransform = new Transformation();
        newTransform.translate(new Vector4f(0,3.14,0));
        transformedPoint.matrix = Matrix4f.multiply(newTransform.matrix, transformedPoint.matrix );
        
        newTransform = new Transformation();
        newTransform.scale(new Vector4f(1.12,1.12,1));
        transformedPoint.matrix = Matrix4f.multiply(newTransform.matrix, transformedPoint.matrix );

        newTransform = new Transformation();
        newTransform.rotateY(5*Math.PI/8);
        transformedPoint.matrix = Matrix4f.multiply(newTransform.matrix, transformedPoint.matrix );

        return new Vector4f(
            transformedPoint.matrix.values[0] * input.x +
            transformedPoint.matrix.values[1] * input.y +
            transformedPoint.matrix.values[2] * input.z +
            transformedPoint.matrix.values[3] * input.w,

            transformedPoint.matrix.values[4] * input.x +
            transformedPoint.matrix.values[5] * input.y +
            transformedPoint.matrix.values[6] * input.z +
            transformedPoint.matrix.values[7] * input.w,

            transformedPoint.matrix.values[8] * input.x +
            transformedPoint.matrix.values[9] * input.y +
            transformedPoint.matrix.values[10] * input.z +
            transformedPoint.matrix.values[11] * input.w
        )
    }

    printMatrix()
    {
        console.log( "," + this.matrix.values.map( (value,index) => {
            if(index > 2 && (index+1) % 4 == 0) {
                return value.toFixed(3) + "\n"
            }
            return value.toFixed(3)
        }).join() )
    }
}
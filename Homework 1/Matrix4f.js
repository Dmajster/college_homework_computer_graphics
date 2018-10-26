class Matrix4f
{
    constructor(values = new Array(16).fill(0))
    {
        this.values = values
    }

    static getIndex(x,y) { 
        return y * 4 + x 
    }

    static negate(matrix) {
        return new Matrix4f(
            matrix.values.map(value => value * -1)
        )
    }

    static add(matrix1, matrix2) {
        return new Matrix4f(
            matrix1.map(value, index => value + matrix2)
        )
    }

    static transpose(matrix) {
        let newMatrix = new Matrix4f();
        for(let n=0; n<2; n++) {
            for(let m=n+1; m<3; m++) {
                newMatrix.values[Matrix4f.getIndex(n,m)] = newMatrix.values(Matrix4f.getIndex(m,n))
            } 
        }
        return newMatrix
    }

    static multiplyScalar(scalar, matrix) {
        return new Matrix4f(
            matrix.map(value => value * scalar)
        )
    }

    
    static multiply(matrix1, matrix2) {
        let newMatrix = new Matrix4f();
        for(let k=0; k<=12; k+=4){
            for(let i=0; i<4; i++){
                for (let j=0, bCount=0; j<4; j++, bCount+=4){
                    newMatrix.values[k+i] += matrix1.values[k+j%4] * matrix2.values[bCount+i%4];
                }
            }
        }
        return newMatrix;
    }
}
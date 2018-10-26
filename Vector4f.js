class Vector4f
{
    constructor(
        x = 0, 
        y = 0, 
        z = 0, 
        w = 1
    ) {
        this.x = x
        this.y = y
        this.z = z
        this.w = w
    }

    static negate(vector) {
        return new Vector4f(
            vector.x * -1,
            vector.y * -1,
            vector.z * -1,
        )
    }

    static add(vector1, vector2) {
        return new Vector4f(
            vector1.x + vector2.x,
            vector1.y + vector2.y,
            vector1.z + vector2.z,
        )
    }

    static scalarProduct(scalar, vector) {
        return new Vector4f(
            vector.x * scalar,
            vector.y * scalar,
            vector.z * scalar,
        )
    } 

    static dotProduct(vector1, vector2) {
        return vector1.x * vector2.x +
            vector1.y * vector2.y +
            vector1.z * vector2.z;
    }

    static crossProduct(vector1, vector2) {
        return new Vector4f(
            vector1.y * vector2.z -
            vector1.z * vector2.y,
            vector1.z * vector2.x -
            vector1.x * vector2.z,
            vector1.x * vector2.y -
            vector1.y * vector2.x
        )   
    }

   static length(vector) { 
        return Math.sqrt(
            Math.pow(vector.x,2) +
            Math.pow(vector.y,2) +
            Math.pow(vector.z,2)
        )
    }

    static normalize(vector) {
        let length = length(vector)
        return new Vector4f(
            vector.x / length,
            vector.y / length,
            vector.z / length
        )
    }

    static project(vector1, vector2) {
        return this.scalarProduct(
            this.dotProduct(vector1, vector2) / Math.pow(this.length(vector2),2),
            vector2
        )
    }

    static cosPhil(vector1, vector2) {
        return Math.cos(
            this.scalarProduct(vector1,vector2) /
            this.length(vector1) * this.length(vector2)
        )
    } 
}
class TransformPoints
{
    static Stringify(vector) {
        let transformation = Transformation.transformPoint(vector)
        return `v ${ transformation.x.toFixed(3) } ${ transformation.y.toFixed(3) } ${ transformation.z.toFixed(3) }`
    }
}
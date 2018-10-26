class PointManager
{
    static Parse(input){
        let vectorStrings = input.split("v")
        
        vectorStrings = vectorStrings.filter(value => value.split(" ").length >= 4)

        return vectorStrings.map(vectorString => {
            vectorString = vectorString.replace("\n","")
            let vectorValues = vectorString.split(" ")
            vectorValues = vectorValues.filter(value => value !== "").map(value => parseFloat(value))
            return new Vector4f(
                vectorValues[0],
                vectorValues[1],
                vectorValues[2],
                1
            )
        })
    }

    static Stringify(vector)
    {
        return `v ${vector.x.toFixed(3)} ${vector.y.toFixed(3)} ${vector.z.toFixed(3)}`
    }
}
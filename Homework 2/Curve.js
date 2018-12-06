class Curve {
    constructor(i0, a0, a1, i1) {
        this.i0 = new InterpolatedPoint(i0.x, i0.y);
        this.i1 = new InterpolatedPoint(i1.x, i1.y);
        this.a0 = new AproximatedPoint(a0.x, a0.y);
        this.a1 = new AproximatedPoint(a1.x, a1.y);
    }

    Draw(context) {
        this.i0.Draw(context);
        this.i1.Draw(context);
        this.a0.Draw(context);
        this.a1.Draw(context);
    }
}
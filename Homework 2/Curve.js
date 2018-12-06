class Curve {
    constructor(i0, i1, a0, a1) {
        this.i0 = i0;
        this.i1 = i1;
        this.a0 = a0;
        this.a1 = a1;
    }

    Draw(context) {
        this.i0.Draw(context);
        this.i1.Draw(context);
        this.a0.Draw(context);
        this.a1.Draw(context);
    }
}
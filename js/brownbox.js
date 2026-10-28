class BrownBox {
    constructor (x,y){
        this.node = document.createElement ("div");
        gameBoxNode.append(this.node);

        this.node.className = "brownbox";

        this.x=x;
        this.y=y;
        this.width=80;
        this.height=80;

        this.speed = 2;

        this.node.style.width=`${this.width}px`;
        this.node.style.height=`${this.height}px`;
        this.node.style.position = "absolute";
        this.node.style.top = `${this.y}px`;
        this.node.style.left= `${this.x}px`;

        this.node.style.backgroundImage = "url('./styles/brownbox.png')";
        this.node.style.backgroundSize = "contain";
        this.node.style.backgroundRepeat = "no-repeat";
    }
    automaticMovement() {
        this.x -= this.speed; 
        this.node.style.left = `${this.x}px`;
    }
}
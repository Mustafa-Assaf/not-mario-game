class RedShell {
    constructor () {
        this.node = document.createElement ("div");
        gameBoxNode.append(this.node);

        this.node.className="redshell";

//adding the relative positioning and styles:
        this.x=gameBoxNode.clientWidth; 
        this.y = playerObj.y;
        this.width = 50;
        this.height = 50;

        this.node.style.width = `${this.width}px`;
        this.node.style.height = `${this.height}px`;
        this.node.style.backgroundImage = "url('./styles/redshell.png')";
        this.node.style.backgroundSize = "contain";
        this.node.style.backgroundRepeat = "no-repeat";

        this.node.style.position = "absolute";
        this.node.style.top = `${this.y}px`;
        this.node.style.left = `${this.x}px`;

    this.speed = 10;
}

//shell movement
automaticMovement() {
    this.x -= this.speed; 
    this.node.style.left = `${this.x}px`;
}
}
class NotMario {
    constructor() {
       this.node = document.createElement("div");
       gameBoxNode.append(this.node);
       
       this.node.className="notmarioplayer";

       // adding the relative positioning and styles: 

       this.x = 10;
       this.y = 383;
       this.width = 65;
       this.height = 65;


       this.node.style.width =`${this.width}px`;
       this.node.style.height = `${this.height}px`;
       this.node.style.backgroundImage = "url('./styles/notmario.jpeg')";
       this.node.style.backgroundSize = "contain";
       this.node.style.backgroundRepeat = "no-repeat";
    //   this.node.style.backgroundColor="white";
    //    this.node.style.borderRadius = "5px";
    //    this.node.style.border = "solid black 2px";


       this.node.style.position = "absolute";
       this.node.style.top = `${this.y}px`;
       this.node.style.left = `${this.x}px`;


    
       this.speed = 20;

       this.isJumping = false; 
       this.jumpHeight = 150;
    
       //player methods for movements are defined outside the constructor - up and down
    }
    
    moveUp() {
        if (this.y < 0) {
            this.y = 0;
            return;
        }
        this.y -= this.speed;
        this.node.style.top = `${this.y}px`;
    }

    moveDown() {
        if (this.y > 400) {
            return;
        }
        this.y += this.speed; 
        this.node.style.top = `${this.y}px`;
    }

       //player methods for movements are defined outside the constructor - space bar jumping


}
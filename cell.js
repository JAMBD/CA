function Cell(){
    this.signal = new Signal();
    this.block = new Block();
    this.element = new Element();
    this.draw = function (context, x, y, size){
        context.fillStyle = "#083d54";
        context.fillRect(x, y, size, size);
        this.block.draw(context, x, y, size);
        this.element.draw(context, x, y, size);
        this.signal.draw(context, x, y, size);
    };
    this.flip = function(){
        this.signal.flip();
        this.block.flip();
        this.element.flip();
    };
}


function CellUpdate(cell, nbr){
    // Order here should not matter.
    // Each parameter update should only
    // its own data.
    SignalUpdate(cell, nbr);
    BlockUpdate(cell, nbr);
    ElementUpdate(cell, nbr);
}

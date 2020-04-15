function Block(){
    this.present = new DoubleBuffer(false);
    this.conductive = new DoubleBuffer(false);
    this.signal_source = new DoubleBuffer(0.0);
    this.draw = function (context, x, y, size){
        if (this.present.get()) {
            if (this.conductive.get()){
                context.fillStyle = "#3e1c6b";
            }else{
                context.fillStyle = "#42402e";
            }
            context.fillRect(x, y, size, size);
        }
    };
    this.flip = function(){
        this.present.flip();
        this.conductive.flip();
        this.signal_source.flip();
    };
}

function BlockUpdate(){
}

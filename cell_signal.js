function Signal(){
    this.direction = new DoubleBuffer(CENTER);
    this.strength = new DoubleBuffer(0.0);
    this.draw = function (context, x, y, size){
        if (this.strength.get() > 0.0){
            context.fillStyle = "#22820a";
            context.fillRect(x + size / 3, y + size / 3, size / 3, size / 3);
            if (this.direction.get() == NORTH){
                context.fillRect(x + size / 3, y, size / 3, size / 3);
            }
            if (this.direction.get() == SOUTH){
                context.fillRect(x + size / 3, y + 2 * size / 3, size / 3, size / 3);
            }
            if (this.direction.get() == EAST){
                context.fillRect(x + 2 * size / 3, y + size / 3, size / 3, size / 3);
            }
            if (this.direction.get() == WEST){
                context.fillRect(x, y + size / 3, size / 3, size / 3);
            }
        }
    };
    this.flip = function(){
        this.direction.flip();
        this.strength.flip();
    };
}

function SignalUpdate(cell, nbr){
    // Signal propagation logic.
    function is_signal(cell, dir){
        if (cell.signal.strength.get() <= 0) return false;
        if (cell.signal.direction.get() == RotateRight(dir, SOUTH)) return false;

        if (cell.signal.direction.get() == CENTER) return true;
        if (cell.signal.direction.get() == dir) return true;
        if (cell.block.present.get() && cell.block.conductive) return true;
        return false;
    }

    var signal_strength = 0.0;
    var dir_cnt = 0;
    var dir_sum = 0;
    for (dir of FOUR_DIRECTION_LIST){
        var n = NeighborAt(nbr, SOUTH, dir);
        if (is_signal(n, dir)){
            signal_strength += n.signal.strength.get();
            dir_cnt += 1;
            dir_sum += dir;
        }
    }

    if (cell.block.present.get() && !cell.block.conductive.get()){
        signal_strength = 0.0;
    }

    if (dir_cnt == 3){
        dir_sum = RotateRight(dir_sum, SOUTH);
    }

    if (dir_cnt % 2 == 0) {
        signal_strength = 0.0;
    }

    for (dir of FOUR_DIRECTION_LIST){
        var s = NeighborAt(nbr, SOUTH, dir);
        if (!is_signal(s, dir)) continue;
        var n = NeighborAt(nbr, NORTH, dir);
        if (!n.block.present.get()) continue;
        if (n.block.conductive.get()) continue;

        var e =  NeighborAt(nbr, EAST, dir);
        var w =  NeighborAt(nbr, WEST, dir);
        if (e.block.present.get() && !e.block.conductive.get()){
            if (w.block.present.get() && !w.block.conductive.get()){
                dir_sum = RotateRight(dir,SOUTH);
            }else{
                dir_sum = RotateRight(dir, WEST);
            }
            signal_strength += cell.signal.strength.get();
        }else{
            if (w.block.present.get() && !w.block.conductive.get()){
                dir_sum = RotateRight(dir, EAST);
                signal_strength += cell.signal.strength.get();
            }
        }
    }
    cell.signal.direction.set(dir_sum % 8);
    cell.signal.strength.set(signal_strength);
};

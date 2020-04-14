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
    }
    this.flip = function(){
        this.direction.flip();
        this.strength.flip();
    };
}

function SignalUpdate(cell, nbr){
    // Signal propagation logic.
    signal_strength = 0.0;
    var dir_cnt = 0;
    var has_dir = [false, false, false, false];
    for (dir in DIRECTION_LIST){
        var n = NeighborAt(nbr, 4, dir);
        if (n.signal.direction.get() == dir ||
            n.signal.direction.get() == CENTER){
            if (n.signal.strength.get() > 0){
                signal_strength += n.signal.strength.get();
                dir_cnt += 1;
                has_dir[dir] = true;
            }
        }
    }

    if (cell.block.present.get() && !cell.block.conductive.get()){
        signal_strength = 0.0;
    }
    if (dir_cnt == 1) {
        for (j in DIRECTION_LIST){
            if (has_dir[j]){
                cell.signal.direction.set(j);
            }
        }
    }
    if (dir_cnt == 2 || dir_cnt == 4) {
        signal_strength = 0.0;
    }
    if (dir_cnt == 3) {
        for (j in DIRECTION_LIST){
            if (!has_dir[j]){
                cell.signal.direction.set(RotateRight(j, 2));
            }
        }
    }

    if (cell.signal.strength.get() > 0){
        var dir = cell.signal.direction.get();
        if (dir != CENTER){
            var n = NeighborAt(nbr, 0, dir);
            if (n.block.present.get() && !n.block.conductive.get()){
                var o =  NeighborAt(nbr, 2, dir);
                var p =  NeighborAt(nbr, 6, dir);
                if (o.block.present.get() && !o.block.conductive.get()){
                    if (p.block.present.get() && !p.block.conductive.get()){
                        cell.signal.direction.set(RotateRight(dir,2));
                    }else{
                        cell.signal.direction.set(RotateRight(dir, 3));
                    }
                    signal_strength += cell.signal.strength.get();
                }else{
                    if (p.block.present.get() && !p.block.conductive.get()){
                        cell.signal.direction.set(RotateRight(dir, 1));
                        signal_strength += cell.signal.strength.get();
                    }else{
                        signal_strength = 0.0;
                    }
                }
            }
        }
    }
    cell.signal.strength.set(signal_strength);
};

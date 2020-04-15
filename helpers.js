//##### Helper functions #####\\
function DoubleBuffer(initial_data){
    this.old = initial_data;
    this.current = initial_data;
    this.set = function(new_data){
        this.current = new_data;
    }
    this.flip = function(){
        this.old = this.current;
    }
    this.get = function(){
        return this.old;
    }
}

function RotateRight(direction, n_turns){
    if (direction == CENTER){
        return CENTER;
    }
    return (Number(direction) + Number(n_turns)) % Number(8);
}

function NeighborAt(nbr, idx, direction){
    // Index into nbr is the directions.
    // 7 0 1
    // 6 ^ 2
    // 5 4 3
    return nbr[(Number(idx) + Number(direction)) % Number(8)];
}

function ParameterNeighbors(nbr, param){
    var p_nbr = [];
    for (i of nbr){
        p_nbr.push(i[param]);
    }
    return p_nbr;
}

function AverageDirections (directions_list){
    var x_sum = 0.0;
    var y_sum = 0.0;
    for (dir of directions_list){
        if (dir == NORTH || dir == NORTH_WEST || dir == NORTH_EAST){
            y_sum -= 1.0;
        }
        if (dir == SOUTH || dir == SOUTH_WEST || dir == SOUTH_EAST){
            y_sum += 1.0;
        }
        if (dir == EAST || dir == NORTH_EAST || dir == SOUTH_EAST){
            x_sum += 1.0;
        }
        if (dir == WEST || dir == NORTH_WEST || dir == SOUTH_WEST){
            x_sum -= 1.0;
        }
    }
    if (x_sum == 0 && y_sum == 0) return CENTER;
    if (x_sum == 0 ||
        Math.abs(y_sum) > Math.abs(x_sum)) return y_sum > 0 ? SOUTH : NORTH;
    if (y_sum == 0 ||
        Math.abs(x_sum) > Math.abs(y_sum)) return x_sum > 0 ? EAST : WEST;
    if (y_sum > 0){
        if (x_sum > 0){
            return SOUTH_EAST;
        } else {
            return SOUTH_WEST;
        }
    } else {
        if (x_sum > 0){
            return NORTH_EAST;
        } else {
            return NORTH_WEST;
        }
    }
}

function IsLongDirection(dir){
    return dir % 2 == 1;
}

function CompareDirection(a, b){
    // TODO: make this more elegent;
    if (a == CENTER || b == CENTER) return 0;
    if (a == b) return 0;
    if (a == RotateRight(b, NORTH_EAST)) return 1;
    if (a == RotateRight(b, NORTH_WEST)) return 1;
    if (a == RotateRight(b, EAST)) return 2;
    if (a == RotateRight(b, WEST)) return 2;
    if (a == RotateRight(b, SOUTH_EAST)) return 3;
    if (a == RotateRight(b, SOUTH_WEST)) return 3;
    return 4;
}

function DrawBox(x, y, w, h){
    for (var i=0; i<w; i++){
        cells[i+x][y].block.present.set(true);
        cells[i+x][y + h - 1].block.present.set(true);
    }
    for (var j=0; j<h; j++){
        cells[x][y + j].block.present.set(true);
        cells[x + w - 1][y + j].block.present.set(true);
    }
}

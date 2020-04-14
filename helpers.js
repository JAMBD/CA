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
    // HACK: make sure 2 + 1 != 21
    return (direction * 1.0 + n_turns * 1.0) % 4.0;
}

function NeighborAt(nbr, idx, direction){
    // Index into nbr.
    // 7 0 1
    // 6 ^ 2
    // 5 4 3
    return nbr[(idx + direction * 2) % 8];
}

function ParameterNeighbors(nbr, param){
    var p_nbr = [];
    for (i of nbr){
        p_nbr.push(i[param]);
    }
    return p_nbr;
}

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


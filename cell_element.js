function Air(){
    this.direction = new DoubleBuffer(CENTER);
    this.draw = function(context, x, y, size){
    };
    this.flip = function(){
    };
}

function Water(){
    this.direction = new DoubleBuffer(CENTER);
    this.level = new DoubleBuffer(0);
    this.draw = function(context, x, y, size){
        if (this.level.get() > 0){
            context.globalAlpha = this.level.get() / 8.0 + 0.5;
            context.fillStyle = "#0055ff";
            context.fillRect(x, y, size, size);
            context.fillStyle = "#2e74ff";
            if (this.direction.get() == CENTER){
                context.fillRect(x + size / 4, y + size / 4, size / 2, size / 2);
            }else{
                var dir = this.direction.get();
                if (dir == NORTH || dir == NORTH_EAST || dir == NORTH_WEST){
                    context.fillRect(x, y, size, size / 4);
                }
                if (dir == SOUTH || dir == SOUTH_EAST || dir == SOUTH_WEST){
                    context.fillRect(x, y + size / 4 * 3, size, size / 4);
                }
                if (dir == EAST || dir == SOUTH_EAST || dir == NORTH_EAST){
                    context.fillRect(x + size / 4 * 3, y, size / 4, size);
                }
                if (dir == WEST || dir == SOUTH_WEST || dir == NORTH_WEST){
                    context.fillRect(x, y, size / 4, size);
                }
            }
        }
        context.globalAlpha = 1.0;
    };
    this.flip = function(){
        this.direction.flip();
        this.level.flip();
    };
}

function WaterUpdate(cell, nbr){
    var found_dir = [];
    var sum_levels = 0;
    if (cell.water.level.get() > 0){
        found_dir.push(cell.water.direction.get());
    }
    for (dir of ALL_DIRECTION_LIST){
        var n = NeighborAt(nbr, SOUTH, dir);
        if (n.water.level.get() <= 0) continue;
        var dir_err = CompareDirection(n.water.direction.get(), dir);
        if (dir_err > 2) continue;
        var n_level = (
            n.water.level.get() -
            1.0 -
            (IsLongDirection(dir) ? 1 : 0));
        if (n_level < 0) continue;
        found_dir.push(dir);
        if (n_level > sum_levels) sum_levels = n_level;
    }
    if (sum_levels > 4) sum_levels = 4.0;
    if (cell.water.direction.get() != CENTER || cell.water.level.get() == 0){
        cell.water.level.set(sum_levels);
        cell.water.direction.set(AverageDirections(found_dir));
    }
}

function Fire(){
    this.draw = function(context, x, y, size){
    };
    this.flip = function(){
    };
}

function Earth(){
    this.draw = function(context, x, y, size){
    };
    this.flip = function(){
    };
}

function Element(){
    this.air = new Air();
    this.water = new Water();
    this.fire = new Fire();
    this.earth = new Earth();
    this.draw = function(context, x, y, size){
        this.air.draw(context, x, y, size);
        this.water.draw(context, x, y, size);
        this.fire.draw(context, x, y, size);
        this.earth.draw(context, x, y, size);
    }
    this.flip = function(){
        this.air.flip();
        this.water.flip();
        this.fire.flip();
        this.earth.flip();
    }
}

function ElementUpdate(cell, nbr){
    var element_nbr = ParameterNeighbors(nbr, "element");
    WaterUpdate(cell.element, element_nbr);
}

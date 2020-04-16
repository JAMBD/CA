function Air(){
    this.direction = new DoubleBuffer(CENTER);
    this.pressure = new DoubleBuffer(0.0);
    this.draw = function(context, x, y, size){
        context.strokeStyle = "#ffffff";
        context.lineWidth = size / 4;
        var dir = this.direction.get();
        if (this.pressure.get() > 0){
            context.globalAlpha = 0.1;
            context.fillStyle = "#ffffff";
            context.fillRect(x, y, size, size);
            context.globalAlpha = this.pressure.get() / 32 * 0.8 + 0.2;
            if (dir == CENTER){
            context.fillRect(x+size/3, y+size/3, size/3, size/3);
            }
            // TODO: Pretty sure there is a clean way to do this.
            context.beginPath();
            if (dir == NORTH){
                context.moveTo(x, y + size/2);
                context.lineTo(x + size/2, y);
                context.lineTo(x + size, y + size/2);
            }
            if (dir == SOUTH){
                context.moveTo(x, y + size/2);
                context.lineTo(x + size/2, y + size);
                context.lineTo(x + size, y + size/2);
            }
            if (dir == EAST){
                context.moveTo(x + size/2, y);
                context.lineTo(x + size, y + size/2);
                context.lineTo(x + size/2, y + size);
            }
            if (dir == WEST){
                context.moveTo(x + size/2, y);
                context.lineTo(x, y + size/2);
                context.lineTo(x + size/2, y + size);
            }
            if (dir == NORTH_WEST){
                context.moveTo(x + size/2, y);
                context.lineTo(x, y);
                context.lineTo(x, y + size/2);
            }
            if (dir == NORTH_EAST){
                context.moveTo(x + size/2, y);
                context.lineTo(x + size, y);
                context.lineTo(x + size, y + size/2);
            }
            if (dir == SOUTH_WEST){
                context.moveTo(x + size/2, y + size);
                context.lineTo(x, y + size);
                context.lineTo(x, y + size/2);
            }
            if (dir == SOUTH_EAST){
                context.moveTo(x + size/2, y + size);
                context.lineTo(x + size, y + size);
                context.lineTo(x + size, y + size/2);
            }
            context.stroke();
        }
        context.globalAlpha = 1.0;
    };
    this.flip = function(){
        this.direction.flip();
        this.pressure.flip();
    };
}

function AirUpdate(cell, nbr){
    var found_dir = [];
    var sum_pressures = Math.floor(cell.air.pressure.get() / 2);
    if (cell.air.pressure.get() > 0){
        found_dir.push(cell.air.direction.get());
    }
    for (dir of ALL_DIRECTION_LIST){
        var n = NeighborAt(nbr, SOUTH, dir);
        if (n.air.pressure.get() <= 0) continue;
        var dir_err = CompareDirection(n.air.direction.get(), dir);
        if (dir_err > 1) continue;
        var n_pressure = (
            n.air.pressure.get() -
            1.0 -
            (IsLongDirection(dir) ? 1 : 0));
        if (n_pressure < 0) continue;
        found_dir.push(dir);
        if (n_pressure > sum_pressures) sum_pressures = n_pressure;
    }
    cell.air.pressure.set(sum_pressures);
    cell.air.direction.set(AverageDirections(found_dir));
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
        this.earth.draw(context, x, y, size);
        this.water.draw(context, x, y, size);
        this.fire.draw(context, x, y, size);
        this.air.draw(context, x, y, size);
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
    AirUpdate(cell.element, element_nbr);
}

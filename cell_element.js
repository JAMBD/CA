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
            context.globalAlpha = this.pressure.get() / WIND_MAX * 0.8 + 0.2;
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
    found_dir = [];
    found_pressure = 0;

    // Basic propagation and reflection precondition logic.
    for (dir of ALL_DIRECTION_LIST){
        var n = NeighborAt(nbr, SOUTH, dir);
        if (n.air.direction.get() != dir) continue;
        var n_dir = dir;
        if (NeighborAt(nbr, NORTH, dir).earth.height.get() > 0) {
            var n_earth_dir = [];
            if (NeighborAt(nbr, NORTH_EAST, dir).earth.height.get() > 0 &&
                NeighborAt(nbr, NORTH_WEST, dir).earth.height.get() > 0){
                n_earth_dir.push(RotateRight(dir, SOUTH));
            }
            if (NeighborAt(nbr, NORTH_EAST, dir).earth.height.get() > 0 &&
                NeighborAt(nbr, EAST, dir).earth.height.get() > 0){
                n_earth_dir.push(RotateRight(dir, WEST));
            }
            if (NeighborAt(nbr, NORTH_WEST, dir).earth.height.get() > 0 &&
                NeighborAt(nbr, WEST, dir).earth.height.get() > 0){
                n_earth_dir.push(RotateRight(dir, EAST));
            }
            if (n_earth_dir.length > 0){
                n_dir = AverageDirections(n_earth_dir);
            }
        }
        found_dir.push(n_dir);
        found_pressure += n.air.pressure.get();
    }

    // Air splitting precondition logic.
    for (dir of FOUR_DIRECTION_LIST){
        var n = NeighborAt(nbr, SOUTH, dir);
        if (NeighborAt(nbr, WEST, dir).earth.height.get() <= 0) continue;
        if (! PointAt(n.air.direction.get(), SOUTH, WEST, dir)) continue;
        found_dir.push(dir);
        found_pressure += n.air.pressure.get();
    }
    for (dir of FOUR_DIRECTION_LIST){
        var n = NeighborAt(nbr, SOUTH, dir);
        if (NeighborAt(nbr, EAST, dir).earth.height.get() <= 0) continue;
        if (! PointAt(n.air.direction.get(), SOUTH, EAST, dir)) continue;
        found_dir.push(dir);
        found_pressure += n.air.pressure.get();
    }
    for (dir of LONG_DIRECTION_LIST){
        var n = NeighborAt(nbr, SOUTH, dir);
        if (NeighborAt(nbr, SOUTH_WEST, dir).earth.height.get() <= 0) continue;
        if (! PointAt(n.air.direction.get(), SOUTH, SOUTH_WEST, dir)) continue;
        found_dir.push(dir);
        found_pressure += n.air.pressure.get();
    }
    for (dir of LONG_DIRECTION_LIST){
        var n = NeighborAt(nbr, SOUTH, dir);
        if (NeighborAt(nbr, SOUTH_EAST, dir).earth.height.get() <= 0) continue;
        if (! PointAt(n.air.direction.get(), SOUTH, SOUTH_EAST, dir)) continue;
        found_dir.push(dir);
        found_pressure += n.air.pressure.get();
    }

    // Propagation.
    if (found_dir.length == 1){
        cell.air.direction.set(found_dir[0]);
        cell.air.pressure.set(found_pressure);
    } else {
        cell.air.direction.set(CENTER);
        cell.air.pressure.set(0);
    }
}

function Water(){
    this.direction = new DoubleBuffer(CENTER);
    this.level = new DoubleBuffer(0);
    this.draw = function(context, x, y, size){
        if (this.level.get() > 0){
            context.globalAlpha = this.level.get() / WATER_MAX * 0.8 + 0.2;
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
}

function Fire(){
    this.draw = function(context, x, y, size){
    };
    this.flip = function(){
    };
}

function Earth(){
    // Height is limited to 0-16.
    this.height = new DoubleBuffer(0);
    this.draw = function(context, x, y, size){
        let terrain_color_map = [
            "#70491A",
	    "#734E1E",
	    "#765323",
	    "#7A5827",
	    "#7D5D2C",
	    "#816230",
	    "#846735",
	    "#886C39",
	    "#8B713E",
	    "#8F7642",
	    "#927B47",
	    "#96804B",
	    "#998550",
	    "#9D8A54",
	    "#A08F59",
	    "#A4945D",
	    "#A79962",
            "#AB9E67"];
        if (this.height.get() > 0){
            context.fillStyle = terrain_color_map[this.height.get() - 1];
            context.fillRect(x, y, size, size);
        }
    };
    this.flip = function(){
        this.height.flip();
    };
}

function EarthUpdate(cell, nbr){
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
    EarthUpdate(cell.element, element_nbr);
    if (!cell.block.conductive.get() && cell.block.present.get()){
        cell.element.earth.height.set(0);
        cell.element.air.pressure.set(0);
        cell.element.water.level.set(0);
    }
}

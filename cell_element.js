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
    var found_dir = [];
    var sum_pressures = 0;
    if (cell.air.pressure.get() > 0){
        found_dir.push(cell.air.direction.get());
        if (cell.air.direction.get() == CENTER){
            sum_pressures += Math.floor(cell.air.pressure.get() / 2);
        }
    }
    for (dir of ALL_DIRECTION_LIST){
        var n = NeighborAt(nbr, SOUTH, dir);
        if (n.air.pressure.get() <= cell.earth.height.get() - n.earth.height.get()) continue;
        var dir_err = CompareDirection(n.air.direction.get(), dir);
        if (dir_err > 1) continue;
        var n_pressure = n.air.pressure.get() - 1;
        if (IsLongDirection(dir)){
            n_pressure = Math.floor(n_pressure / 2);
        }
        if (n_pressure < 0) continue;
        found_dir.push(dir);
        if (n_pressure > sum_pressures) sum_pressures = n_pressure;
    }
    // Interact with earth
    for (side of [[EAST, SOUTH_EAST], [WEST,SOUTH_WEST]]){
        for (dir of ALL_DIRECTION_LIST){
            var n = NeighborAt(nbr, SOUTH, dir);
            if (n.air.pressure.get() <= 0) continue;
            if (n.air.direction.get() == CENTER) continue;
            var dir_err = CompareDirection(n.air.direction.get(), RotateRight(dir, side[0]));
            if (dir_err > 0) continue;
            if (NeighborAt(nbr,  side[1], dir).earth.height.get() <= n.earth.height.get()) continue;
            var n_pressure = n.air.pressure.get();
            n_pressure = Math.floor(n_pressure / 2);
            if (n_pressure < 0) continue;
            found_dir.push(dir);
            if (n_pressure > sum_pressures) sum_pressures = n_pressure;
        }
    }
    cell.air.pressure.set(sum_pressures);
    var new_dir = AverageDirections(found_dir);
    if (new_dir != CENTER && NeighborAt(nbr, NORTH, new_dir).earth.height.get() > cell.earth.height.get() + sum_pressures) new_dir = CENTER;
    cell.air.direction.set(new_dir);
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

    if (cell.water.level.get() > 0 && cell.water.direction.get() == CENTER){
        // Treat still blocks differently
        var cell_height = cell.earth.height.get() + cell.water.level.get();
        var any_lower = false;
        var n_greater = 0;
        var level_change = cell.water.level.get();
        for (dir of ALL_DIRECTION_LIST){
            var n = NeighborAt(nbr, NORTH, dir);
            var n_height = n.earth.height.get();
            if (n.water.direction.get() == CENTER){
                n_height += n.water.level.get();
            }
            if (cell_height > n_height){
                any_lower = true;
            }
            if (cell_height < n_height &&
                n.water.level.get() > level_change &&
                n.water.direction.get() != CENTER &&
                CompareDirection(n.water.direction.get(), RotateRight(dir, SOUTH)) < 3){
                level_change = n.water.level.get();
            }
            if (cell_height < n_height &&
                n.water.level.get() > cell.water.level.get() &&
                n.water.direction.get() == CENTER){
                n_greater += 1;
            }

        }

        if (any_lower) level_change -= 1;
        if (n_greater > 3) level_change += 1;
        
        if (level_change > WATER_MAX) level_change = WATER_MAX;
        if (level_change < 0) level_change = 0;
        cell.water.level.set(level_change);
        return;
    }

    var found_dir = [];
    var gradient_dir = []
    var sum_levels = 0;
    var cell_height = cell.earth.height.get();
    for (dir of ALL_DIRECTION_LIST){
        var n = NeighborAt(nbr, SOUTH, dir);
        var n_height = n.earth.height.get();
        if (n.water.direction.get() == CENTER){
            n_height += n.water.level.get();
        }
        if (cell_height < n_height){
            gradient_dir.push(dir);
        }
        if (cell_height > n_height){
            gradient_dir.push(RotateRight(dir, SOUTH));
        }
        if (n.water.level.get() <= 0) continue;
        if (n.water.level.get() + n.earth.height.get() <= cell.earth.height.get()) continue;
        var dir_err = CompareDirection(n.water.direction.get(), dir);
        if (dir_err > 2) continue;
        var n_level = (
            n.water.level.get() -
            (IsLongDirection(dir) ? 2: 1));
        if (n_level > sum_levels){
            sum_levels = n_level;
        }
        found_dir.push(dir);
    }
    if (sum_levels > WATER_MAX) sum_levels = WATER_MAX;
    var new_dir = AverageDirections(found_dir);
    if (gradient_dir.length > 0 && AverageDirections(gradient_dir) == CENTER) new_dir = CENTER;
    if (new_dir != CENTER){
        n = NeighborAt(nbr, NORTH, new_dir);
        n_height = n.earth.height.get();
        if (n.water.direction.get() == CENTER) n_height += n.water.level.get();
        if (n_height > cell.earth.height.get()) new_dir = CENTER;
    }
    cell.water.level.set(sum_levels);
    cell.water.direction.set(new_dir);
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
    var new_height = cell.earth.height.get();
    for (dir of ALL_DIRECTION_LIST){
        var n = NeighborAt(nbr, SOUTH, dir);
        if (n.earth.height.get() <= 0) continue;
        if (n.earth.height.get() + n.air.pressure.get() < cell.earth.height.get()) continue;
        if (n.air.pressure.get() > 0 && n.air.direction.get() != CENTER){
            var dir_err = CompareDirection(n.air.direction.get(), dir);
            if (dir_err > 0) continue;
            new_height ++;
        }
    }

    // If the cell in front can accept the block.
    if (new_height > 0){
        if (cell.air.pressure.get() > 0 && cell.air.direction.get() != CENTER){
        var n = NeighborAt(nbr, NORTH, cell.air.direction.get());
            if (cell.earth.height.get() + cell.air.pressure.get() >= n.earth.height.get()){
                new_height --;
            }
        }
    }
    
    if (new_height > 16) new_height = 16;
    cell.earth.height.set(new_height);
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
}

var BOARD_WIDTH = 64;
var BOARD_HEIGHT = 64;

var draw_scale;
var cells = [];

//   ^ N
// W + E
//   S
var CENTER = -1;
var NORTH = 0;
var SOUTH = 2;
var EAST = 1;
var WEST = 3;

var DIRECTION_LIST = [NORTH, SOUTH, EAST, WEST];

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
    return (direction + n_turns) % 4;
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

//##### Define the data contained in a cell #####\\
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
    this.update = function(nbr){
        // Signal propagation logic.
        signal_strength = 0.0;
        var dir_cnt = 0;
        var has_dir = [false, false, false, false];
        for (dir in DIRECTION_LIST){
            var n = NeighborAt(nbr, 4, dir);
            if (n.direction.get() == dir ||
                n.direction.get() == CENTER){
                if (n.strength.get() > 0){
                    signal_strength += n.strength.get();
                    dir_cnt += 1;
                    has_dir[dir] = true;
                }
            }
        }
        if (dir_cnt == 1) {
            for (j in DIRECTION_LIST){
                if (has_dir[j]){
                    this.direction.set(j);
                }
            }
        }
        if (dir_cnt == 2 || dir_cnt == 4) {
            signal_strength = 0.0;
        }
        if (dir_cnt == 3) {
            for (j in DIRECTION_LIST){
                if (!has_dir[j]){
                    this.direction.set(RotateRight(j, 2));
                }
            }
        }
        this.strength.set(signal_strength);
    };
}

function Block(){
    this.present = new DoubleBuffer(false);
    this.conductive = new DoubleBuffer(false);
    this.signal_source = new DoubleBuffer(0.0);
    this.draw = function (context, x, y, size){
        if (this.present.get()) {
            context.fillStyle = "#42402e";
            context.fillRect(x, y, size, size);
        }
    };
    this.flip = function(){
        this.present.flip();
        this.conductive.flip();
        this.signal_source.flip();
    };
}

function Cell(){
    this.signal = new Signal();
    this.block = new Block();
    this.draw = function (context, x, y, size){
        context.fillStyle = "#083d54";
        context.fillRect(x, y, size, size);
        this.block.draw(context, x, y, size);
        this.signal.draw(context, x, y, size);
    };
    this.flip = function(){
        this.signal.flip();
        this.block.flip();
    };
    this.update = function(nbr){
        // Update each paramter.
        this.signal.update(ParameterNeighbors(nbr, "signal"));

        // Signal interacting with block.
        if (this.block.present.get() && !this.block.conductive.get()){
            this.signal.strength.set(0);
        }
        if (this.signal.strength.get() > 0){
            var dir = this.signal.direction.get();
            if (dir != CENTER){
                var n = NeighborAt(nbr, 0, dir);
                if (n.block.present.get() && !n.block.conductive.get()){
                    var o =  NeighborAt(nbr, 2, dir);
                    var p =  NeighborAt(nbr, 6, dir);
                    if (o.block.present.get() && !o.block.conductive.get()){
                        if (p.block.present.get() && !p.block.conductive.get()){
                            this.signal.direction.set(RotateRight(dir,1));
                        }else{
                            this.signal.direction.set(RotateRight(dir, 3));
                        }
                        this.signal.strength.set(this.signal.strength.get());
                    }else{
                        if (p.block.present.get() && !p.block.conductive.get()){
                            this.signal.direction.set(RotateRight(dir, 1));
                            this.signal.strength.set(this.signal.strength.get());
                        }else{
                            this.signal.strength.set(0);
                        }
                    }
                }
            }
        }
    };
}

function update_cells(){
    // no logic yet for edges.
    for (var i = 1; i < BOARD_WIDTH - 1; i++){
        for (var j = 1; j < BOARD_HEIGHT - 1; j++){
            cells[i][j].update([
                cells[i][j-1], cells[i+1][j-1], cells[i+1][j],
                cells[i+1][j+1], cells[i][j+1], cells[i-1][j+1],
                cells[i-1][j], cells[i-1][j-1]]);
        }
    }
}

function flip_cells(){
    for (var i = 0; i < BOARD_WIDTH; i++){
        for (var j = 0; j < BOARD_HEIGHT; j++){
            cells[i][j].flip();
        }
    }
}

//##### Setup initial conditions #####\\
function signal_test_setup(){
    cells[32][32].signal.strength.set(1.0);
    cells[32][30].block.present.set(true);
    cells[31][31].block.present.set(true);
    cells[32][35].block.present.set(true);
    cells[33][34].block.present.set(true);
    cells[16][32].signal.strength.set(1.0);
    cells[16][30].block.present.set(true);

    cells[16][36].block.present.set(true);
    cells[14][35].block.present.set(true);
    cells[15][36].block.present.set(true);
    cells[18][36].block.present.set(true);
    cells[19][35].block.present.set(true);

    cells[24][24].signal.strength.set(1.0);
    cells[60][30].block.present.set(true);
    cells[61][31].block.present.set(true);
    cells[60][32].block.present.set(true);
    flip_cells();
}

//##### Boiler plate to setup the canvas #####\\
function game_setup(){
    for (var i = 0; i < BOARD_WIDTH; i++){
        var row = [];
        for (var j = 0; j < BOARD_HEIGHT; j++){
            row.push(new Cell());
        }
        cells.push(row);
    }
    signal_test_setup();
}

function update(){
    update_cells();
    flip_cells();
}

function draw(){
    var game_element = document.getElementById("game");
    var game_context = game_element.getContext("2d");
    game_context.clearRect(0,0,game_element.width,game_element.height);
    game_context.fillStyle = "#00546e";
    game_context.fillRect(0,0,game_element.width,game_element.height);
    var cell_fill_fraction = 0.85;
    for (var i = 0; i < BOARD_WIDTH; i++){
        for (var j = 0; j < BOARD_HEIGHT; j++){
            cell = cells[i][j];
            cell.draw(
                game_context,
                draw_scale * (i + (1.0 - cell_fill_fraction) / 2.0),
                draw_scale * (j + (1.0 - cell_fill_fraction) / 2.0),
                draw_scale * cell_fill_fraction);
        }
    }
}

function resizeCanvas(){
    var ratio = BOARD_WIDTH / BOARD_HEIGHT;
    var center_div = document.getElementById("center");
    var game = document.getElementById("game");
    min_length = Math.min(window.innerWidth / ratio,window.innerHeight);
    center_div.width = min_length * ratio;
    center_div.height = min_length;
    center_div.style.width = min_length * ratio + 'px';
    center_div.style.height = min_length + 'px';
    game.width = min_length * ratio;
    game.height = min_length;
    game.style.width = min_length * ratio + 'px';
    game.style.height = min_length + 'px';
    draw_scale = center_div.width / BOARD_WIDTH;
    draw();
}

function setup(){
    game_setup();
    window.addEventListener('resize', resizeCanvas, false);
    setInterval(function() {
        update();
        draw();
    }, 1000);
    resizeCanvas();
}

setup();

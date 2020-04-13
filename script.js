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
    }
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
    }
    this.flip = function(){
        this.present.flip();
        this.conductive.flip();
        this.signal_source.flip();
    }
}

function Cell(){
    this.signal = new Signal();
    this.block = new Block();
    this.draw = function (context, x, y, size){
        context.fillStyle = "#306d80";
        context.fillRect(x, y, size, size);
        this.block.draw(context, x, y, size);
        this.signal.draw(context, x, y, size);
    }
    this.flip = function(){
        this.signal.flip();
        this.block.flip();
    }
}

//##### Cellular Automata #####\\
function cell_logic(
    a, b, c,
    d, e, f,
    g, h, i){

    // Signal propagation logic.
    signal_strength = 0.0;
    var has_dir = [false, false, false, false];
    var dir_cnt = 0;
    if (b.signal.direction.get() == SOUTH || b.signal.direction.get() == CENTER){
        if (b.signal.strength.get() > 0){
            signal_strength += b.signal.strength.get();
            has_dir[SOUTH] = true;
            dir_cnt += 1;
        }
    }
    if (h.signal.direction.get() == NORTH || h.signal.direction.get() == CENTER){
        if (h.signal.strength.get() > 0){
            signal_strength += h.signal.strength.get();
            has_dir[NORTH] = true;
            dir_cnt += 1;
        }
    }
    if (d.signal.direction.get() == EAST || d.signal.direction.get() == CENTER){
        if (d.signal.strength.get() > 0){
            signal_strength += d.signal.strength.get();
            has_dir[EAST] = true;
            dir_cnt += 1;
        }
    }
    if (f.signal.direction.get() == WEST || f.signal.direction.get() == CENTER){
        if (f.signal.strength.get() > 0){
            signal_strength += f.signal.strength.get();
            has_dir[WEST] = true;
            dir_cnt += 1;
        }
    }
    e.signal.strength.set(signal_strength);
    if (dir_cnt == 1) {
        for (i in [NORTH, SOUTH, EAST, WEST]){
            if (has_dir[i]){
                e.signal.direction.set(i);
            }
        }
    }

    // Signal interacting with block logic.

}

function update_cells(){
    // no logic yet for edges.
    for (var i = 1; i < BOARD_WIDTH - 1; i++){
        for (var j = 1; j < BOARD_HEIGHT - 1; j++){
            cell_logic(
                cells[i-1][j-1], cells[i][j-1], cells[i+1][j-1],
                cells[i-1][j],   cells[i][j],   cells[i+1][j],
                cells[i-1][j+1], cells[i][j+1], cells[i+1][j+1]);
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

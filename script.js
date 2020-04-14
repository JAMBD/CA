var BOARD_WIDTH = 64;
var BOARD_HEIGHT = 64;

var draw_scale;
var cells = [];

//##### Boiler plate to setup the canvas #####\\
function update_cells(){
    // no logic yet for edges.
    for (var i = 1; i < BOARD_WIDTH - 1; i++){
        for (var j = 1; j < BOARD_HEIGHT - 1; j++){
            CellUpdate(cells[i][j], [
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

function clear_game(){
    for (var i = 0; i < BOARD_WIDTH; i++){
        for (var j = 0; j < BOARD_HEIGHT; j++){
            cells[i][j] = new Cell();
        }
    }
}

function game_setup(){
    for (var i = 0; i < BOARD_WIDTH; i++){
        var row = [];
        for (var j = 0; j < BOARD_HEIGHT; j++){
            row.push(new Cell());
        }
        cells.push(row);
    }
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

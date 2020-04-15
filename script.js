var BOARD_WIDTH = 64;
var BOARD_HEIGHT = 64;
var cell_fill_fraction = 0.85;

var draw_scale;
var update_speed;
var cells = [];
var interval;
var mouseButtonDown = false;

// My dumb code starts here. I might refactor later
var slider = document.getElementById("myRange");
var play_stop = document.getElementById("playPause");
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
update_speed = 1000 - slider.value;

slider.oninput = function () {
    update_speed = 1000 - this.value;
    if (play_stop.checked) {
        clearInterval(interval);
        interval = setInterval(function () {
            update();
            draw();
        }, update_speed);
    }
}

play_stop.oninput = function () {
    if (play_stop.checked) {
        interval = setInterval(function () {
            update();
            draw();
        }, update_speed);
    } else {
        clearInterval(interval);
    }
}

canvas.addEventListener('mousedown', function (evt) {
        mouseButtonDown = true;
        moveFunction(evt);
    }, false);
canvas.addEventListener('mousemove', moveFunction, false);
canvas.addEventListener('mouseup',    function () { mouseButtonDown = false;}, false);
canvas.addEventListener('mouseleave', function () { mouseButtonDown = false; }, false);

function moveFunction(evt) {
    var mousePos = getMousePos(canvas, evt);
    if (mouseButtonDown) {
        setCellValue(mousePos.x, mousePos.y);
        paintMouseCell(mousePos.x, mousePos.y, draw_scale * cell_fill_fraction, "black");
    }
    // Uncoment to highlight where the mouse is hovering
    //else {
    //    paintMouseCell(mousePos.x, mousePos.y, draw_scale * cell_fill_fraction, "white");
    //}
}

function paintMouseCell(x, y, size, color) {
    context.fillStyle = color;
    var newX = x - (x % draw_scale);
    var newY = y - (y % draw_scale);
    context.fillRect(newX, newY, size, size);
}

function setCellValue(x, y) {
    var cellX = Math.floor(x / draw_scale);
    var cellY = Math.floor(y / draw_scale);
    cells[cellX][cellY].block.present.set(true);
}

function writeMessage(canvas, message) {
    var context = canvas.getContext('2d');
    context.font = '18pt Calibri';
    context.fillStyle = 'white';
    context.fillText(message, 10, 25);
}
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}


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
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Commenting out since we don't need it as long as it's the same color as the background
    //context.fillStyle = "#00546e";
    //context.fillRect(0,0,canvas.width,canvas.height);

    for (var i = 0; i < BOARD_WIDTH; i++){
        for (var j = 0; j < BOARD_HEIGHT; j++){
            cell = cells[i][j];
            cell.draw(
                context,
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
    resizeCanvas();
}

setup();

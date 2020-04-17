var selector = document.getElementById("drawSelector");
var direction = document.getElementById("direction");
var intensity = document.getElementById("intensity");
var lastPainted = [];

canvas.addEventListener('mousedown', function (evt) {
    mouseButtonDown = true;
    moveFunction(evt);
}, false);
canvas.addEventListener('mousemove', moveFunction, false);
canvas.addEventListener('mouseup', function () {
    mouseButtonDown = false;
    lastPainted = [];
}, false);
canvas.addEventListener('mouseleave', function () {
    mouseButtonDown = false;
    lastPainted = [];
}, false);

function moveFunction(evt) {
    var mousePos = getMousePos(canvas, evt);
    if (mouseButtonDown) {
        setCellValue(mousePos.x, mousePos.y);
    }
    //// Uncomment this to see where the mouse is hovering
    //else {
    //    draw();
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
    var cx = Math.floor(x / draw_scale);
    var cy = Math.floor(y / draw_scale);

    if (cx == lastPainted[0] && cy == lastPainted[1]) {
        return;
    }

    lastPainted[0] = cx;
    lastPainted[1] = cy;

    var increment = parseInt(intensity.value);

    switch (selector.value) {
        case "Block":
            cells[cx][cy].block.present.set(true);
            color = "black";
            paintMouseCell(x, y, draw_scale * cell_fill_fraction, color);
            break;
        case "Conductor":
            cells[cx][cy].block.present.set(true);
            cells[cx][cy].block.conductive.set(true);
            color = "purple";
            paintMouseCell(x, y, draw_scale * cell_fill_fraction, color);
            break;
        case "Signal":
            cells[cx][cy].signal.strength.set(1.0);
            cells[cx][cy].signal.direction.set(direction.value);
            cells[cx][cy].flip();
            break;
        case "Water":
            var level = cells[cx][cy].element.water.level.get();
            level = level + increment > WATER_MAX ? WATER_MAX : level + increment;
            cells[cx][cy].element.water.level.set(level);
            cells[cx][cy].element.water.direction.set(direction.value);
            cells[cx][cy].flip();
            break;
        case "Earth":
            var height = cells[cx][cy].element.earth.height.get();
            height = height + increment > EARTH_MAX ? EARTH_MAX : height + increment;
            cells[cx][cy].element.earth.height.set(height);
            cells[cx][cy].flip();
            break;
        case "Wind":
            var pressure = cells[cx][cy].element.air.pressure.get();
            pressure = pressure + increment > WIND_MAX ? WIND_MAX : pressure + increment;
            cells[cx][cy].element.air.pressure.set(pressure);
            cells[cx][cy].element.air.direction.set(direction.value);
            cells[cx][cy].flip();
            break;
        case "Fire":
            color = "orange";
            paintMouseCell(x, y, draw_scale * cell_fill_fraction, color);
            break;
        case "Erase":
            cells[cx][cy] = new Cell();
            color = "083d54";
            break;
    }

    switch (selector.value) {
        case "Block":
        case "Conductor":
            break;
        default:
            // John, is there a way to make the next line work with Block, Conductor and Earth as well? Because paintMouseCell is hind of hacky
            cells[cx][cy].draw(
                context,
                x - (x % draw_scale),
                y - (y % draw_scale),
                draw_scale * cell_fill_fraction, true);
            break;
    }
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
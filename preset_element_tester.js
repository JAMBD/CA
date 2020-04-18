function element_test_setup(){
    clear_game()

    // Simple propagation.
    cx = 5;
    cy = 5;
    cells[cx][cy].element.air.pressure.set(8);

    cx += 16;
    cells[cx][cy - 2].element.air.pressure.set(8);
    cells[cx][cy - 2].element.air.direction.set(SOUTH);

    cx += 8;
    cells[cx][cy].element.air.pressure.set(8);
    cells[cx][cy].element.air.direction.set(EAST);
    cells[cx + 8][cy].element.air.pressure.set(8);
    cells[cx + 8][cy].element.air.direction.set(WEST);

    cx += 16;
    cells[cx][cy - 1].element.air.pressure.set(8);
    cells[cx][cy - 1].element.air.direction.set(EAST);
    cells[cx][cy].element.air.pressure.set(8);
    cells[cx][cy].element.air.direction.set(EAST);
    cells[cx][cy + 1].element.air.pressure.set(8);
    cells[cx][cy + 1].element.air.direction.set(EAST);

    cx = 5;
    cy += 8;
    cells[cx][cy].element.air.pressure.set(8);
    cells[cx][cy].element.air.direction.set(SOUTH_EAST);

    cx = 5;
    cy += 10;
    cells[cx][cy].element.water.level.set(1);
    cells[cx-1][cy].element.earth.height.set(2);
    cells[cx-1][cy-1].element.earth.height.set(2);
    cells[cx][cy-1].element.earth.height.set(2);
    cells[cx+1][cy-1].element.earth.height.set(2);
    cells[cx+2][cy-1].element.earth.height.set(2);
    cells[cx-1][cy+1].element.earth.height.set(2);
    cells[cx][cy+1].element.earth.height.set(2);
    cells[cx+1][cy+1].element.earth.height.set(2);
    cells[cx+2][cy+1].element.earth.height.set(2);
    cells[cx+2][cy].element.earth.height.set(2);

    cx += 8;
    cells[cx][cy].element.water.level.set(1);
    cells[cx][cy - 1].element.earth.height.set(1);
    cells[cx][cy + 1].element.earth.height.set(1);
    cells[cx + 1][cy].element.earth.height.set(1);
    cells[cx - 1][cy].element.earth.height.set(1);

    cx += 8;
    cells[cx][cy].element.water.level.set(1);
    cells[cx][cy].element.earth.height.set(2);
    cells[cx][cy - 1].element.earth.height.set(3);
    cells[cx][cy + 1].element.earth.height.set(3);
    cells[cx + 1][cy].element.earth.height.set(1);
    cells[cx - 1][cy].element.earth.height.set(1);

    flip_cells();
    draw();
}

function terrain_test_setup(){
    clear_game()
    for (var x=0; x < BOARD_WIDTH; x++){
        for (var y=0; y < BOARD_HEIGHT; y++){
            cells[x][y].element.earth.height.set(
                // TODO: perlin noise here.
                Math.floor(Math.random() * 17));
        }
    }
    for (var y=-16; y < 16; y++){
        cells[1][BOARD_HEIGHT/2 + y].element.air.pressure.set(32);
        cells[1][BOARD_HEIGHT/2 + y].element.air.direction.set(CENTER);
        cells[BOARD_WIDTH/2 + y][1].element.air.pressure.set(32);
        cells[BOARD_WIDTH/2 + y][1].element.air.direction.set(CENTER);
        cells[BOARD_WIDTH - 2][BOARD_HEIGHT/2 + y].element.air.pressure.set(32);
        cells[BOARD_WIDTH - 2][BOARD_HEIGHT/2 + y].element.air.direction.set(CENTER);
        cells[BOARD_WIDTH/2 + y][BOARD_HEIGHT - 2].element.air.pressure.set(32);
        cells[BOARD_WIDTH/2 + y][BOARD_HEIGHT - 2].element.air.direction.set(CENTER);
    }
    flip_cells();
    draw();
}

function terrain_rain_setup(){
    for (var x=1; x < BOARD_WIDTH - 1; x++){
        for (var y=1; y < BOARD_HEIGHT - 1; y++){
            if (Math.random() > 0.2){
                var c_l = cells[x][y].element.water.level.get();
                c_l += Math.floor((Math.random() * 8));
                if (c_l > WATER_MAX) c_l = WATER_MAX;
                cells[x][y].element.water.level.set(c_l);
            }
        }
    }
    flip_cells();
    draw();
}

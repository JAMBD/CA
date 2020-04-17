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

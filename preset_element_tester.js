function element_test_setup(){
    clear_game()

    // Simple propagation.
    cx = 5;
    cy = 5;
    cells[cx][cy].element.water.level.set(4.0);

    cx += 10
    cells[cx][cy].element.water.level.set(4.0);
    cells[cx][cy + 1].element.water.level.set(4.0);
    cells[cx + 1][cy].element.water.level.set(4.0);

    cx += 10
    cells[cx][cy].element.water.level.set(4.0);
    cells[cx + 2][cy].element.water.level.set(4.0);

    cx += 10
    cells[cx][cy].element.water.level.set(4.0);
    cells[cx + 5][cy].element.water.level.set(4.0);

    cx += 15
    cells[cx][cy].element.water.level.set(4.0);
    cells[cx][cy + 6].element.water.level.set(4.0);
    cells[cx + 3][cy + 3].element.water.level.set(4.0);

    cx = 16;
    cy += 20;
    cells[cx][cy - 1].element.air.pressure.set(32.0);
    cells[cx][cy].element.air.pressure.set(32.0);
    cells[cx - 1][cy - 1].element.air.pressure.set(32.0);

    cx += 16
    cells[cx][cy-2].element.air.pressure.set(32.0);
    cells[cx][cy-1].element.air.pressure.set(32.0);
    cells[cx][cy].element.air.pressure.set(32.0);
    cells[cx][cy+1].element.air.pressure.set(32.0);
    cells[cx][cy+2].element.air.pressure.set(32.0);

    cy += 16
    cx = 8;
    cells[cx+15][cy+4].element.air.pressure.set(32.0);
    cells[cx+30][cy+4].element.water.level.set(4.0);
    for (var i=0; i<30; i++){
        cells[cx+i][cy].element.earth.present.set(true);
        cells[cx+i][cy+1].element.earth.present.set(true);
        cells[cx+i][cy+8].element.earth.present.set(true);
        cells[cx+i][cy+1+8].element.earth.present.set(true);
    }
    for (var i=0; i<10; i++){
        cells[cx+i+30][cy-i].element.earth.present.set(true);
        cells[cx+i+30][cy-i+1].element.earth.present.set(true);
        cells[cx+i+30][cy+i+8].element.earth.present.set(true);
        cells[cx+i+30][cy+i+9].element.earth.present.set(true);
    }

    flip_cells();
    draw();
}

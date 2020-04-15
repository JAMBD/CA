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

    flip_cells();
    draw();
}

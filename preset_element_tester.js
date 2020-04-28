function element_test_setup(){
    clear_game()

    // Simple propagation.
    cx = 6;
    cy = 6;
    DrawBox(cx - 4, cy - 4, 9, 9);
    cells[cx - 3][cy].element.air.pressure.set(8);
    cells[cx - 3][cy].element.air.direction.set(EAST);

    cx += 8;
    DrawBox(cx - 4, cy - 4, 9, 9);
    cells[cx - 3][cy - 3].element.air.pressure.set(8);
    cells[cx - 3][cy - 3].element.air.direction.set(SOUTH_EAST);

    cx += 8;
    DrawBox(cx - 4, cy - 4, 9, 9);
    cells[cx - 3][cy].element.air.pressure.set(8);
    cells[cx - 3][cy].element.air.direction.set(EAST);
    cells[cx][cy - 3].element.air.pressure.set(8);
    cells[cx][cy - 3].element.air.direction.set(SOUTH);

    cx += 8;
    DrawBox(cx - 4, cy - 4, 9, 9);
    cells[cx - 3][cy - 3].element.air.pressure.set(8);
    cells[cx - 3][cy - 3].element.air.direction.set(SOUTH_EAST);
    cells[cx + 3][cy - 3].element.air.pressure.set(8);
    cells[cx + 3][cy - 3].element.air.direction.set(SOUTH_WEST);

    cx += 8;
    DrawBox(cx - 4, cy - 4, 9, 9);
    cells[cx - 3][cy].element.air.pressure.set(8);
    cells[cx - 3][cy].element.air.direction.set(EAST);
    cells[cx + 3][cy - 3].element.air.pressure.set(8);
    cells[cx + 3][cy - 3].element.air.direction.set(SOUTH_WEST);

    cx += 8;
    DrawBox(cx - 4, cy - 4, 9, 9);
    cells[cx - 2][cy].element.air.pressure.set(8);
    cells[cx - 2][cy].element.air.direction.set(EAST);
    cells[cx + 3][cy - 3].element.air.pressure.set(8);
    cells[cx + 3][cy - 3].element.air.direction.set(SOUTH_WEST);

    // Air earth interactions.
    cx = 6;
    cy += 8;
    DrawBox(cx - 4, cy - 4, 9, 9);
    cells[cx - 3][cy].element.air.pressure.set(8);
    cells[cx - 3][cy].element.air.direction.set(EAST);
    cells[cx][cy].element.earth.height.set(5);

    cx += 8;
    DrawBox(cx - 4, cy - 4, 9, 9);
    cells[cx - 3][cy - 3].element.air.pressure.set(8);
    cells[cx - 3][cy - 3].element.air.direction.set(SOUTH_EAST);
    cells[cx][cy].element.earth.height.set(5);

    cx += 8;
    DrawBox(cx - 4, cy - 4, 9, 9);
    cells[cx - 3][cy].element.air.pressure.set(8);
    cells[cx - 3][cy].element.air.direction.set(EAST);
    cells[cx + 1][cy].element.earth.height.set(5);
    cells[cx][cy - 1].element.earth.height.set(5);

    cx += 8;
    DrawBox(cx - 4, cy - 4, 9, 9);
    cells[cx - 3][cy + 3].element.air.pressure.set(8);
    cells[cx - 3][cy + 3].element.air.direction.set(NORTH_EAST);
    cells[cx + 1][cy].element.earth.height.set(5);
    cells[cx][cy - 1].element.earth.height.set(5);

    cx = 6;
    cy += 8;
    DrawBox(cx - 4, cy - 4, 9, 9);
    cells[cx - 3][cy].element.air.pressure.set(8);
    cells[cx - 3][cy].element.air.direction.set(EAST);
    cells[cx + 1][cy].element.earth.height.set(5);
    cells[cx + 1][cy - 1].element.earth.height.set(5);
    cells[cx][cy - 1].element.earth.height.set(5);

    cx += 8;
    DrawBox(cx - 4, cy - 4, 9, 9);
    cells[cx - 3][cy].element.air.pressure.set(8);
    cells[cx - 3][cy].element.air.direction.set(EAST);
    cells[cx + 1][cy].element.earth.height.set(5);
    cells[cx + 1][cy - 1].element.earth.height.set(5);
    cells[cx + 1][cy + 1].element.earth.height.set(5);
    cells[cx][cy - 1].element.earth.height.set(5);

    cx += 8;
    DrawBox(cx - 4, cy - 4, 9, 9);
    cells[cx - 3][cy].element.air.pressure.set(8);
    cells[cx - 3][cy].element.air.direction.set(EAST);
    cells[cx + 1][cy].element.earth.height.set(5);
    cells[cx + 1][cy - 1].element.earth.height.set(5);
    cells[cx + 1][cy + 1].element.earth.height.set(5);

    cx += 8;
    DrawBox(cx - 4, cy - 4, 9, 9);
    cells[cx - 3][cy + 3].element.air.pressure.set(8);
    cells[cx - 3][cy + 3].element.air.direction.set(NORTH_EAST);
    cells[cx + 1][cy].element.earth.height.set(5);
    cells[cx + 1][cy - 1].element.earth.height.set(5);
    cells[cx][cy - 1].element.earth.height.set(5);

    cx += 8;
    DrawBox(cx - 4, cy - 4, 9, 9);
    cells[cx - 3][cy + 3].element.air.pressure.set(8);
    cells[cx - 3][cy + 3].element.air.direction.set(NORTH_EAST);
    cells[cx + 1][cy].element.earth.height.set(5);
    cells[cx + 1][cy - 1].element.earth.height.set(5);
    cells[cx + 1][cy + 1].element.earth.height.set(5);
    cells[cx][cy - 1].element.earth.height.set(5);

    cx += 8;
    DrawBox(cx - 4, cy - 4, 9, 9);
    cells[cx - 3][cy + 3].element.air.pressure.set(8);
    cells[cx - 3][cy + 3].element.air.direction.set(NORTH_EAST);
    cells[cx + 1][cy].element.earth.height.set(5);
    cells[cx + 1][cy - 1].element.earth.height.set(5);
    cells[cx + 1][cy + 1].element.earth.height.set(5);

    cx = 6;
    cy += 8;
    DrawBox(cx - 4, cy - 4, 9, 9);
    cells[cx - 3][cy + 3].element.air.pressure.set(8);
    cells[cx - 3][cy + 3].element.air.direction.set(NORTH_EAST);
    cells[cx + 1][cy].element.earth.height.set(5);
    cells[cx + 1][cy - 1].element.earth.height.set(5);
    cells[cx + 1][cy + 1].element.earth.height.set(5);
    cells[cx][cy - 1].element.earth.height.set(5);
    cells[cx][cy + 1].element.earth.height.set(5);

    cx += 8;
    DrawBox(cx - 4, cy - 4, 9, 9);
    cells[cx - 3][cy].element.air.pressure.set(8);
    cells[cx - 3][cy].element.air.direction.set(EAST);
    cells[cx + 1][cy].element.earth.height.set(5);
    cells[cx + 1][cy - 1].element.earth.height.set(5);
    cells[cx + 1][cy + 1].element.earth.height.set(5);
    cells[cx][cy - 1].element.earth.height.set(5);
    cells[cx][cy + 1].element.earth.height.set(5);

    flip_cells();
    draw();
}

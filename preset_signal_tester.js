function signal_test_setup(){
    clear_game()

    // Simple propagation.
    cx = 5;
    cy = 5;
    DrawBox(cx - 4, cy - 4, 9, 9);
    cells[cx][cy].signal.strength.set(1.0);
    cells[cx][cy].signal.strength.set(1.0);


    // Directed signal.
    cx += 8;
    DrawBox(cx - 4, cy - 4, 9, 9);
    cells[cx][cy].signal.strength.set(1.0);
    cells[cx - 1][cy].block.present.set(true);

    cx += 8;
    DrawBox(cx - 4, cy - 4, 9, 9);
    cells[cx][cy].signal.strength.set(1.0);
    cells[cx - 1][cy].block.present.set(true);
    cells[cx][cy - 1].block.present.set(true);


    cx += 8;
    DrawBox(cx - 4, cy - 4, 9, 9);
    cells[cx][cy].signal.strength.set(1.0);
    cells[cx - 1][cy].block.present.set(true);
    cells[cx][cy - 1].block.present.set(true);
    cells[cx][cy + 1].block.present.set(true);

    //Signals colliding.
    cx = 5;
    cy += 8;
    DrawBox(cx - 4, cy - 4, 9, 9);
    cells[cx - 3][cy].signal.strength.set(1.0);
    cells[cx - 3][cy - 1].block.present.set(true);
    cells[cx - 3][cy + 1].block.present.set(true);
    cells[cx + 3][cy].signal.strength.set(1.0);
    cells[cx + 3][cy - 1].block.present.set(true);
    cells[cx + 3][cy + 1].block.present.set(true);

    cx += 8;
    DrawBox(cx - 4, cy - 4, 9, 9);
    cells[cx - 3][cy].signal.strength.set(1.0);
    cells[cx - 3][cy - 1].block.present.set(true);
    cells[cx - 3][cy + 1].block.present.set(true);
    cells[cx + 2][cy].signal.strength.set(1.0);
    cells[cx + 2][cy - 1].block.present.set(true);
    cells[cx + 3][cy].block.present.set(true);
    cells[cx + 2][cy + 1].block.present.set(true);

    cx += 8;
    DrawBox(cx - 4, cy - 4, 9, 9);
    cells[cx - 3][cy].signal.strength.set(1.0);
    cells[cx - 3][cy - 1].block.present.set(true);
    cells[cx - 3][cy + 1].block.present.set(true);
    cells[cx][cy - 3].signal.strength.set(1.0);
    cells[cx - 1][cy - 3].block.present.set(true);
    cells[cx + 1][cy - 3].block.present.set(true);

    cx += 8;
    DrawBox(cx - 4, cy - 4, 9, 9);
    cells[cx - 3][cy].signal.strength.set(1.0);
    cells[cx - 3][cy - 1].block.present.set(true);
    cells[cx - 3][cy + 1].block.present.set(true);
    cells[cx][cy - 3].signal.strength.set(1.0);
    cells[cx - 1][cy - 3].block.present.set(true);
    cells[cx + 1][cy - 3].block.present.set(true);
    cells[cx][cy + 3].signal.strength.set(1.0);
    cells[cx - 1][cy + 3].block.present.set(true);
    cells[cx + 1][cy + 3].block.present.set(true);

    cx += 8;
    DrawBox(cx - 4, cy - 4, 9, 9);
    cells[cx - 3][cy].signal.strength.set(1.0);
    cells[cx - 3][cy - 1].block.present.set(true);
    cells[cx - 3][cy + 1].block.present.set(true);
    cells[cx + 3][cy].signal.strength.set(1.0);
    cells[cx + 3][cy - 1].block.present.set(true);
    cells[cx + 3][cy + 1].block.present.set(true);
    cells[cx][cy - 3].signal.strength.set(1.0);
    cells[cx - 1][cy - 3].block.present.set(true);
    cells[cx + 1][cy - 3].block.present.set(true);
    cells[cx][cy + 3].signal.strength.set(1.0);
    cells[cx - 1][cy + 3].block.present.set(true);
    cells[cx + 1][cy + 3].block.present.set(true);

    //Signal hitting blocks.
    cx = 5;
    cy += 8;
    DrawBox(cx - 4, cy - 4, 9, 9);
    cells[cx - 3][cy].signal.strength.set(1.0);
    cells[cx - 3][cy - 1].block.present.set(true);
    cells[cx - 3][cy + 1].block.present.set(true);

    cx += 8;
    DrawBox(cx - 4, cy - 4, 9, 9);
    cells[cx - 3][cy].signal.strength.set(1.0);
    cells[cx - 3][cy - 1].block.present.set(true);
    cells[cx - 3][cy + 1].block.present.set(true);
    cells[cx + 2][cy].block.present.set(true);

    cx += 8;
    DrawBox(cx - 4, cy - 4, 9, 9);
    cells[cx - 3][cy].signal.strength.set(1.0);
    cells[cx - 3][cy - 1].block.present.set(true);
    cells[cx - 3][cy + 1].block.present.set(true);
    cells[cx + 2][cy].block.present.set(true);
    cells[cx + 1][cy + 1].block.present.set(true);

    cx += 8;
    DrawBox(cx - 4, cy - 4, 9, 9);
    cells[cx - 3][cy].signal.strength.set(1.0);
    cells[cx - 3][cy - 1].block.present.set(true);
    cells[cx - 3][cy + 1].block.present.set(true);
    cells[cx + 2][cy].block.present.set(true);
    cells[cx + 1][cy + 1].block.present.set(true);
    cells[cx + 1][cy - 1].block.present.set(true);

    //Signal hitting conductive blocks.
    cx = 5;
    cy += 8;
    DrawBox(cx - 4, cy - 4, 9, 9);
    cells[cx - 3][cy].signal.strength.set(1.0);
    cells[cx - 3][cy - 1].block.present.set(true);
    cells[cx - 3][cy + 1].block.present.set(true);
    cells[cx][cy].block.present.set(true);
    cells[cx][cy].block.conductive.set(true);

    cx += 8;
    DrawBox(cx - 4, cy - 4, 9, 9);
    cells[cx - 3][cy].signal.strength.set(1.0);
    cells[cx - 3][cy - 1].block.present.set(true);
    cells[cx - 3][cy + 1].block.present.set(true);
    cells[cx + 3][cy - 1].block.present.set(true);
    cells[cx + 3][cy + 1].block.present.set(true);
    cells[cx][cy + 1].block.present.set(true);
    cells[cx][cy].block.present.set(true);
    cells[cx][cy].block.conductive.set(true);

    cx += 8;
    DrawBox(cx - 4, cy - 4, 9, 9);
    cells[cx + 2][cy + 3].block.present.set(true);
    cells[cx + 1][cy + 2].block.present.set(true);
    cells[cx + 1][cy + 3].signal.strength.set(1.0);

    cells[cx - 2][cy + 3].block.present.set(true);
    cells[cx - 1][cy + 2].block.present.set(true);

    cells[cx][cy + 3].block.present.set(true);
    cells[cx][cy + 3].block.conductive.set(true);

    cells[cx - 2][cy + 1].block.present.set(true);
    cells[cx + 2][cy + 1].block.present.set(true);
    cells[cx][cy + 1].block.present.set(true);
    cells[cx][cy + 1].block.conductive.set(true);

    flip_cells();
    draw();
}

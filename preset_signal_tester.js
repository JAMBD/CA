function signal_test_setup(){
    cells[32][32].signal.strength.set(1.0);
    cells[32][30].block.present.set(true);
    cells[31][31].block.present.set(true);
    cells[32][35].block.present.set(true);
    cells[33][34].block.present.set(true);
    cells[16][32].signal.strength.set(1.0);
    cells[16][30].block.present.set(true);

    cells[16][36].block.present.set(true);
    cells[14][35].block.present.set(true);
    cells[15][36].block.present.set(true);
    cells[18][36].block.present.set(true);
    cells[19][35].block.present.set(true);

    cells[24][24].signal.strength.set(1.0);
    cells[60][30].block.present.set(true);
    cells[61][31].block.present.set(true);
    cells[60][32].block.present.set(true);
    flip_cells();
}

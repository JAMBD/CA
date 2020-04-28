function testPointAt(){
    console.assert(PointAt(RotateRight(NORTH, NORTH), EAST, NORTH_EAST, NORTH));
    console.assert(PointAt(RotateRight(NORTH, SOUTH), WEST, NORTH_WEST, SOUTH));
    console.assert(PointAt(RotateRight(SOUTH, EAST), EAST, SOUTH_EAST, EAST));
    console.assert(PointAt(RotateRight(SOUTH, WEST), WEST, SOUTH_WEST, WEST));

    console.assert(!PointAt(NORTH_EAST, EAST, NORTH_EAST, NORTH_EAST));
    console.assert(!PointAt(SOUTH_WEST, WEST, NORTH_WEST, SOUTH_WEST));
    console.assert(!PointAt(SOUTH_WEST, EAST, SOUTH_EAST, NORTH_EAST));
    console.assert(!PointAt(NORTH_EAST, WEST, SOUTH_WEST, SOUTH_WEST));

    console.assert(PointAt(NORTH, EAST, NORTH_EAST, NORTH_EAST));
    console.assert(PointAt(WEST, WEST, NORTH_WEST, SOUTH_WEST));
    console.assert(PointAt(WEST, EAST, SOUTH_EAST, NORTH_EAST));
    console.assert(PointAt(NORTH, WEST, SOUTH_WEST, SOUTH_WEST));

    console.assert(PointAt(NORTH_EAST, WEST, NORTH, NORTH));

    console.log("PointAt test complete.");
}

function testHelpers(){
    testPointAt();
}

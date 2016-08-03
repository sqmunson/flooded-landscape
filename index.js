const findWaterLevel = (height, buildings) => {
    // find all the buildings that are taller than the one
    // before it, these are all potential water levels
    const allTallest = buildings.filter((building, index) => {
        return building > buildings[index - 1];
    });

    // find the tallest of the bunch, or if there weren't any that
    // means we're at the last tallest building in the landscape
    const tallest = Math.max(...allTallest) || 0;

    // the shortest of either the current building or the one on
    // the other side of the "pond" is the actual water level
    return Math.min(height, tallest);
};

const floodedLandscape = (heights) => {
    const landscape = heights.reduce((landscape, height, position) => {
        const nextBuildings = heights.slice(position + 1);
        const nextBuilding = heights[position + 1];
        const ls = landscape;

        // if we aren't in the water but the next building is shorter
        // than the one we're on then we need to see if there's water
        if (!ls.waterLevel && nextBuilding < height) {
            ls.waterLevel = findWaterLevel(height, nextBuildings);
        }

        // if we found water and the next building is under it
        // then we need to add the depth to the total water!
        if (nextBuilding < ls.waterLevel) {
            ls.total += ls.waterLevel - nextBuilding;
        }

        // if we're in the water but the next building is dry land
        // then get the hell out of the water!
        if (ls.waterLevel && nextBuilding >= ls.waterLevel) {
            ls.waterLevel = 0;
        }

        return ls;

    }, {
        // start our adventure on dry land
        // with no water yet encountered
        total: 0,
        waterLevel: 0
    });

    // return the total water we calculated
    return landscape.total;
};


console.log(floodedLandscape([3,5,2,4,3,6,4,3,5,3,2])); // 9
console.log(floodedLandscape([4,3,5,2,3,4,3])); // 4
console.log(floodedLandscape([2,3,7,6,5,4,5,4,3,2,1])); // 1
console.log(floodedLandscape([7,6,5,4,3,4,5,6])); // 9
console.log(floodedLandscape([3,4,5,4,3,4,5,4,3,7,8])); // 7
console.log(floodedLandscape([1,2,3,4,5,6,7,8])); // 0
console.log(floodedLandscape([8,2,5,7,5,3,2,5,7,2,4,6])); // 26
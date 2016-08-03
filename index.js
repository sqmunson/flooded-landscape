const findWaterLevel = (height, buildings) => {
    const allTallest = buildings.filter((building, index) => {
        return building > buildings[index - 1];
    });

    const tallest = Math.max(...allTallest) || 0;

    return Math.min(height, tallest);
};

const floodedLandscape = (heights) => {
    const landscape = heights.reduce((landscape, height, position) => {
        const nextBuildings = heights.slice(position + 1);
        const nextBuilding = heights[position + 1];
        const ls = landscape;

        if (!ls.waterLevel && nextBuilding < height) {
            ls.waterLevel = findWaterLevel(height, nextBuildings);
        }

        if (nextBuilding < ls.waterLevel) {
            ls.total += ls.waterLevel - nextBuilding;
        }

        if (ls.waterLevel && nextBuilding >= ls.waterLevel) {
            ls.waterLevel = 0;
        }

        return ls;

    }, {
        total: 0,
        waterLevel: 0
    });

    return landscape.total;
};


console.log(floodedLandscape([3,5,2,4,3,6,4,3,5,3,2])); // 9
console.log(floodedLandscape([4,3,5,2,3,4,3])); // 4
console.log(floodedLandscape([2,3,7,6,5,4,5,4,3,2,1])); // 1
console.log(floodedLandscape([7,6,5,4,3,4,5,6])); // 9
console.log(floodedLandscape([3,4,5,4,3,4,5,4,3,7,8])); // 7
console.log(floodedLandscape([1,2,3,4,5,6,7,8])); // 0
console.log(floodedLandscape([8,2,5,7,5,3,2,5,7,2,4,6])); // 26
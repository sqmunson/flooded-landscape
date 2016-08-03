const floodedLandscape = (heights) => {
    const landscape = heights
        .reduce((landscape, height, position) => {
            const nextBuildings = heights.slice(position + 1);
            const nextBuilding = heights[position + 1];
            const ponds = landscape.ponds;
            const pond = landscape.active;
            const farFromShore = nextBuilding < pond.waterLevel;
            const lastTallest = nextBuildings.filter((next, position) => {
                return next >= nextBuildings[position + 1];
            }).length === nextBuildings.length - 1;

            if (!lastTallest && (!pond.waterLevel || farFromShore)) {

                if (height > nextBuilding || farFromShore) {
                    pond.waterLevel = pond.waterLevel || height;
                    pond.buildings.push(nextBuilding);
                }

            } else if (pond.buildings.length) {

                if (farFromShore) {
                    pond.waterLevel = nextBuilding;

                    pond.buildings = pond.buildings.filter((height) => {
                        return height < pond.waterLevel;
                    });
                }

                ponds.push(Object.assign({}, pond));

                pond.waterLevel = 0;
                pond.buildings = [];
            }

            return landscape;

        }, {
            active: {
                buildings: [],
                waterLevel: 0
            },
            ponds: []
        });

    return landscape.ponds.reduce((totalWater, pond) => {
        return totalWater += pond.buildings.reduce((water, height) => {
            return water += pond.waterLevel - height;
        }, 0);
    }, 0);
};

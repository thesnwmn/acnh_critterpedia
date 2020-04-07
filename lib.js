var acnh = (function() {

    'use strict';

    function matchMonth(target, filter) {

        if (typeof target.months === 'undefined') {
            return true;
        } else if (target.months === '*') {
            return true;
        } else if (typeof filter.month === 'undefined') {
            return true;
        } else if (filter.month === '*') {
            return true;
        } else if (typeof filter.month === 'number') {
            return target.months.indexOf(filter.month) !== -1;
        }

        return false;
    }

    function matchHour(target, filter) {

        if (typeof target.hours === 'undefined') {
            return true;
        } else if (target.hours === '*') {
            return true;
        } else if (typeof filter.hour === 'undefined') {
            return true;
        } else if (filter.hour === '*') {
            return true;
        } else if (typeof filter.hour === 'number') {
            var result = false;
            var i = 1;
            while (i < target.hours.length && !result) {
                result = filter.hour >= target.hours[i-1] &&
                         filter.hour < target.hours[i];
                i=i+2;
            }
            return result;
        }

        return false;
    }

    function match(target, filter) {
        return matchMonth(target, filter) &&
               matchHour(target, filter);
    }

    function newArrival(target, filter) {
        if (typeof filter.month !== 'undefined') {
            if (target.months !== '*') {
                return target.months.indexOf((filter.month - 1) % 12) === -1 &&
                       target.months.indexOf((filter.month + 1) % 12) !== -1;
            }
        }
        return false;
    }

    function leavingSoon(target, filter) {
        if (typeof filter.month !== 'undefined') {
            if (target.months !== '*') {
                return target.months.indexOf(filter.month) !== -1 &&
                       target.months.indexOf((filter.month + 1) % 12) === -1;
            }
        }
        return false;
    }

    function get(filter, sort) {

        var result = {
            bug: [],
            fish: []
        };

        filter = filter || {};
        filter.category = filter.category || '';

        if (typeof filter.month === 'string' && /\d/.test(filter.month)) {
            filter.month = Number.parseInt(filter.month);
        }

        if (typeof filter.hour === 'string' && /\d/.test(filter.hour)) {
            filter.hour = Number.parseInt(filter.hour);
        }

        Object.keys(data).forEach(function(key) {
            if (filter.category === '' || filter.category === key) {
                data[key].forEach(function(ele) {
                    if (typeof ele['months_n'] === 'undefined') {
                        if (ele.months === '*') {
                            ele.months_n = ele.months;
                            ele.months_s = ele.months;
                        } else {
                            ele.months_n = ele.months;
                            ele.months_s = [];
                            ele.months.forEach(function(month) {
                                var newMonth = (month + 6) % 12;
                                if (newMonth === 0) {
                                    newMonth = 12;
                                }
                                ele.months_s.push(newMonth);
                            });
                            ele.months_s.sort();
                        }
                    } else {
                        console.log('prep already done or not needed');
                    }
                    if (filter.hemisphere === 'southern') {
                        ele.months = ele.months_s;
                    } else {
                        ele.months = ele.months_n;
                    }
                    if (match(ele, filter)) {
                        ele.leavingSoon = leavingSoon(ele, filter);
                        ele.newArrival = newArrival(ele, filter);
                        result[key].push(ele);
                    }
                });
            }
        });

        return result;
    }

    return {
        // Public interface
        init: function() {},
        get: get
    };
})();

var data = {
    bug: [{
        name: 'Common butterfly',
        price: 160,
        location: ['Flying'],
        months: [1, 2, 3, 4, 5, 6, 9, 10, 11, 12],
        hours: [4, 19],
    }, {
        name: 'Yellow butterfly',
        price: 160,
        location: ['Flying'],
        months: [3, 4, 5, 6, 9, 10],
        hours: [4, 19],
    }, {
        name: 'Tiger butterfly',
        price: 240,
        location: ['Flying'],
        months: [3, 4, 5, 6, 7, 8, 9],
        hours: [4, 19],
    }, {
        name: 'Peacock butterfly',
        price: 2500,
        location: ['Flying by rare flowers'],
        months: [3, 4, 5, 6],
        hours: [4, 19],
    }, {
        name: 'Common bluebottle',
        price: 300,
        location: ['Flying'],
        months: [4, 5, 6, 7, 8],
        hours: [4, 19],
    }, {
        name: 'Paper kite butterfly',
        price: 1000,
        location: ['Flying'],
        months: '*',
        hours: [8, 19],
    }, {
        name: 'Great purple emperor',
        price: 3000,
        location: ['Flying'],
        months: [5, 6, 7, 8],
        hours: [4, 19],
    }, {
        name: 'Monarch butterfly',
        price: 140,
        location: ['Flying'],
        months: [9, 10, 11],
        hours: [4, 17],
    }, {
        name: 'Emperor butterfly',
        price: 4000,
        location: ['Flying'],
        months: [1, 2, 3, 6, 7, 8, 9, 12],
        hours: [0, 8, 17, 24],
    }, {
        name: 'Agrias butterfly',
        price: 3000,
        location: ['Flying'],
        months: [4, 5, 6, 7, 8, 9],
        hours: [8, 17],
    }, {
        name: 'Rajah Brooke\'s birdwing',
        price: 2500,
        location: ['Flying'],
        months: [1, 2, 4, 5, 6, 7, 8, 9, 12],
        hours: [8, 17],
    }, {
        name: 'Queen Alexandra\'s birdwing',
        price: 4000,
        location: ['Flying'],
        months: [5, 6, 7, 8, 9],
        hours: [8, 16],
    }, {
        name: 'Moth',
        price: 130,
        location: ['Flying by light'],
        months: '*',
        hours: [0, 4, 19, 24],
    }, {
        name: 'Atlas moth',
        price: 3000,
        location: ['On Trees'],
        months: [4, 5, 6, 7, 8, 9],
        hours: [0, 4, 19, 24],
    }, {
        name: 'Madagascan sunset moth',
        price: 2500,
        location: ['Flying'],
        months: [4, 5, 6, 7, 8, 9],
        hours: [8, 16],
    }, {
        name: 'Long locust',
        price: 200,
        location: ['Hopping'],
        months: [4, 5, 6, 7, 8, 9, 10, 11],
        hours: [8, 19],
    }, {
        name: 'Migratory locust',
        price: 600,
        location: ['Hopping'],
        months: [8, 9, 10, 11],
        hours: [8, 19],
    }, {
        name: 'Rice grasshopper',
        price: 160,
        location: ['Hopping'],
        months: [8, 9, 10, 11],
        hours: [8, 19],
    }, {
        name: 'Grasshopper',
        price: 160,
        location: ['Hopping'],
        months: [7, 8, 9],
        hours: [8, 17],
    }, {
        name: 'Cricket',
        price: 130,
        location: ['Hopping'],
        months: [9, 10, 11],
        hours: [0, 8, 17, 24],
    }, {
        name: 'Bell cricket',
        price: 430,
        location: ['Hopping'],
        months: [9, 10],
        hours: [0, 8, 17, 24],
    }, {
        name: 'Mantis',
        price: 430,
        location: ['On Flowers'],
        months: [3, 4, 5, 6, 7, 8, 9, 10, 11],
        hours: [8, 17],
    }, {
        name: 'Orchid mantis',
        price: 2400,
        location: ['On flowers (White)'],
        months: [3, 4, 5, 6, 7, 8, 9, 10, 11],
        hours: [8, 17],
    }, {
        name: 'Honeybee',
        price: 200,
        location: ['Flying'],
        months: [3, 4, 5, 6, 7],
        hours: [8, 17],
    }, {
        name: 'Wasp',
        price: 2500,
        location: ['Shake tree'],
        months: '*',
        hours: '*',
    }, {
        name: 'Brown Cicada',
        price: 250,
        location: ['On Trees'],
        months: [7, 8],
        hours: [8, 17],
    }, {
        name: 'Robust Cicada',
        price: 300,
        location: ['On Trees'],
        months: [7, 8],
        hours: [8, 17],
    }, {
        name: 'Giant Cicada',
        price: 500,
        location: ['On Trees'],
        months: [7, 8],
        hours: [8, 17],
    }, {
        name: 'Walker cicada',
        price: 400,
        location: ['On Trees'],
        months: [8, 9],
        hours: [8, 17],
    }, {
        name: 'Evening Cicada',
        price: 550,
        location: ['On Trees'],
        months: [7, 8],
        hours: [4, 8, 16, 19],
    }, {
        name: 'Cicada shell',
        price: 10,
        location: ['On Trees'],
        months: [7, 8],
        hours: '*',
    }, {
        name: 'Red dragonfly',
        price: 180,
        location: ['Flying'],
        months: [9, 10],
        hours: [8, 19],
    }, {
        name: 'Darner dragonfly',
        price: 230,
        location: ['Flying'],
        months: [4, 5, 6, 7, 8, 9, 10],
        hours: [8, 17],
    }, {
        name: 'Banded dragonfly',
        price: 4500,
        location: ['Flying'],
        months: [5, 6, 7, 8, 9, 10],
        hours: [8, 17],
    }, {
        name: 'Damselfly',
        price: 500,
        location: ['Flying'],
        months: [1, 2, 11, 12],
        hours: '*',
    }, {
        name: 'Firefly',
        price: 300,
        location: ['Flying'],
        months: [6],
        hours: [0, 4, 19, 24],
    }, {
        name: 'Mole cricket',
        price: 500,
        location: ['Underground'],
        months: [1, 2, 3, 4, 5, 11, 12],
        hours: '*',
    }, {
        name: 'Pondskater',
        price: 130,
        location: ['On Ponds and Rivers'],
        months: [5, 6, 7, 8, 9],
        hours: [8, 19],
    }, {
        name: 'Diving beetle',
        price: 800,
        location: ['On Ponds and Rivers'],
        months: [5, 6, 7, 8, 9],
        hours: [8, 19],
    }, {
        name: 'Giant water bug',
        price: 2000,
        location: ['On Ponds and Rivers'],
        months: [4, 5, 6, 7, 8, 9],
        hours: [0, 8, 19, 24],
    }, {
        name: 'Stinkbug',
        price: 120,
        location: ['On flowers'],
        months: [3, 4, 5, 6, 7, 8, 9, 10],
        hours: '*',
    }, {
        name: 'Man-faced stink bug',
        price: 1000,
        location: ['On flowers'],
        months: [3, 4, 5, 6, 7, 8, 9, 10],
        hours: [0, 8, 19, 24],
    }, {
        name: 'Ladybug',
        price: 200,
        location: ['On flowers'],
        months: [3, 4, 5, 6, 10],
        hours: [8, 17],
    }, {
        name: 'Tiger beetle',
        price: 1500,
        location: ['On the ground'],
        months: [2, 3, 4, 5, 6, 7, 8, 9, 10],
        hours: '*',
    }, {
        name: 'Jewel beetle',
        price: 2400,
        location: ['On Tree Stumps'],
        months: [4, 5, 6, 7, 8],
        hours: '*',
    }, {
        name: 'Violin beetle',
        price: 450,
        location: ['On a tree stump'],
        months: [5, 6, 9, 10, 11],
        hours: '*',
    }, {
        name: 'Citrus Long-horned Beetle',
        price: 350,
        location: ['On a tree stump'],
        months: '*',
        hours: '*',
    }, {
        name: 'Rosalia batesi beetle',
        price: 3000,
        location: ['On a tree stump'],
        months: [5, 6, 7, 8, 9],
        hours: '*',
    }, {
        name: 'Blue weevil beetle',
        price: 800,
        location: ['On Trees (Coconut?)'],
        months: [7, 8],
        hours: '*',
    }, {
        name: 'Dung beetle',
        price: 3000,
        location: ['On ground (rolling snowballs)'],
        months: [1, 2, 12],
        hours: '*',
    }, {
        name: 'Earth-boring Dung Beetle',
        price: 300,
        location: ['On Ground'],
        months: [7, 8, 9],
        hours: '*',
    }, {
        name: 'Scarab beetle',
        price: 10000,
        location: ['On Tree'],
        months: [7, 8],
        hours: [0, 8, 23, 24],
    }, {
        name: 'Drone beetle',
        price: 200,
        location: ['On Tree'],
        months: [6, 7, 8],
        hours: '*',
    }, {
        name: 'Goliath beetle',
        price: 8000,
        location: ['On Tree (Palm)'],
        months: [6, 7, 8, 9],
        hours: [0, 8, 17, 24],
    }, {
        name: 'Saw stag',
        price: 2000,
        location: ['On Trees'],
        months: [7, 8],
        hours: '*',
    }, {
        name: 'Miyama stag',
        price: 1000,
        location: ['On Trees'],
        months: [7, 8],
        hours: '*',
    }, {
        name: 'Giant stag',
        price: 10000,
        location: ['On Trees'],
        months: [7, 8],
        hours: [0, 8, 23, 24],
    }, {
        name: 'Rainbow stag',
        price: 6000,
        location: ['On Trees'],
        months: [6, 7, 8, 9],
        hours: [0, 8, 19, 24],
    }, {
        name: 'Cyclommatus stag',
        price: 8000,
        location: ['On Trees'],
        months: [7, 8],
        hours: [0, 8, 17, 24],
    }, {
        name: 'Golden stag',
        price: '?',
        location: ['On Trees'],
        months: [7, 8],
        hours: [0, 8, 17, 24],
    }, {
        name: 'Giraffe stag',
        price: '?',
        location: ['On Trees'],
        months: [7, 8],
        hours: [0, 8, 17, 24],
    }, {
        name: 'Horned dynastid',
        price: 1350,
        location: ['On Trees'],
        months: [7, 8],
        hours: [0, 8, 17, 24],
    }, {
        name: 'Horned atlas',
        price: 8000,
        location: ['On Trees'],
        months: [7, 8],
        hours: [0, 8, 17, 24],
    }, {
        name: 'Horned elephant',
        price: 8000,
        location: ['On Trees'],
        months: [7, 8],
        hours: [0, 8, 17, 24],
    }, {
        name: 'Horned hercules',
        price: '?',
        location: ['On Trees'],
        months: [7, 8],
        hours: [0, 8, 17, 24],
    }, {
        name: 'Walking stick',
        price: 600,
        location: ['Shaking Tree'],
        months: [7, 8, 9, 10, 11],
        hours: [4, 8, 17, 19],
    }, {
        name: 'Walking leaf',
        price: 600,
        location: ['Under Trees Disguised as Leafs'],
        months: [7, 8, 9],
        hours: '*',
    }, {
        name: 'Bagworm',
        price: 600,
        location: ['Shaking tree'],
        months: '*',
        hours: '*',
    }, {
        name: 'Ant',
        price: 80,
        location: ['On rotten food'],
        months: '*',
        hours: '*',
    }, {
        name: 'Hermit crab',
        price: 1000,
        location: ['Beach disguised as shells'],
        months: '*',
        hours: [0, 8, 19, 24],
    }, {
        name: 'Wharf roach',
        price: 200,
        location: ['On beach rocks'],
        months: '*',
        hours: '*',
    }, {
        name: 'Fly',
        price: 60,
        location: ['On trash items'],
        months: '*',
        hours: '*',
    }, {
        name: 'Mosquito',
        price: 130,
        location: ['Flying'],
        months: [6, 7, 8, 9],
        hours: [0, 4, 17, 24],
    }, {
        name: 'Flea',
        price: 70,
        location: ['Villager\'s Heads'],
        months: [4, 5, 6, 7, 8, 9, 10, 11],
        hours: '*',
    }, {
        name: 'Snail',
        price: 250,
        location: ['On rocks (Rain)'],
        months: '*',
        hours: '*',
    }, {
        name: 'Pill bug',
        price: 250,
        location: ['Hit a rock'],
        months: [1, 2, 3, 4, 5, 6, 9, 10, 11, 12],
        hours: [0, 16, 23, 24],
    }, {
        name: 'Centipede',
        price: 300,
        location: ['Hit a rock'],
        months: [1, 2, 3, 4, 5, 6, 9, 10, 11, 12],
        hours: [16, 23],
    }, {
        name: 'Spider',
        price: 480,
        location: ['Shaking tree'],
        months: '*',
        hours: [0, 8, 19, 24],
    }, {
        name: 'Tarantula',
        price: 8000,
        location: ['On the ground'],
        months: [1, 2, 3, 4, 11, 12],
        hours: [0, 4, 19, 24],
    }, {
        name: 'Scorpion',
        price: 8000,
        location: ['On the ground'],
        months: [5, 6, 7, 8, 9, 10],
        hours: [0, 4, 19, 24],
    }],
    fish: [{
        name: 'Anchovy',
        price: 200,
        location: ['Sea'],
        shadowSize: 2,
        months: '*',
        hours: [4, 21],
    }, {
        name: 'Angelfish',
        price: 3000,
        location: ['River'],
        shadowSize: 2,
        months: [5, 6, 7, 8, 9, 10],
        hours: [0, 9, 16, 24],
    }, {
        name: 'Arapaima',
        price: 10000,
        location: ['River'],
        shadowSize: 6,
        months: [6, 7, 8, 9],
        hours: [0, 9, 16, 24],
    }, {
        name: 'Arowana',
        price: 10000,
        location: ['River'],
        shadowSize: 4,
        months: [6, 7, 8, 9],
        hours: [0, 9, 16, 24],
    }, {
        name: 'Barred knifejaw',
        price: 5000,
        location: ['Sea'],
        shadowSize: 3,
        months: [3, 4, 5, 6, 7, 8, 9, 10, 11],
        hours: '*',
    }, {
        name: 'Barreleye',
        price: 15000,
        location: ['Sea'],
        shadowSize: 2,
        months: '*',
        hours: [0, 4, 21, 24],
    }, {
        name: 'Betta',
        price: 2500,
        location: ['River'],
        shadowSize: 2,
        months: [5, 6, 7, 8, 9, 10],
        hours: [9, 16],
    }, {
        name: 'Bitterling',
        price: 900,
        location: ['River'],
        shadowSize: 1,
        months: [1, 2, 3, 11, 12],
        hours: '*',
    }, {
        name: 'Black bass',
        price: 400,
        location: ['River'],
        shadowSize: 4,
        months: '*',
        hours: '*',
    }, {
        name: 'Blowfish',
        price: 5000,
        location: ['Sea'],
        shadowSize: 3,
        months: [1, 2, 11, 12],
        hours: [0, 4, 18, 24],
    }, {
        name: 'Blue marlin',
        price: 10000,
        location: ['Pier'],
        shadowSize: 6,
        months: [1, 2, 3, 4, 7, 8, 9, 11, 12],
        hours: '*',
    }, {
        name: 'Bluegill',
        price: 180,
        location: ['River'],
        shadowSize: 2,
        months: '*',
        hours: [9, 16],
    }, {
        name: 'Butterfly fish',
        price: 1000,
        location: ['Sea'],
        shadowSize: 2,
        months: [4, 5, 6, 7, 8, 9],
        hours: '*',
    }, {
        name: 'Carp',
        price: 300,
        location: ['Pond'],
        shadowSize: 4,
        months: '*',
        hours: '*',
    }, {
        name: 'Catfish',
        price: 800,
        location: ['Pond'],
        shadowSize: 4,
        months: [5, 6, 7, 8, 9, 10],
        hours: [0, 9, 16, 24],
    }, {
        name: 'Char',
        price: 3800,
        location: ['River (Clifftop) Pond'],
        shadowSize: 3,
        months: [3, 4, 5, 6, 9, 10, 11],
        hours: [0, 9, 16, 24],
    }, {
        name: 'Cherry salmon',
        price: 1000,
        location: ['River (Clifftop) Pond'],
        shadowSize: 3,
        months: [3, 4, 5, 6, 9, 10, 11],
        hours: [0, 9, 16, 24],
    }, {
        name: 'Clownfish',
        price: 650,
        location: ['Sea'],
        shadowSize: 1,
        months: [4, 5, 6, 7, 8, 9],
        hours: '*',
    }, {
        name: 'Coelacanth',
        price: 15000,
        location: ['Sea (Raining)'],
        shadowSize: 6,
        months: '*',
        hours: '*',
    }, {
        name: 'Crawfish',
        price: 200,
        location: ['Pond'],
        shadowSize: 2,
        months: [4, 5, 6, 7, 8, 9],
        hours: '*',
    }, {
        name: 'Crucian carp',
        price: 160,
        location: ['River'],
        shadowSize: 2,
        months: '*',
        hours: '*',
    }, {
        name: 'Dab',
        price: 300,
        location: ['Sea'],
        shadowSize: 3,
        months: [1, 2, 3, 4, 10, 11, 12],
        hours: '*',
    }, {
        name: 'Dace',
        price: 240,
        location: ['River'],
        shadowSize: 3,
        months: '*',
        hours: [0, 9, 16, 24],
    }, {
        name: 'Dorado',
        price: 15000,
        location: ['River'],
        shadowSize: 5,
        months: [6, 7, 8, 9],
        hours: [4, 21],
    }, {
        name: 'Football fish',
        price: 2500,
        location: ['Sea'],
        shadowSize: 4,
        months: [1, 2, 3, 11, 12],
        hours: [0, 9, 16, 24],
    }, {
        name: 'Freshwater goby',
        price: 400,
        location: ['River'],
        shadowSize: 2,
        months: '*',
        hours: [0, 9, 16, 24],
    }, {
        name: 'Frog',
        price: 120,
        location: ['Pond'],
        shadowSize: 2,
        months: [5, 6, 7, 8],
        hours: '*',
    }, {
        name: 'Gar',
        price: 6000,
        location: ['Pond'],
        shadowSize: 6,
        months: [6, 7, 8, 9],
        hours: [0, 9, 16, 24],
    }, {
        name: 'Giant snakehead',
        price: 5500,
        location: ['Pond'],
        shadowSize: 5,
        months: [6, 7, 8],
        hours: [9, 16],
    }, {
        name: 'Giant trevally',
        price: 4500,
        location: ['Pier'],
        shadowSize: 5,
        months: [5, 6, 7, 8, 9, 10],
        hours: '*',
    }, {
        name: 'Golden trout',
        price: 15000,
        location: ['River (Clifftop)'],
        shadowSize: 3,
        months: [3, 4, 5, 9, 10, 11],
        hours: [0, 9, 16, 24],
    }, {
        name: 'Goldfish',
        price: 1300,
        location: ['Pond'],
        shadowSize: 1,
        months: '*',
        hours: '*',
    }, {
        name: 'Great white shark',
        price: 15000,
        location: ['Sea'],
        shadowSize: '6 (Fin)',
        months: [6, 7, 8, 9],
        hours: [0, 9, 16, 24],
    }, {
        name: 'Guppy',
        price: 1300,
        location: ['River'],
        shadowSize: 1,
        months: [4, 5, 6, 7, 8, 9, 10, 11],
        hours: [9, 16],
    }, {
        name: 'Hammerhead shark',
        price: 8000,
        location: ['Sea'],
        shadowSize: '6 (Fin)',
        months: [6, 7, 8, 9],
        hours: [0, 9, 16, 24],
    }, {
        name: 'Horse mackerel',
        price: 150,
        location: ['Sea'],
        shadowSize: 2,
        months: '*',
        hours: '*',
    }, {
        name: 'Killifish',
        price: 300,
        location: ['Pond'],
        shadowSize: 1,
        months: [4, 5, 6, 7, 8],
        hours: '*',
    }, {
        name: 'King salmon',
        price: 1800,
        location: ['River (Mouth)'],
        shadowSize: 6,
        months: [9],
        hours: '*',
    }, {
        name: 'Koi',
        price: 4000,
        location: ['Pond'],
        shadowSize: 4,
        months: '*',
        hours: [0, 9, 16, 24],
    }, {
        name: 'Loach',
        price: 400,
        location: ['River'],
        shadowSize: 2,
        months: [3, 4, 5],
        hours: '*',
    }, {
        name: 'Mahi-mahi',
        price: 6000,
        location: ['Pier'],
        shadowSize: 5,
        months: [5, 6, 7, 8, 9, 10],
        hours: '*',
    }, {
        name: 'Mitten crab',
        price: 2000,
        location: ['River'],
        shadowSize: 2,
        months: [9, 10, 11],
        hours: [0, 9, 16, 24],
    }, {
        name: 'Moray eel',
        price: 2000,
        location: ['Sea'],
        shadowSize: 'Narrow',
        months: [8, 9, 10],
        hours: '*',
    }, {
        name: 'Napoleonfish',
        price: 10000,
        location: ['Sea'],
        shadowSize: 6,
        months: [7, 8],
        hours: [4, 21],
    }, {
        name: 'Neon tetra',
        price: 500,
        location: ['River'],
        shadowSize: 1,
        months: [4, 5, 6, 7, 8, 9, 10, 11],
        hours: [9, 16],
    }, {
        name: 'Nibble fish',
        price: 1500,
        location: ['River'],
        shadowSize: 2,
        months: [5, 6, 7, 8, 9],
        hours: [9, 16],
    }, {
        name: 'Oarfish',
        price: 9000,
        location: ['Sea'],
        shadowSize: 6,
        months: [1, 2, 3, 4, 5, 12],
        hours: '*',
    }, {
        name: 'Ocean sunfish',
        price: 4000,
        location: ['Sea'],
        shadowSize: '6 (Fin)',
        months: [7, 8, 9],
        hours: [4, 21],
    }, {
        name: 'Olive flounder',
        price: 800,
        location: ['Sea'],
        shadowSize: 5,
        months: '*',
        hours: '*',
    }, {
        name: 'Pale chub',
        price: 200,
        location: ['River'],
        shadowSize: 1,
        months: '*',
        hours: [9, 16],
    }, {
        name: 'Pike',
        price: 1800,
        location: ['River'],
        shadowSize: 5,
        months: [9, 10, 11, 12],
        hours: '*',
    }, {
        name: 'Piranha',
        price: 2500,
        location: ['River'],
        shadowSize: 2,
        months: [6, 7, 8, 9],
        hours: [0, 4, 9, 16, 16, 24],
    }, {
        name: 'Pond smelt',
        price: 500,
        location: ['River'],
        shadowSize: 2,
        months: [1, 2, 12],
        hours: '*',
    }, {
        name: 'Pop-eyed goldfish',
        price: 1300,
        location: ['Pond'],
        shadowSize: 1,
        months: '*',
        hours: [9, 16],
    }, {
        name: 'Puffer fish',
        price: 250,
        location: ['Sea'],
        shadowSize: 3,
        months: [7, 8, 9],
        hours: '*',
    }, {
        name: 'Rainbowfish',
        price: 800,
        location: ['River'],
        shadowSize: 1,
        months: [5, 6, 7, 8, 9, 10],
        hours: [9, 16],
    }, {
        name: 'Ranchu goldfish',
        price: 4500,
        location: ['Pond'],
        shadowSize: 2,
        months: '*',
        hours: [9, 16],
    }, {
        name: 'Ray',
        price: 3000,
        location: ['Sea'],
        shadowSize: 5,
        months: [8, 9, 10, 11],
        hours: [4, 21],
    }, {
        name: 'Red snapper',
        price: 3000,
        location: ['Sea'],
        shadowSize: 4,
        months: '*',
        hours: '*',
    }, {
        name: 'Ribbon eel',
        price: 600,
        location: ['Sea'],
        shadowSize: 'Narrow',
        months: [6, 7, 8, 9, 10],
        hours: '*',
    }, {
        name: 'Saddled bichir',
        price: 4000,
        location: ['River'],
        shadowSize: 4,
        months: [6, 7, 8, 9],
        hours: [0, 4, 21, 24],
    }, {
        name: 'Salmon',
        price: 700,
        location: ['River (Mouth)'],
        shadowSize: 4,
        months: [9],
        hours: '*',
    }, {
        name: 'Saw shark',
        price: 12000,
        location: ['Sea'],
        shadowSize: '6 (Fin)',
        months: [6, 7, 8, 9],
        hours: [0, 9, 16, 24],
    }, {
        name: 'Sea bass',
        price: 400,
        location: ['Sea'],
        shadowSize: 5,
        months: '*',
        hours: '*',
    }, {
        name: 'Sea butterfly',
        price: 1000,
        location: ['Sea'],
        shadowSize: 1,
        months: [1, 2, 3, 12],
        hours: '*',
    }, {
        name: 'Seahorse',
        price: 1100,
        location: ['Sea'],
        shadowSize: 1,
        months: [4, 5, 6, 7, 8, 9, 10, 11],
        hours: '*',
    }, {
        name: 'Snapping turtle',
        price: 5000,
        location: ['River'],
        shadowSize: 5,
        months: [4, 5, 6, 7, 8, 9, 10],
        hours: [0, 4, 21, 24],
    }, {
        name: 'Soft-shelled turtle',
        price: 3750,
        location: ['River'],
        shadowSize: 4,
        months: [8, 9],
        hours: [0, 9, 16, 24],
    }, {
        name: 'Squid',
        price: 500,
        location: ['Sea'],
        shadowSize: 3,
        months: [1, 2, 3, 4, 5, 6, 7, 8, 12],
        hours: '*',
    }, {
        name: 'Stringfish',
        price: 15000,
        location: ['River (Clifftop)'],
        shadowSize: 5,
        months: [1, 2, 3, 12],
        hours: [0, 9, 16, 24],
    }, {
        name: 'Sturgeon',
        price: 10000,
        location: ['River (Mouth)'],
        shadowSize: 6,
        months: [1, 2, 3, 9, 10, 11, 12],
        hours: '*',
    }, {
        name: 'Suckerfish',
        price: 1500,
        location: ['Sea'],
        shadowSize: '4 (Fin)',
        months: [6, 7, 8, 9],
        hours: '*',
    }, {
        name: 'Surgeonfish',
        price: 1000,
        location: ['Sea'],
        shadowSize: 2,
        months: [4, 5, 6, 7, 8, 9],
        hours: '*',
    }, {
        name: 'Sweetfish',
        price: 900,
        location: ['River'],
        shadowSize: 3,
        months: [7, 8, 9],
        hours: '*',
    }, {
        name: 'Tadpole',
        price: 100,
        location: ['Pond'],
        shadowSize: 1,
        months: [3, 4, 5, 6, 7],
        hours: '*',
    }, {
        name: 'Tilapia',
        price: 800,
        location: ['River'],
        shadowSize: 3,
        months: [6, 7, 8, 9, 10],
        hours: '*',
    }, {
        name: 'Tuna',
        price: 7000,
        location: ['Pier'],
        shadowSize: 6,
        months: [1, 2, 3, 4, 11, 12],
        hours: '*',
    }, {
        name: 'Whale shark',
        price: 13000,
        location: ['Sea'],
        shadowSize: '6 (Fin)',
        months: [6, 7, 8, 9],
        hours: '*',
    }, {
        name: 'Yellow perch',
        price: 300,
        location: ['River'],
        shadowSize: 3,
        months: [1, 2, 3, 10, 11, 12],
        hours: '*',
    }, {
        name: 'Zebra turkeyfish',
        price: 500,
        location: ['Sea'],
        shadowSize: 3,
        months: [4, 5, 6, 7, 8, 9, 10, 11],
        hours: '*'
    }]
};

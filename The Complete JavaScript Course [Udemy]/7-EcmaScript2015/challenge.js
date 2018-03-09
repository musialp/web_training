class CityProperty {
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }
}

class Park extends CityProperty {
    constructor(name, buildYear, numberOfTrees, parkArea) {
        super(name, buildYear);
        this.numberOfTrees = numberOfTrees;
        this.parkArea = parkArea;
    }

    calcTreeDensity() {
        return Math.round(this.numberOfTrees / this.parkArea);
    }

    calculateAge() {
        let date = new Date();
        return date.getFullYear() - this.buildYear;
    }

}

class Street extends CityProperty {
    constructor(name, buildYear, length, size = 3) {
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }

    classifyStreet() {
        const classification = new Map();
        classification.set(1, 'tiny');
        classification.set(2, 'small');
        classification.set(3, 'medium');
        classification.set(4, 'big');
        classification.set(5, 'huge');
        console.log(`${this.name}, built in ${this.buildYear}, is a ${classification.get(this.size)} street.`);
    }
}

function calc(arr) {
    const sum = arr.reduce((prev, cur, index) => prev + cur, 0);
    return [sum, sum / arr.length];
}


function parkReport(parks) {
    console.log(`----PARKS REPORT ----`);

    parks.forEach(park => console.log(`${park.name} has a tree density of ${park.calcTreeDensity()} trees per square km`));
    
    const ages = parks.map(park => park.calculateAge());
    const [totalAge, averageAge] = calc(ages);
    console.log(`Our ${parks.length} parks have an average age of ${Math.round(averageAge)} years.`)


    parks.filter(park => park.numberOfTrees >= 1000).forEach(park => console.log(`${park.name} has more than 1000 trees`));
}

function streetReport(streets) {
    console.log(`----STREETS REPORT ----`);
    const [totalLength, avgLength] = calc(streets.map(street => street.length));
    console.log(`Our ${streets.length} streets have a total length of ${Math.round(totalLength)} kilometers and an average length of ${Math.round(avgLength)} kilometers.`);
    streets.forEach(street => street.classifyStreet());
}

let allParks = new Array;
allParks.push(new Park('National Park', 1894, 3541, 2.9));
allParks.push(new Park('Green Park', 1987, 215, 0.2));
allParks.push(new Park('Oak Park', 1953, 949, 0.4));

let allStreets = new Array;
allStreets.push(new Street('Ocean Avenue', 1999, 1.1, 4));
allStreets.push(new Street('Evergreen Street', 2008, 2.7, 2));
allStreets.push(new Street('4th Street', 2015, 0.8));
allStreets.push(new Street('Sunset Bouldevar', 1982, 2.5, 5));


parkReport(allParks);
streetReport(allStreets);
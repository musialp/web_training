
var width = 800;
var height = 400;
var barPadding = 10;
var svg = d3.select("svg")
        .attr('width', width)
        .attr('height', height)

function getFrequencies(string) {
    var sorted = Array.from(string).sort();
    var output = [];
    sorted.forEach(letter => {
        if(output.find(object => object.character === letter)) {
            output[output.findIndex(object => object.character === letter)].count++;
        } else {
            output.push({character: letter, count: 1});
        }
    });
    return output;
}

d3.select('#reset')
    .on('click', function() {
        d3.selectAll('svg')
            .remove();

        d3.select('#phrase')
            .text('');

        d3.select('#count')
            .text('');
    })

    d3.select('form')
    .on('submit', function() {
        d3.event.preventDefault();
        var input = d3.select('input');
        var text = input.property('value');
        var data = getFrequencies(text);
        var barWidth = width / data.length - barPadding;
        console.log(data.length, barWidth);
        var letters = svg
            .selectAll('.letter')
            .data(getFrequencies(text), function(d) {
                return d.character;
            });

        letters
            .classed('new', false)
            .exit()
            .remove()

        var letterEnter = letters
            .enter()
            .append('g')
                .classed('letter', true)
                .classed('new', true)

        letterEnter.append('rect');
        letterEnter.append('text');

        letterEnter.merge(letters)
            .select('rect')
                .style('width', barWidth)
                .style('height', function(d) {
                    return d.count * 20;
                })
                .attr('x', function(d, i) {
                    return(barWidth + barPadding) * i;
                })
                .attr('y', function(d) {
                    return height - d.count * 20;
                })

        letterEnter.merge(letters)
            .select('text')
                .attr('x', function(d, i) {
                    return (barWidth + barPadding) * i + barWidth / 2;
                })
                .attr('y', function(d) {
                    return height - d.count * 20 - 10;
                })
                .text(function(d) {
                    return d.character;
                })

        d3.select("#count")
            .text("(New characters: " + letters.enter().nodes().length + ")");

        d3.select('#phrase')
            .text("Analysis of: " + text);

        input.property('value', '');
    })

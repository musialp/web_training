
var phraseCounter = 0;

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
        d3.selectAll('.letter')
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

        var letters = d3.select('#letters')
            .selectAll('.letter')
            .data(getFrequencies(text), function(d) {
                return d.character;
            });

        letters
            .classed('new', false)
            .exit()
            .remove()

        letters
            .enter()
            .append('div')
                .classed('letter', true)
                .classed('new', true)
            .merge(letters)
                .style('width', '20px')
                .style('line-height', '20px')
                .style('margin-right', '5px')
                .style('height', function(d) {
                    return d.count * 20 + 'px';
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

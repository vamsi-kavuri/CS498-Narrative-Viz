const annotations_gdp = [
    {
        year: 1975,
        text: "Recession 1(1975)",
    },
    {
        year: 1982,
        text:"Recession 2(1982)",
    },
    {
        year: 1991,
        text: "Recession 3(1991)",
    },
    {
        year: 2009,
        text: "Recession 4(2009)" 
    }
]


function insertAnnotation( g, finalData, year, text, x, y ) {

    g.selectAll("text.label")
    .data(finalData.filter(function(d) { return d.year.getFullYear() == year; }))
    .enter().append("text")
    .append("tspan")
    .attr("class", "label")
    .attr("x", function (d) {
        return x(d.year);
    }).attr("y", function (d) {
        return  y(d.gdp) - 85;
    })
    .style("text-anchor", "middle")
    .text(text);


    g.selectAll("nothing")
    .data(finalData.filter(function(d) { return d.year.getFullYear() == year; }))
    .enter().append("line")
          .attr("class", "arrow")
          .attr("x1", function (d) {
              return x(d.year)+3;
          })
          .attr("x2", function (d) {
            return x(d.year)+3;
          })
          .attr("y1", function (d) {
            return  y(d.gdp) - 80;
          })
          .attr("y2", function (d) {
            return  y(d.gdp) - 5;
          })
          .attr("marker-end", "url(#arrow)");
}
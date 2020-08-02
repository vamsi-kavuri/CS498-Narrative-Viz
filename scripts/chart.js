
function chnageCountry() {
    d3.selectAll("svg > *").remove();
    switch(document.getElementById("selectedChart").vlaue) {
      case "GDP":
        renderGDP();
        break;
      case "LifeExp":
        renderLifeExp();
        break;
      case "emp":
        renderTotalEmployment();
        break;
      case "reserves":
          renderTotalReserves();
        break;
      default:
        renderGDP();
    }
  }

  function render(scene) {
    document.getElementById("selectedChart").vlaue=scene
    d3.selectAll("svg > *").remove();
    switch(scene) {
      case "GDP":
        renderGDP();
        break;
      case "LifeExp":
        renderLifeExp();
        break;
      case "emp":
        renderTotalEmployment()
        break;
      case "reserves":
        renderTotalReserves();
        break;
      default:
        renderGDP();
    }
  }

  document.getElementById("selectedChart").vlaue = "GDP"
  renderGDP(document.getElementById("countrySelect").value)
  var tooltip = d3.select('body').append("div").attr("class", "tooltip");
  
  function renderGDP() {
    document.getElementById("currentTitle").innerHTML = "Gross Domestic Product Per Capita (in US$)"
    document.getElementById("prev").style.display = "none";
    document.getElementById("next").style.display = "block";
    document.getElementById("gdp_btn").classList.add("selected");
    document.getElementById("res_btn").classList.remove("selected");
    document.getElementById("life_btn").classList.remove("selected");
    document.getElementById("emp_btn").classList.remove("selected");


    selecltedCountry = document.getElementById("countrySelect").value;
    d3.json("./data/GDPPerCapitaByCountry_worldbank.json").then(function(allCountiresGDP) {
  
        var selectedCountryGDP = allCountiresGDP.filter(a=>a["Country Code"]==selecltedCountry)[0];
        var margin = {top: 60, right: 20, bottom: 40, left: 46};
        var svg = d3.select("svg");
        var width = svg.attr("width") - margin.left - margin.right;
        var height = svg.attr("height") - margin.top - margin.bottom;
  
        var x = d3.scaleTime().range([0, width]);
        var y = d3.scaleLinear().rangeRound([height, 0]);
  
        var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
        var finalData =[];
  
        Object.keys(selectedCountryGDP).forEach(function(key){
        if(key && !isNaN(key)){
            finalData.push({year:new Date(key, 0), gdp:Math.round(selectedCountryGDP[key])});
        } 
    });
    x.domain([finalData[0].year, finalData[finalData.length - 1].year]);
    y.domain([0, d3.max(finalData, function(d) { return d.gdp; })]);
  
    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y")))
        .selectAll("text")  
        .style("text-anchor", "end")
        .attr("transform", "rotate(-40)" );
  
  g.append("g")
        .call(d3.axisLeft(y).ticks(10).tickSizeOuter(0))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 4)
        .attr("dy", "0.8em")
        .attr("text-anchor", "end")
        .text(selecltedCountry+ " Gross Domestic Product Per Capita (in US$)");
  
  g.selectAll("rect")
    .data(finalData)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.year); })
      .attr("y", function(d) { return y(d.gdp); })
      .attr("width", Math.ceil(width / (finalData.length)))
      .attr("height", function(d) { return height - y(d.gdp); })
      .attr("id", function(d) {return 'bar_' + d.year.getFullYear()})
      .on("mouseover", showTip)
      .on("mouseout", hideTip);

// annotation def

    svg.append("defs").append("marker")
    .attr("id", "arrow")
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 8)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
    .append("path")
    .attr("class", "marker")
    .attr("d", "M0,-5L10,0L0,5");


    for(var i = 0; i < annotations_gdp.length; i++) {
      var obj = annotations_gdp[i];
      insertAnnotation(g, finalData, obj.year, obj.text, x, y)
      console.log("annotaiton added" + obj.year);
  }


  });
  


  }


  function renderLifeExp() {
    document.getElementById("gdp_btn").classList.remove("selected");
    document.getElementById("res_btn").classList.remove("selected");
    document.getElementById("life_btn").classList.add("selected");
    document.getElementById("emp_btn").classList.remove("selected");

    document.getElementById("currentTitle").innerHTML = "Life Expactancy (in years)"
    document.getElementById("prev").style.display = "block";
    document.getElementById("next").style.display = "block";

    selecltedCountry = document.getElementById("countrySelect").value;
    d3.json("./data/LIfeExpByCountry_worldBank.json").then(function(allCountiresGDP) {

      var selectedCountryGDP = allCountiresGDP.filter(a=>a["Country Code"]==selecltedCountry)[0];
      var margin = {top: 40, right: 20, bottom: 40, left: 46};
      var svg = d3.select("svg");
      var width = svg.attr("width") - margin.left - margin.right;
      var height = svg.attr("height") - margin.top - margin.bottom;
    
  
      var x = d3.scaleTime().range([0, width]);
      var y = d3.scaleLinear().rangeRound([height, 0]);
  
      var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      var finalData =[];
  
      Object.keys(selectedCountryGDP).forEach(function(key){
        if(key && !isNaN(key)){
          finalData.push({year:new Date(key, 0), gdp:selectedCountryGDP[key]});
        } 
    });
      
      x.domain([finalData[0].year, finalData[finalData.length - 1].year]);
      y.domain([0, 120]);
    
      g.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y")))
          .selectAll("text")  
            .style("text-anchor", "end")
            .attr("transform", "rotate(-40)" );
      
      g.append("g")
          .call(d3.axisLeft(y).ticks(20).tickSizeOuter(0))
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 4)
          .attr("dy", "0.8em")
          .attr("text-anchor", "end")
          .text(selecltedCountry+ " Life Expectancy (in Years)");
    
      g.selectAll("rect")
        .data(finalData)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.year); })
          .attr("y", function(d) { return y(d.gdp); })
          .attr("width", Math.ceil(width / (finalData.length)))
          .attr("height", function(d) { return height - y(d.gdp) })
          .attr("id", function(d) {return 'bar_' + d.year.getFullYear()})
          .on("mouseover", showTip)
          .on("mouseout", hideTip);

          svg.append("defs").append("marker")
            .attr("id", "arrow")
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 8)
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("orient", "auto")
            .append("path")
            .attr("class", "marker")
            .attr("d", "M0,-5L10,0L0,5");


          for(var i = 0; i < annotations_gdp.length; i++) {
              var obj = annotations_gdp[i];
              insertAnnotation(g, finalData, obj.year, obj.text, x, y)
              console.log("annotaiton added" );
          }

    });
    
    }

    function renderTotalEmployment() {
      document.getElementById("gdp_btn").classList.remove("selected");
      document.getElementById("res_btn").classList.remove("selected");
      document.getElementById("life_btn").classList.remove("selected");
      document.getElementById("emp_btn").classList.add("selected");

      document.getElementById("currentTitle").innerHTML = "% of Total Employment"
      document.getElementById("next").style.display = "none";
    document.getElementById("prev").style.display = "block";

      selecltedCountry = document.getElementById("countrySelect").value;
      d3.json("./data/EmploymentByCountry_worldbank.json").then(function(allCountiresEmployment) {
  
        var selectedCountryEmployment = allCountiresEmployment.filter(a=>a["Country Code"]==selecltedCountry)[0];
        var margin = {top: 40, right: 20, bottom: 40, left: 46};
        var svg = d3.select("svg");
        var width = svg.attr("width") - margin.left - margin.right;
        var height = svg.attr("height") - margin.top - margin.bottom;
      
    
        var x = d3.scaleTime().range([0, width]);
        var y = d3.scaleLinear().rangeRound([height, 0]);
    
        var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        var finalData =[];
    
        Object.keys(selectedCountryEmployment).forEach(function(key){
          if(key && !isNaN(key) && selectedCountryEmployment[key]){
            finalData.push({year:new Date(key, 0), gdp:selectedCountryEmployment[key]});
          } 
      });
        
        x.domain([finalData[0].year, finalData[finalData.length - 1].year]);
        y.domain([0, 120]);
      
        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y")))
            .selectAll("text")  
              .style("text-anchor", "end")
              .attr("transform", "rotate(-40)" );
        
        g.append("g")
            .call(d3.axisLeft(y).ticks(20).tickSizeOuter(0))
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 4)
            .attr("dy", "0.8em")
            .attr("text-anchor", "end")
            .text(selecltedCountry+ " Employment (in %)");
      
        g.selectAll("rect")
          .data(finalData)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.year); })
            .attr("y", function(d) { return y(d.gdp); })
            .attr("width", Math.ceil(width / (finalData.length)))
            .attr("height", function(d) { return height - y(d.gdp) })
            .attr("id", function(d) {return 'bar_' + d.year.getFullYear()})
            .on("mouseover", showTip)
            .on("mouseout", hideTip);

        svg.append("defs").append("marker")
            .attr("id", "arrow")
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 8)
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("orient", "auto")
            .append("path")
            .attr("class", "marker")
            .attr("d", "M0,-5L10,0L0,5");


        insertAnnotation(g, finalData, 2009, "Recession 4 (2009)", x, y)

      });
      
      }


      function renderTotalReserves() {
        document.getElementById("gdp_btn").classList.remove("selected");
        document.getElementById("res_btn").classList.add("selected");
        document.getElementById("life_btn").classList.remove("selected");
        document.getElementById("emp_btn").classList.remove("selected");

        document.getElementById("currentTitle").innerHTML = "Total Reserves (in US$)"
        document.getElementById("prev").style.display = "block";
        document.getElementById("next").style.display = "block";

        selecltedCountry = document.getElementById("countrySelect").value;
        d3.json("./data/totalReserves_worldbank.json").then(function(allCountiresEmployment) {
    
          var selectedCountryEmployment = allCountiresEmployment.filter(a=>a["Country Code"]==selecltedCountry)[0];
          var margin = {top: 40, right: 20, bottom: 40, left: 100};
          var svg = d3.select("svg");
          var width = svg.attr("width") - margin.left - margin.right;
          var height = svg.attr("height") - margin.top - margin.bottom;
        
      
          var x = d3.scaleTime().range([0, width]);
          var y = d3.scaleLinear().rangeRound([height, 0]);
      
          var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
          var finalData =[];
      
          Object.keys(selectedCountryEmployment).forEach(function(key){
            if(key && !isNaN(key) && selectedCountryEmployment[key]){
              finalData.push({year:new Date(key, 0), gdp:selectedCountryEmployment[key]});
            } 
        });
          
          x.domain([finalData[0].year, finalData[finalData.length - 1].year]);
          y.domain([0, d3.max(finalData, function(d) { return d.gdp; })]);
        
          g.append("g")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y")))
              .selectAll("text")  
                .style("text-anchor", "end")
                .attr("transform", "rotate(-40)" );
          
          g.append("g")
              .call(d3.axisLeft(y).ticks(20).tickSizeOuter(0))
            .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 4)
              .attr("dy", "0.8em")
              .attr("text-anchor", "end")
              .text(selecltedCountry+ " Total Reserves (in US$)");
        
          g.selectAll("rect")
            .data(finalData)
            .enter().append("rect")
              .attr("class", "bar")
              .attr("x", function(d) { return x(d.year); })
              .attr("y", function(d) { return y(d.gdp); })
              .attr("width", Math.ceil(width / (finalData.length)))
              .attr("height", function(d) { return height - y(d.gdp) })
              .attr("id", function(d) {return 'bar_' + d.year.getFullYear()})
              .on("mouseover", showTip)
              .on("mouseout", hideTip);
  
          svg.append("defs").append("marker")
              .attr("id", "arrow")
              .attr("viewBox", "0 -5 10 10")
              .attr("refX", 8)
              .attr("markerWidth", 6)
              .attr("markerHeight", 6)
              .attr("orient", "auto")
              .append("path")
              .attr("class", "marker")
              .attr("d", "M0,-5L10,0L0,5");
  
  
            for(var i = 0; i < annotations_gdp.length; i++) {
                var obj = annotations_gdp[i];
                insertAnnotation(g, finalData, obj.year, obj.text, x, y)
                console.log("annotaiton added" );
            }
  
        });
        
        }

     /* function renderAll() {
        selecltedCountry = document.getElementById("countrySelect").value;
        d3.json("./data/all.json").then(function(allCountiresEmployment) {
    
          var selectedCountryEmployment = allCountiresEmployment.filter(a=>a["Country Code"]==selecltedCountry)[0];
          var margin = {top: 20, right: 20, bottom: 40, left: 40};
          var svg = d3.select("svg");
          var width = svg.attr("width") - margin.left - margin.right;
          var height = svg.attr("height") - margin.top - margin.bottom;
        
      
          var x = d3.scaleTime().range([0, width]);
          var y = d3.scaleLinear().rangeRound([height, 0]);
      
          var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
          var finalData =[];
      
          Object.keys(selectedCountryEmployment).forEach(function(key){
            if(key && !isNaN(key) && selectedCountryEmployment[key]){
              finalData.push({year:new Date(key, 0), gdp:selectedCountryEmployment['GDP'][key], emp:selectedCountryEmployment['EMP'][key], emp:selectedCountryEmployment['lifeEXP'][key]});
            } 
        });
          
          x.domain([finalData[0].year, finalData[finalData.length - 1].year]);
          y.domain([0, 120]);
        
          g.append("g")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y")))
              .selectAll("text")  
                .style("text-anchor", "end")
                .attr("transform", "rotate(-40)" );
          
          g.append("g")
              .call(d3.axisLeft(y).ticks(20).tickSizeOuter(0))
            .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 4)
              .attr("dy", "0.8em")
              .attr("text-anchor", "end")
              .text(selecltedCountry+ " Employment");
  
          g.append("path")
              .datum(finalData)
              .attr("fill", "none")
              .attr("stroke", "steelblue")
              .attr("stroke-width", 1.5)
              .attr("d", d3.line().x(function(d) { return x(d.year); }).y(function(d) { return y(d.gdp); })
        )
  
        });
        
        }
  */
  
  function showTip(d) {
  var bar = d3.select(this);
  bar.attr("class", "mouseover");
  var year = d.year;
  tooltip.html('<div> Year: ' + year.getFullYear()+ '</div><div> '+ getTooltipText() + d.gdp.toLocaleString("en", {minimumFractionDigits: 0,maximumFractionDigits: 0}) + ' </div>')
  .style('left', (d3.event.pageX + 10) + 'px')
  .style('top', (d3.event.pageY + 10) + 'px')
  .style('display', 'block');
  }

  function getTooltipText(){
    switch(document.getElementById("selectedChart").vlaue) {
      case "GDP":
        return "GDP per capita: $"
        break;
      case "LifeExp":
        return "Life Expectancy: "
        break;
      case "emp":
        return "% of Total Employment: "
        break;
      case "reserves":
        return "Total reserves: $"
          break;
      default:
        return ""
    }
  }
  
  function hideTip(d) {
  var bar = d3.select(this);
  bar.attr('class', 'bar')
  tooltip.style('display', 'none');
  }

  function movePrev() {
    switch(document.getElementById("selectedChart").vlaue) {
      case "GDP":
        render("emp");
        break;
      case "LifeExp":
        render("reserves");
        break;
      case "emp":
        render("LifeExp");
        break;
      case "reserves":
        render("GDP");
        break;
      default:
    }

  }

  function moveNext() {
    switch(document.getElementById("selectedChart").vlaue) {
      case "GDP":
        render("reserves");
        break;
      case "LifeExp":
        render("emp");
        break;
      case "emp":
        render("GDP");
        break;
      case "reserves":
        render("LifeExp");
        break;
      default:
    }
  }
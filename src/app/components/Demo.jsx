"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

function Demo() {
  const width = 1000,
    height = 800,
    margin ={ 
      top: 20,
      right: 20,
      bottom: 100,
      left: 20
    }
  const svgRef = useRef();
  const [data, setData] = useState([5, 10, 15, 20, 25]);

  const getCsvData = () => {
    d3.csv(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRM4Un_tyJOy1eUJnE52-XEK0FoOofiszPAtUYU3JnmpuYDOPrrqv901l6AhLPpYprI4MeAFhnBNnBj/pub?output=csv",
      (d) => {
        // console.log(d)
        (d.number_of_reviews = +d.number_of_reviews), (d.price = +d.price);
        return d;
      }
    )
      .then((response) => {
        console.log(response);
        setData(response);
      })
      .catch((error) => {
        throw error;
      });
  };
  
  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .attr("overflow", "visible");

       // Add X axis --> it is a date format
       var x = d3.scaleTime()
       .domain(d3.extent(data, function(d) { return d.date; }))
       .range([ 0, width ]);
     svg.append("g")
       .attr("transform", "translate(0," + height + ")")
       .call(d3.axisBottom(x));
 
     // Add Y axis
     var y = d3.scaleLinear()
       .domain([0, d3.max(data, function(d) { return +d.value; })])
       .range([ height, 0 ]);
     svg.append("g")
       .call(d3.axisLeft(y));
 
     // Add the line
     svg.append("path")
       .datum(data)
       .attr("fill", "none")
       .attr("stroke", "steelblue")
       .attr("stroke-width", 1.5)
       .attr("d", d3.line()
         .x(function(d) { return x(d.date) })
         .y(function(d) { return y(d.value) })
         )

    
    
  }, [[data]]);

  return (
    <div>
      <svg ref={svgRef}></svg>
      <button onClick={getCsvData}>csv data</button>
    </div>
  );
}

export default Demo;

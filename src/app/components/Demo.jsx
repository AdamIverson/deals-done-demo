"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

function Demo() {
  const svgRef = useRef();
  const [data, setData] = useState([5, 10, 15, 20, 25]);

  const getCsvData = () => {
    d3.csv(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRM4Un_tyJOy1eUJnE52-XEK0FoOofiszPAtUYU3JnmpuYDOPrrqv901l6AhLPpYprI4MeAFhnBNnBj/pub?output=csv",
      (d) => {
        // console.log(d)
        // (d.number_of_reviews = +d.number_of_reviews), (d.price = +d.price);
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
    const svg = d3.select(svgRef.current);
    
  });

  return (
    <div>
      <svg ref={svgRef}></svg>
      <button onClick={getCsvData}>csv data</button>
    </div>
  );
}

export default Demo;

"use client";

import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";

function TwoDemo() {
  const [data, setData] = useState(
    { number_of_reviews: 5, price: 1 },
    { number_of_reviews: 10, price: 10 },
    { number_of_reviews: 15, price: 100 },
    { number_of_reviews: 25, price: 1000 },
    { number_of_reviews: 45, price: 5000 },
    { number_of_reviews: 75, price: 9000 },
    { number_of_reviews: 105, price: 10000 },
    { number_of_reviews: 125, price: 11000 }
  );

  const height = 800,
    width = 1000,
    margin = {
      top: 20,
      right: 20,
      bottom: 100,
      left: 20,
    };

  const svgRef = useRef();

  d3.csv(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRM4Un_tyJOy1eUJnE52-XEK0FoOofiszPAtUYU3JnmpuYDOPrrqv901l6AhLPpYprI4MeAFhnBNnBj/pub?output=csv",
    (d) => {
      (d.price = +d.price), (d.number_of_reviews = +d.number_of_reviews);
      return d;
    }
  )
    .then((response) => {
      let sortedPrices = response.sort((p1, p2) =>
        p1.price > p2.price ? 1 : p1.price < p2.price ? -1 : 0
      );
      console.log(
        `Rooms sorted based on ascending order of their list price are:`
      );
      console.log(sortedPrices);
      return sortedPrices;
    })
    .catch((error) => {
      throw error;
    });

  useEffect(() => {
    // create svg
    const svg = d3.select(svgRef.current).attr("overflow", "visible");

    // create scales and axes
    const xScale = d3.scaleLinear().domain([0, width]).range([0, width]);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));

    const yScale = d3.scaleLinear().domain([0, 1000]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(yScale));

    let valueLine = d3.line()
    .x((d) => { return x(d.price); })
    .y((d) => { return y(d.number_of_reviews); });

    svg
      .selectAll(".line")
      .append("path")
      .data([data])
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", valueLine);
  });
  return (
    <div>
      TwoDemo
      <svg height={height} width={width} ref={svgRef}></svg>
    </div>
  );
}

export default TwoDemo;

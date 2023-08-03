"use client"

import React, { useEffect, useRef, useState } from 'react'
import * as d3 from "d3"

const height = 800,
width = 1000,
margin ={ top: 20, right: 20, bottom: 50, left: 30};

function ThreeDemo() {
  const [data, setData] = useState([
    { number_of_reviews: 5, price: 1 },
    { number_of_reviews: 10, price: 10 },
    { number_of_reviews: 15, price: 50 },
    { number_of_reviews: 25, price: 100 },
    { number_of_reviews: 45, price: 500 },
    { number_of_reviews: 75, price: 600 },
    { number_of_reviews: 105, price: 700 },
    { number_of_reviews: 125, price: 900 }
  ]);

const svgRef = useRef();

const getCsvData = () => {
  d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vRM4Un_tyJOy1eUJnE52-XEK0FoOofiszPAtUYU3JnmpuYDOPrrqv901l6AhLPpYprI4MeAFhnBNnBj/pub?output=csv",
  (d) => {
    (d.number_of_reviews = +d.number_of_reviews), (d.price = +d.price)
    return d;
  }).then((response) => {
    setData(response);
  }).catch((error) => {
    throw error;
  })
}

useEffect(() => {
  const svg = d3.select(svgRef.current).attr("overflow", "visible");
  
  const xScale = d3.scaleLinear().domain([0, width]).range([0, width]);
  const yScale = d3.scaleLinear().domain([0, height]).range([height, 0]);

  svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(xScale));
  svg.append("g").call(d3.axisLeft(yScale));

  const myLine = d3.line()
    .x((d) => xScale(d.number_of_reviews))
    .y((d) => yScale(d.price));

  const drawnLine = myLine(data);
  // console.log("drawnLine:", drawnLine)

  svg.selectAll(".line")
    .append("path")
    .data([data])
    .join("path")
    .attr("d", drawnLine)
      .attr("fill", "none")
      .attr("stroke", "red");





}, [data])
  return (
    <div>ThreeDemo
      <svg height={height} width={width} ref={svgRef}></svg>
      <button onClick={getCsvData}>Get CSV data</button>
    </div>
  )
}

export default ThreeDemo
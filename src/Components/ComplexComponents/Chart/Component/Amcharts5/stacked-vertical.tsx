import React, { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import HeaderAmchart5 from "../Utils/header-amcharts5/Header-chart";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import { ChartColor } from "@/Core/Constant/chartColor";
import useIsArabicLanguage from "@/Hooks/IsArabicLanguage";

interface StackedVerticalProps {
  Data: any[];
  title: string;
  height?: string;
  label?:string,
  moreOptionsBar:{
    XField:string,
    YFieldValue:string[],
    BarNames:string[],
  },
}

export default function StackedVerticalAmchart5({Data, title, height = "20rem",
moreOptionsBar}:StackedVerticalProps) {
  const {BarNames,XField,YFieldValue}=moreOptionsBar;
  const xAxisRef = useRef(null);
  const chartIdRef = useRef(Math.random().toString(34).substring(2, 10));
  const chartId:any = chartIdRef.current;
  const formattedData=Data;
  const isArabicLanguage=useIsArabicLanguage();
  const exportingRef = useRef<any>(null); 

  useEffect(() => {
    let root:any = am5.Root.new(chartId);
    root._logo.dispose();
    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        layout: root.verticalLayout
      })
    );

    chart.set("paddingRight", isArabicLanguage?50:0); // Adjust this value to increase or decrease right padding
    chart.set("paddingLeft", isArabicLanguage?0:50); // Adjust this value to increase or decrease left padding

    const yAxisRenderer = am5xy.AxisRendererY.new(root, {
      inside: true,
      minGridDistance: 35 ,
      opposite: isArabicLanguage ,
      fontSize: ".875rem" // Smaller font size for X-axis labels
    });

    yAxisRenderer.labels.template.setAll({
      paddingRight:isArabicLanguage?-40:0,
      paddingLeft: isArabicLanguage?0:-40, 
      fontSize: ".875rem" // Smaller font size for X-axis labels
    });

    // Create Y-axis
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: yAxisRenderer
      })
    );

    const xAxisRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 10 ,
      inversed: isArabicLanguage ,
    });

    xAxisRenderer.grid.template.setAll({
      strokeOpacity: 0
    });

    // Create X-Axis
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: xAxisRenderer,
        categoryField: XField
      })
    );

      if(YFieldValue.length===1){
        let series = chart.series.push(am5xy.ColumnSeries.new(root, {
          name: BarNames[0],
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: YFieldValue[0],
          categoryXField: XField,
          stacked: true,

        }));
        
        // Dynamically set the color of each column
        series.columns.template.adapters.add("fill", (fill, target) => {
          const category = target.dataItem.get("categoryX");
          const colorIndex = Data.findIndex(item => item[XField] === category);
          return am5.color(ChartColor[colorIndex % ChartColor.length] || "#CCCCCC");
        });
        
        series.columns.template.adapters.add("stroke", (stroke, target) => {
          const category = target.dataItem.get("categoryX");
          const colorIndex = Data.findIndex(item => item[XField] === category);
          return am5.color(ChartColor[colorIndex % ChartColor.length] || "#CCCCCC");
        });
        
        series.columns.template.setAll({
          tooltipText: "{name}: {valueY}",
          cornerRadiusBL: 0,
          cornerRadiusBR: 0,
          maxWidth: 60 // Set the maximum width of the bar here
        });
        
        series.data.setAll(Data);
      }else{
      // Create series for each YFieldValue
      YFieldValue.forEach((field, index) => {
        let series = chart.series.push(am5xy.ColumnSeries.new(root, {
          name: BarNames[index],
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: field,
          categoryXField: XField,
          stacked: true,
        }));
  
        series.columns.template.setAll({
          tooltipText: "{name}: {valueY}",
          fill: am5.color(ChartColor[index] || "#CCCCCC"), // Use chartColor array for color
          stroke: am5.color(ChartColor[index] || "#CCCCCC"),
          cornerRadiusTL:index==YFieldValue?.length-1?10:0,
          cornerRadiusTR: index==YFieldValue?.length-1?10:0,
          cornerRadiusBL: 0,
          cornerRadiusBR: 0,
          maxWidth: 60 // Set the maximum width of the bar here

        });
  
        series.data.setAll(Data);
      });

      }
  
    if(YFieldValue?.length>1){
        // Add legend
        let legend = chart.children.push(am5.Legend.new(root, {
          // Use this to adjust the overall font size of the legend text
          fontSize: ".875rem"
        }));
      
        // Adjust the size of the legend marker (the square)
        legend.markers.template.setAll({
          width: 11, // Adjust the width of the marker
          height: 11 // Adjust the height of the marker
        });
      
        legend.data.setAll(chart.series.values);
    }

    // Add cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {}));

    xAxisRef.current = xAxis;

    let exporting = am5plugins_exporting.Exporting.new(root, {
      pngOptions: {
        quality: 0.8,
        maintainPixelRatio: true
      }
    });
    exportingRef.current = exporting;

    return () => {
      root.dispose();
    };
  }, [isArabicLanguage]);

  useEffect(() => {
    xAxisRef.current.data.setAll(formattedData);
  }, [formattedData,isArabicLanguage]);

  return (
      <div style={{marginTop:"3rem",direction:"ltr"}} > 
          <HeaderAmchart5 
            direction={isArabicLanguage} data={formattedData} 
            exportingRef={exportingRef} title={title}/>
          <div 
                id={chartId} 
                style={{ width: "100%", height,margin:"-1rem 0rem" }}>
          </div>
      </div>);
}

import React, { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import HeaderAmchart5 from "../Utils/header-amcharts5/Header-chart";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import { ChartColor } from "@/Core/Constant/chartColor";
import useIsArabicLanguage from "@/Hooks/IsArabicLanguage";
import am5themes_Dark from "@amcharts/amcharts5/themes/Dark";
import { useTheme } from "@/Context/ContextApi/ThemeProvider";

interface BarChartProps {
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

export default function BarChartAmchart5({Data, title, height = "20rem",
moreOptionsBar}:BarChartProps) {
  const {BarNames,XField,YFieldValue}=moreOptionsBar;
  const xAxisRef = useRef(null);
  const chartIdRef = useRef(Math.random().toString(34).substring(2, 10));
  const chartId:any = chartIdRef.current;
  const isArabicLanguage=useIsArabicLanguage();
  const exportingRef = useRef<any>(null); 
  const {theme,isDarkMode}=useTheme();

  useEffect(() => {
    let root:any = am5.Root.new(chartId);
    root._logo.dispose();
    root.setThemes([isDarkMode?am5themes_Dark.new(root):am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomY", 
        layout: root.verticalLayout
      })
    );

    chart.set("paddingRight", isArabicLanguage?50:0); // Adjust this value to increase or decrease right padding
    chart.set("paddingLeft", isArabicLanguage?0:50); // Adjust this value to increase or decrease left padding

    const yAxisRenderer = am5xy.AxisRendererY.new(root, {
      inside: true,
      minGridDistance: 35 ,
      opposite: isArabicLanguage ,
      fontSize: ".875rem" 
    });

    yAxisRenderer.labels.template.setAll({
      paddingRight:isArabicLanguage?-40:0,
      paddingLeft: isArabicLanguage?0:-40, 
      fontSize: ".875rem" 
    });

    // Create Y-axis
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: yAxisRenderer
      })
    );

    // make the bar behind each other
    const xAxisRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 30 ,
      inversed: isArabicLanguage ,
      cellStartLocation: 0.1,
      cellEndLocation: 0.8,
      minorGridEnabled: true
    
    });

    xAxisRenderer.grid.template.setAll({
      strokeOpacity: 0
    });

    // Create X-Axis
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: xAxisRenderer,
        categoryField: XField,
        paddingInner: 1, 
        paddingOuter: .5 ,
        categorySpacing: 0.1, // Adjust this to decrease spacing between groups
    
      })
    );

      if(YFieldValue.length===1){
        let series = chart.series.push(am5xy.ColumnSeries.new(root, {
          name: BarNames[0],
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: YFieldValue[0],
          categoryXField: XField,
          clustered: true // Disable clustering to control spacing directly
        }));
        
        // Dynamically set the color of each column
        series.columns.template.adapters.add("fill", (fill:any, target:any) => {
          const category = target.dataItem.get("categoryX");
          const colorIndex = Data.findIndex(item => item[XField] === category);
          return am5.color(ChartColor[colorIndex % ChartColor.length] || "#CCCCCC");
        });
        
        series.columns.template.adapters.add("stroke", (stroke:any, target:any) => {
          const category = target.dataItem.get("categoryX");
          const colorIndex = Data.findIndex(item => item[XField] === category);
          return am5.color(ChartColor[colorIndex % ChartColor.length] || "#CCCCCC");
        });
        
        series.columns.template.setAll({
          tooltipText: "{valueY}",
          cornerRadiusTL: 10,
          cornerRadiusTR: 10,
          cornerRadiusBL: 0,
          cornerRadiusBR: 0,
          // maxWidth: 25
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
          clustered: true
        }));
  
        series.columns.template.setAll({
          tooltipText: "{valueY}",
          fill: am5.color(ChartColor[index] || "#CCCCCC"), 
          stroke: am5.color(ChartColor[index] || "#CCCCCC"),
          cornerRadiusTL: 10,
          cornerRadiusTR: 10,
          cornerRadiusBL: 0,
          cornerRadiusBR: 0,
          // maxWidth: 25 // Set the maximum width of the bar here
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
          width: 10, // Adjust the width of the marker
          height: 10 // Adjust the height of the marker
        });
      
        legend.data.setAll(chart.series.values);
    }

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
  }, [isArabicLanguage,theme,Data]);

  useEffect(() => {
    xAxisRef.current.data.setAll(Data);
  }, [Data,isArabicLanguage]);

  return (
      <div style={{direction:"ltr"}} > 
          <HeaderAmchart5 
            direction={isArabicLanguage} data={Data} 
            exportingRef={exportingRef} title={title}/>
          <div 
                id={chartId} 
                style={{ width: "100%", height,margin:"-1rem 0rem" }}>
          </div>
      </div>);
}

import React, { useEffect, useRef, FC, useMemo } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import HeaderAmchart5 from '../Utils/header-amcharts5/Header-chart';
import { ChartColor } from '@/Core/Constant/chartColor';
import useIsArabicLanguage from '@/Hooks/IsArabicLanguage';
import { GetMax15Values } from '@/Utils/getMax15Values';
import am5themes_Dark from "@amcharts/amcharts5/themes/Dark";
import { useTheme } from '@/Context/ContextApi/ThemeProvider';

interface StackedChartData {
  [key: string]: string | number;
}

interface StackedChartProps {
  Data: StackedChartData[];
  title: string;
  height?: string;
  moreOptionStack:{
    xFieldValue:string[],
    yFeild:string,
    BarNames:string[]
  },
  reRender?:any
}

const StackedChartAmchart5: FC<StackedChartProps> = ({ Data, title, height = "20rem",moreOptionStack,reRender, }) => {
  const chartIdRef = useRef(Math.random().toString(36).substring(2, 10));
  const chartId = chartIdRef.current;
  const exportingRef = useRef<any>(null);
  const {BarNames,xFieldValue,yFeild}=moreOptionStack;  
  let ChartColorUse = Data?.map((data) => (data?.color));
  const isArabicLanguage=useIsArabicLanguage();
  const {theme,isDarkMode}=useTheme();

  const DataWillUse=useMemo(()=>{
    if(Data?.length>15){
      return GetMax15Values({array:Data,key:yFeild[0]})
    }else{
      return Data;
    }
  },[Data]);

  if(!DataWillUse[0]?.color){
    ChartColorUse=ChartColor
  }
  const baseItemHeight = Data?.length < 8 ? 45 : (Data?.length > 20 ? 30 : 40);
  const calculatedHeight = `${(DataWillUse.length * baseItemHeight)/16}rem`;

  useEffect(() => {
    let root:any = am5.Root.new(chartId);
    root._logo.dispose();
    
    let myTheme = am5.Theme.new(root);
    myTheme.rule("Grid", ["base"]).setAll({
      strokeOpacity: 0.1
    });
    root.setThemes([isDarkMode?am5themes_Dark.new(root):am5themes_Animated.new(root),myTheme]);
  

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        // panX: true,
        // panY: true,
        // wheelX: "panX",
        // wheelY: "zoomX", 
        paddingLeft: 0,
        width: am5.percent(100),
        height: am5.percent(100), 
        layout: root.verticalLayout  
      })
    );

    // Use To Specific The Destance Between Label 
    let yRenderer = am5xy.AxisRendererY.new(root, {
      minGridDistance: 10,
      minorGridEnabled: true,
      // opposite: isArabicLanguage
    });

    yRenderer.grid.template.setAll({ visible: false });

    let yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        categoryField: yFeild,
        renderer: yRenderer,
      
      })
    );
    chart.set("interaction", {
      type: "scrollXY"
    });


    let xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        min: 0,
        renderer: am5xy.AxisRendererX.new(root, {
          visible: true,
          strokeOpacity: 0.1,
          minGridDistance: 80,
          // inversed: isArabicLanguage 
        })
      })
    );
    
  // To Make truncate for Y axsis Lable 
    yAxis.get("renderer").labels.template.setAll({
      oversizedBehavior: "truncate",
      maxWidth: 100,
      ellipsis: "",
      // dx: isArabicLanguage?90:0
    });

    if(xFieldValue?.length>1){
      xFieldValue.forEach((field, index) => {

        function makeSeries(name, fieldName,index) {
          var series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: name,
            stacked: true,
            xAxis: xAxis,
            yAxis: yAxis,
            baseAxis: yAxis,
            valueXField: fieldName,
            categoryYField: yFeild
          }));

          let columnTemplate = series.columns.template;
          columnTemplate.setAll({
            draggable: true,
            tooltipText: `{${yFeild}}: {${xFieldValue[0]}}`,
            fill: am5.color(ChartColor[index] || "#CCCCCC"), // Use chartColor array for color
            stroke: am5.color(ChartColor[index] || "#CCCCCC"),
            cornerRadiusBR:index==xFieldValue?.length-1?10:0,
            cornerRadiusTR: index==xFieldValue?.length-1?10:0,
            strokeOpacity: 0,
          });
      
          columnTemplate.set("tooltipHTML", `<div style="direction: rtl; color: white;">{${yFeild}}: {${xFieldValue[index]}}</div>`);
          series.data.setAll(DataWillUse);        
        }
        makeSeries(BarNames[index],field,index)
      });
      }else{
      let series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          xAxis: xAxis,
          yAxis: yAxis,
          valueXField: xFieldValue[0],
          categoryYField: yFeild,
        })
      );
  
      let columnTemplate = series.columns.template;
      columnTemplate.setAll({
        draggable: true,
        tooltipText: `{${yFeild}}: {${xFieldValue[0]}}`,
        cornerRadiusBR: 10,
        cornerRadiusTR: 10,
        strokeOpacity: 0,
      });
  
      columnTemplate.set("tooltipHTML", `<div style="direction: rtl; color: white;">{${yFeild}}: {${xFieldValue[0]}}</div>`);
  
      series.columns.template.adapters.add("fill", function (fill:any, target:any) {
        return ChartColorUse[series.columns.indexOf(target)];
      });
  
      series.columns.template.adapters.add("stroke", function (stroke:any, target:any) {
        return ChartColorUse[series.columns.indexOf(target)];
      });
      series.data.setAll(DataWillUse);

    }

    if(xFieldValue?.length>1){
      // Add legend
      let legend = chart.children.push(am5.Legend.new(root, {
        fontSize: ".875rem"
      }));

      legend.markers.template.setAll({
        width: 10, // Adjust the width of the marker
        height: 10 // Adjust the height of the marker
      });  
    
      legend.data.setAll(chart.series.values);
  }

  //------------------------------- Arabic Language setting --------------------------------//
    // chart.setAll({
    //   paddingLeft:isArabicLanguage?30:0, 
    // });

    yAxis.data.setAll(DataWillUse);
    yAxis.get("renderer").labels.template.setAll({
      fontSize: ".875rem"
    });

    xAxis.get("renderer").labels.template.setAll({
      fontSize: ".875rem"
    });
    

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
  }, [Data,isArabicLanguage,reRender,theme]);

  return (
    <div>
      <HeaderAmchart5 top15={Data?.length>15} data={DataWillUse} exportingRef={exportingRef} title={title} />
      <div
        id={chartId}
        style={{ 
        direction:"ltr", width: "100%", 
        height: calculatedHeight,margin: "-2rem 0rem" }}>
      </div>
    </div>
  )
};

export default StackedChartAmchart5;

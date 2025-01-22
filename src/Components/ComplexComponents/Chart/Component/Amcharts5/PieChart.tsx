import * as am5percent from "@amcharts/amcharts5/percent";
import { useEffect, useMemo, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import HeaderAmchart5 from "../Utils/header-amcharts5/Header-chart";
import { ChartColor } from "@/Core/Constant/chartColor";
import useIsArabicLanguage from "@/Hooks/IsArabicLanguage";
import { GetMax15Values } from "@/Utils/getMax15Values";
import am5themes_Dark from "@amcharts/amcharts5/themes/Dark";
import { useTheme } from "@/Context/ContextApi/ThemeProvider";

interface PieChartProps {
    Data: any[];
    title: string;
    height?: string;
    label?:string,
    tackAllRecord?:boolean,
    moreOptionsPieChart: {
      value: string,
      label: string
    }
}

function PieChartsAmchart5({Data, title, height = "18rem", moreOptionsPieChart,tackAllRecord}: PieChartProps) {
  const exportingRef = useRef<any>(null); 
  const chartIdRef = useRef(Math.random().toString(34).substring(2, 10));
  const chartId = chartIdRef.current;
  let KEY = moreOptionsPieChart.label;
  let VALUE = moreOptionsPieChart.value;
  const {theme,isDarkMode}=useTheme();
  const isMobile = window.innerWidth <= 768; 
  
  const isArabicLanguage=useIsArabicLanguage();
  if(Data?.length>16){
    height="34rem"
  }
  else if(Data?.length>14){
    height="30rem"
  }
  else if(Data?.length>12){
    height="26rem"
  }else if(Data?.length>9){
    height = "22rem"
  }

  const DataWillUse=useMemo(()=>{
    if(Data?.length>15&&!tackAllRecord){
      return GetMax15Values({array:Data,key:VALUE})
    }else{
      return Data;
    }
  },[Data]);

  useEffect(() => {
    let root:any = am5.Root.new(chartId);

    root._logo.dispose();
    let myTheme = am5.Theme.new(root);
    myTheme.rule("Grid", ["base"]).setAll({
      strokeOpacity: 0.1
    });
    root.container.set("layout", root.horizontalLayout);
    root.setThemes([isDarkMode?am5themes_Dark.new(root):am5themes_Animated.new(root),myTheme]);

    let chartContainer = root.container.children.push(am5.Container.new(root, {
      width: am5.percent(20),
      height: am5.percent(100),
      layout: root.verticalLayout,
      marginRight: 30,
    }));

    let chart = chartContainer.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        radius: am5.percent(95),
        innerRadius: am5.percent(50),
      }),
    );

    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Series",
        valueField: VALUE,
        categoryField: KEY,
        alignLabels: false,
      }),
    );
    series.slices.template.adapters.add("fill", (fill:any, target:any) => ChartColor[series.slices.indexOf(target)]);
    series.slices.template.adapters.add("stroke", (stroke:any, target:any) => ChartColor[series.slices.indexOf(target)]);


    series.labels.template.setAll({
      forceHidden: true,
    });

    series.ticks.template.setAll({
      forceHidden: true,
    });
    series.slices.template.setAll({
      tooltipText: "{category}: {value}",
    });
            
    series.data.setAll(DataWillUse);

    let legendContainer = root.container.children.push(am5.Container.new(root, {
      width: am5.percent(30),
      height: am5.percent(100),
      layout: root.verticalLayout
    }));

    let legend = legendContainer.children.push(am5.Legend.new(root, {
      centerY: am5.percent(50),
      y: am5.percent(50),
      layout: root.gridLayout
    }));
    legend.markers.template.setAll({
      width: 13, // Adjust the width of the marker
      height: 13 // Adjust the height of the marker
    });

    legend.labels.template.setAll({
      fontSize: ".875rem",
    });

    legend.data.setAll(series.dataItems);

    series.slices.template.events.on("click", (ev:any) => {
      let slice:any = ev.target;
      let item:any = legend.dataItems.find((item:any) => item.dataContext === slice.dataItem.dataContext);
      if (item) {
        item.isHidden ? item.show() : item.hide();
      }
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
  }, [DataWillUse, KEY, VALUE,theme]);

  return (
    <div style={{ direction: "ltr" }}> 
      <HeaderAmchart5 
        top15={Data?.length>15&&!tackAllRecord} 
        direction={isArabicLanguage} data={DataWillUse} 
        exportingRef={exportingRef} title={title}/>
      <div id={chartId} style={{ width: "95%", height: height }}></div>
    </div>
  );
}

export default PieChartsAmchart5;

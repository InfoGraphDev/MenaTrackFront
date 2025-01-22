import { useEffect, useMemo, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import HeaderAmchart5 from "../Utils/header-amcharts5/Header-chart";
import { ChartColor } from "@/Core/Constant/chartColor";
import useIsArabicLanguage from "@/Hooks/IsArabicLanguage";

interface LineChartProps {
  Data: any[];
  title: string;
  height?: string;
  label?:string,
  moreOptionsLine:{
    XField:string,
    YFieldValue:string[],
    LinesName:string[],
  },
  yAxisRightOverride?:any,
  displayPeriod:"year"|"month"|"day"|"15days"
}

const LineChartAmchart5 = ({
   Data, title, height = "20rem",
   moreOptionsLine,yAxisRightOverride=true,
   displayPeriod}:LineChartProps) => {
    
  let legend;
  const {LinesName,XField,YFieldValue}=moreOptionsLine;
  const chartIdRef = useRef(Math.random().toString(34).substring(2, 10));
  const chartId = chartIdRef.current;
  const exportingRef = useRef<any>(null); 
  const isArabicLanguage=useIsArabicLanguage();
  
  const formattedData =useMemo(()=>{
    return  Data.map(item => ({
      ...item,
      date: new Date(item.date).getTime()

    }));
  },[])

  const { min, max } = useMemo(() => {
    let minVal = Number.POSITIVE_INFINITY;
    let maxVal = Number.NEGATIVE_INFINITY;

    Data.forEach(item => {
      moreOptionsLine.YFieldValue.forEach(field => {
        const value = item[field];
        if (value < minVal) minVal = value;
        if (value > maxVal) maxVal = value;
      });
    });

    // Optionally add some padding to min and max values
    minVal = minVal > 0 ? Math.floor(minVal * 0.95) : Math.floor(minVal);
    maxVal = Math.ceil(maxVal * 1.05);

    return { min: minVal, max: maxVal };
  }, [Data, moreOptionsLine.YFieldValue]);


  useEffect(() => {
    let root:any = am5.Root.new(chartId);
    root._logo.dispose();

    let baseInterval = { timeUnit: "day", count: 1 }; 
    let extraMin = 0.02; 
    let extraMax = 0.02;

    switch (displayPeriod) {
      case 'month':
        baseInterval = { timeUnit: "month", count: 1 };
        break;
      case 'year':
        baseInterval = { timeUnit: "year", count: 1 };
        break;
      case '15days':
        baseInterval = { timeUnit: "day", count: 1 };
        extraMin = 0;
        extraMax = 0;
        break;
      }

    const responsive = am5themes_Responsive.new(root);
    const themes:any = [responsive, am5themes_Animated.new(root)];
    themes.push(PrimaryColorTheme.new());
    root.setThemes(themes);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        focusable: true,
      })
    );
    chart.set("paddingRight", isArabicLanguage?50:0); // Adjust this value to increase or decrease right padding
    chart.set("paddingLeft", isArabicLanguage?0:50); // Adjust this value to increase or decrease left padding
    
    chart.topAxesContainer.set("layout", root.horizontalLayout);
    let cnt = chart.topAxesContainer.children.push(
      am5.Container.new(root, { width: am5.p100 })
    );
    legend = cnt.children.push(
      am5.Legend.new(root, {
        width: am5.percent(100)
      })
    );

    legend.labels.template.setAll({
      fontSize: ".875rem",
      oversizedBehavior: "fit",
      breakWords: true
    });
    legend.markers.template.setAll({
      width: 12,
      height: 12
    });
    legend.markerRectangles.template.setAll({
      cornerRadiusTL: 20,
      cornerRadiusTR: 20,
      cornerRadiusBL: 20,
      cornerRadiusBR: 20
    });


    const xAxisRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 10 ,
      inversed: isArabicLanguage 
    });
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        extraMin: extraMin,
        extraMax: extraMax,
        baseInterval: baseInterval,
        periodChangeDateFormats: {
          day: "MMM dd",
          month: "MMM yyyy",
          year: "yyyy"
        },
        renderer: xAxisRenderer
      })
    );

    xAxisRenderer.labels.template.setAll({
      fontSize: ".875rem",
      oversizedBehavior: "truncate"
    });

    xAxisRenderer.grid.template.setAll({
      strokeOpacity: 0
    });
    const yAxisRenderer = am5xy.AxisRendererY.new(root, {
      inside: true,
      minGridDistance: 35 ,
      opposite: isArabicLanguage ,
    });

    yAxisRenderer.labels.template.setAll({
      paddingRight:isArabicLanguage?-40:0,
      paddingLeft: isArabicLanguage?0:-40, 
      fontSize: ".875rem" // Smaller font size for X-axis labels
    });


    const yAxisLeft = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        numberFormat: yAxisRightOverride.available,
        // numberFormat: yAxisRightOverride.available ? "#" : "#'%'",
        renderer: yAxisRenderer,
        maxDeviation: 0,
        min: min, 
        max: max, 
      })
    );

    yAxisRenderer.labels.template.setAll({
      fontSize: ".875rem",
      layer: 2,
      centerY: am5.p0
    });

    root.dateFormatter.setAll({
      dateFormat: "MMM",
      dateFields: ["valueX"]
    });
    
    for (let i = 0; i < YFieldValue.length; i++) {
      let currentSeries = chart.series.push(
        am5xy.SmoothedXLineSeries.new(root, {
          name: LinesName[i],
          xAxis: xAxis,
          yAxis: yAxisLeft,
          valueYField: YFieldValue[i],
          valueXField: XField,
          tooltip: am5.Tooltip.new(root, {
            ariaHidden: true,
            pointerOrientation: "horizontal",
            paddingBottom: 2,
            paddingTop: 2,
            labelText:
              "[bold, fontSize: .875rem]{name}[/] - [fontSize: .875rem]{valueX}: {valueY}%[/]"
          })
        })
      );

      currentSeries.strokes.template.setAll({
        strokeWidth: 2
      });
       currentSeries.bullets.push(function() {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 3,
            fill: currentSeries.get("fill")
          })
        });
      });


      currentSeries.data.setAll(formattedData);
    }
    legend.data.setAll(chart.series.values);

    if (yAxisRightOverride && yAxisRightOverride.available) {
      var heatLegend = chart.bottomAxesContainer.children.push(
        am5.HeatLegend.new(root, {
          orientation: "horizontal",
          height: 20
        })
      );
      heatLegend.set("startText", "%");
      heatLegend.set("endText", "Volume");

      const rightRenderer = am5xy.AxisRendererY.new(root, {
        opposite: true,
        inside: true
      });
      rightRenderer.grid.template.set("forceHidden", true);
      rightRenderer.labels.template.setAll({
        centerY: am5.p0,
        fontSize: ".875rem"
      });
    }

    chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        xAxis: xAxis,
        yAxis: yAxisLeft
      })
    );

    chart.appear(0);

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
  }, [formattedData,isArabicLanguage]);

  return  (
    <div style={{direction:"ltr"}} > 
          <HeaderAmchart5 
            direction={isArabicLanguage} data={formattedData} 
            exportingRef={exportingRef} title={title}/>
          <div 
                id={chartId} 
                style={{ width: "100%", height,margin:"-1rem 0rem" }}>
          </div>
    </div>)
};

export default LineChartAmchart5;

class PrimaryColorTheme extends am5.Theme {
  setupDefaultRules() {
    super.setupDefaultRules();
    this.rule("ColorSet").set("colors", ChartColor.map(color => am5.color(color)));
  }
}

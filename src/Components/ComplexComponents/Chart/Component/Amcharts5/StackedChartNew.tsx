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

const StackedChartNewAmchart5: FC<StackedChartProps> = ({ Data, title, height = "20rem", moreOptionStack, reRender, }) => {
  const chartIdRef = useRef(Math.random().toString(36).substring(2, 10));
  const chartId = chartIdRef.current;
  const exportingRef = useRef<any>(null);
  const { BarNames, xFieldValue, yFeild } = moreOptionStack;  
  let ChartColorUse = Data?.map((data) => (data?.color));
  const isArabicLanguage = useIsArabicLanguage();
  const { theme, isDarkMode } = useTheme();

  const DataWillUse = useMemo(() => {
    if (Data?.length > 15) {
      return GetMax15Values({ array: Data, key: yFeild[0] });
    } else {
      return Data;
    }
  }, [Data]);

  if (!DataWillUse[0]?.color) {
    ChartColorUse = ChartColor;
  }

  const calculatedHeight = "15rem";

  useEffect(() => {
    let root: any = am5.Root.new(chartId);
    root._logo.dispose();

    let myTheme = am5.Theme.new(root);
    myTheme.rule("Grid", ["base"]).setAll({
      strokeOpacity: 0,
    });
    root.setThemes([isDarkMode ? am5themes_Dark.new(root) : am5themes_Animated.new(root), myTheme]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        paddingLeft: 0,
        width: am5.percent(100),
        height: am5.percent(100),
        layout: root.verticalLayout  
      })
    );

    let yRenderer = am5xy.AxisRendererY.new(root, {
      minGridDistance: 10,
      minorGridEnabled: false,
      opposite: isArabicLanguage
    });

    yRenderer.grid.template.setAll({ visible: false });

    let yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        categoryField: yFeild,
        renderer: yRenderer,
      })
    );
    yAxis.get("renderer").grid.template.setAll({
      visible: false
    });
    
  
    let xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        min: 0,
        renderer: am5xy.AxisRendererX.new(root, {
          visible: true,
          strokeOpacity: 0,
          minGridDistance: 30,
          inversed: isArabicLanguage 
        })
      })
    );
    // remove the grid and label x axsis
    xAxis.get("renderer").grid.template.setAll({
      visible: false
    });  
    xAxis.get("renderer").labels.template.setAll({
      visible: false
    });


    yAxis.get("renderer").labels.template.setAll({
      oversizedBehavior: "truncate",
      maxWidth: 150,
      ellipsis: "",
      dx: isArabicLanguage ? 35 : 0
    });

    yAxis.get("renderer").labels.template.setAll({
      fontSize: ".875rem"
    });

    xAxis.get("renderer").labels.template.setAll({
      fontSize: ".875rem"
    });

    if (xFieldValue?.length > 1) {
      xFieldValue.forEach((field, index) => {
        function makeSeries(name, fieldName, index) {
          var series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: name,
            stacked: true,
            xAxis: xAxis,
            yAxis: yAxis,
            baseAxis: yAxis,
            valueXField: fieldName,
            categoryYField: yFeild,
            maxWidth: 15
          }));

          let columnTemplate = series.columns.template;
          columnTemplate.setAll({
            draggable: true,
            fill: am5.color(ChartColor[index] || "#CCCCCC"), 
            stroke: am5.color(ChartColor[index] || "#CCCCCC"),
            cornerRadiusBR: index == xFieldValue?.length - 1 ? 15 : 0,
            cornerRadiusTR: index == xFieldValue?.length - 1 ? 15 : 0,
            strokeOpacity: 0,
          });

          // Add value label inside the bars
          series.bullets.push(() => {
            return am5.Bullet.new(root, {
              locationX: 0.5,
              locationY: 0.5,
              sprite: am5.Label.new(root, {
                text: "{valueX}",
                fill: root.interfaceColors.get("alternativeText"),
                centerX: am5.p50,
                centerY: am5.p50,
                populateText: true
              })
            });
          });

          series.data.setAll(DataWillUse);
        }
        makeSeries(BarNames[index], field, index);
      });
    } else {
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
        cornerRadiusBR: 15,
        cornerRadiusBL: 15,
        cornerRadiusTR: 15,
        cornerRadiusTL: 15,
        strokeOpacity: 0,
        maxHeight: 22
      });

      series.columns.template.adapters.add("fill", function (fill, target) {
        return ChartColorUse[series.columns.indexOf(target)];
      });

      series.columns.template.adapters.add("stroke", function (stroke, target) {
        return ChartColorUse[series.columns.indexOf(target)];
      });

      // Add value label inside the bars
      series.bullets.push(() => {
        return am5.Bullet.new(root, {
          locationX: 0.5,
          locationY: 0.5,
          sprite: am5.Label.new(root, {
            text: "{valueX}",
            fill: am5.color("#000000"), 
            centerX: am5.p50,
            centerY: am5.p50,
            populateText: true
          })
    });
      });

      series.data.setAll(DataWillUse);
    }

    chart.setAll({
      paddingLeft: isArabicLanguage ? 15 : 0,
    });

    yRenderer.grid.template.setAll({ visible: false });
    yAxis.data.setAll(DataWillUse);

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
  }, [Data, isArabicLanguage, reRender, theme]);

  return (
    <div>
      <HeaderAmchart5 top15={Data?.length > 15} data={DataWillUse} exportingRef={exportingRef} title={title} />
      <div
        id={chartId}
        style={{ 
        width: "100%", 
        height: calculatedHeight, margin: "-2rem 0" }}>
      </div>
    </div>
  );
};

export default StackedChartNewAmchart5;

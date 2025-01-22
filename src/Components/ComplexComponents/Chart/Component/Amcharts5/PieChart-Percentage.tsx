import React, { useEffect, useRef } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { ChartColor } from '@/Core/Constant/chartColor';
import { useTheme } from '@/Context/ContextApi/ThemeProvider';
import { ThemeEnum } from '@/Core/Enums/ThemeEnum';
import am5themes_Dark from "@amcharts/amcharts5/themes/Dark";

interface Pie {
  number: number,
  percentage: number
}

const PercentageAmchart = ({ number, percentage }: Pie) => {
  const chartIdRef = useRef(Math.random().toString(34).substring(2, 10));
  const chartId = chartIdRef.current;
  const {theme,isDarkMode}=useTheme();

  useEffect(() => {
    let root:any = am5.Root.new(chartId);
    root._logo.dispose();
    root.setThemes([isDarkMode?am5themes_Dark.new(root):am5themes_Animated.new(root)]);

    let chart = root.container.children.push(am5percent.PieChart.new(root, {
      layout: root.verticalLayout,
      innerRadius: am5.percent(60),
      startAngle: -90,
      endAngle: 90
    }));

    let series = chart.series.push(am5percent.PieSeries.new(root, {
      valueField: "value",
      categoryField: "category",
    }));

    series.slices.template.setAll({
      cornerRadius: 2,
      tooltipText: "{value}",
      interactive: true 
    });

    series.ticks.template.set("visible", false);
    series.labels.template.set("visible", false);

    series.slices.template.adapters.add("fill", (fill, target) => {
      const index = series.slices.indexOf(target);
      return ChartColor[index % ChartColor.length];
    });

    let complementaryPercentage = 100 - percentage;
    series.data.setAll([
      { category: "Completed", value: percentage, number: number },
      { category: "Remaining", value: complementaryPercentage, number: null }
    ]);

    chart.seriesContainer.children.push(am5.Label.new(root, {
      textAlign: "center",
      text: `${percentage}%`,
      fontSize: 18,
      fontWeight: "500",
      centerX: am5.percent(50),
      centerY: am5.percent(50)
    }));

    return () => {
      root.dispose();
    };
  }, [number, percentage,theme]); 

  return <div id={chartId} 
      style={{ width: "15rem", height: "12rem", 
      marginLeft: "auto", marginRight: "auto",direction:"ltr" }}></div>;
};

export default PercentageAmchart;

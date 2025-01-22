import React from 'react'
import LineChartAmchart5 from './Component/Amcharts5/lineChart';
import BarChartAmchart5 from './Component/Amcharts5/BarChart';
import StackedChartAmchart5 from './Component/Amcharts5/stackedChart';
import StackedVerticalAmchart5 from './Component/Amcharts5/stacked-vertical';
import PieChartsAmchart5 from './Component/Amcharts5/PieChart';
import PercentageAmchart from './Component/Amcharts5/PieChart-Percentage';
import StackedChartNewAmchart5 from './Component/Amcharts5/StackedChartNew';

interface BaseChartComponentProps {
  Data: { [key: string]: any }[];
  title: string;
  height?: string;
  reRender?:any,
  tackAllRecord?:boolean
}

interface StackedHorizontalNewChartProps extends BaseChartComponentProps {
  type: 'stack-Horizontal';
  moreOptionStack:{
    xFieldValue:string[],
    yFeild:string,
    BarNames:string[]
  }
}

interface StackedHorizontalChartProps extends BaseChartComponentProps {
  type: 'stack-Horizontal-new';
  moreOptionStack:{
    xFieldValue:string[],
    yFeild:string,
    BarNames:string[]
  }
}

interface BarChartProps extends BaseChartComponentProps {
  type: 'bar';
  moreOptionsBar:{
    XField:string,
    YFieldValue:string[],
    BarNames:string[],
  },
}
interface StackedChartProps extends BaseChartComponentProps {
  type: 'stacked-vertical';
  moreOptionsBar:{
    XField:string,
    YFieldValue:string[],
    BarNames:string[],
  },
}

interface LineChartProps extends BaseChartComponentProps {
  type: 'line';
  moreOptionsLine: {
    XField:string,
    YFieldValue:string[],
    LinesName:string[],
  };
  displayPeriod:"year"|"month"|"day"|"15days"
}

interface PieChartProps extends BaseChartComponentProps {
  type: 'pie';
  moreOptionsPieChart: {
      value: string;
      label: string;
  };
}

interface PiePercentage {
  type: 'pie-percentage';
  number:number,
  percentage:number
}


interface OtherChartProps extends BaseChartComponentProps {
  type: 'other';
}

type ChartComponentProps = StackedHorizontalChartProps 
| BarChartProps |StackedChartProps
| LineChartProps | PieChartProps | OtherChartProps|PiePercentage|StackedHorizontalNewChartProps;

function ChartComponent({
         type,Data,title,height,
         moreOptionsPieChart,
         moreOptionsLine,moreOptionsBar,moreOptionStack,
         number,percentage,reRender,displayPeriod,tackAllRecord}:ChartComponentProps) {    
    return (
        <div>
            {Data?.length>0&&
                <>
                    {type === 'stack-Horizontal' && <StackedChartAmchart5 
                        title={title} Data={Data} height={height} 
                        moreOptionStack={moreOptionStack} reRender={reRender} />}
                    {type === 'stack-Horizontal-new' && <StackedChartNewAmchart5 
                        title={title} Data={Data} height={height} 
                        moreOptionStack={moreOptionStack} reRender={reRender} />}
                        
                    {type === 'line' && <LineChartAmchart5 
                        Data={Data} moreOptionsLine={moreOptionsLine} 
                        title={title} height={height} displayPeriod={displayPeriod} />}

                    {type === 'pie' && <PieChartsAmchart5 
                        Data={Data} title={title} height={height} 
                        moreOptionsPieChart={moreOptionsPieChart}
                        tackAllRecord={tackAllRecord} />}
                        
                    {type === 'bar' && <BarChartAmchart5 
                        Data={Data} moreOptionsBar={moreOptionsBar} 
                        title={title} height={height} />}

                    {type === 'stacked-vertical' && <StackedVerticalAmchart5 
                        Data={Data} moreOptionsBar={moreOptionsBar} 
                        title={title} height={height} />}
                </>}
                    {type==="pie-percentage" && <PercentageAmchart 
                            number={number} percentage={percentage} />}
        </div>
      );
    }

export default ChartComponent

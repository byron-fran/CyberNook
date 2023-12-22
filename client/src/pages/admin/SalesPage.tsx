import { useState } from 'react';
import { AgChartsReact} from 'ag-charts-react';

const SalesPage = () => {
  
    const [chartOptions, setChartOptions] = useState({
    // Data: Data to be displayed in the chart
    data: [
        { month: 'Jan', avgTemp: 2.3, iceCreamSales: 1 },
        { month: 'Feb', avgTemp: 2.3, iceCreamSales: 162000 },
        { month: 'Mar', avgTemp: 6.3, iceCreamSales: 302000 },
        { month: 'May', avgTemp: 16.2, iceCreamSales: 800000 },
        { month: 'Jul', avgTemp: 22.8, iceCreamSales: 1254000 },
        { month: 'Sep', avgTemp: 14.5, iceCreamSales: 950000 },
        { month: 'Nov', avgTemp: 8.9, iceCreamSales: 200000 },
    ],
    // Series: Defines which chart type and data to use
    series: [{ type: 'bar', xKey: 'month', yKey: 'iceCreamSales' }],
  })
  return (
    <div className='col-span-3'>
      <AgChartsReact options={chartOptions}/>
    </div>
  )
}

export default SalesPage
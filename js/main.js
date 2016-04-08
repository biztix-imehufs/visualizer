
n = 0;
AmCharts.ready(function() {
    var heartRateData = [
    
    ]

    var chartCursor = new AmCharts.ChartCursor();

    var chart = new AmCharts.AmSerialChart();
    chart.dataProvider = heartRateData;
    chart.categoryField = "time";
    chart.categoryAxis.labelRotation = 60;


    var accelXGraph = new AmCharts.AmGraph();
    accelXGraph.valueField = "accelX";
    accelXGraph.type = "line";
    accelXGraph.fillAlphas = 0.1;

    var accelYGraph = new AmCharts.AmGraph();
    accelYGraph.valueField = "accelY";
    accelYGraph.type = "line";
    accelYGraph.fillAlphas = 0.1;

    chart.addChartCursor(chartCursor);

    chart.addGraph(accelXGraph);
    chart.addGraph(accelYGraph);

    chart.write('chartdiv');


    // Update chart
    setInterval(function() {
        // ajax request for fetching a new data
        $.ajax({
                url:'http://ghora.net/smartageing/getsensordata.php?callback=?',
                //dataType: 'jsonp',
                success: function(data) {
                    n++

                    jData = JSON.parse(data);
                    console.log(jData);


                    accelX = jData.accel_x;
                    accelY = jData.accel_y;
                    //accelZ = jData.accel_z;
                    timestamp = jData.timestamp;
                    if (chart.dataProvider.length > 30) {
                        chart.dataProvider.shift();    
                    }

                    
                    var d = new Date();
                    

                    chart.dataProvider.push({
                        "accelX": accelX.toString(),
                        "accelY": accelY.toString(),
                        "time": d.toUTCString()
                    })

                    //$('#lbl-accel-x').text('Accelerometer X: ' + accelX);
                    //$('#lbl-accel-y').text('Accelerometer Y: ' + accelY);
                    //$('#lbl-accel-z').text('Accelerometer Z: ' + accelZ);

                    // update entire chart
                    chart.validateData()
                },
                error: function() {
                    console.log('error');
                }
            })

        
        
    }, 1000);
    

})
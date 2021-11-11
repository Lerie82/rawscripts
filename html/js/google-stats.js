
    google.load("visualization", "1", {packages:["corechart"]});
    google.setOnLoadCallback(drawChart);

    function dateSort(a,b){
    console.log(a)
console.log(b)
    if (a.year > b.year){return 1}
    if (a.year == b.year){return a.month - b.month}
    return -1;
    }

    function drawChart() {
    var newUsers = [
    {% for month in months %}
    {"count": {{ month.count }},
    "month": {{month.month }},
    "year" : {{ month.year }} },
    {% endfor %}
    ];
    newUsers.sort(dateSort);
    
    var usersData = new google.visualization.DataTable();
    usersData.addColumn('string', 'Date');
    usersData.addColumn('number', 'New Users');
    
    var growthData = new google.visualization.DataTable();
    growthData.addColumn('string', 'Date');
    growthData.addColumn('number', 'total');
    var total=0;
			
    var i = 0
    while(i < newUsers.length){
              nu = newUsers[i];
              i++;
              usersData.addRow([nu.month+"/"+nu.year, nu.count])
              total = total + nu.count;
              
	      growthData.addRow([nu.month+'/'+nu.year, total])
	      }
			
	      var chart = new google.visualization.LineChart(document.getElementById('usersChart'));
	      chart.draw(usersData, {width: 1000, height: 240, title: 'New users per month'});
	      
	      var chart = new google.visualization.LineChart(document.getElementById('growthChart'));
	      chart.draw(growthData, {width: 1000, height: 500, title: 'Cumulative Growth of Users'});
	      }
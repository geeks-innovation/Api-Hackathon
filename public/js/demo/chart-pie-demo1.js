// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function sendgetrequest(url, callback) {
	  let xhttp = new XMLHttpRequest();
	  xhttp.open("GET", url);
	  xhttp.onreadystatechange = function () {
		if (this.readyState == 4) {
		  callback(this.responseText, this.status);
		  //return this.responseText;
		}
	  };
	  xhttp.send();
	}

var select = document.getElementById("month");
var selectcustomer = document.getElementById("customer");

function getSpendingByCategory(){
	var month = select.options[select.selectedIndex].value;
	var customernumber = selectcustomer.options[selectcustomer.selectedIndex].value;
	sendgetrequest("/api/transactions", function (apiresponse, errorstate) {
				if (errorstate == 200) {
					var a = [0,0,0,0,0,0];
					for(let i=0;i<apiresponse.split( "\n" ).length;i++){
						if(apiresponse.split( "\n" )[i].split(',')[0]==customernumber){
							if(apiresponse.split( "\n" )[i].split(',')[1]==month){
								if(apiresponse.split( "\n" )[i].split(',')[2]=='Debit'){
									//console.log("apiresponse " + apiresponse.split( "\n" )[i].split(',')[1]);	
									//console.log("apiresponse " + apiresponse.split( "\n" )[i].split(',')[4]);	
									if(apiresponse.split( "\n" )[i].split(',')[4]=='Food & Dining'){
										a[0] = apiresponse.split( "\n" )[i].split(',')[5];
										
									}
									else if(apiresponse.split( "\n" )[i].split(',')[4]=='Grocery'){
										a[1] = apiresponse.split( "\n" )[i].split(',')[5];
										
									}
									else if(apiresponse.split( "\n" )[i].split(',')[4]=='Health & Fitness'){
										a[2] = apiresponse.split( "\n" )[i].split(',')[5];
										//console.log("apiresponse " + apiresponse.split( "\n" )[i].split(',')[5]);	
									}
									else if(apiresponse.split( "\n" )[i].split(',')[4]=='Mortgage'){
										a[3] = apiresponse.split( "\n" )[i].split(',')[5];
										
									}
									else if(apiresponse.split( "\n" )[i].split(',')[4]=='Entertainment'){
										a[4] = apiresponse.split( "\n" )[i].split(',')[5];
										//console.log("Entertainment " + apiresponse.split( "\n" )[i].split(',')[5]);
									}
									else if(apiresponse.split( "\n" )[i].split(',')[4]=='Bills & Utilities'){
										a[5] = apiresponse.split( "\n" )[i].split(',')[5];
										
									}
								}
							}
							
						}

					}

					// Pie Chart Example
					var ctx = document.getElementById("myPieChart");
					var myPieChart = new Chart(ctx, {
					  type: 'doughnut',
					  data: {
						labels: ["Food & Dining", "Grocery","Health & Fitness","Mortgage","Entertainment","Bills & Utilities"],
						datasets: [{
						  data: a,
						  backgroundColor: ['#85C1E9', '#BB8FCE', '#76D7C4', '#F7DC6F', '#85929E','#B2BABB'],
						  hoverBackgroundColor: ['#5DADE2', '#A569BD ', '#48C9B0','#F4D03F', '#5D6D7E','#99A3A4'],
						  hoverBorderColor: "rgba(234, 236, 244, 1)",
						}],
					  },
					  options: {
						maintainAspectRatio: false,
						tooltips: {
						  backgroundColor: "rgb(255,255,255)",
						  bodyFontColor: "#858796",
						  borderColor: '#dddfeb',
						  borderWidth: 1,
						  xPadding: 15,
						  yPadding: 15,
						  displayColors: false,
						  caretPadding: 10,
						},
						legend: {
						  display: false
						},
						cutoutPercentage: 80,
					  },
					});

	}
			});	
	
	
}
			
function getSavingsChart(){
	
	var month = select.options[select.selectedIndex].value;
	var customernumber = selectcustomer.options[selectcustomer.selectedIndex].value;
sendgetrequest("/api/totalspend", function (apiresponse, errorstate) {
	//var month = select.options[select.selectedIndex].value;
	console.log('total spend');
				if (errorstate == 200) {
					var spending = 0;
					var income = 0;
					for(let i=0;i<apiresponse.split( "\n" ).length;i++){
						if(apiresponse.split( "\n" )[i].split(',')[0]==customernumber){
							if(apiresponse.split( "\n" )[i].split(',')[1]== month){
								if(apiresponse.split( "\n" )[i].split(',')[2]=='Debit'){
									//console.log('total spend' + apiresponse.split( "\n" )[i].split(',')[4]);
									//document.getElementById("totalSpend").innerHTML = '$' + Math.round(apiresponse.split( "\n" )[i].split(',')[4]);
									spending = spending + Math.round(apiresponse.split( "\n" )[i].split(',')[4])
									
								}
							}
						}
					}
					for(let i=0;i<apiresponse.split( "\n" ).length;i++){
						if(apiresponse.split( "\n" )[i].split(',')[0]==customernumber){
							if(apiresponse.split( "\n" )[i].split(',')[1]== month){
								if(apiresponse.split( "\n" )[i].split(',')[2]=='Credit'){
									//console.log('total spend' + apiresponse.split( "\n" )[i].split(',')[4]);
									document.getElementById("totalIncome").innerHTML = '$' + Math.round(apiresponse.split( "\n" )[i].split(',')[4]);
									income = Math.round(apiresponse.split( "\n" )[i].split(',')[4])
									break;
								}
							}
							else{
								
								document.getElementById("totalIncome").innerHTML ='NA';
							}
						}
					}
					document.getElementById("totalIncome").innerHTML = '$' + (income-spending) + '(' + Math.round((((income-spending)/income) * 100 )) + '% of Inc)'
					document.getElementById("totalSpend").innerHTML = '$' + spending + '(' + Math.round(((spending/income) * 100 )) + '% of Inc)'
				
				
				/////////////////////Saving Chart//////////////////////////
				
				var a = [0,0,0,0,0,0,0,0,0,0,0,0];
				var b = [0,0,0,0,0,0,0,0,0,0,0,0];
				var c = [0,0,0,0,0,0,0,0,0,0,0,0];
				var spend = [0,0,0,0,0,0,0,0,0,0,0,0];;
				var inc = [0,0,0,0,0,0,0,0,0,0,0,0];;
				for(let i=0;i<apiresponse.split( "\n" ).length;i++){
					if(apiresponse.split( "\n" )[i].split(',')[1]=='January'){
						if(apiresponse.split( "\n" )[i].split(',')[2]=='Debit'){
							spend[0] = spend[0] + Math.round(apiresponse.split( "\n" )[i].split(',')[4]);
						}
						else if(apiresponse.split( "\n" )[i].split(',')[2]=='Credit'){
							inc[0] = inc[0] + Math.round(apiresponse.split( "\n" )[i].split(',')[4]);
						}
					}
					else if(apiresponse.split( "\n" )[i].split(',')[1]=='February'){
						if(apiresponse.split( "\n" )[i].split(',')[2]=='Debit'){
							spend[1] = spend[1] + Math.round(apiresponse.split( "\n" )[i].split(',')[4]);
						}
						else if(apiresponse.split( "\n" )[i].split(',')[2]=='Credit'){
							inc[1] = inc[1] + Math.round(apiresponse.split( "\n" )[i].split(',')[4]);
						}
					}
					else if(apiresponse.split( "\n" )[i].split(',')[1]=='March'){
						if(apiresponse.split( "\n" )[i].split(',')[2]=='Debit'){
							spend[2] = spend[2] + Math.round(apiresponse.split( "\n" )[i].split(',')[4]);
						}
						else if(apiresponse.split( "\n" )[i].split(',')[2]=='Credit'){
							inc[2] = inc[2] + Math.round(apiresponse.split( "\n" )[i].split(',')[4]);
						}
					}
					else if(apiresponse.split( "\n" )[i].split(',')[1]=='April'){
						if(apiresponse.split( "\n" )[i].split(',')[2]=='Debit'){
							spend[3] = spend[3] + Math.round(apiresponse.split( "\n" )[i].split(',')[4]);
						}
						else if(apiresponse.split( "\n" )[i].split(',')[2]=='Credit'){
							inc[3] = inc[3] + Math.round(apiresponse.split( "\n" )[i].split(',')[4]);
						}
					}
					else if(apiresponse.split( "\n" )[i].split(',')[1]=='May'){
						if(apiresponse.split( "\n" )[i].split(',')[2]=='Debit'){
							spend[4] = spend[4] + Math.round(apiresponse.split( "\n" )[i].split(',')[4]);
						}
						else if(apiresponse.split( "\n" )[i].split(',')[2]=='Credit'){
							inc[4] = inc[4] + Math.round(apiresponse.split( "\n" )[i].split(',')[4]);
						}
					}
					else if(apiresponse.split( "\n" )[i].split(',')[1]=='June'){
						if(apiresponse.split( "\n" )[i].split(',')[2]=='Debit'){
							spend[5] = spend[5] + Math.round(apiresponse.split( "\n" )[i].split(',')[4]);
						}
						else if(apiresponse.split( "\n" )[i].split(',')[2]=='Credit'){
							inc[5] = inc[5] + Math.round(apiresponse.split( "\n" )[i].split(',')[4]);
						}
					}
				}
				
				c[0] = ((inc[0] - spend[0])/21);
				c[1] = ((inc[1] - spend[1])/21);
				c[2] = ((inc[2] - spend[2])/21);
				c[3] = ((inc[3] - spend[3])/21);
				c[4] = ((inc[4] - spend[4])/21);
				c[5] = ((inc[5] - spend[5])/21);
				
				for(let i=0;i<apiresponse.split( "\n" ).length;i++){
					if(apiresponse.split( "\n" )[i].split(',')[0]==customernumber){
						if(apiresponse.split( "\n" )[i].split(',')[1]=='January'){
							if(apiresponse.split( "\n" )[i].split(',')[2]=='Debit'){
								a[0] = Math.round(apiresponse.split( "\n" )[i].split(',')[4]);
							}
							else if(apiresponse.split( "\n" )[i].split(',')[2]=='Credit'){
								b[0] = Math.round(apiresponse.split( "\n" )[i].split(',')[4]);
							}
						}
						else if(apiresponse.split( "\n" )[i].split(',')[1]=='February'){
							if(apiresponse.split( "\n" )[i].split(',')[2]=='Debit'){
								a[1] = Math.round(apiresponse.split( "\n" )[i].split(',')[4]);
							}
							else if(apiresponse.split( "\n" )[i].split(',')[2]=='Credit'){
								b[1] = Math.round(apiresponse.split( "\n" )[i].split(',')[4]);
							}
						}
						else if(apiresponse.split( "\n" )[i].split(',')[1]=='March'){
							if(apiresponse.split( "\n" )[i].split(',')[2]=='Debit'){
								a[2] = Math.round(apiresponse.split( "\n" )[i].split(',')[4]);
							}
							else if(apiresponse.split( "\n" )[i].split(',')[2]=='Credit'){
								b[2] = Math.round(apiresponse.split( "\n" )[i].split(',')[4]);
							}
						}
						else if(apiresponse.split( "\n" )[i].split(',')[1]=='April'){
							if(apiresponse.split( "\n" )[i].split(',')[2]=='Debit'){
								a[3] = Math.round(apiresponse.split( "\n" )[i].split(',')[4]);
							}
							else if(apiresponse.split( "\n" )[i].split(',')[2]=='Credit'){
								b[3] = Math.round(apiresponse.split( "\n" )[i].split(',')[4]);
							}
						}
						else if(apiresponse.split( "\n" )[i].split(',')[1]=='May'){
							if(apiresponse.split( "\n" )[i].split(',')[2]=='Debit'){
								a[4] = Math.round(apiresponse.split( "\n" )[i].split(',')[4]);
							}
							else if(apiresponse.split( "\n" )[i].split(',')[2]=='Credit'){
								b[4] = Math.round(apiresponse.split( "\n" )[i].split(',')[4]);
							}
						}
					}
				}
				var ctx = document.getElementById("mySavingChart");
						var myLineChart = new Chart(ctx, {
						  type: 'line',
						  data: {
							labels: ["Jan", "Feb","Mar","Apr","May","Jun"],
							datasets: [{
							  label: "Your Saving",
							  lineTension: 0.3,
							  //backgroundColor: "#BB8FCE",
							  borderColor: "#BB8FCE",
							  pointRadius: 3,
							  //pointBackgroundColor: "#BB8FCE",
							  pointBorderColor: "#BB8FCE",
							  pointHoverRadius: 3,
							  //pointHoverBackgroundColor: "#BB8FCE",
							  pointHoverBorderColor: "#BB8FCE",
							  pointHitRadius: 10,
							  pointBorderWidth: 2,
							  data: [b[0]-a[0],b[1]-a[1],b[2]-a[2],b[3]-a[3],b[4]-a[4],b[5]-a[5]],
							},
							{
							  label: "Avg Saving",
							  lineTension: 0.3,
							  //backgroundColor: "#85C1E9",
							  borderColor: "#85C1E9",
							  pointRadius: 3,
							  //pointBackgroundColor: "#85C1E9",
							  pointBorderColor: "#85C1E9",
							  pointHoverRadius: 3,
							  //pointHoverBackgroundColor: "#85C1E9",
							  pointHoverBorderColor: "#85C1E9",
							  pointHitRadius: 10,
							  pointBorderWidth: 2,
							  data: c
							}
							],
						  },
						  options: {
							maintainAspectRatio: false,
							layout: {
							  padding: {
								left: 10,
								right: 25,
								top: 25,
								bottom: 0
							  }
							},
							scales: {
							  xAxes: [{
								time: {
								  unit: 'text'
								},
								gridLines: {
								  display: false,
								  drawBorder: false
								},
								ticks: {
								  maxTicksLimit: 7
								}
							  }],
							  yAxes: [{
								ticks: {
								  maxTicksLimit: 5,
								  padding: 10,
								  // Include a dollar sign in the ticks
								  callback: function(value, index, values) {
									return number_format(value) + '$';
								  }
								  
								},
								gridLines: {
								  color: "rgb(234, 236, 244)",
								  zeroLineColor: "rgb(234, 236, 244)",
								  drawBorder: false,
								  borderDash: [2],
								  zeroLineBorderDash: [2]
								}
							  }],
							},
							legend: {
							  display: true
							},
							tooltips: {
							  backgroundColor: "rgb(255,255,255)",
							  bodyFontColor: "#858796",
							  titleMarginBottom: 10,
							  titleFontColor: '#6e707e',
							  titleFontSize: 14,
							  borderColor: '#dddfeb',
							  borderWidth: 1,
							  xPadding: 15,
							  yPadding: 15,
							  displayColors: false,
							  intersect: false,
							  mode: 'index',
							  caretPadding: 10,
							  callbacks: {
								label: function(tooltipItem, chart) {
								  var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
								  return datasetLabel + number_format(tooltipItem.yLabel) + ': $';
								}
							  }
							}
						  }
						});
				
				
				
				
				
				}
	});


}	
	
function getSteps(){
	var month = select.options[select.selectedIndex].value;
	var customernumber = selectcustomer.options[selectcustomer.selectedIndex].value;
	sendgetrequest("/api/steps", function (apiresponse, errorstate) {
		var month = select.options[select.selectedIndex].value;
		var customernumber = selectcustomer.options[selectcustomer.selectedIndex].value;
		//console.log("customernumber " + customernumber);
					if (errorstate == 200) {
						for(let i=0;i<apiresponse.split( "\n" ).length;i++){
							if(apiresponse.split( "\n" )[i].split(',')[0]==customernumber){
								if(apiresponse.split( "\n" )[i].split(',')[1]== month){
									document.getElementById("totalSteps").innerHTML = apiresponse.split( "\n" )[i].split(',')[2] + '(' + (apiresponse.split( "\n" )[i].split(',')[2] - apiresponse.split( "\n" )[i-1].split(',')[2]) + ')';
									break;
								}
								else{
									document.getElementById("totalSteps").innerHTML = 'NA';
									
								}
							}
						}
						
						
						
						var a = [0,0,0,0,0];
						var income = 1;
						for(let i=0;i<apiresponse.split( "\n" ).length;i++){
						if(apiresponse.split( "\n" )[i].split(',')[0]==customernumber){
							if(apiresponse.split( "\n" )[i].split(',')[1]=='January'){
								a[0] = apiresponse.split( "\n" )[i].split(',')[2];
							}
							else if(apiresponse.split( "\n" )[i].split(',')[1]=='February'){
								a[1] = apiresponse.split( "\n" )[i].split(',')[2];
							}
							else if(apiresponse.split( "\n" )[i].split(',')[1]=='March'){
								a[2] = apiresponse.split( "\n" )[i].split(',')[2];
							}
							else if(apiresponse.split( "\n" )[i].split(',')[1]=='April'){
								a[3] = apiresponse.split( "\n" )[i].split(',')[2];
							}
							else if(apiresponse.split( "\n" )[i].split(',')[1]=='May'){
								a[4] = apiresponse.split( "\n" )[i].split(',')[2];
							}
						}

					}
					
						var ctx = document.getElementById("mystepsChart");
						var myLineChart = new Chart(ctx, {
						  type: 'line',
						  data: {
							labels: ["January", "February","March","April","May"],
							datasets: [{
							  label: "Steps",
							  lineTension: 0.3,
							  backgroundColor: "#76D7C4",
							  borderColor: "#76D7C4",
							  pointRadius: 3,
							  //pointBackgroundColor: "#BB8FCE",
							  pointBorderColor: "#76D7C4",
							  pointHoverRadius: 3,
							  //pointHoverBackgroundColor: "#BB8FCE",
							  pointHoverBorderColor: "#76D7C4",
							  pointHitRadius: 10,
							  pointBorderWidth: 2,
							  data: a,
							}],
						  },
						  options: {
							maintainAspectRatio: false,
							layout: {
							  padding: {
								left: 10,
								right: 25,
								top: 25,
								bottom: 0
							  }
							},
							scales: {
							  xAxes: [{
								time: {
								  unit: 'text'
								},
								gridLines: {
								  display: false,
								  drawBorder: false
								},
								ticks: {
								  maxTicksLimit: 7
								}
							  }],
							  yAxes: [{
								ticks: {
								  maxTicksLimit: 5,
								  padding: 10,
								  // Include a dollar sign in the ticks
								  callback: function(value, index, values) {
									return number_format(value);
								  }
								  
								},
								gridLines: {
								  color: "rgb(234, 236, 244)",
								  zeroLineColor: "rgb(234, 236, 244)",
								  drawBorder: false,
								  borderDash: [2],
								  zeroLineBorderDash: [2]
								}
							  }],
							},
							legend: {
							  display: true
							},
							tooltips: {
							  backgroundColor: "rgb(255,255,255)",
							  bodyFontColor: "#858796",
							  titleMarginBottom: 10,
							  titleFontColor: '#6e707e',
							  titleFontSize: 14,
							  borderColor: '#dddfeb',
							  borderWidth: 1,
							  xPadding: 15,
							  yPadding: 15,
							  displayColors: false,
							  intersect: false,
							  mode: 'index',
							  caretPadding: 10,
							  callbacks: {
								label: function(tooltipItem, chart) {
								  var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
								  return datasetLabel + number_format(tooltipItem.yLabel);
								}
							  }
							}
						  }
						});
						
						
						
						
					}
	});

}	
	
			
///change in month
select.addEventListener('change',function(){
	getSpendingByCategory();
	getSavingsChart();
	getSteps();
});


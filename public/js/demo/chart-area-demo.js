// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

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
	
	
var selectmonth = document.getElementById("month");
var selectcustomer = document.getElementById("customer");

function getAvgSpend(){
	
	sendgetrequest("/api/categoryAvgSpend", function (apiresponse, errorstate) {
	var month = selectmonth.options[selectmonth.selectedIndex].value;
	var customernumber = selectcustomer.options[selectcustomer.selectedIndex].value;
	if (errorstate == 200) {
		var b = [0,0,0,0,0,0,0];
		var Avgincome = 1;
		for(let i=0;i<apiresponse.split( "\n" ).length;i++){
			
				if(apiresponse.split( "\n" )[i].split(',')[1]==month){
						if(apiresponse.split( "\n" )[i].split(',')[0]=='Food & Dining' && apiresponse.split( "\n" )[i].split(',')[4].trim()=='Cat1'){
							b[0] = apiresponse.split( "\n" )[i].split(',')[3];
						}
						else if(apiresponse.split( "\n" )[i].split(',')[0]=='Food & Dining' && apiresponse.split( "\n" )[i].split(',')[4].trim()=='Cat2'){
							b[1] = apiresponse.split( "\n" )[i].split(',')[3];
						}
						else if(apiresponse.split( "\n" )[i].split(',')[0]=='Grocery'){
							b[2] = apiresponse.split( "\n" )[i].split(',')[3];
							
						}
						else if(apiresponse.split( "\n" )[i].split(',')[0]=='Health & Fitness'){
							b[3] = apiresponse.split( "\n" )[i].split(',')[3];
								
						}
						else if(apiresponse.split( "\n" )[i].split(',')[0]=='Mortgage'){
							b[4] = apiresponse.split( "\n" )[i].split(',')[3];
							
						}
						else if(apiresponse.split( "\n" )[i].split(',')[0]=='Entertainment'){
							b[5] = apiresponse.split( "\n" )[i].split(',')[3];
							//console.log("Entertainment " + apiresponse.split( "\n" )[i].split(',')[5]);
						}
						else if(apiresponse.split( "\n" )[i].split(',')[0]=='Bills & Utilities'){
							b[6] = apiresponse.split( "\n" )[i].split(',')[3];
							
						}
						else if(apiresponse.split( "\n" )[i].split(',')[0]=='Income'){
							Avgincome = apiresponse.split( "\n" )[i].split(',')[3];									
						}
					}
					
				

			}
		}
		
		b[0] = (b[0]/Avgincome) * 100 ;
		b[1] = (b[1]/Avgincome) * 100 ;
		b[2] = (b[2]/Avgincome) * 100 ;
		b[3] = (b[3]/Avgincome) * 100 ;
		b[4] = (b[4]/Avgincome) * 100 ;
		b[5] = (b[5]/Avgincome) * 100 ;
		b[6] = (b[6]/Avgincome) * 100 ;
	sendgetrequest("/api/transactions", function (apiresponse, errorstate) {
		
					if (errorstate == 200) {
						//console.log("apiresponse " + apiresponse.split( "\n" ).length);	
						var a = [0,0,0,0,0,0,0];
						var income = 1;
						for(let i=0;i<apiresponse.split( "\n" ).length;i++){
						if(apiresponse.split( "\n" )[i].split(',')[0]==customernumber){
							if(apiresponse.split( "\n" )[i].split(',')[1]==month){
								if(apiresponse.split( "\n" )[i].split(',')[2]=='Debit'){
									
									if(apiresponse.split( "\n" )[i].split(',')[4]=='Food & Dining'){
										if(apiresponse.split( "\n" )[i].split(',')[6].trim()=='Cat1'){
											a[0] = apiresponse.split( "\n" )[i].split(',')[5];
											//console.log("Entertainment1 " + apiresponse.split( "\n" )[i].split(',')[5]);
										}
										else{
											a[1] = apiresponse.split( "\n" )[i].split(',')[5];
											//console.log("Entertainment2 " + apiresponse.split( "\n" )[i].split(',')[5]);
										}										
									}
									else if(apiresponse.split( "\n" )[i].split(',')[4]=='Grocery'){
										a[2] = apiresponse.split( "\n" )[i].split(',')[5];
									}
									else if(apiresponse.split( "\n" )[i].split(',')[4]=='Health & Fitness'){
										a[3] = apiresponse.split( "\n" )[i].split(',')[5];
									}
									else if(apiresponse.split( "\n" )[i].split(',')[4]=='Mortgage'){
										a[4] = apiresponse.split( "\n" )[i].split(',')[5];
										
									}
									else if(apiresponse.split( "\n" )[i].split(',')[4]=='Entertainment'){
										a[5] = apiresponse.split( "\n" )[i].split(',')[5];
										//console.log("Entertainment " + apiresponse.split( "\n" )[i].split(',')[5]);
									}
									else if(apiresponse.split( "\n" )[i].split(',')[4]=='Bills & Utilities'){
										a[6] = apiresponse.split( "\n" )[i].split(',')[5];
										
									}
								}
								else if(apiresponse.split( "\n" )[i].split(',')[2]=='Credit'){
									if(apiresponse.split( "\n" )[i].split(',')[4]=='Income'){
										income = apiresponse.split( "\n" )[i].split(',')[5];
									}
								}
							}
							
						}

					}
					//console.log('a[0] ' + a[0]);
					//console.log('income ' + income);
					a[0] = (a[0]/income) * 100 ;
					a[1] = (a[1]/income) * 100 ;
					a[2] = (a[2]/income) * 100 ;
					a[3] = (a[3]/income) * 100 ;
					a[4] = (a[4]/income) * 100 ;
					a[5] = (a[5]/income) * 100 ;
					a[6] = (a[6]/income) * 100 ;
					
					var blueRewardPoint1 = 0;
					var blueRewardPoint2 = 0;
					var blueRewardPoint3 = 0;
					var previousPoints = 0
					///////////////////////////////////////reward point calculation////////////////
					sendgetrequest("/api/totalspend", function (apiresponse, errorstate) {
						//var month = select.options[select.selectedIndex].value;
						var customernumber = selectcustomer.options[selectcustomer.selectedIndex].value;
						
						var a1 = [0,0,0,0,0,0,0,0,0,0,0,0];
						var b1 = [0,0,0,0,0,0,0,0,0,0,0,0];
						var c1 = [0,0,0,0,0,0,0,0,0,0,0,0];
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
						
						c1[0] = ((inc[0] - spend[0])/21);
						c1[1] = ((inc[1] - spend[1])/21);
						c1[2] = ((inc[2] - spend[2])/21);
						c1[3] = ((inc[3] - spend[3])/21);
						c1[4] = ((inc[4] - spend[4])/21);
						c1[5] = ((inc[5] - spend[5])/21);
						
						for(let i=0;i<apiresponse.split( "\n" ).length;i++){
							if(apiresponse.split( "\n" )[i].split(',')[0]==customernumber){
								if(apiresponse.split( "\n" )[i].split(',')[1]=='January'){
									if(apiresponse.split( "\n" )[i].split(',')[2]=='Debit'){
										a1[0] = Math.round(apiresponse.split( "\n" )[i].split(',')[4]);
									}
									else if(apiresponse.split( "\n" )[i].split(',')[2]=='Credit'){
										b1[0] = Math.round(apiresponse.split( "\n" )[i].split(',')[4]);
									}
								}
								else if(apiresponse.split( "\n" )[i].split(',')[1]=='February'){
									if(apiresponse.split( "\n" )[i].split(',')[2]=='Debit'){
										a1[1] = Math.round(apiresponse.split( "\n" )[i].split(',')[4]);
									}
									else if(apiresponse.split( "\n" )[i].split(',')[2]=='Credit'){
										b1[1] = Math.round(apiresponse.split( "\n" )[i].split(',')[4]);
									}
								}
								else if(apiresponse.split( "\n" )[i].split(',')[1]=='March'){
									if(apiresponse.split( "\n" )[i].split(',')[2]=='Debit'){
										a1[2] = Math.round(apiresponse.split( "\n" )[i].split(',')[4]);
									}
									else if(apiresponse.split( "\n" )[i].split(',')[2]=='Credit'){
										b1[2] = Math.round(apiresponse.split( "\n" )[i].split(',')[4]);
									}
								}
								else if(apiresponse.split( "\n" )[i].split(',')[1]=='April'){
									if(apiresponse.split( "\n" )[i].split(',')[2]=='Debit'){
										a1[3] = Math.round(apiresponse.split( "\n" )[i].split(',')[4]);
									}
									else if(apiresponse.split( "\n" )[i].split(',')[2]=='Credit'){
										b1[3] = Math.round(apiresponse.split( "\n" )[i].split(',')[4]);
									}
								}
								else if(apiresponse.split( "\n" )[i].split(',')[1]=='May'){
									if(apiresponse.split( "\n" )[i].split(',')[2]=='Debit'){
										a1[4] = Math.round(apiresponse.split( "\n" )[i].split(',')[4]);
									}
									else if(apiresponse.split( "\n" )[i].split(',')[2]=='Credit'){
										b1[4] = Math.round(apiresponse.split( "\n" )[i].split(',')[4]);
									}
								}
							}
						}
					
					
						sendgetrequest("/api/steps", function (apiresponse, errorstate) {
							var month = selectmonth.options[selectmonth.selectedIndex].value;
							var customernumber = selectcustomer.options[selectcustomer.selectedIndex].value;
							var stepsDiff = 0;
							//console.log("customernumber " + customernumber);
										if (errorstate == 200) {
											for(let i=0;i<apiresponse.split( "\n" ).length;i++){
												if(apiresponse.split( "\n" )[i].split(',')[0]==customernumber){
													if(apiresponse.split( "\n" )[i].split(',')[1]== month){
														stepsDiff = (apiresponse.split( "\n" )[i].split(',')[2] - apiresponse.split( "\n" )[i-1].split(',')[2]);
														break;
													}
													else{													
													}
												}
											}
										}
										
										if((stepsDiff/100) > 0){
											blueRewardPoint1 = (blueRewardPoint1 + (stepsDiff/100));
										}
										
										if((a[0] > b[0]) && (a[1] < b[1])){
											blueRewardPoint2 = (blueRewardPoint2 + 10);
										}
										
										if(month == 'January'){
											if((b1[0]-a1[0])>c1[0]){
												blueRewardPoint3 = (blueRewardPoint3 + 10);
											}
										}
										else if(month == 'February'){
											if((b1[1]-a1[1])>c1[1]){
												blueRewardPoint3 = (blueRewardPoint3 + 10);
											}
										}
										else if(month == 'March'){
											if((b1[2]-a1[2])>c1[2]){
												blueRewardPoint3 = (blueRewardPoint3 + 10);
											}
										}
										else if(month == 'April'){
											if((b1[3]-a1[3])>c1[3]){
												blueRewardPoint3 = (blueRewardPoint3 + 10);
											}
										}
										else if(month == 'May'){
											if((b1[4]-a1[4])>c1[4]){
												blueRewardPoint3 = (blueRewardPoint3 + 10);
											}
										}
										else if(month == 'June'){
											if((b1[5]-a1[5])>c1[5]){
												blueRewardPoint3 = (blueRewardPoint3 + 10);
											}
										}
										else if(month == 'July'){
											if((b1[6]-a1[6])>c1[6]){
												blueRewardPoint3 = (blueRewardPoint3 + 10);
											}
										}
										else if(month == 'August'){
											if((b1[7]-a1[7])>c1[7]){
												blueRewardPoint3 = (blueRewardPoint3 + 10);
											}
										}
										else if(month == 'Spetember'){
											if((b1[8]-a1[8])>c1[8]){
												blueRewardPoint3 = (blueRewardPoint3 + 10);
											}
										}
										else if(month == 'October'){
											if((b1[9]-a1[9])>c1[9]){
												blueRewardPoint3 = (blueRewardPoint3 + 10);
											}
										}
										else if(month == 'November'){
											if((b1[10]-a1[10])>c1[10]){
												blueRewardPoint3 = (blueRewardPoint3 + 10);
											}
										}
										else if(month == 'December'){
											if((b1[11]-a1[11])>c1[11]){
												blueRewardPoint3 = (blueRewardPoint3 + 10);
											}
										}
										
										//console.log("stepsDiff " + a[1] + " "  + b[1]);
										//console.log("blueRewardPoint " + blueRewardPoint);
										if(document.getElementById("bluerewardpoint").innerHTML != ''){
											previousPoints = parseInt(document.getElementById("bluerewardpoint").innerHTML);
										}
										//console.log("previousPoints " + previousPoints);
										document.getElementById("bluerewardpoint").innerHTML = (previousPoints + blueRewardPoint1 + blueRewardPoint2 + blueRewardPoint3) + '(' + previousPoints + '+' + blueRewardPoint1 + '+' + blueRewardPoint2 + '+' + blueRewardPoint3 + ')';
						});
					});	
					////////////////////////////////////////

						var ctx = document.getElementById("myAreaChart");
						var myLineChart = new Chart(ctx, {
						  type: 'bar',
						  data: {
							labels: ["Food & Dining - Cat1","Food & Dining - Cat2", "Grocery","Health & Fitness","Mortgage","Entertainment","Bills & Utilities"],
							datasets: [{
							  label: "Spending",
							  lineTension: 0.3,
							  backgroundColor: "#BB8FCE",
							  borderColor: "#BB8FCE",
							  pointRadius: 3,
							  //pointBackgroundColor: "rgba(78, 115, 223, 1)",
							  pointBorderColor: "#BB8FCE",
							  pointHoverRadius: 3,
							  //pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
							  pointHoverBorderColor: "#BB8FCE",
							  pointHitRadius: 10,
							  pointBorderWidth: 2,
							  data: a,
							},
							{
							  label: "Avg Spend",
							  lineTension: 0.3,
							  backgroundColor: "#85C1E9)",
							  borderColor: "#85C1E9",
							  pointRadius: 3,
							  //pointBackgroundColor: "rgba(100, 115, 200, 1)",
							  pointBorderColor: "#85C1E9",
							  pointHoverRadius: 3,
							  //pointHoverBackgroundColor: "rgba(100, 115, 200, 1)",
							  pointHoverBorderColor: "#85C1E9",
							  pointHitRadius: 10,
							  pointBorderWidth: 2,
							  data: b
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
								  unit: 'date'
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
									return number_format(value) + '%';
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
								  return datasetLabel + number_format(tooltipItem.yLabel) + ': %';
								}
							  }
							}
						  }
						});

						
					}
				});	
});	
	
	
}

function getResRating(){
	var month = selectmonth.options[selectmonth.selectedIndex].value;
	var customernumber = selectcustomer.options[selectcustomer.selectedIndex].value;
	var restaurants = [];
	var rating = [];
	sendgetrequest("/api/transactionsDetail", function (apiresponse, errorstate) {
		
		for(let i=0;i<apiresponse.split( "\n" ).length;i++){
			if(apiresponse.split( "\n" )[i].split(',')[0]==customernumber){
				if(apiresponse.split( "\n" )[i].split(',')[2]==month){
					if(apiresponse.split( "\n" )[i].split(',')[6]=='Food & Dining'){
						if(restaurants.indexOf(apiresponse.split( "\n" )[i].split(',')[5]) == -1){
							restaurants.push(apiresponse.split( "\n" )[i].split(',')[5]);
						}
						else{
							
						}
					}
				}
			}
		}
		
		sendgetrequest("/api/ratings", function (apiresponse, errorstate) {
			for(let i=0;i<restaurants.length;i++){
				if(apiresponse.indexOf(restaurants[i])> -1){
					rating.push(apiresponse.split(restaurants[i])[1].split( "," )[1].split( "\n" )[0]);
				}
				else{
					rating.push('NA');
				}
			}
			
			var table = document.getElementById('dataTable').getElementsByTagName('tbody')[0]
			if(table.rows.length > 0){
				for(let i=table.rows.length-1;i>=0;i--){
					table.deleteRow(i);
				}
			}
			for(let i=0;i<restaurants.length;i++){
				  row = table.insertRow(i),
				  cell1 = row.insertCell(0),
				  cell2 = row.insertCell(1);
				  cell1.innerHTML = restaurants[i];
				  cell2.innerHTML = rating[i];
			}
		});
	});
}


function getSpendingByCategory(){
	var month = selectmonth.options[selectmonth.selectedIndex].value;
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
	
	var month = selectmonth.options[selectmonth.selectedIndex].value;
	var customernumber = selectcustomer.options[selectcustomer.selectedIndex].value;
sendgetrequest("/api/totalspend", function (apiresponse, errorstate) {
	//var month = select.options[select.selectedIndex].value;
	//console.log('total spend');
				if (errorstate == 200) {
					var spending = 0;
					var income = 0;
					for(let i=0;i<apiresponse.split( "\n" ).length;i++){
						if(apiresponse.split( "\n" )[i].split(',')[0]==customernumber){
							if(apiresponse.split( "\n" )[i].split(',')[1]== month){
								if(apiresponse.split( "\n" )[i].split(',')[2]=='Debit'){
									//console.log('total spend' + apiresponse.split( "\n" )[i].split(',')[4]);
									//document.getElementById("totalSpend").innerHTML = '£' + Math.round(apiresponse.split( "\n" )[i].split(',')[4]);
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
									document.getElementById("totalIncome").innerHTML = '£' + Math.round(apiresponse.split( "\n" )[i].split(',')[4]);
									income = Math.round(apiresponse.split( "\n" )[i].split(',')[4])
									break;
								}
							}
							else{
								
								document.getElementById("totalIncome").innerHTML ='NA';
							}
						}
					}
					document.getElementById("totalIncome").innerHTML = '£' + (income-spending) + '(' + Math.round((((income-spending)/income) * 100 )) + '% of Inc)'
					document.getElementById("totalSpend").innerHTML = '£' + spending + '(' + Math.round(((spending/income) * 100 )) + '% of Inc)'
				
				
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
									return number_format(value) + '£';
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
								  return datasetLabel + number_format(tooltipItem.yLabel) + ': £';
								}
							  }
							}
						  }
						});
				
				
				
				
				
				}
	});


}	
	
function getSteps(){
	var month = selectmonth.options[selectmonth.selectedIndex].value;
	var customernumber = selectcustomer.options[selectcustomer.selectedIndex].value;
	sendgetrequest("/api/steps", function (apiresponse, errorstate) {
		//var month = select.options[select.selectedIndex].value;
		//var customernumber = selectcustomer.options[selectcustomer.selectedIndex].value;
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
	

getAvgSpend();
getResRating();
getSpendingByCategory();
getSavingsChart();
getSteps()

selectmonth.addEventListener('change',function(){

	getAvgSpend();
	getResRating();
	getSpendingByCategory();
	getSavingsChart();
	getSteps()
	
	
});

selectcustomer.addEventListener('change',function(){

	getAvgSpend();
	getResRating();
	getSpendingByCategory();
	getSavingsChart();
	getSteps()
	
	
});
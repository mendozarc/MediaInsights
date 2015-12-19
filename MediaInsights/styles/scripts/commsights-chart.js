google.load("visualization", "1.1", { packages: ["corechart", "bar"] });
google.setOnLoadCallback(CommSights.loadChart);

var setOptions = function (chart) {
	var options = {};

	switch (chart) {
		case "1":
		case "2":
			options.isStacked = "percent";
			break;
		case "5":
		case "6":
			options.isStacked = true;
			break;
		case "8":
			options.pieHole = 0.4;
			break;
		case "11":
			options.pointShape = 'circle';
			options.pointSize = 5;
			break;
	}

	options.chartArea = { width: "70%", height: "65%" };
	options.titleTextStyle = { color: "#555", fontName: "Open Sans", bold: true };
	options.width = 780;
	options.height = 300;
	options.bar = { groupWidth: "75%" };
	options.legend = { alignment: "center", textStyle: { fontName: "Open Sans", fontSize: 11 } };
	options.fontName = "Open Sans";
	options.fontSize = 12;

	return options;
}

CommSights.loadChart = function (data, args, container) {
	//var dt = google.visualization.arrayToDataTable(data);
	var dt = new google.visualization.DataTable(data);

	if (args.chartType !== 'undefined') {
		var chart = null;
		switch(args.chartType) {
			case "1":
				chart = new google.visualization.ColumnChart(container);
				break;
			case "2":
				chart = new google.visualization.BarChart(container);
				break;
			case "3":
				chart = new google.visualization.PieChart(container);
				break;
			case "4":
				chart = new google.visualization.LineChart(container);
				break;
			case "5":
				chart = new google.visualization.ComboChart(container);
				break;
		}

		var options = setOptions(args.chart);
		options.title = args.title;
		google.visualization.events.addListener(chart, 'ready', function () {
			args.elementStoreImage.attr('data-image', chart.getImageURI());
		});

		chart.draw(dt, options);
	}
}
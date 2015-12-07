google.load("visualization", "1.1", { packages: ["corechart", "bar"] });
google.setOnLoadCallback(CommSights.loadChart);

var setOptions = function (chart) {
	var options = {};

	switch (chart) {
		case "2":
		case "5":
			options.isStacked = true;
			break;
		case "3":
		case "6":
			options.isStacked = "percent";
			break;
	}

	options.chartArea = { width: "60%", height: "70%" };
	options.titleTextStyle = { color: "#555", fontName: "Open Sans", bold: true };
	options.width = 500;
	options.height = 300;
	options.bar = { groupWidth: "75%" };
	options.legend = { alignment: "center", textStyle: { fontName: "Open Sans", fontSize: 11 } };
	options.fontName = "Open Sans";
	options.fontSize = 12;

	return options;
}

CommSights.loadChart = function (data, args, container) {
	var dt = google.visualization.arrayToDataTable(data);

	if (args.chartType !== 'undefined') {
		var chart = null;
		switch(args.chartType) {
			case "1":
				chart = new google.visualization.ColumnChart(container);
				break;
			case "2":
				chart = new google.visualization.BarChart(container);
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
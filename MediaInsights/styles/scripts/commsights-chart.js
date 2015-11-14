
var stackedColumn = {
	isStacked: true
};

var percentStackedColumn = {
	isStacked: "percent"
};

CommSights.loadChart = function (data, args, container) {
	google.load("visualization", "1", { packages: ["corechart", "bar"] });
	google.setOnLoadCallback(drawChart());

	function drawChart() {
		var dt = google.visualization.arrayToDataTable(data);

		//var view = new google.visualization.DataView(dt);
		//view.setColumns([0, 1,
		//				 {
		//				 	calc: "stringify",
		//				 	sourceColumn: 1,
		//				 	type: "string",
		//				 	role: "annotation"
		//				 },
		//				 2]);
		//var options = {
		//	chartArea: {  width: "60%", height: "70%" },
		//	title: args.title,
		//	titleTextStyle: { color: "#555", fontName: "Open Sans", bold: true },
		//	width: 500, height: 300,
		//	bar: { groupWidth: "75%" },
		//	legend: { alignment: "center", textStyle: { fontName: "Open Sans", fontSize: 11 } },
		//	isStacked: true,
		//	fontName: "Open Sans", fontSize: 12
		//};

		var options = stackedColumn;
		if (args.chartType == 1) { options = percentStackedColumn; }

		options.chartArea = { width: "60%", height: "70%" };
		options.title = args.title;
		options.titleTextStyle = { color: "#555", fontName: "Open Sans", bold: true };
		options.width = 500;
		options.height = 300;
		options.bar = { groupWidth: "75%" };
		options.legend = { alignment: "center", textStyle: { fontName: "Open Sans", fontSize: 11 } };
		options.fontName = "Open Sans";
		options.fontSize = 12;

		if (args.chartType !== 'undefined') {
			var chart = new google.visualization.ColumnChart(container);
			chart.draw(dt, options);
		}
	}
}
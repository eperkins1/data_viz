// Adapted from tutorial at https://bl.ocks.org/mbostock/3885304 with plenty of additions and alterations :)

var margin = {top: 20, right: 20, bottom: 30, left: 50}
	width = 1000 - margin.left - margin.right
	height = 500 - margin.top - margin.bottom;

var time = false;

var x = d3.scale.ordinal()
	.rangeRoundBands([0, width], .15);

var y = d3.scale.linear()
	.range([height, 0]);

var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom");

var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left");

var svg = d3.select("body").append("svg")
		.attr("width", width + margin.left+ margin.right + 30)
		.attr("height", height + margin.top + margin.bottom + 30)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function switchMeasures() {
	if(time) {
		sleeptimes();
		time = false;
	} else {
		sleepqualities();
		time = true;
	}
};

sleeptimes();

function sleeptimes() {
	d3.selectAll(".bar").remove();
	d3.selectAll(".axis").remove();
	d3.tsv("sleeptime_3cols.tsv", type, function(error, data) {
		if (error) throw error;

		x.domain(data.map(function(d) {return d.Date;}));
		y.domain([d3.min(data, function(d) {return d.Sleepytime;}) - 1, d3.max(data, function(d) {return d.Sleepytime;}) + 0.5]);

		svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + (height + 1) + ")")
				.call(xAxis)
			.append("text")
				.attr("x", width / 2 - 5)
				.attr("y", 40)
				.style("text-anchor", "end")
				.attr("font-size", 20)
				.text("Date");

		svg.append("g")
				.attr("class", "y axis")
				.call(yAxis)
			.append("text")
				.attr("transform", "rotate(-90)")
				.attr("x", 40 - (height / 2))
				.attr("y", -35)
				.style("text-anchor", "end")
				.attr("font-size", 20)
				.text("Hours");

		svg.selectAll(".bar")
				.data(data)
			.enter().append("rect")
				.attr("class", "bar")
				.style("fill", "red")
				.attr("x", function(d) {return x(d.Date);})
				.attr("width", x.rangeBand())
				.attr("y", function(d) {return y(d.Sleepytime);})
				.attr("height", function(d) {return height - y(d.Sleepytime);})
			.on("mouseover", toBlue)
			.on("click", toRed);

	});
}

function sleepqualities() {
	d3.selectAll(".axis").remove();
	d3.selectAll(".bar").remove();
	d3.tsv("sleeptime_3cols.tsv", type, function(error, data) {
		if (error) throw error;

		x.domain(data.map(function(d) {return d.Date;}));
		y.domain([d3.min(data, function(d) {return d.Quality;}) - 1, d3.max(data, function(d) {return d.Quality;}) + 0.5]);

		svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + (height + 1) + ")")
				.call(xAxis)
			.append("text")
				.attr("x", width / 2 - 5)
				.attr("y", 40)
				.style("text-anchor", "end")
				.attr("font-size", 20)
				.text("Date");

		svg.append("g")
				.attr("class", "y axis")
				.call(yAxis)
			.append("text")
				.attr("transform", "rotate(-90)")
				.attr("x", 40 - (height / 2))
				.attr("y", -35)
				.style("text-anchor", "end")
				.attr("font-size", 20)
				.text("Quality");

		svg.selectAll(".bar")
				.data(data)
			.enter().append("rect")
				.attr("class", "bar")
				.style("fill", "red")
				.attr("x", function(d) {return x(d.Date);})
				.attr("width", x.rangeBand())
				.attr("y", function(d) {return y(d.Quality);})
				.attr("height", function(d) {return height - y(d.Quality);})
			.on("mouseover", toBlue)
			.on("click", toRed);

	});
}

//Took a while to get this to work, and while admittedly lame, I tried and failed too many other things so I must submit what I've got.
function toBlue() {
    var bar = d3.select(this);
   	bar.style("fill", "blue");
}

function toRed() {
	var bar = d3.select(this);
	bar.style("fill", "red");
}

function type(d) {
	d.Sleepytime = +d.Sleepytime;
	d.Quality = +d.Quality;
	return d;
}


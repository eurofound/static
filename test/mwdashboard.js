const data = {
	labels: ['2013', '2014', '2015', '2016', '2017', '2018', '2019'],
	datasets: [
		{
			label: 'Austria',
			data: [1339, 1348, 1352, 1354, 1364, 1424, 1494],
			borderColor: 'rgba(255, 99, 132, 1)',
			fill: false
		},
		{
			label: 'Belgium',
			data: [1503, 1510, 1517, 1524, 1531, 1593, 1619],
			borderColor: 'rgba(54, 162, 235, 1)',
			fill: false
		},
		{
			label: 'Bulgaria',
			data: [205, 208, 214, 223, 235, 261, 286],
			borderColor: 'rgba(255, 206, 86, 1)',
			fill: false
		},
		// Add more datasets for other countries...
	]
};

const options = {
	scales: {
		xAxes: [{
			scaleLabel: {
				display: true,
				labelString: 'Year'
			}
		}],
		yAxes: [{
			scaleLabel: {
				display: true,
				labelString: 'Minimum Wage Rate'
			}
		}]
	},
	plugins: {
		datalabels: {
			display: false
		},
		colorschemes: {
			scheme: 'brewer.Paired12'
		}
	}
};

		const chartElement = document.getElementById('chart');
		const chart = new Chart(chartElement, {
			type: 'bar',
			data: data,
			options: options
		});

		const lineChartButton = document.getElementById('line-chart-button');
lineChartButton.addEventListener('click', () => {
chart.config.type = 'line';
chart.update();
});
const barChartButton = document.getElementById('bar-chart-button');
	barChartButton.addEventListener('click', () => {
		chart.config.type = 'bar';
		chart.update();
	});

	const grossButton = document.getElementById('gross-button');
	grossButton.addEventListener('click', () => {
		const grossData = [1600, 1693, 301, 606, 970, 568, 1659, 600, 1595, 1598, 1711, 784, 564, 1660, 1285, 630, 600, 2199, 948, 1677, 710, 876, 616, 780, 1086, 1058, 1960];
		chart.config.data.datasets[0].data = grossData;
		chart.update();
	});

	const netButton = document.getElementById('net-button');
	netButton.addEventListener('click', () => {
		const netData = [1500, 1593, 261, 506, 870, 468, 1559, 500, 1495, 1498, 1511, 684, 464, 1560, 1085, 430, 400, 1999, 748, 1577, 510, 676, 416, 580, 886, 858, 1760];
		chart.config.data.datasets[0].data = netData;
		chart.update();
	});

	const downloadCsvButton = document.getElementById('download-csv-button');
	downloadCsvButton.addEventListener('click', () => {
		const csvContent = 'data:text/csv;charset=utf-8,' + data.labels.join(',') + '\n' + chart.config.data.datasets[0].data.join(',');
		const encodedUri = encodeURI(csvContent);
		const link = document.createElement('a');
		link.setAttribute('href', encodedUri);
		link.setAttribute('download', 'minimum-wage-rates.csv');
		document.body.appendChild(link);
		link.click();
	});

	const downloadImageButton = document.getElementById('download-image-button');
	downloadImageButton.addEventListener('click', () => {
		const canvas = chartElement;
		const dataUrl = canvas.toDataURL();
		const link = document.createElement('a');
		link.setAttribute('href', dataUrl);
		link.setAttribute('download', 'minimum-wage-rates.png');
		document.body.appendChild(link);
		link.click();
	});

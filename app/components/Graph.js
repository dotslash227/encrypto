// Used to display graph (single, multiple) on Home Screen.
// Idea is to reserve the use of older data set, so that minimal change is required on Home (also less config on Screens) (Also, less work. Lol.)

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, processColor
} from 'react-native';
import update from 'immutability-helper';

import {LineChart} from 'react-native-charts-wrapper';

class LineChartComp extends React.Component {

	/*
		Props:
		currencies = [{ data, meta }, ...]
	*/

  constructor() {
    super();

    this.state = {
      data: {},
      legend: {
        enabled: true,
        textColor: processColor('blue'),
        textSize: 12,
        position: 'BELOW_CHART_RIGHT',
        form: 'SQUARE',
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        formToTextSpace: 5,
        wordWrapEnabled: true,
        maxSizePercent: 0.5,
        custom: {
          colors: [processColor('red'), processColor('blue'), processColor('green')],
          labels: ['Currency X', 'Currency Y']
        }
      },
      marker: {
        enabled: true,
        digits: 2,
        backgroundTint: processColor('teal'),
	      markerColor: processColor('#F0C0FF8C'),
        textColor: processColor('white'),
      }
    };
  }

  componentWillMount() {
	console.log("Graph Init");
	const { currencies } = this.props;
	console.log({currencies});
  }

  componentDidMount() {

	const { currencies } = this.props;
	let dataSets = [];
	let xValues = [];
	const colors = ["red", "blue", "green"];
	
	if(currencies.length > 0) {
		var data = currencies[0].data;
		data.forEach((d, i) => {
			xValues.push((i + 1).toString());
		});
	}

	currencies.forEach((c, index) => {
		dataSets.push({
			values: c.data,
			label: c.meta.exchange,
			config: {
			  lineWidth: 2,
			  drawCircles: false,
			  highlightColor: processColor(colors[index]),
			  color: processColor(colors[index]),
			  drawFilled: true,
			  fillColor: processColor(colors[index]),
			  fillAlpha: 60,
				  valueTextSize: 15,
			  valueFormatter: "##.000",
			  dashedLine: {
				lineLength: 20,
				spaceLength: 20
			  }
			}
		  });
	});

    this.setState(
      update(this.state, {
        data: {
          $set: {
            dataSets: dataSets,
          }
        },
        xAxis: {
          $set: {
            fontFamily:"HelveticaNeue-Medium",
            fontWeight:"bold",
            fontStyle:"italic",
            valueFormatter: xValues
          }
        }
      })
    );
  }

  handleSelect(event) {
    let entry = event.nativeEvent
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null})
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
    }

    console.log(event.nativeEvent)
  }

  render() {
    return (
        <View style={styles.container}>
          <LineChart
            style={styles.chart}
            data={this.state.data}
            chartDescription={{text: ''}}
            legend={this.state.legend}
            marker={this.state.marker}
            xAxis={this.state.xAxis}
            drawGridBackground={false}
            borderColor={processColor('teal')}
            borderWidth={1}
            drawBorders={true}

            touchEnabled={true}
            dragEnabled={true}
            scaleEnabled={true}
            scaleXEnabled={true}
            scaleYEnabled={true}
            pinchZoom={true}
            doubleTapToZoomEnabled={true}

            dragDecelerationEnabled={true}
            dragDecelerationFrictionCoef={0.99}

            keepPositionOnRotation={false}
            onSelect={this.handleSelect.bind(this)}
            onChange={(event) => console.log(event.nativeEvent)}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
	backgroundColor: '#FFF',
	height: 250,
	paddingTop: 20
  },
  chart: {
    flex: 1
  }
});

export default LineChartComp;
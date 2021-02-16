import React, { Component } from 'react';
import $ from 'jquery';

export class Meter extends Component {
    static displayName = Meter.name;

    constructor(props) {
        super(props);
        if (!props.location.propsSearch) this.props.history.push('/');
        const homeId = props.location.propsSearch.homeId;
        this.state = { homeId: homeId, lodingMeterReadings: true, meterReadings: [], meterValue: 0 };

        this.onChangeMeterValue = this.onChangeMeterValue.bind(this);
        this.onMeterValueSubmit = this.onMeterValueSubmit.bind(this);
    }

    async componentDidMount() {
        await this.loadData(this.state.homeId);
    }
    render() {
        let contentMeterReadings = this.state.lodingMeterReadings ? <p> Загрузка данных... </p> : Meter.renderTableMeterReadings(this.state.meterReadings);
        return (
            <div>
                <form onSubmit={this.onMeterValueSubmit}>
                    <h3>Внесение показания счётчика</h3>
                    <p>
                        <input type="number" min="1" step="1" onChange={this.onChangeMeterValue} />
                        <input type="submit" text="Передать показания" />
                    </p>
                </form>
                { contentMeterReadings}
            </div>
        );
    }

    static renderTableMeterReadings(meterReadings) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Дата показания</th>
                        <th>Значение</th>
                    </tr>
                </thead>
                <tbody>
                    {meterReadings.map(m =>
                        <tr key={m.id}>
                            <td>{m.readingDate}</td>
                            <td>{m.value}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    async onMeterValueSubmit(e) {
        e.preventDefault();

        this.setState({ lodingMeterReadings: true });
        await $.ajax({
            url: "api/MeterReading/ByHome",
            type: "POST",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify({ homeId: this.state.homeId, value: this.state.meterValue }),
            success: async function () {
                await this.loadData(this.state.homeId);
            }.bind(this)
        });
        
    }

    onChangeMeterValue(e) {
        let val = e.target.value;
        this.setState({ meterValue: val });
    }

    async loadData(id) {
        const response = await $.ajax({
            url: "api/MeterReading",
            type: "GET",
            data: { homeId: id },
        });
        this.setState({ meterReadings: response === undefined ? [] : response, lodingMeterReadings: false });
    }
}
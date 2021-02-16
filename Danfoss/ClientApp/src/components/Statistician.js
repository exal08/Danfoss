import React, { Component } from 'react';
import $ from 'jquery';

export class Statistician extends Component {
    static displayName = Statistician.name;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            homeMaxValue: {},
            homeMinValue: {}
        };
    }

    async componentDidMount() {
        await this.loadData();
    }

    render() {
        let content = this.state.loading ? <p>Загрузка...</p> : this.renderData();
        return (
            <div>
                { content}
            </div>
        );
    }
    renderData() {
        return (
            <div>
                <h3>Дом который потребил больше всего воды</h3>
                <p>
                    <input value={this.state.homeMaxValue.address} type="lable" />
                </p>

                <h3>Дом который потребил меньше всего воды</h3>
                <p>
                    <input value={this.state.homeMinValue.address} type="lable" />
                </p>
            </div>
        );
    }

    async loadData() {
        const responseMax = await $.ajax({
            url: "api/Home/GetMaxValueHome",
            type: "GET"
        });
        console.log(responseMax);
        const responseMin = await $.ajax({
            url: "api/Home/GetMinValueHome",
            type: "GET"
        });
        console.log(responseMin);
        this.setState({ homeMaxValue: responseMax, homeMinValue: responseMin, loading: false });
    }
}
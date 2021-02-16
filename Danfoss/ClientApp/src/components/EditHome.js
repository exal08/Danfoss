import React, { Component } from 'react';
import $ from 'jquery';

export class EditHome extends Component {
    static displayName = EditHome.name;

    constructor(props) {
        super(props);
        if (!props.location.propsSearch) this.props.history.push('/');
        const homeId = props.location.propsSearch.homeId;
        this.state = {
            loading: true,
            homeId: homeId,
            address: props.location.propsSearch.address,
            Meters: [],
            homeEditSecsses: false,
            SerilaNumber: ""
        };

        this.onChangeAddres = this.onChangeAddres.bind(this);
        this.homeSubmit = this.homeSubmit.bind(this);

        this.onChaneSerilaNumber = this.onChaneSerilaNumber.bind(this);
        this.meterSubmit = this.meterSubmit.bind(this);
    }

    async componentDidMount() {
        await this.loadData(this.state.homeId);
    }

    render() {
        let contentMeters = this.state.loading ? <p>Загрузка...</p> : EditHome.renderTableMeters(this.state.Meters);
        let cmponentEditHomeState;
        if (this.state.homeEditSecsses) { cmponentEditHomeState = <p>Адрес изменён</p> }

        return (
            <div>
                <form onSubmit={this.homeSubmit}>
                    <p>
                        <label>Aдрес: </label>
                        <br />
                        <input type="text" value={this.state.address} onChange={this.onChangeAddres} />
                    </p>
                    <input type="submit" value="Изменить" />
                </form>
                { cmponentEditHomeState}
                <br/>
                <button onClick={this.onDelete} className="delete-btn"> Удалить адрес </button>
                <form onSubmit={this.meterSubmit}>
                    <h3> Добавить новый счётчик</h3>
                    <p>
                        <label>Серийный номер:</label>
                        <br />
                        <input type="text" onChange={this.onChaneSerilaNumber} />
                        <input type="submit" value="Добавить новый счётчик" />
                    </p>
                </form>
                { contentMeters}
            </div>
        );
    }

    onDelete = () => {
        $.ajax({ url: "api/Home/" + this.state.homeId, type: "DELETE" }); 
        this.props.history.push('/');
    }

    onChangeAddres(e) {
        let val = e.target.value;
        this.setState({ address: val });
    }

    homeSubmit(e) {
        $.ajax({
            url: "api/Home",
            type: "PUT",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify({ id: this.state.homeId, Address: this.state.address }),
            success: function () {
                this.setState({ homeEditSecsses: true });
            }.bind(this)
        });
        e.preventDefault();
    }

    onChaneSerilaNumber(e) {
        let val = e.target.value;
        this.setState({ SerilaNumber: val })
    }

    async meterSubmit(e) {
        $.ajax({
            url: "api/Meter",
            type: "POST",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify({ HomeId: this.state.homeId, SerialNumber: this.state.SerilaNumber }),
            success: async function () {
                await this.loadData(this.state.homeId);
            }.bind(this)
        });
        e.preventDefault();
    }

    static renderTableMeters(Meters) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Серийный номер</th>
                        <th>Дата начала работы</th>
                        <th>Дата окончания работы</th>
                    </tr>
                </thead>
                <tbody>
                    {Meters.map(Meters =>
                        <tr key={Meters.id}>
                            <td>{Meters.serialNumber}</td>
                            <td>{Meters.dateStart}</td>
                            <td>{Meters.dateEnd}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    async loadData(id) {
        this.setState({ loading: true });
        const response = await $.ajax({
            url: "api/Meter",
            type: "GET",
            data: { homeId: id },
        });
        this.setState({ Meters: response, loading: false });
    }
}
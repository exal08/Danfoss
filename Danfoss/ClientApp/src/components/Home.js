import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from "jquery";

export class Home extends Component {
    static displayName = "Список адресов";

    constructor(props) {
        super(props);
        this.state = { Homes: [], loading: true };
    }

    async componentDidMount() {
        await this.loadData();
    }

    render() {
        let contentHomes = this.state.loading ? <p>Загрузка...</p> : Home.renderTable(this.state.Homes);
        return (
            <div>
                <h1>Список адресов</h1>
                { contentHomes}
            </div>
        );
    }

    static renderTable(Homes) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Номер</th>
                        <th>Адрес</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {Homes.map(h =>
                        <tr key={h.id}>
                            <td>{h.id}</td>
                            <td>{h.address}</td>
                            <td><Link to={{
                                pathname: "/EditHome",
                                propsSearch: {
                                    homeId: h.id,
                                    address: h.address
                                }
                            }}>Ред.</ Link> </td>
                            <td>
                                <Link to={{
                                    pathname: "/Meter",
                                    propsSearch: {
                                        homeId: h.id
                                    }
                                }}>Передать показания</Link>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    async loadData() {
        const response = await $.ajax({
            url: "api/Home/getAllHome",
            type: "GET"
        });
        this.setState({ Homes: response, loading: false });
    }
}

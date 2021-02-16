import React, { Component } from 'react';
import $ from "jquery";

export class CreateHome extends Component {
    static displayName = CreateHome.name;

    constructor(props) {
        super(props);
        this.state = { secsess: false, error: "", address: ""};

        this.onChangeAddres = this.onChangeAddres.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        let result;
        if (this.state.secsess) { result = <p>Адрес добавлен</p>; }
        return (
            <div>
                <h1>Список адресов</h1>
                <form onSubmit={this.handleSubmit}>
                    <p>
                        <label>Новый адрес: </label>
                        <br />
                        <input type="text" onChange={this.onChangeAddres} />
                    </p>
                    <input type="submit" value="Добавить" />
                </form>
                {result}
            </div>
        );
    }

    onChangeAddres(e) {
        let val = e.target.value;
        this.setState({ address: val });
    }

    handleSubmit(e) {
        this.setState({ secsess: false });
        e.preventDefault();
        $.ajax({
            url: "api/Home",
            type: "POST",
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify({ Address: this.state.address }),
            success: function () {
                this.setState({ secsess: true });
            }.bind(this)
        });
    }

}
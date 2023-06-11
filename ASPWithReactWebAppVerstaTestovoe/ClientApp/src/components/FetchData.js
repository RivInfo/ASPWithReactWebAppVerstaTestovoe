import React, {Component} from 'react';

export class FetchData extends Component {
    static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            loading: true,
            selectedOrder: null,
            isOpen: false
        };

        this.orderOpen = this.orderOpen.bind(this);
        this.orderClose = this.orderClose.bind(this);
    }


    componentDidMount() {
        this.ordersData();
    }

    orderOpen(order) {
        console.log(" open");
        this.setState({selectedOrder: order});
        this.setState({isOpen: true});
    }

    orderClose() {
        console.log("close");
        this.setState({isOpen: false});
    }

    renderForecastsTable(orders) {
        return (
            <div>
                <h1 id="tableLabel">Список заказов {this.state.selectedOrder === null ? "true" : "false"}</h1>
                <table className="table table-striped" aria-labelledby="tableLabel">
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>SenderCity</th>
                        <th>SenderAddress</th>
                        <th>RecipientCity</th>
                        <th>RecipientAddress</th>
                        <th>CargoWeight</th>
                        <th>CargoPickupDate</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map(order =>
                        <tr key={order.id} onClick={() => this.orderOpen(order)}>
                            <td>
                                <button type="submit">{order.id}</button>
                            </td>
                            <td>{order.senderCity}</td>
                            <td>{order.senderAddress}</td>
                            <td>{order.recipientCity}</td>
                            <td>{order.recipientAddress}</td>
                            <td>{order.cargoWeight}</td>
                            <td>{order.cargoPickupDate}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }

    dataElement(dataName, value) {
        return (<div className="form-group row p-2">
            <label className="col-sm-2 col-form-label fw-bold">{dataName}</label>
            <label className="col-sm-9">{value}</label>
        </div>);
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderForecastsTable(this.state.orders);

        const order = this.state.selectedOrder;
        if (this.state.isOpen === true) {
            contents = <div>
                <h1>Информация о заказе</h1>
                {this.dataElement("Номер заказа", order.id)}
                {this.dataElement("Город отправителя", order.senderCity)}
                {this.dataElement("Адрес отправителя", order.senderAddress)}
                {this.dataElement("Город получателя", order.recipientCity)}
                {this.dataElement("Адрес получателя", order.recipientAddress)}
                {this.dataElement("Вес груза (кг)", order.cargoWeight)}
                {this.dataElement("Дата забора груза", order.cargoPickupDate)}
                <button className="btn btn-danger" onClick={this.orderClose}>Закрыть</button>
            </div>
        }

        return (
            <div>
                {contents}
            </div>
        );
    }

    async ordersData() {
        const response = await fetch('order');
        const data = await response.json();
        this.setState({orders: data, loading: false});
    }
}

import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = {
            SenderCity: "",
            SenderAddress: "",
            RecipientCity: "",
            RecipientAddress: "",
            CargoWeight: 0.1,
            CargoPickupDate: "",

            sendingData: false,
            sendingDataSuccess: false,
            sendingDataResult: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.rewrite = this.rewrite.bind(this);
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    rewrite(){
        this.setState({            
            SenderCity: "",
            SenderAddress: "",
            RecipientCity: "",
            RecipientAddress: "",
            CargoWeight: 0.1,
            CargoPickupDate: "",

            sendingData: false,
            sendingDataSuccess: false,
            sendingDataResult: false});
    }

    handleSubmit(event) {
        this.setState({sendingData: true});

        this.responseOrder();
    }

    async responseOrder() {
        const st = this.state;

        const order = {
            SenderCity: st.SenderCity,
            SenderAddress: st.SenderAddress,
            RecipientCity: st.RecipientCity,
            RecipientAddress: st.RecipientAddress,
            CargoWeight: st.CargoWeight,
            CargoPickupDate: st.CargoPickupDate
        }

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(order)
        };
        const response = await fetch('order', requestOptions);
        
        if(!response.ok) {
            console.log("Ошибка " + response.status)

            this.setState({sendingDataResult: true});

            this.setState({sendingDataSuccess: false});
            
            return;
        }
        
        const jsonResponse = await response.json();

        this.setState({sendingDataResult:true});
        
        this.setState({sendingDataSuccess : jsonResponse});
        
        console.log(jsonResponse); 
    }

    inputElement(inputName, valueName, value, type = "text", min = 1, max = 100) {
        return (<div className="form-group row p-2">
            <label className="col-sm-2 col-form-label fw-bold">{inputName}</label>
            <input type={type} className={type === "date" ? "col-sm-2" : "col-sm-9"} name={valueName} value={value}
                   step={0.1}
                   onChange={this.handleInputChange} min={min} max={max}
                   placeholder={"Введите " + inputName.toLowerCase()}/>
        </div>);
    }

    submitButtonElement() {
        const st = this.state;

        if (st.sendingData) {
            if (st.sendingDataResult) {
                if (st.sendingDataSuccess) {
                    return (<button className="btn btn-success disabled">Данные успешно отправленны</button>);
                } else {
                    return (<button className="btn btn-danger disabled">Ошибка записи данных</button>);
                }
            } else {
                return (<button className="btn btn-warning disabled">Идёт отправка данных...</button>);
            }
        }

        if (st.SenderCity.trim().length === 0 || st.SenderAddress.trim().length === 0
            || st.RecipientCity.trim().length === 0 || st.RecipientAddress.trim().length === 0
            || st.CargoPickupDate === "" || st.CargoWeight <= 0) {
            return (<button className="btn btn-secondary disabled">Заполните все поля</button>);
        } else {
            return (
                <button type="submit" onClick={this.handleSubmit} className="btn btn-outline-success">Создать</button>);
        }
    }

    render() {
        return (
            <div>
                <h1 className="text-center m-2">Создание заказа</h1>
                <div className="input-group-lg col-form-label bg-light">

                    {this.inputElement("Город отправителя", "SenderCity", this.state.SenderCity)}

                    {this.inputElement("Адрес отправителя", "SenderAddress", this.state.SenderAddress)}

                    {this.inputElement("Город получателя", "RecipientCity", this.state.RecipientCity)}

                    {this.inputElement("Адрес получателя", "RecipientAddress", this.state.RecipientAddress)}

                    {this.inputElement("Дата забора груза", "CargoPickupDate",
                        this.state.CargoPickupDate, "date")}

                    {this.inputElement("Вес груза(кг)", "CargoWeight",
                        this.state.CargoWeight, "number", 0.1, 1000)}

                    <div className="form-group row m-lg-4">
                        {this.submitButtonElement()}
                    </div>
                    <button onClick ={this.rewrite} className="btn-sm btn-danger">Отчистить поля</button>
                </div>
            </div>
        );
    }
}

import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalBody } from "reactstrap";
import { resetIngredients } from "../../redux/actionCreators";
import Spinner from "../../Spinner/Spinner";

const mapStateToProps = (state) => ({
  ingredients: state.ingredients,
  totalPrice: state.totalPrice,
  purchasable: state.purchasable,
  userId: state.userId,
  token: state.token,
});

const mapDispatchToProps = (dispatch) => {
  return {
    resetIngredients: () => dispatch(resetIngredients()),
  };
};

class CheckOut extends Component {
  state = {
    values: {
      deliveryAddress: "",
      phone: "",
      paymentType: "Cash On Delivery",
    },
    isLoading: false,
    isModalOpen: false,
    modalMsg: "",
  };

  goBack = () => {
    this.props.history.goBack("/");
  };

  inputChangerHandler = (e) => {
    this.setState({
      values: {
        ...this.state.values,
        [e.target.name]: e.target.value,
      },
    });
  };

  submitHandler = () => {
    this.setState({ isLoading: true });
    const ingredients = [...this.props.ingredients];
    const ingredientObj = {};
    for (let i of ingredients) {
      ingredientObj[i.type] = i.amount;
    }
    const order = {
      ingredients: ingredientObj,
      customer: this.state.values,
      price: this.props.totalPrice,
      orderTime: new Date(),
      user: this.props.userId,
    };
    //console.log(order);
    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.token}`,
      },
    };
    axios
      .post("http://127.0.0.1:8000/api/order/", order, header)
      .then((response) => {
        //console.log(response);
        if (response.status === 201) {
          this.setState({
            isLoading: false,
            isModalOpen: true,
            modalMsg: "Order Placed Successfully!",
          });
          this.props.resetIngredients();
        } else {
          this.setState({
            isLoading: false,
            isModalOpen: true,
            modalMsg: "Something Went Wrong! Order Again!",
          });
        }
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
          isModalOpen: true,
          modalMsg: "Something Went Wrong! Order Again!",
        });
      });
  };

  render() {
    let form = (
      <div>
        <h4
          style={{
            border: "1px solid grey",
            boxShadow: "1px 1px #888888",
            borderRadious: "5px",
            padding: "20px",
          }}
        >
          Payment: {this.props.totalPrice} BDT
        </h4>
        <form
          style={{
            border: "1px solid grey",
            boxShadow: "1px 1px #888888",
            borderRadious: "5px",
            padding: "20px",
          }}
        >
          <textarea
            name="deliveryAddress"
            value={this.state.values.deliveryAddress}
            className="form-control"
            placeholder="Your Address"
            onChange={(e) => this.inputChangerHandler(e)}
          ></textarea>
          <br />
          <input
            name="phone"
            value={this.state.values.phone}
            className="form-control"
            placeholder="Your Phone Number"
            onChange={(e) => this.inputChangerHandler(e)}
          ></input>
          <select
            name="paymentType"
            value={this.state.values.paymentType}
            className="form-control"
            onChange={(e) => this.inputChangerHandler(e)}
          >
            <option value="Cash On Delivery">Cash On Delivery</option>
            <option value="Bkash">Bkash</option>
          </select>
          <br />
          <Button
            onClick={this.submitHandler}
            disabled={!this.props.purchasable}
            style={{ backgroundColor: "#D70F64" }}
            className="me-auto"
          >
            Place Order
          </Button>
          <Button color="secondary" className="ms-1" onClick={this.goBack}>
            Cancel
          </Button>
        </form>
      </div>
    );
    return (
      <div>
        {this.state.isLoading ? <Spinner /> : form}
        <Modal isOpen={this.state.isModalOpen} onClick={this.goBack}>
          <ModalBody>
            <p>{this.state.modalMsg}</p>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);

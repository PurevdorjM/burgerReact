import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../../components/General/Spinner";
import Order from "../../components/Order";
import * as actions from "../../redux/actions/orderActions";

import css from "./style.module.css";

class OrderPage extends Component {
  componentDidMount() {
    this.props.loadOrders(this.props.userId);
  }

  render() {
    // console.log("===== > ", JSON.stringify(this.state.orders));
    return (
      <div className={css.OrderPage}>
        {this.props.loading ? (
          <Spinner />
        ) : (
          this.props.orders.map((el) => <Order key={el[0]} order={el[1]} />)
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orderReducer.orders,
    loading: state.orderReducer.loading,
    userId: state.signUpReducer.userId,
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    loadOrders: (userId) => dispatch(actions.loadOrders(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchProps)(OrderPage);

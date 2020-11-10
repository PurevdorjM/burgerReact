import React, { Component } from "react";
import Button from "../../components/General/Button";
import css from "./style.module.css";
import * as actions from "../../redux/actions/signUpActions";
import { connect } from "react-redux";
import Spinner from "../../components/General/Spinner";
import { Redirect } from "react-router-dom";

class SignUp extends Component {
  state = {
    email: "",
    password1: "",
    password2: "",
    error: "",
  };

  changePassword1 = (e) => {
    this.setState({ password1: e.target.value });
  };

  changePassword2 = (e) => {
    this.setState({ password2: e.target.value });
  };

  changeEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  signUp = () => {
    if (this.state.password1 === this.state.password2) {
      this.props.signUpUser(this.state.email, this.state.password1);
    } else {
      this.setState({ error: "Таны оруулсан нууц үгнүүд зөрүүтэй байна!" });
    }
  };

  render() {
    return (
      <div className={css.SignUp}>
        {this.props.userId && <Redirect to="/" />}
        <h1>БҮРТГҮҮЛЭХ ХЭСЭГ</h1>
        <div>Та өөрийн мэдээллээ оруулна уу</div>
        <input
          onChange={this.changeEmail}
          type="text"
          placeholder="Имейл хаяг"
        />
        <input
          onChange={this.changePassword1}
          type="password"
          placeholder="Нууц үгээ оруулна уу"
        />
        <input
          onChange={this.changePassword2}
          type="password"
          placeholder="Нууц үгээ давтан оруулна уу"
        />

        {this.state.error && (
          <div style={{ color: "red" }}>{this.state.error}</div>
        )}

        {this.props.firebaseError && (
          <div style={{ color: "red" }}>{this.props.firebaseError}</div>
        )}

        {this.props.saving && <Spinner />}

        <Button text="БҮРТГҮҮЛЭХ" btnType="Success" clicked={this.signUp} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    saving: state.signUpReducer.saving,
    firebaseError: state.signUpReducer.firebaseError,
    userId: state.signUpReducer.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUpUser: (email, password) =>
      dispatch(actions.signUpUser(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

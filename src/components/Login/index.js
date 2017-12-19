import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from "../../store/UserAuthentication";
import toastr from "toastr";
import {withRouter} from "react-router-dom";


class Login extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            email: "",
            password: ""
        }
    }

    async submit(e) {
        e.preventDefault();
        try {
            await this.props.actions.loginUser(this.state);
            this.props.history.push("/");
        }
        catch (error) {
            if (error.response) {
                const data = error.response.data[""];
                for (let i = 0; i < data.length; i++) {
                    toastr.error(data[i]);
                }
            }
            else {
                toastr.error(error);
            }
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div className="container">

                <form onSubmit={this.submit} className="form-signin">
                    <h2 className="form-signin-heading">Please sign in</h2>
                    <label className="sr-only">Email address</label>
                    <input type="email" name="email" onChange={this.onChange} id="inputEmail" className="form-control emailbox" placeholder="Email address" required/>
                    <label className="sr-only">Password</label>
                    <input type="password" name="password" onChange={this.onChange}className="form-control passwordbox" placeholder="Password"
                           required=""/>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" value="remember-me"/> Remember me
                        </label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                </form>

            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Login))
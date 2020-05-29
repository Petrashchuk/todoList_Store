import React from "react";
import {Col, Button, Form} from 'react-bootstrap';
import actions from "../store/actions/user";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";


class my_Form extends React.PureComponent {

    state = {
        first_name: '',
        last_name: '',
    };


    render() {
        const {first_name, last_name} = this.state;
        const {add, edit, isEdit, selectedUser, changeBtn, handleSelectedUser} = this.props;
        return (
            <Form style={{"marginLeft": "50px", "width": "80%"}}>
                <Form.Row>
                    <Col>
                        <Form.Control value={selectedUser ? selectedUser.first_name : first_name}
                                      onChange={e => {
                                          selectedUser ? handleSelectedUser({first_name: e.target.value}) : this.setState({first_name: e.target.value});
                                      }}
                                      placeholder="First name"/>
                        <Form.Control value={selectedUser ? selectedUser.last_name : last_name}
                                      onChange={e => {
                                          selectedUser ? handleSelectedUser({last_name: e.target.value}) : this.setState({last_name: e.target.value});
                                      }}
                                      style={{'margin': '20px 0'}} placeholder="Last name"/>
                    </Col>
                </Form.Row>
                {isEdit ? <Button block variant="primary" onClick={() => {
                    edit(selectedUser);
                    this.setState({first_name: '', last_name: ''});
                    changeBtn(false)
                }
                }>Edit</Button> : <Button block variant="success" onClick={() => {
                    add({...this.state, id: new Date().getTime()});
                    this.setState({first_name: '', last_name: ''})
                }}>Add</Button>}
            </Form>
        )

    }
}

function MapStateToProps({User}) {
    return {User}
}

function MapDispatchToProps(dispatch) {
    const dispatchFn = bindActionCreators(actions, dispatch);
    return dispatchFn
    // return {
    //     add: (user) => dispatch(actions.add(user)),
    //     edit: (user) => dispatch(actions.edit(user))
    // }
}

export default connect(MapStateToProps, MapDispatchToProps)(my_Form)

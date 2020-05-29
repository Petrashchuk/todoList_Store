import React from "react";
import {connect} from "react-redux";
import Forma from "./Form";
import {Button, Table} from "react-bootstrap";
import actionsUser from "../store/actions/user";
import actionBtn from '../store/actions/buttons';
import {bindActionCreators} from 'redux'
import Users from "../store/reducers/users";

class List extends React.PureComponent {
    state = {
        selectedUser: null,
        isEdit: false,
        status: false
    };

    changeBtn = (isEdit) => {
        this.setState({selectedUser: null, isEdit})
    };

    handleSelectedUser = (newValue) => {
        const {selectedUser} = this.state;
        this.setState({selectedUser: {...selectedUser, ...newValue}});
    };


    render() {
        const {selectedUser, isEdit, status} = this.state;
        const {users, remove, edit, findUserAsync, status_btn} = this.props;
        return (
            <div className={'table'}>
                <h1 style={{marginLeft: '50px'}}>User's List</h1>
                {users.length ? <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Status</th>
                        <th colSpan='2'>Handle</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.first_name}</td>
                            <td>{item.last_name}</td>
                            <td><label>
                                <input onChange={(e) => {
                                    this.setState({status: e.target.checked})
                                    edit({
                                        first_name: item.first_name,
                                        last_name: item.last_name,
                                        id: item.id,
                                        status: e.target.checked
                                    })
                                }} type="checkbox"/>
                                {item.status ? ' Done' : ' in Proggres'}</label></td>
                            <td>
                                <Button onClick={() => {
                                    this.setState({
                                        isEdit: true,
                                        selectedUser: {
                                            first_name: item.first_name,
                                            last_name: item.last_name,
                                            id: item.id,
                                            status
                                        }
                                    });
                                }} variant="warning">Edit</Button>
                            </td>
                            <td>
                                <Button onClick={() => {
                                    remove({firstName: item.firstName, lastName: item.last_name, id: item.id})
                                }} variant="danger">Remove</Button>
                            </td>
                            <td>
                                <Button variant="success" onClick={() => {
                                    const arrayBtn = document.getElementsByTagName('Button');
                                    chageDisabled(arrayBtn, status_btn);
                                    findUserAsync({
                                        firstName: item.first_name,
                                        lastName: item.last_name,
                                        id: item.id
                                    })
                                }}>Async Operation
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table> : null
                }
                <Forma changeBtn={this.changeBtn} handleSelectedUser={this.handleSelectedUser} isEdit={isEdit}
                       selectedUser={selectedUser}/>
            </div>
        )
    }
}

function chageDisabled(arrayBtn, disStatus) {
    for (let i = 0; i < arrayBtn.length; i++) {
        arrayBtn[i].disabled = disStatus
    }
}

function MapStateToProps(state) {
    const arrayBtn = document.getElementsByTagName('Button');
    chageDisabled(arrayBtn, state.btn_status.disabled);
    return {users: state.Users, status_btn: state.btn_status.disabled}
}

function MapDispatchToProps(dispatch) {
    // const dispatchFn = bindActionCreators(actionsUser, dispatch);
    // return dispatchFn

    return {
        findUserAsync: (user) => {
            dispatch(actionBtn.disabled());
            setTimeout(() => {
                dispatch(actionsUser.findUserAsync(user));
                dispatch(actionBtn.enable())
            }, 2000)
        },
        remove: (user) => dispatch(actionsUser.remove(user)),
        edit: (user) => dispatch(actionsUser.edit(user))
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(List);

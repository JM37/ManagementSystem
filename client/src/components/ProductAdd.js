import React from 'react'
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    hidden: {
        display: 'none'
    }
});

class ProductAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cdkey: '',
            macaddress: '',
            username: '',
            company: '',
            email: '',
            telephone: '',
            memo: '',
            open: false
        };
        
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.addProduct = this.addProduct.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    handleFormSubmit (e) {
        e.preventDefault()
        this.addProduct()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
            });
        this.setState ({
            cdkey: '',
            macaddress: '',
            username: '',
            company: '',
            email: '',
            telephone: '',
            memo: '',
            open: false
        });
    }

    handleValueChange (e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
      }

    addProduct ()  {
        const url = '/api/products';
        const formData = new FormData();
        formData.append('cdkey', this.state.cdkey);
        formData.append('macaddress', this.state.macaddress);
        formData.append('username', this.state.username);
        formData.append('company', this.state.company);
        formData.append('email', this.state.email);
        formData.append('telephone', this.state.telephone);
        formData.append('memo', this.state.memo);
        formData.append('createData', this.state.createData);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        return post(url, formData, config);
    }

    handleClickOpen ()  {
        this.setState({
            open: true
        });
    }

    handleClose () {
        this.setState({
            cdkey: '',
            macaddress: '',
            username: '',
            company: '',
            email: '',
            telephone: '',
            memo: '',
            open: false
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    제품추가
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>제품 추가</DialogTitle>
                    <DialogContent>
                        <TextField label="CD-Key" type="text" name="cdkey" value={this.state.cdkey} onChange={this.handleValueChange} /><br />
                        <TextField label="Mac-Address" type="text" name="macaddress" value={this.state.macaddress} onChange={this.handleValueChange} /><br />
                        <TextField label="User Name" type="text" name="username" value={this.state.username} onChange={this.handleValueChange} /><br />
                        <TextField label="Company" type="text" name="company" value={this.state.company} onChange={this.handleValueChange} /><br />
                        <TextField label="E-Mail" type="text" name="email" value={this.state.email} onChange={this.handleValueChange} /><br />
                        <TextField label="Telephone" type="text" name="telephone" value={this.state.telephone} onChange={this.handleValueChange} /><br />
                        <TextField label="Memo" type="text" name="memo" value={this.state.memo} onChange={this.handleValueChange} /><br />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(ProductAdd);
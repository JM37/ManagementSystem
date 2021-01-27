import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/typography';
import TextField from '@material-ui/core/TextField';

class ProductMemo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            open: false
        });
    }

    productMemo(id){
        const url = '/api/products/' + id;
        fetch(url, {
           method: 'MEMO' 
        });
        this.props.stateRefresh();
    }

    render() {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    Memo
                </Button>
                <Dialog onClose={this.handleClose} open={this.state.open}>
                    <DialogContent>
                        <Typography gutterBottom>
                            메모 수정
                        </Typography>
                        <TextField label="Memo" type="text" name="Memo" value={this.state.memo} onChange={this.handleValueChange} /><br />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={(e) => {this.productMemo(this.props.id)}}>수정</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default ProductMemo;
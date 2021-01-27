import React from 'react';
import Button from '@material-ui/core/Button';

class ProductStatus extends React.Component {

    constructor(props) {
        super(props);
        
    }

    dataStatus(id){
        const url = '/api/products/' + id;
        fetch(url, {
           method: 'put' 
        });
        this.props.stateRefresh();
        
    }

    render() {
        const sta = true;
        return (
            sta === true?
            <div>
                <Button variant="contained" color="primary" onClick={(e) => { this.dataStatus(this.props.id) }}>Enable</Button>
            </div> :
            <div> 
                <Button variant="outline" color="primary" onClick={(e) => { this.dataStatus(this.props.id) }}>Disable</Button> 
            </div>
        )
    }
}

export default ProductStatus;
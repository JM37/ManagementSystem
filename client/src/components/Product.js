import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import ProductDelete from './ProductDelete'
import ProductMemo from './ProductMemo'
import ProductStatus from './ProductStatus'


class Product extends React.Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell>{this.props.cdkey}</TableCell>
                <TableCell>{this.props.macaddress}</TableCell>
                <TableCell>{this.props.username}</TableCell>
                <TableCell>{this.props.company}</TableCell>
                <TableCell>{this.props.email}</TableCell>
                <TableCell>{this.props.telephone}</TableCell>
                <TableCell>{this.props.memo}</TableCell>
                <TableCell>{this.props.createDate}</TableCell>
                <TableCell>{this.props.status}</TableCell>
                <TableCell><ProductDelete stateRefresh={this.props.stateRefresh} id={this.props.id}/></TableCell>
                <TableCell><ProductMemo stateRefresh={this.props.stateRefresh} id={this.props.id}/></TableCell>
                <TableCell><ProductStatus stateRefresh={this.props.stateRefresh} id={this.props.id}/></TableCell>
            </TableRow>
        )
    }
}

export default Product;
import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class FontCheckbox extends React.Component {
    state = {
        checked: false
    };

    handleChange = (e) => {
        const { target: { checked } } = e;
        this.setState({ checked });
    };

    render() {
        return (
        <input
            type="checkbox"
            value = {this.props.fontname}
            checked={this.state.checked}
            onChange={this.handleChange}
        />
        );
    }
}

export default FontCheckbox;
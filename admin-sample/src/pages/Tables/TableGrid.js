import React from 'react'
import PropTypes from 'prop-types';

//Material-ui imports
import {withStyles} from 'material-ui/styles'
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import './react-data-grid-custom.css';
const ReactDataGrid = require('react-data-grid');
const { Toolbar, Data: { Selectors } } = require('react-data-grid-addons');


const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 10,
    },
    paper: {
        padding: 16,
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },

});
class TableGrid extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._columns = [
            {
                key: 'id',
                name: 'ID',
                width: 80
            },
            {
                key: 'task',
                name: 'Title',
                filterable: true,
                sortable: true
            },
            {
                key: 'priority',
                name: 'Priority',
                filterable: true,
                sortable: true
            },
            {
                key: 'issueType',
                name: 'Issue Type',
                filterable: true,
                sortable: true
            },
            {
                key: 'complete',
                name: '% Complete',
                filterable: true,
                sortable: true
            },
            {
                key: 'startDate',
                name: 'Start Date',
                filterable: true,
                sortable: true
            },
            {
                key: 'completeDate',
                name: 'Expected Complete',
                filterable: true,
                sortable: true
            }
        ];

        this.state = { rows: this.createRows(1000), filters: {}, sortColumn: null, sortDirection: null };
    }

    getRandomDate = (start, end) => {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
    };

    createRows = (numberOfRows) => {
        let rows = [];
        for (let i = 1; i < numberOfRows; i++) {
            rows.push({
                id: i,
                task: 'Task ' + i,
                complete: Math.min(100, Math.round(Math.random() * 110)),
                priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
                issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
                startDate: this.getRandomDate(new Date(2015, 3, 1), new Date()),
                completeDate: this.getRandomDate(new Date(), new Date(2016, 0, 1))
            });
        }
        return rows;
    };

    getRows = () => {
        return Selectors.getRows(this.state);
    };

    getSize = () => {
        return this.getRows().length;
    };

    rowGetter = (rowIdx) => {
        const rows = this.getRows();
        return rows[rowIdx];
    };

    handleGridSort = (sortColumn, sortDirection) => {
        this.setState({ sortColumn: sortColumn, sortDirection: sortDirection });
    };

    handleFilterChange = (filter) => {
        let newFilters = Object.assign({}, this.state.filters);
        if (filter.filterTerm) {
            newFilters[filter.column.key] = filter;
        } else {
            delete newFilters[filter.column.key];
        }

        this.setState({ filters: newFilters });
    };

    onClearFilters = () => {
        this.setState({ filters: {} });
    };

    render() {
        const classes = this.props.classes;

        return  (
            <div className={classes.root}>
                <Grid container spacing={8}>
                    <Grid item xs={12} md={12}>
                        <Paper className={classes.paper} >
                            <Typography type="display1" align="left" gutterBottom>
                                Basic Form
                            </Typography>
                            <Typography align="left">You have 42 messsages and 6 notifications.</Typography>
                            <div className="react-data-grid-custom">
                                <ReactDataGrid
                                    onGridSort={this.handleGridSort}
                                    enableCellSelect={true}
                                    columns={this._columns}
                                    rowGetter={this.rowGetter}
                                    rowsCount={this.getSize()}
                                    minHeight={500}
                                    toolbar={<Toolbar enableFilter={true}/>}
                                    onAddFilter={this.handleFilterChange}
                                    onClearFilters={this.onClearFilters} />
                                </div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
                            );
    }
}

TableGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableGrid);

import React, {Component} from 'react';
import Product from './components/Product'
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import ProductAdd from './components/ProductAdd';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';

const styles = theme => ({
  root: {
    width: "100%",
    minWidth: 1080
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    marginRight : 15,
    display: 'flex',
    justifyContent: 'right'
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  progress: {
    margin: "theme.spacing.unit(2)"
  },
  grow: {
    flexGrow: 1,
  },
  tableHead: {
    fontSize: '1.0rem'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: "theme.spacing.unit",
      width: 'auto',
    },
  },
  searchIcon: {
    width: "theme.spacing.unit(9)",
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: "theme.spacing.unit",
    paddingRight: "theme.spacing.unit",
    paddingBottom: "theme.spacing.unit",
    paddingLeft: "theme.spacing.unit(10)",
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 150,
      '&:focus': {
        width: 200,
      },
    },
  }
});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: '',
      completed: 0,
      searchKeyword: ''
    }
    this.stateRefresh = this.stateRefresh.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this)
  }

  stateRefresh() {
    this.setState({
      products: '',
      completed: 0,
      searchKeyword: ''
    });
    this.callApi()
      .then(res => this.setState({ products: res }))
      .catch(err => console.log(err));
  }

  componentDidMount  () {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({products: res}))
      .catch(err => console.log(err));
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  callApi = async () => {
    const response = await fetch('/api/products');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }
  render() {
    const filteredComponents = (data) => {
     /*data = data.filter((c) => {
        return c.name.indexOf(this.state.searchKeyword) > -1;
      });*/
      return data.map((c) => {
        return <Product stateRefresh={this.stateRefresh} key={c.id} id={c.id} cdkey={c.cdkey} macaddress={c.macaddress} username={c.username} company={c.company} email={c.email} telephone={c.telephone} memo={c.memo} status={c.status} createDate={c.createDate} />
      });
    }
    const { classes } = this.props;
    const cellList = ["번호", "CD-Key", "Mac-Address", "UserName", "Company", "E-mail", "Telephone", "Memo", "Date", "Status", "Action"]
    const techCompanies = [
      { label: "CD-KEY", value: 1 },
      { label: "MAC ADDRESS", value: 2 },
      { label: "USER NAME", value: 3 },
      { label: "COMPANY", value: 4 },
      { label: "EMAIL", value: 5 },
      { label: "TELEPHONE", value: 6 },
      { label: "MEMO", value: 7 },
      { label: "DATE", value: 8 },
    ];

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              제품 관리 시스템
            </Typography>
              <div className={classes.grow} />
              <Select className="col-md-3 text-dark" options={techCompanies} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
              </div>
              <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                <InputBase
                  placeholder="검색하기"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  name="searchKeyword"
                  value={this.state.searchKeyword}
                  onChange={this.handleValueChange}
                />
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.menu}>
          <ProductAdd stateRefresh={this.stateRefresh} />
        </div>
        <Paper className={classes.paper}>
          <Table>
            <TableHead>
              <TableRow>
                {cellList.map(c => {
                  return <TableCell className={classes.tableHead} key={c.id}>{c}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.products ?
                filteredComponents(this.state.products) :
                <TableRow>
                  <TableCell colSpan="6" align="center">
                    <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(App);
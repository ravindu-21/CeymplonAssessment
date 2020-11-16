import * as React from "react";
import { ISpCrudAppProps } from "./ISpCrudAppProps";
import { ISpCrudAppState } from "./ISpCrudAppState";
import Create from "./crud-components/create";
import ItemsTable from "./crud-components/itemsTable";
import Edit from "./crud-components/update";
import ItemDetailsProps from "./crud-components/details"
import "./style.css";
import { escape } from "@microsoft/sp-lodash-subset";
import "bootstrap/dist/css/bootstrap.css";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { BrowserRouter as Router, Switch, Route, Link ,Redirect,browserHistory} from "react-router-dom";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { Web } from "@pnp/sp/webs";
import ItemDetails from "./crud-components/details";
// import { Button } from "office-ui-fabric-react/lib/Button";
//import { Button } from 'react-bootstrap'
// import "font-awesome/css/font-awesome.css"
// import "font-awesome/css/font-awesome.min.css"
//import "bootstrap/dist/js/bootstrap.min.js";
//import { SPOperations } from "../services/SPServices";
//import styles from "./SpCrudApp.module.scss";

export default class SpCrudApp extends React.Component<
  ISpCrudAppProps,
  ISpCrudAppState,
  any
> {
  constructor(props: ISpCrudAppProps, any) {
    super(props);
    this.state = {
      listItems: [], //stores items retrieved from SharePoint list
    };
  }
  //SharePoint site URL
  public web = Web("https://ravinduceymplon.sharepoint.com/sites/CeymplonDemo");

  public componentDidMount = () => {
    //retrieving items from SP list
    this.web.lists
      .getByTitle("Test")
      .items()
      .then((items) => {
        this.setState({
          listItems: items,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  public render(): React.ReactElement<ISpCrudAppProps> {
    return (
      <Router history={browserHistory}>
        <div>
          <div id="head">
            <h2>Movies</h2>
            <p>CRUD operations through SharePoint</p>
          </div>
          <button className="btn btn-dark" style={{margin:"5px"}}>
            <Link to={"/add-new"}>
              New <Icon iconName="CirclePlus" />
            </Link>
          </button>
          {/* <button className="btn btn-dark" style={{margin:"5px"}}>
            <Link to={"/home"}>Display Items</Link>
          </button> */}

          <Switch>
            <Route
              path="/home"
              render={(props) => (
                <ItemsTable {...props} items={this.state.listItems} web={this.web} />
              )}
            ></Route>
            <Route
              path="/add-new"
              render={(props) => <Create {...props} web={this.web} />}
            ></Route>
            {/* <Route
              path="/details/:movie"
              // render={(props) => <ItemDetails {...props} item={this.state.listItems}  />}
              component={ItemDetails}
            /> */}
            {/* <Route
                  path="/edit/:movies"
                  render={(props) => <Edit {...props} web={this.web} />}
                /> */}
            <Redirect from="/" to="/home"></Redirect>
          </Switch>
        </div>
      </Router>
    );
  }
}

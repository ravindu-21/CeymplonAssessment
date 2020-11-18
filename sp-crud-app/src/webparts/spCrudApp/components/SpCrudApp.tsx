import * as React from "react";
import { ISpCrudAppProps } from "./ISpCrudAppProps";
import { ISpCrudAppState } from "./ISpCrudAppState";
import Create from "./crud-components/create";
import ItemsTable from "./crud-components/itemsTable";
import ItemDetails from "./crud-components/details";
import Edit from "./crud-components/update";
import "./style.css";
import { escape } from "@microsoft/sp-lodash-subset";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  HashRouter,
} from "react-router-dom";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { Web } from "@pnp/sp/webs";

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
  public web = Web(this.props.context.pageContext.web.absoluteUrl);

  public componentDidMount = () => {
    console.log("web", this.web);
    //retrieving items from SP list
    this.web.lists
      .getByTitle("Movies")
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
    const {listItems}=this.state
    return (
      <HashRouter>
        <div>
          <div id="head">
            <h2>Movies</h2>
            <p>CRUD operations through SharePoint</p>
          </div>
        </div>
        <button className="btn btn-dark" style={{ margin: "10px" }}>
          <Link to={"/add-new"} style={{color:"white"}}>
            <Icon iconName="CirclePlus" style={{ paddingRight: "7px", paddingTop: "3px" }} /> ADD NEW
          </Link>
        </button>
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <ItemsTable
                {...props}
                items={listItems}
                web={this.web}
              />
            )}
          ></Route>
          <Route
            path="/add-new"
            render={(props) => <Create {...props} web={this.web} />}
          ></Route>
            <Route
                path="/details/:itemId"
                render={(props) => (
                  <ItemDetails {...props} items={listItems} />
                )}
              />
              <Route
                path="/edit/:itemId"
                render={(props) => (
                  <Edit
                    {...props}
                    web={this.web}
                    items={listItems}
                  />
                )}
              />
        </Switch>
      </HashRouter>
    );
  }
}

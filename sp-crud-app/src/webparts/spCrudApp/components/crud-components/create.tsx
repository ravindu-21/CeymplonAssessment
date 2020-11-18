import * as React from "react";
import { isEmpty } from "@microsoft/sp-lodash-subset";

export interface CreateProps {
  web?: any; //SP url
}

export interface CreateState {
  errorRating: boolean;
  errorRequired: boolean;
  errorMsgRequired: string;
  errorMsgRating: string;
  errorFields: any;
}

class Create extends React.Component<CreateProps, CreateState> {
  public newItemCreated: {}; //stores the details of the new item
  state = {
    errorRating: false,
    errorRequired: false,
    errorMsgRequired: "This is a required field",
    errorMsgRating: "Please enter a number between 0 and 10",
    errorFields: [],
  };
  constructor(props: CreateProps) {
    super(props);
    this.newItemCreated = { title: "new item" };
  }

  public changeHandle = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    const createdItem = this.newItemCreated;
    if (
      inputName === "ratings" &&
      (parseInt(inputValue) < 0 || parseInt(inputValue) > 10)
    ) {
      this.setState({
        errorRating: true,
      });
    } else {
      this.setState({ errorRequired: false, errorRating: false });
      createdItem[inputName] = inputValue;
    }
  };

  public handleSubmit = async () => {
    const { web } = this.props;
    var errors = new Array();
    //checking if fields are not filled
    if (isEmpty(this.newItemCreated["name"])) {
      errors.push("title");
    } else if (isEmpty(this.newItemCreated["genre"])) {
      errors.push("genre");
    } else if (isEmpty(this.newItemCreated["plot"])) {
      errors.push("plot");
    } else if (isEmpty(this.newItemCreated["releasedDate"])) {
      errors.push("releasedDate");
    } else if (isEmpty(this.newItemCreated["ratings"])) {
      errors.push("ratings");
    }

    if (errors.length > 0) {
      this.setState({ errorRequired: true, errorFields: errors });
    } else {
      //Adding an item to the SP list
      await web.lists
        .getByTitle("Movies")
        .items.add({
          Title: this.newItemCreated["title"],
          name: this.newItemCreated["name"],
          Genre: this.newItemCreated["genre"],
          Plot: this.newItemCreated["plot"],
          ReleasedDate: this.newItemCreated["releasedDate"],
          Ratings: this.newItemCreated["ratings"],
        })
        .then((result: any) => alert("insert successful "))
        .catch((err) => console.log(err));

      location.href =
        "https://ravinduceymplon.sharepoint.com/sites/CeymplonDemo/_layouts/15/workbench.aspx";
    }
  };

  render() {
    const { errorFields } = this.state;
    return (
      <div className="card bg-light" style={{ padding: "10px" }}>
        <form
          style={{ padding: "10px" }}
          name="createItemForm"
          data-toggle="validator"
          role="form"
        >
          <div className="form-group">
            <label htmlFor="">Title</label>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={this.changeHandle}
              required={true}
            />
            {errorFields.indexOf("title") > -1 ? (
              <small style={{ color: "red" }}>
                {this.state.errorMsgRequired}
              </small>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="">Genre</label>
            <select
              className="form-control"
              onChange={this.changeHandle}
              name="genre"
              required={true}
            >
              <option disabled selected ></option>
              <option value="Action">Action</option>
              <option value="Comedy">Comedy</option>
              <option value="Sci-fi">Sci-fi</option>
            </select>
            {errorFields.indexOf("genre") > -1 ? (
              <small style={{ color: "red" }}>
                {this.state.errorMsgRequired}
              </small>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="">Plot</label>
            <textarea
              className="form-control"
              name="plot"
              onChange={this.changeHandle}
              required={true}
            ></textarea>
            {errorFields.indexOf("plot") > -1 ? (
              <small style={{ color: "red" }}>
                {this.state.errorMsgRequired}
              </small>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="">Ratings</label>
            <input
              type="number"
              className="form-control"
              name="ratings"
              min={0}
              max={10}
              onChange={this.changeHandle}
              required={true}
            />
            {this.state.errorRating === true ? (
              <small style={{ color: "red" }}>
                {this.state.errorMsgRating}
              </small>
            ) : null || errorFields.indexOf("ratings") > -1 ? (
              <small style={{ color: "red" }}>
                {this.state.errorMsgRequired}
              </small>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="">Released Date</label>
            <input
              type="date"
              className="form-control"
              name="releasedDate"
              onChange={this.changeHandle}
              required={true}
            />
            {errorFields.indexOf("releasedDate") > -1 ? (
              <small style={{ color: "red" }}>
                {this.state.errorMsgRequired}
              </small>
            ) : null}
          </div>
        </form>
        <button
          className="btn btn-primary"
          onClick={this.handleSubmit}
          disabled={
            this.state.errorRequired === true || this.state.errorRating === true
          }
        >
          Enter
        </button>
      </div>
    );
  }
}

export default Create;

import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { Web } from "@pnp/sp/webs";

export class SPOperations {
  private web = Web(
    "https://ravinduceymplon.sharepoint.com/sites/CeymplonDemo"
  );

  public getItemsFromList(): any {
    this.web.lists
      .getByTitle("Test")
      .items()
      .then((item) => {
        return item;
      });
  }
}

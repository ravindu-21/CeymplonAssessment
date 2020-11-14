import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SpCrudAppWebPartStrings';
import SpCrudApp from './components/SpCrudApp';
import { ISpCrudAppProps } from './components/ISpCrudAppProps';
import { sp } from "@pnp/sp/presets/all"; 

export interface ISpCrudAppWebPartProps {
  description: string;
}

export default class SpCrudAppWebPart extends BaseClientSideWebPart<ISpCrudAppWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISpCrudAppProps> = React.createElement(
      SpCrudApp,
      {
        description: this.properties.description,
        context:this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected onInit(): Promise < void > {  
    return super.onInit().then(_ => {  
        sp.setup({  
            spfxContext: this.context  
        });  
    });  
} 
  
  // protected get dataVersion(): Version {
  //   return Version.parse('1.0');
  // }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

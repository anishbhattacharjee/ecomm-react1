import { render } from "@testing-library/react";
import React from "react";
import CollectionPreview from "../preview-collection/preview-collection.components";

import SHOP_DATA from './shop.data'

class ShopPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            collections : SHOP_DATA
        };
    }

    render(){
        // const { collections } = this.state;
        return (
            <div className="shop-page">
               { 
               this.state.collections
               .map(({ id, ...otherCollectionProps }) => (
                     <CollectionPreview key={id} { ...otherCollectionProps} />
                ))
                }
            </div>
        );
    }

}

export default ShopPage;


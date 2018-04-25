import React, { Component } from 'react';

import Helper from 'warcaby/classes/Helper';
import SoldierComponent from 'warcaby/components/SoldierComponent.js';

class FieldComponent extends Component {
  render() {
    let classes = Helper.classes({
      'field': true,
      'black': this.props.field.isBlack,
    });

    return (
      <div className={classes}>
        <SoldierComponent field={this.props.field} />
      </div>
    );
  }
}

export default FieldComponent;

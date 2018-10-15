import React, { Component } from 'react';
import { connect } from "react-redux";
import { getTxTypeString, LongToSatosi } from '../../common/Blockchain';
import { AddressHashToAddress } from '../../common/Blockchain';
import { AccountLink } from '../../common/Links';
import moment from 'moment';

class Transaction extends Component {
  renderRewardTransaction = (transaction) => {
    return (
      <dl className="row">
        <dt className="col col-sm-3">From:</dt>
        <dd className="col col-sm-9">
          <AccountLink 
            address={AddressHashToAddress(transaction.data.from)} 
            text={AddressHashToAddress(transaction.data.from)} 
          />
        </dd>
        <dt className="col col-sm-3">Reward:</dt>
        <dd className="col col-sm-9">{LongToSatosi(transaction.data.reward)}</dd>
      </dl>
    );
  }

  renderTransactionData = (transaction) => {
    switch (transaction.type) {
      case 1:
      return this.renderRewardTransaction(transaction);
      case 2:

    }
    return (<div></div>);
  }

  render() {
    let { transaction } = this.props;
    console.log(transaction);
    return (
      <div className="container">
        <dl className="row">
          <dt className="col col-sm-3">Type:</dt>
          <dd className="col col-sm-9">{getTxTypeString(transaction.type)}</dd>
          <dt className="col col-sm-3">Hash:</dt>
          <dd className="col col-sm-9">{transaction.hash}</dd>
          <dt className="col col-sm-3">Version:</dt>
          <dd className="col col-sm-9">{transaction.version}</dd>
          <dt className="col col-sm-3">Block Height:</dt>
          <dd className="col col-sm-9">{transaction.block_height}</dd>
          <dt className="col col-sm-3">Created Time:</dt>
          <dd className="col col-sm-9">
          {moment.unix(transaction.created_time).fromNow()}
          ({moment.unix(transaction.created_time).format("YYYY-MM-DD HH:mm Z")})
          </dd>
        </dl>
        {this.renderTransactionData(transaction)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    transaction: state.blockchain.transaction
  };
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Table, Button } from 'reactstrap';
import { AccountLink } from '../../common/Links';
import { toast } from 'react-toastify';
import { toFixed8Str, toFixed8Long } from '../../common/blockchain';

class Vote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vote: {},
      voting: false
    }
  }

  isConfirmValid = () => {
    let { vote } = this.state;
    let { active } = this.props;
    let total = 0;
    for (let k in vote) {
      if (toFixed8Long(vote[k]) === undefined) {
        return false;
      }
      total += Number(vote[k]);
    }
    if (Number(toFixed8Str(active.lock)) < total)
      return false;
    return true;
  }

  onConfirm = () => {
    let { onConfirm } = this.props;
    onConfirm(this.state.vote);
  }

  onClickVoting = () => {
    let { active } = this.props;
    if (active.address === undefined) {
      toast.error("Required login", { position: toast.POSITION.BOTTOM_RIGHT });
      return;
    }

    this.setState({
      vote: {},
      voting: !this.state.voting
    });
  }

  onChangeVote = (address, v) => {
    let vote = this.state.vote;
    vote[address] = v;
    this.setState({
      vote: vote
    });
  }

  getVotingCount = () => {
    let cnt = 0;
    for (let k in this.state.vote)
      cnt += this.state.vote[k];
    return cnt;
  }

  renderStartVote() {
    return (
      <div className="text-center">
        {
          this.state.voting ?
            <div>
            <p style={{ cursor: "pointer", color: "red", border: "1px" }} onClick={this.onClickVoting}>Cancel Voting</p>
            </div>
            :
            <div>
            <p style={{ cursor: "pointer", color: "blue" }} onClick={this.onClickVoting}>Start Voting</p>
            </div>
        }
      </div>
    )
  }

  render() {
    let { delegates } = this.props;
    let { vote } = this.state;
    if (delegates === undefined) {
      return (<div></div>)
    }
    let allvote = 0;
    for (let k in delegates) {
      allvote += Number(toFixed8Str(delegates[k].total_vote));
    }
    return (
      <div>
        {this.renderStartVote()}
        <Table className="table table-hover table-bordered">
          <thead className="thead-light">
            <tr>
              <th scope="col" className="align-middle sm-table-cell">Name</th>
              <th scope="col" className="text-center align-middle" style={{ width: 150 }}>Vote</th>
              <th scope="col" className="text-center align-middle" style={{ width: 150 }}>Live Vote</th>
              <th scope="col" className="text-center align-middle" style={{ width: 100 }}>Percent</th>
              {
                (this.state.voting) &&
                <th scope="col" className="text-right align-middle" style={{ width: 200 }}>Your Vote</th>
              }
            </tr>
          </thead>
          <tbody>
            {
              delegates.map((v) => {
                return (
                  <tr key={v.address}>
                    <td scope="row">
                      <div className="text-center text-sm-left">
                        <AccountLink address={v.address} text={v.name} />
                        <br />
                        <AccountLink className="small text-muted" address={v.address} />
                      </div>
                    </td>
                    <td className="small text-center align-middle has-border">{toFixed8Str(v.round_vote)}</td>
                    <td className="small text-center align-middle">{toFixed8Str(v.total_vote)}</td>
                    <td className="small text-center align-middle">{"0" === v.total_vote ? 0 : (Number(toFixed8Str(v.total_vote)) / allvote * 100).toFixed(2)}%</td>
                    {
                      (this.state.voting) &&
                      <td>
                        <div className="input-group small align-middle">
                          <input
                            type="text"
                            value={vote[v.address] || ""}
                            className="form-control text-center align-middle"
                            onChange={(e) => this.onChangeVote(v.address, e.target.value)}
                          />
                        </div>
                      </td>
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
        {
          (this.state.voting) &&
          <div className="mt-1">
            <Button
              className="btn float-right"
              color="primary"
              onClick={this.onConfirm}
              disabled={!this.isConfirmValid()}
            >
              Confirm
            </Button>
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    active: state.account.active
  };
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Vote);
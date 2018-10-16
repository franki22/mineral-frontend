import React, { Component } from 'react';
import { connect } from "react-redux";
import ReactPasswordStrength from "react-password-strength";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { generateAccount } from '../../common/Blockchain';
import { toast } from 'react-toastify';

class CreateAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
      password: "",
      passwordValid: false,
      address: '',
      privateKey: ''
    }
  }

  onChangedPassword = ({ password, isValid }) => {
    this.setState({
      password: password,
      passwordValid: isValid
    });
  }

  isValidCreate = () => {
    return this.state.passwordValid;
  }

  onClickCreate = () => {
    if (this.state.passwordValid === false) {
      return;
    }

    let account = generateAccount();
    let { step } = this.state;
    this.setState({
      step: step + 1,
      address: account.address,
      privateKey: account.privateKey
    });
  }

  onClickDownloadKeystore = () => {
    console.log(this.state.address);
    console.log(this.state.privateKey);
  }

  onClickCopyPrivateKey = () => {
    toast.info("Copied to the Clipboard", {position: toast.POSITION.BOTTOM_RIGHT});
  }

  render() {
    let { step, privateKey } = this.state;
    switch (step) {
      case 0:
        return (
          <div>
            <div className="d-flex justify-content-center text-center">
              <div className="col-md-12">
                <h5>Create Account</h5>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div className="col-md-5">
                <div className="text-center">
                  <label>Password</label>
                  <ReactPasswordStrength
                    minLength={8}
                    scoreWords={["weak", "okay", "good", "strong", "secure"]}
                    tooShortWord="too short"
                    changeCallback={this.onChangedPassword}
                    inputProps={{
                      name: "password_input",
                      autoComplete: "off",
                      placeholder: "input password"
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div className="col-md-5 mt-1">
                <button
                  type="button"
                  className="btn float-right btn-primary"
                  disabled={!this.isValidCreate()}
                  onClick={this.onClickCreate}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )
      case 1:
        return (
          <div>
            <div className="d-flex justify-content-center">
              <h5>Keystore</h5>
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.onClickDownloadKeystore}
              >
                Download KeyStore
              </button>
            </div>
            <div className="d-flex justify-content-center mt-5">
              <h5>PrivateKey</h5>
            </div>
            <div className="d-flex justify-content-center">
              <div className="col-md-6">
                <div className="input-group mb-5">
                  <input type="text"
                    readOnly={true}
                    className="form-control"
                    value={privateKey}
                  />
                  <div className="input-group-append">
                    <CopyToClipboard text={privateKey}>
                      <button className="btn btn-outline-secondary" type="button" onClick={this.onClickCopyPrivateKey}>Copy
                      </button>
                    </CopyToClipboard>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
  }
}

function mapStateToProps(state) {
  return {
    ...state
  };
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);
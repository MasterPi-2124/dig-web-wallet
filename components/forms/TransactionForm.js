import axios from "axios";
import { coins } from "@cosmjs/launchpad";
import React from "react";
import { withRouter } from "next/router";

import Button from "../../components/inputs/Button";
import Input from "../../components/inputs/Input";
import StackableContainer from "../layout/StackableContainer";

class TransactionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toAddress: "",
      amount: 0,
      memo: "",
      gas: 200000,
      processing: false,
      addressError: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  createTransaction = (toAddress, amount, gas) => {
    const msgSend = {
      fromAddress: this.props.address,
      toAddress: toAddress,
      amount: coins(amount * 1000000, process.env.NEXT_PUBLIC_DENOM),
    };
    const msg = {
      typeUrl: "/cosmos.bank.v1beta1.MsgSend",
      value: msgSend,
    };
    const gasLimit = gas;
    const fee = {
      amount: coins(6000, process.env.NEXT_PUBLIC_DENOM),
      gas: gasLimit.toString(),
    };

    return {
      accountNumber: this.props.accountOnChain.accountNumber,
      sequence: this.props.accountOnChain.sequence,
      chainId: process.env.NEXT_PUBLIC_CHAIN_ID,
      msgs: [msg],
      fee: fee,
      memo: this.state.memo,
    };
  };

  handleCreate = async () => {
    console.log("abcxyz")
    window.keplr.experimentalSuggestChain({
      chainId: "dig-1",
      chainName: "DIG",
      rpc: "https://rpc-1-dig.notional.ventures",
      rest: "https://api-1-dig.notional.ventures",
      bip44: {
          coinType: 118,
      },
      bech32Config: {
          bech32PrefixAccAddr: "dig",
          bech32PrefixAccPub: "dig" + "pub",
          bech32PrefixValAddr: "dig" + "valoper",
          bech32PrefixValPub: "dig" + "valoperpub",
          bech32PrefixConsAddr: "dig" + "valcons",
          bech32PrefixConsPub: "dig" + "valconspub",
      },
      currencies: [ 
          { 
              coinDenom: "dig", 
              coinMinimalDenom: "udig", 
              coinDecimals: 6, 
              coinGeckoId: "dig", 
          }, 
      ],
      feeCurrencies: [
          {
              coinDenom: "dig",
              coinMinimalDenom: "udig",
              coinDecimals: 6,
              coinGeckoId: "dig",
          },
      ],
      stakeCurrency: {
          coinDenom: "dig",
          coinMinimalDenom: "udig",
          coinDecimals: 6,
          coinGeckoId: "dig",
      },
      coinType: 118,
      gasPriceStep: {
          low: 0.01,
          average: 0.025,
          high: 0.03,
      },
  });
  };

  render() {
    return (
      <StackableContainer lessPadding>
        <button className="remove" onClick={this.props.closeForm}>
          ✕
        </button>
        <h2>Create New transaction</h2>
        <div className="form-item">
          <Input
            label="To Address"
            name="toAddress"
            value={this.state.toAddress}
            onChange={this.handleChange}
            error={this.state.addressError}
            placeholder="cosmos1fjrzd7ycxzse05zme3r2zqwpsvcrskv80wj82h"
          />
        </div>
        <div className="form-item">
          <Input
            label="Amount (ATOM)"
            name="amount"
            type="number"
            value={this.state.amount}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-item">
          <Input
            label="Gas Limit (UATOM)"
            name="gas"
            type="number"
            value={this.state.gas}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-item">
          <Input
            label="Memo"
            name="memo"
            type="text"
            value={this.state.memo}
            onChange={this.handleChange}
          />
        </div>
        <Button label="Create Transaction" onClick={this.handleCreate} />
        <style jsx>{`
          p {
            margin-top: 15px;
          }
          .form-item {
            margin-top: 1.5em;
          }
          button.remove {
            background: rgba(255, 255, 255, 0.2);
            width: 30px;
            height: 30px;
            border-radius: 50%;
            border: none;
            color: white;
            position: absolute;
            right: 10px;
            top: 10px;
          }
        `}</style>
      </StackableContainer>
    );
  }
}

export default withRouter(TransactionForm);

import React from "react";
import "./styles.css";

// Data
import productJson from "../../data/products.json";

// Icons
import DollarSvg from "../../assets/dollar.svg";
import ArrowRightIcon from "../../assets/arrowright.svg";
import ArrowLeftIcon from "../../assets/arrowleft.svg";

// Functions
import { formatCurrency } from "../../functions/format";
import {
  monthlyInstallment,
  targetMonth,
  totalAmount,
} from "../../functions/calculator";

export default class LoanMainCard extends React.Component {
  state = {
    loan_amount: productJson[0].min_amount,
    num_of_months: productJson[0].min_tenure,
    type_of_loan: productJson[0].id,
    selectedLoanType: productJson[0],
  };
  handleTypeOfLoan = (item) => {
    this.setState({
      type_of_loan: item.id,
      num_of_months: item.min_tenure,
      loan_amount: item.min_amount,
      selectedLoanType: item,
    });
  };
  handleDecreaseNumOfMonth = () => {
    let newMonth = parseInt(this.state.num_of_months) - 1;
    if (newMonth >= parseInt(this.state.selectedLoanType.min_tenure)) {
      this.setState({
        num_of_months: newMonth,
      });
    }
  };
  handleIncreaseNumOfMonth = () => {
    let newMonth = parseInt(this.state.num_of_months) + 1;
    if (newMonth <= parseInt(this.state.selectedLoanType.max_tenure)) {
      this.setState({
        num_of_months: newMonth,
      });
    }
  };
  render() {
    return (
      <div className="bodycard">
        <p className="heading-text">
          Let's plan your <strong>loan.</strong>
        </p>

        <div className="card">
          <div>
            {productJson.map((item) => (
              <img
                onClick={() => this.handleTypeOfLoan(item)}
                className={`button-icon ${
                  item.id === this.state.type_of_loan && "active-loan-type"
                }`}
                src={item.image}
                key={item.id}
                alt={item.name}
              />
            ))}
          </div>
          <div className="input-container">
            <div className="form-feild loan-amount-feild">
              <p className="label">Loan amount</p>
              <div className="input-feild">
                <img alt="dollar" src={DollarSvg} />
                <input
                  value={formatCurrency(this.state.loan_amount, false)}
                  className="input-feild-box loan-input"
                  onBlur={() => {
                    if (
                      this.state.loan_amount >=
                      parseFloat(this.state.selectedLoanType.max_amount)
                    ) {
                      this.setState({
                        loan_amount: this.state.selectedLoanType.max_amount,
                      });
                    }
                    if (
                      this.state.loan_amount <=
                      parseFloat(this.state.selectedLoanType.min_amount)
                    ) {
                      this.setState({
                        loan_amount: this.state.selectedLoanType.min_amount,
                      });
                    }
                  }}
                  onChange={(event) => {
                    let value = event.target.value;
                    value = value.replace(/[^0-9]/g, "");
                    this.setState({
                      loan_amount: value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="form-feild">
              <p className="label">Number of Months</p>
              <div className="input-feild">
                <img
                  alt="arrowleft"
                  src={ArrowLeftIcon}
                  onClick={this.handleDecreaseNumOfMonth}
                />
                <input
                  onChange={() => {}}
                  className="input-feild-box month-input-feild"
                  value={this.state.num_of_months}
                  onKeyDown={(e) => {
                    var event = window.event ? window.event : e;

                    let keyCode = event.keyCode;

                    if (keyCode === 38) this.handleIncreaseNumOfMonth();
                    if (keyCode === 40) this.handleDecreaseNumOfMonth();
                  }}
                />
                <img
                  alt="arrowright"
                  src={ArrowRightIcon}
                  onClick={this.handleIncreaseNumOfMonth}
                />
              </div>
            </div>
          </div>
          <div className="message-display-card">
            <div className="monthly-card">
              <p className="monthly-amount-text">Monthly amount</p>
              <p className="monthly-card-text">
                {formatCurrency(
                  monthlyInstallment(
                    this.state.loan_amount,
                    this.state.num_of_months,
                    this.state.selectedLoanType.interest
                  )
                )}
              </p>
            </div>
            <div className="monthly-down-card">
              <p className="monthly-down-text-card">
                You’re planning {this.state.num_of_months}{" "}
                <strong>monthly deposits</strong> to reach your{" "}
                <strong> {formatCurrency(this.state.loan_amount)}</strong> goal
                by{" "}
                <strong>
                  {targetMonth(parseInt(this.state.num_of_months))}{" "}
                </strong>{" "}
                . The total amount loaned will be{" "}
                <strong>
                  {formatCurrency(
                    totalAmount(
                      this.state.loan_amount,
                      this.state.selectedLoanType.interest
                    ),
                    true
                  )}
                </strong>
              </p>
            </div>
          </div>
          <div className="apply-now-button">
            <p className="apply-now-button-text">Apply Now</p>
          </div>
        </div>
      </div>
    );
  }
}

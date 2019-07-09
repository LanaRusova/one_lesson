import React, { Component } from "react";

class Contact extends Component {
  state = {
    isOpen: true
  };

  render() {
    const { contact } = this.props;
    // console.log(contact);
    const info = (
      <div>
        <hr />
        <div>{contact.name}</div>
        <div>{contact.phoneNumber}</div>
      </div>
    );
    const dopInfo = this.state.isOpen && (
      <div>
        <div>{contact.email}</div>
        <div>{contact.address}</div>
      </div>
    );

    return (
      <li>
        {info}
        <button onClick={this.handleClick}>
          {this.state.isOpen ? "close" : "open"}
        </button>
        {dopInfo}
      </li>
    );
  }

  handleClick = () => {
    console.log("---", "clicked");
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
}

export default Contact;

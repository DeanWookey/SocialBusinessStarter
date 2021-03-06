import React from 'react';
import { Link, hashHistory, Router } from 'react-router';
import { withRouter } from 'react-router';


class PledgeItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { screenVisible: false, buttonVisible: false };
    this.handleRedirect = this.handleRedirect.bind(this);
    this.confirmPledge = this.confirmPledge.bind(this);

  }


  handleRedirect(e) {
    if (this.props.currentUser && this.props.currentUser.id === this.props.project.user_id) {

      let url = `/pledges/${this.props.pledge.id}/edit`;
      this.props.router.push(url);
    } else {

      this.setState({buttonVisible: true, screenVisible: false});
    }
  }

  confirmPledge(e) {
    e.preventDefault();

    if (!this.props.currentUser) {
      this.props.router.push("/login");
    } else {
      this.props.createGiving({user_id: this.props.currentUser.id, pledge_id: this.props.pledge.id});
      window.scrollTo( 0, 0 );
    }
  }


  render() {
    const { pledge } = this.props;

    let button = "";
    if(this.state.buttonVisible){
      button = <button className="confirm-pledge contribute-button"
        onClick={this.confirmPledge}>Confirm Contribution!</button>;
    }


    const screenClass = this.state.screenVisible
      ? 'pledge-screen'
      : 'hidden pledge-screen';

    return (
      <div className="pledge-item pledge-button"
        onMouseEnter={
          () => this.setState({ screenVisible: true })
        }
        onMouseLeave={
          () => this.setState({ screenVisible: false })
        }

        onClick={
          (e) => this.handleRedirect(e)
        }
      >
        <h1>Pledge ${pledge.level} or more</h1>
        <h2>{pledge.title}</h2>
        <h3>{pledge.description}</h3>
        <h4>{pledge.giving_count} backers have contributed!</h4>
        <div className={screenClass}></div>
        {button}

      </div>
    );
  }
}


export default withRouter(PledgeItem);

class ComponentEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      component: this.props.components[0],
      fields: []
    }

    this.onSelectChange = this.onSelectChange.bind(this);
    this.renderCampaignSignupCard = this.renderCampaignSignupCard.bind(this);
    this.renderFeatureCard = this.renderFeatureCard.bind(this);
    this.renderReportbackItem = this.renderReportbackItem.bind(this);
    this.renderVideo = this.renderVideo.bind(this);
  }

  onInputChange(e) {
    const key = e.target.dataset.fieldKey;
    this.state.fields[key] = e.target.value;
    this.forceUpdate();
  }

  renderCampaignSignupCard() {
    return (
      <div>
        <label className="field-label">Campaign Types</label>
        <div className="form-item">
          <label className="option -radio">
            <input type="radio" name="choice" id="choice1"></input>
            <span className="option__indicator"></span>
            <span>Staff Pick</span>
          </label>
          <label className="option -radio">
            <input type="radio" name="choice" id="choice2"></input>
            <span className="option__indicator"></span>
            <span>All Campaigns</span>
          </label>
        </div>
      </div>
    );
  }

  renderFeatureCard() {
    return renderCampaignSignupCard();
  }

  renderReportbackItem() {
    return (
      <div>
        <label className="field-label">Reactions</label>
        <div className="form-item">
          <label className="option -radio">
            <input type="radio" name="choice" id="choice1"></input>
            <span className="option__indicator"></span>
            <span>Enabled</span>
          </label>
          <label className="option -radio">
            <input type="radio" name="choice" id="choice2"></input>
            <span className="option__indicator"></span>
            <span>Disabled</span>
          </label>
        </div>
      </div>
    );
  }

  renderVideo() {
    return (
      <div className="form-item">
        <label className="field-label">Video URL</label>
        <input type="text" className="text-field"></input>
      </div>
    );
  }

  onSelectChange(e) {
    this.setState({
      fields: [],
      component: e.target.value
    });
  }

  render() {
    return (
      <div>
        <div className="select selector__padded">
          <select onChange={this.onSelectChange}>
            {this.props.components.map(function(c, index) {
              return <option key={index}>{c}</option>
            }.bind(this))}
          </select>
        </div>
        {this[`render${this.state.component.replace(/ /g, '')}`]()}
      </div>
    );
  }
}

ComponentEditor.defaultProps = {
  components: ['Campaign Signup Card', 'Feature Card', 'Reportback Item', 'Video']
}

class Slide extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 0
    }

    this.renderTabs = this.renderTabs.bind(this);
    this.tabClick = this.tabClick.bind(this);
  }

  tabClick(index) {
    this.setState({
      activeTab: index
    });
  }

  renderTabs() {
    const tabs = this.props.tabs.map(function(tab, index) {
      return <a key={index} className={`${index === this.state.activeTab ? '-active' : ''}`} onClick={()=>this.tabClick(index)}>{tab.title}</a>
    }.bind(this));
    return tabs;
  }

  render() {
    return (
      <div className="card flow">
        <div className="card__page">
          <p>Slide #1</p>
        </div>
        <div className="card__nav">{this.renderTabs()}</div>
        <div className="card__content">{this.props.tabs[this.state.activeTab].component}</div>
      </div>
    );
  }
}

Slide.defaultProps = {
  tabs: [
    {title: 'Layout', component: <LayoutEditor />},
    {title: 'Copy', component: <CopyEditor />},
    {title: 'Component', component: <ComponentEditor />},
    {title: 'Info', component: <InfoEditor />}
  ]
}

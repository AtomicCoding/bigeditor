import React, { Component } from 'react';
import './css/Panels.css';

export class Panel {
	constructor(renderFunc, options) {
		this.renderFunc = renderFunc;
		this.dimsUI = options.dimsUI === undefined ? true : options.dimsUI;
		this.dismissOnTap = options.dismissViaTap === undefined ? true : null;
		this.position = options.position || 'bottom';
		this.noPadding = !!options.noPadding;
	}
}

export class PanelManager extends Component {
	constructor(props) {
		super(props);
		this.state = {panels: []};
	}
	render() {
		return (
			<div className='PanelManager'>
				<div className='children'>{this.props.render(this)}</div>
				<PanelStack panels={this.state.panels} onPop={this.pop.bind(this)} />
			</div>
		)
	}
	push(panel) {
		this.setState({panels: [...this.state.panels, panel]});
	}
	pop() {
		let panels = [...this.state.panels];
		if (panels.length) panels.splice(panels.length-1, 1);
		this.setState({panels});
	}
}

let PanelStack = ({panels, onPop}) => {
	if (panels.length === 0) return null;
	let topPanel = panels[panels.length-1];
	let dimmer = topPanel.dismissOnTap ? <PanelUIDimmer onClick={onPop} dimmed={topPanel.dimsUI} /> : null;
	let sheets = panels.map((panel, i) => <PanelSheet key={i} position={panel.position} padding={!panel.noPadding}>{panel.renderFunc()}</PanelSheet>);
	return <div className='PanelStack'>{dimmer}{sheets}</div>;
}

let PanelUIDimmer = ({onClick, dimmed}) => {
	return <div className={`PanelUIDimmer ${dimmed ? 'dimmed' : 'undimmed'}`} onClick={onClick} />;
}

let PanelSheet = ({position, children, padding}) => {
	let className = `PanelSheet position-${position} ${padding ? 'padding' : 'no-padding'}`;
	return <div className={className}>{children}</div>;
}

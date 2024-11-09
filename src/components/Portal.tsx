import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { canUseDOM } from '~/modules/dom';

interface Props extends React.PropsWithChildren {
  id: string;
}

export default class JoyridePortal extends React.Component<Props> {
  node: HTMLElement | null = null;

  componentDidMount() {
    const { id } = this.props;

    if (!canUseDOM()) {
      return;
    }

    this.node = document.createElement('div');
    this.node.id = id;

    document.body.appendChild(this.node);
  }

  componentWillUnmount() {
    if (!canUseDOM() || !this.node) {
      return;
    }

    if (this.node.parentNode === document.body) {
      document.body.removeChild(this.node);
      this.node = null;
    }
  }

  render() {
    if (!canUseDOM()) {
      return null;
    }

    const { children } = this.props;

    if (!this.node || !children) {
      return null;
    }

    return <>{ReactDOM.createPortal(children, this.node)}</>;
  }
}

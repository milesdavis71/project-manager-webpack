import { Component } from './base-component';

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  constructor() {
    super('project-input', 'app', true, 'user-input');
  }
  configure(): void {}

  renderContent(): void {}
}

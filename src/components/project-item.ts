import { Project } from '../model/project';
import Component from './base-component';

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> {
  project: Project;
  constructor(hostId: string, project: Project) {
    super('single-project', hostId, false, project.id);
    this.project = project;

    this.renderContent();
  }
  config() {}
  renderContent() {
    this.element.querySelector('h2')!.innerHTML = this.project.title;
    this.element.querySelector('h3')!.innerHTML =
      this.project.people.toString();
    this.element.querySelector('p')!.innerHTML = this.project.description;
  }
}

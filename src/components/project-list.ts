import Component from './base-component';
import { projectState } from '../state/project-state';
import { Project, ProjectStatus } from '../model/project';

export class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  assignedProjects: Project[];
  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`);
    this.assignedProjects = [];
    this.config();
    this.renderContent();
  }
  config() {
    projectState.addListeners((projects: Project[]) => {
      const relevantProjects = projects.filter(prj => {
        if (this.type === 'active') {
          return prj.status === ProjectStatus.Active;
        }
        return prj.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProjects;
      this.renderProject();
    });
  }
  renderContent() {
    const listId = `${this.type}-project-lists`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.innerHTML = `${this.type} projektek`;
  }
  renderProject() {
    const listElement = document.getElementById(`${this.type}-project-lists`);
    const listLiElement = this.assignedProjects
      .map(assPrj => `<li>${assPrj.title}</li>`)
      .join('');
    listElement!.innerHTML = `<ul>${listLiElement}</ul>`;
  }
}

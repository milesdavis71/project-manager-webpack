export default abstract class Component<
  T extends HTMLElement,
  U extends HTMLElement
> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;
  constructor(
    projectId: string,
    hostId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(
      projectId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostId)! as T;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }

    this.attach(insertAtStart);
  }
  attach(insertAtbeginning: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtbeginning ? 'afterbegin' : 'beforeend',
      this.element
    );
  }

  abstract config(): void;
  abstract renderContent(): void;
}

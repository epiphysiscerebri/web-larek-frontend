import { IView, IController } from "../../types";


export class ComponentView implements IView {
  private _controller; // Экземпляр соответствующего контроллера
  root: HTMLElement; // Элемент в который монтируем компонент

  

  constructor(controller: IController, root: HTMLElement) {
    this._controller = controller
    this.root = root
  }

  get controller(): IController {
    return this._controller
  }

  mount(elements: HTMLElement[]) {
    for (let element in elements) {
      console.log('element', element)
      // this.root.appendChild(element);
    }
  }
}

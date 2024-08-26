import { PageController } from "./PageController";
import { CDN_URL } from "../../utils/constants";

export class PageView {

  controller;
  root;

  constructor(root: HTMLElement) {
    // передаём экземпляр соответствующего контроллера
    this.controller = new PageController()
    // передаём элемент в который будет встраиваться вёрста в mount
    this.root = root
  }

  // метод, который дёргает контроллер
  onLoadPage() {
    this.controller.processingLoadPage()
      .then((response) => {
        this.mount(response)
      })
  }
  // метод, который получает нужный темплейт
  private getCardTemplate(template: any) {
    return template.querySelector('.gallery__item').cloneNode(true)
  }

  // метод, который маунтит элементы в DOM
  private mount(cardsList: any[]) {
    const templateCard = (document.querySelector('#card-catalog') as HTMLTemplateElement).content 
    
    
    cardsList.forEach((card) => {
      const newCard = this.getCardTemplate(templateCard)
      const img = newCard.querySelector('.card__image')
      const title = newCard.querySelector('.card__title')
      const category = newCard.querySelector('.card__category')
      const price = newCard.querySelector('.card__price')
      img.src = CDN_URL + card.image
      img.alt = card.title + " image" 
      title.textContent = card.title
      category.textContent = card.category
      price.textContent = card.price?card.price + " синапсов":'Бесценно'
      this.root.appendChild(newCard)
    })
  }
}
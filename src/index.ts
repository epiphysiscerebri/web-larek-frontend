import './scss/styles.scss';


const page = document.querySelector('.page')
const gallery = (page.querySelector('.gallery') as HTMLElement)


import { PageView } from './components/Page/PageView';

const pageView = new PageView(gallery)

pageView.onLoadPage()






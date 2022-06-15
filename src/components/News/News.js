import { CSSTransition } from 'react-transition-group';

function News(props) {

  return(
    <CSSTransition
    in={props.isEmptyResult}
    classNames='transform-news'
    timeout={4000}

    >
    <section className='news'>
      Таким образом, вы сможете увидеть базовое использование компонента ReactTransitionGroup.

Теперь добавим логики. Нужно описать 2 метода для реализации примера списка контактов:
1 handleAdd — осуществляет добавление новых контактов, получая случайное имя и помещая его непосредственно в массив state.items. (если имя случайное, используется пакет random-name);
2 handleRemove — контакт удаляется по индексу в массиве state.items.
    </section>
    </CSSTransition>
  )
}

export default News;

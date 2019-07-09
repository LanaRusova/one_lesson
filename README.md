# one_lesson

#строим компонент
1. Чтобы испольовать компоненты в других файлах, нужно их заэкспортить:
    ~~~export default NameComponent
2. Для использования компонета в файле нужно заинпортить этот компонент:
    ~~~import NameComponent from './components/NameComponent'
3. Заимпортить реакт (даже если реакт явно не используем внутри файла -> babel превратить код из JSX в обычный JS и там будет: React.createElement{})
    ~~~import React from 'react'
4. Как получить необхдимые данные внутрь компонента?:
    -если компонент = функция(stateless компонент), передаем к ней в аргументы нужные данные(все данные будут приходить в первом аргументе ):
        function Article(props) {
            const {article} = props //деструктуризация
            return(
                <div>
                    <h2>{article.title}</h2>
                </div>
            )
        }

5. Как передавать эту статью в наш компонент? Для этого в компоненте (App) где мы используем наш компонент(Article) импортим объект (import articles from '../fixtures') -> передаем внутрь Article: 
    function App(){
        return(
            <div>
                <h1>App name</h2>
                <Article article={articles}/>
            </div>
        )
    }

## Добавим интерактивность (кнопка)

1. Вешаем а кнопку обработчик: 
    <button onClick={handleClick}></button> //передаем проперти onClick в компонент button дальше реакт сам решает как он будет вешать листнеры

2. Как будем открывать и закрывать текст? Опишем несколько состоний (состояние с открытым текстом и закрытим) -> опишем как компонент выглядит в разных сотояниях -> кнопку используем для перехода из одного состояния в другое

3. Для описания состояния компонента используем другой синтаксис с ES6 классами

4. Для этого заимпортим базовый компонент из рекакта: 
    import React, {Component} from 'react'

5. Перепишем компонент (унаследуем Article от базового компонента, обязательный метод render)
    class Article extends Component{ 
        const {article} = this.props
    }
6. Добавим состоние. Для этого мы можем описать конструктор(в котором зададим начальное состояние, для этого вызовем родительский конструктор super(props)); вызовем начальное состояние в this.state:
    constructor(props){
        super(props)
        this.state = {
            isOpen: true
        }
    }

    ~~~ используя экспериментальный синтаксис можно записать короче:
    
    state = {
        ispen: true
    }

7. Теперь испоьзуем это состояние. Если состояние true покажем section, если нет рендерим пустоту. (в this.state хранится наше состояние)
    const body = this.state.isOpen&&<section>{article.text}</section>

8. Теперь будем менять наше состояние. Для этого есть метот this.setState. Т.к. нам надо работать с контекстом, то привяжем контекст к нашему обработчику либо описав его в конструкторе:
    constructor(props){
        super(props)
        this.state = {
            isOpen: true
        }
        this.handleClick = handleClick.bind(this)
    }

    ~~~ используя экспериментальный синтаксис можно записать так(в setState передаем объект в котором мы задаем новое состояние):

    handleClick = () => {
        console.log('---','clicked')
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

#LESSON TWO

#API компонентов
Дефолтные пропсы, если пропсы не приходят то они становятся по дефолту пустым массивом, в нашем случае не надо будет делать лишнию проверку 

static defaultProps = {
    comments: []
}

в реальной жизни в один компонент приходит много пропсов и для этого их можно описать proptypes(npm i prop-types --S) => import PropTypes from 'prop-types'

 static propTypes = {
        article: PropTypes.shape({
            id: PropTypes.string.isRequired, //обязательные поля, должны придти обязательно 
            title: PropTypes.string.isRequired,
            text: PropTypes.string //не обязательные
        }).isRequired
    }
    описание интерфейса компонента 

#Декораторы
декоратор это функция, которая оборачвает компонент. Он принимает на вход какой-либо компонент, который мы хотим задекорировать, для которого мы хотим добавить какую-либо функциональность, а возвращать будет новый компонент, его метод render должен вернуть то, чтобы из вне не знали завернутый это компонент или нет, т.к. это будет метод переиспользования кода (в реальном доме не должны знать что мы его декорировали) => новый компонент должен выглядеть точно так же как оригинальный, для этого создадим этот оригинальный компонент:
~~~~~   import React, {Component as ReactComponent} from 'react'

        export default (OriginalComponent) => class WrappedComponent extends ReactComponent {
            render() {
                return <OriginalComponent/>  // создали оригинальный компонент
            }
        }


что бы этот оригинальный компонент выглядел точно так же, сверху у него должен оставаться такой же API (WrappedComponent должен остаться такой же API как мы ожидали), для этого используем спред оператор {...this.props}, спред аналогичен тому что мы делаем в функции:

const func = (...args) => {
    console.log('__', ...args)
    return originalFunc(...args) //не важно тчо это за аргументы, мы просто передаем их транзитом из обвертки в нашу оригинальную фунцию
}

с компонентами все аналогично:

   ~~~~~   import React, {Component as ReactComponent} from 'react'

            export default (OriginalComponent) => class WrappedComponent extends ReactComponent {
                render() {
                   return <OriginalComponent {...this.props}/>
                }
            } 


если хотим использовать наш декоратор с каким либо компонентом, то заимпортим его в этот компонент (import toggleOpen from '../decorators/toggleOpen') (toggleOpen обычная функция которая принимает компонент и возвращает тоже компонент, мы будем передавать в эту функцию компонент Article а возвращать обвертку над этим Article ), а вот экспортить мы будем обернутый компонент! (export default toggleOpen(Article)) => в ArticleList будет уже использовать не Article а обертку над статьей

затем в обертку добавим функционал который хотим переиспользовать => вынесем инициализацию состояния и метод которы умеет управлть этим => передадим их в компонент с помощью пропсов: <OriginalComponent isOpen = {...this.state.isOpen}/{...this.state} toggleOpen = {this.toggleOpen}/> 
=> в компоненте читаем  isOpen не  из state (const {isOpen} = this.state) а из props ((const {article, props, toggleOpen} = this.state) => компонент стал теперь без состояния (state вынесли в декоратор) теперь его можно сделать простой функцией;

~~~~~

#Дополнительные настройки для babel
добавим в пресеты(presets) react-hmre (в package добавим "babel-preset-react-hmre": "^1.1.1"):
    {
        "presets": ["react", "es2015", "stage-0", "react-hmre"]
    }
получим функционал Hot-Loader   


~~~~
у компонентов описанных классом/react.creatClass есть доступ к методам жизненного цикла => мы можем следить что в них происходит: когда инициализируются, как обновляютс, как умирают и т.д.
Инициализация: constructor(props) -> componentWillMoumt{}(используют для запроса данных, вызовов каких либо методов необходимых для последующей работы этого компонента, например: строим статью, а для статьи еще нет данных, а ее открыли - можем через componentWillMoumt вызвать обращение к серверу) -> render() -> componentDidMount() 









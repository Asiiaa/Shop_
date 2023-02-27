import Categories from "./components/Categories";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Items from "./components/Items";
import React from "react";
import ShowFullItem from "./components/ShowFullItem";
class App extends React.Component {// преобразуем функцию в класс, чтобы создать массив мебели, чтобы работать с состояниями, через функцию это useState
  constructor(props){
    super(props)
    this.state = { //состояния
      orders: [],
      currentItems: [],
      items: [
        {
          id:1,
          title: 'Стул серый',
          img: '11.webp',
          desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
          category: 'chairs',
          price: '49.99'
        },
        {
          id:2,
          title: 'Стол мраморный',
          img: '22.webp',
          desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
          category: 'tables',
          price: '79.99'
        },
        {
          id:3,
          title: 'Кресло',
          img: '33.jpg',
          desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
          category: 'armchair',
          price: '89.99'
        },
        {
          id:4,
          title: 'Диван',
          img: '4.webp',
          desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
          category: 'sofa',
          price: '109.99'
        },
        {
          id:5,
          title: 'Стулья',
          img: '3.jpg',
          desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
          category: 'chairs',
          price: '89.99'
        }
      ],
      showFullItem: false,
      fullItem: {},
    }
    this.state.currentItems = this.state.items
    this.addToOrder = this.addToOrder.bind(this) // означает, что мы можем в методе addToOrder взаимодействовать с состояниями
    this.deleteOrder = this.deleteOrder.bind(this)
    this.chooseCategory = this.chooseCategory.bind(this)
    this.onShowItem = this.onShowItem.bind(this)
  }
  render() {
    return (
      <div className="wrapper">
        <Header orders={this.state.orders} onDelete={this.deleteOrder}/>
        <Categories chooseCategory={this.chooseCategory}/>
        <Items onShowItem={this.onShowItem} items={this.state.currentItems} onAdd={this.addToOrder}/>
        {this.state.showFullItem && <ShowFullItem item={this.state.fullItem} onShowItem={this.onShowItem} onAdd={this.addToOrder}/>}
        <Footer/>
      </div>
    )
  }
  
  onShowItem(item) {
    this.setState({fullItem: item})
    this.setState({showFullItem: !this.state.showFullItem})
  }

  chooseCategory(category) {
    if(category === 'all') {
      this.setState({currentItems: this.state.items})
      return
    }
    this.setState({
      currentItems: this.state.items.filter(el => el.category === category)
    })
  }

  deleteOrder(id) {
    this.setState({orders: this.state.orders.filter(el => el.id !== id)})
  }
  
  addToOrder(item) {
    let isInArray = false;
    this.state.orders.forEach(el => {
      if(el.id === item.id) isInArray = true
    })
    if(!isInArray) this.setState({orders: [...this.state.orders, item]})
  }
}

export default App;

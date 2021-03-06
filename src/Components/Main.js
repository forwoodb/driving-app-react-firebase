import React, {useState, useEffect} from 'react';
// import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from '../firebase.js';

// Components
import HeaderNavbar from './Navbar.js';
import NewOrder from './NewOrder.js';
import UpdateArea from './UpdateArea.js';
import EditOrder from './EditOrder.js';
import Analysis from './Analysis.js';

function Main(props) {
  const [orders, setOrders] = useState([]);
  const [areas, setAreas] = useState([]);
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState('');

  useEffect(() => {
    firebase.database().ref('orders').on('value', (snapshot) => {
      const data = snapshot.val();
      let orders = [];

      let user;
      if (props.user) {
        user = props.user;
      } else {
        user = 'demo';
      }

      for (var order in data) {
        if (data[order].user === user) {
          orders.push({
            id: order,
            user: data[order].user,
            ...data[order],
            location: data[order].location.replace("’", "'"),
          })
        }
      }

      // Locations list
      let locations = orders.map(order => order.location);
      locations = [...new Set(locations)];

      // Areas list
      let areas = orders.map(order => order.area);
      areas = [...new Set(areas)];

      setOrders(orders);
      setLocations(locations);
      setAreas(areas);
      console.log(user);
    })
  }, [props.user])

  const deleteOrder = (delOrder) => {
    firebase.database().ref('orders/' + delOrder).remove();
  }

  return (
    <div className="container">
      <Router>
        <HeaderNavbar
          user={props.user}
          logout={props.logout}
          login={props.login}
        />
        <Route exact path="/">
          <NewOrder
            user={props.user}
            logout={props.logout}
            login={props.login}
            locations={locations}
            areas={areas}
          />
        </Route>
        <Route path="/OrdersList">
          <UpdateArea
            user={props.user}
            logout={props.logout}
            login={props.login}
            // login={login}
            orders={orders}
            locations={locations}
            areas={areas}
            onDelete={deleteOrder}
          />
        </Route>
        <Route path="/Analysis">
          <Analysis
            user={props.user}
            logout={props.logout}
            login={props.login}
            orders={orders}
            locations={locations}
            areas={areas}
          />
        </Route>
        {/*<Route path="/Edit/:id" exact component={EditOrder}/>*/}
        <Route path="/Edit/:id" render={(props) => <EditOrder
                                                      user={props.user}
                                                      logout={props.logout}
                                                      login={props.login}
                                                      locations={locations}
                                                      areas={areas}
                                                      {...props}
                                                    />}/>
      </Router>
    </div>
  );
}

// class Main extends Component {
//   constructor() {
//     super();
//     this.__isMounted = false;
//     this.state = {
//       orders: [],
//       areas: [],
//       locations: [],
//       location: '',
//     }
//     this.deleteOrder = this.deleteOrder.bind(this);
//   }
//
//   getOrderData() {
//     firebase.database().ref('orders').on('value', (snapshot) => {
//       const data = snapshot.val();
//       let orders = [];
//
//       let user;
//       if (this.props.user) {
//         user = this.props.user;
//       } else {
//         user = 'demo';
//       }
//
//       for (var order in data) {
//         if (data[order].user === user) {
//           orders.push({
//             id: order,
//             user: data[order].user,
//             ...data[order],
//             location: data[order].location.replace("’", "'"),
//           })
//         }
//       }
//
//       // Locations list
//       let locations = orders.map(order => order.location);
//       locations = [...new Set(locations)];
//
//       // Areas list
//       let areas = orders.map(order => order.area);
//       areas = [...new Set(areas)];
//
//       this.__isMounted &&
//       this.setState({
//         orders: orders,
//         locations: locations,
//         areas: areas,
//       })
//       // console.log(user);
//     })
//   }
//
//   componentDidMount() {
//     this.__isMounted = true;
//     this.getOrderData();
//   }
//
//   componentWillUnmount() {
//     this.__isMounted = false;
//   }
//
//   deleteOrder(delOrder) {
//     firebase.database().ref('orders/' + delOrder).remove();
//   }
//
//   render() {
//     return (
//       <div className="container">
//         <Router>
//           <HeaderNavbar
//             user={this.props.user}
//             logout={this.props.logout}
//             login={this.props.login}
//           />
//           <Route exact path="/">
//             <NewOrder
//               user={this.props.user}
//               locations={this.state.locations}
//               areas={this.state.areas}
//             />
//           </Route>
//           <Route path="/OrdersList">
//             <UpdateArea
//               user={this.props.user}
//               login={this.login}
//               orders={this.state.orders}
//               locations={this.state.locations}
//               areas={this.state.areas}
//               onDelete={this.deleteOrder}
//             />
//           </Route>
//           <Route path="/Analysis">
//             <Analysis
//               user={this.props.user}
//               orders={this.state.orders}
//               locations={this.state.locations}
//               areas={this.state.areas}
//             />
//           </Route>
//           {/*<Route path="/Edit/:id" exact component={EditOrder}/>*/}
//           <Route path="/Edit/:id" render={(props) => <EditOrder
//                                                         user={this.props.user}
//                                                         locations={this.state.locations}
//                                                         areas={this.state.areas}
//                                                         {...props}
//                                                       />}/>
//         </Router>
//       </div>
//     );
//   }
// }

export default Main;
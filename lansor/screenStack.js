import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Login from './screens/login';
import Register from './screens/register';
import CustomerProfile from './screens/customerProfile';
import CustomerCarDetails from './screens/customerCarDetails';
import CustomerInitOrder from './screens/customerInitOrder';
import CustomerServiceOptions from './screens/customerServiceOptions';
import CustomerImageUpload from './screens/customerImageUpload';
import TechnicianProfile from './screens/technicianProfile';
import TechnicianOrders from './screens/technicianOrders';
import TechnicianOrderHistory from './screens/technicianOrderHistory';

const screens = {
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Prihlásenie'
    }
  },
  Register: {
    screen: Register,
    navigationOptions: {
      title: 'Registrácia do aplikácie'
    }
  },
  CustomerProfile: {
    screen: CustomerProfile,
    navigationOptions: {
      title: 'Môj profil'
    }
  },
  CustomerCarDetails: {
    screen: CustomerCarDetails,
    navigationOptions: {
      title: 'Stav vozidiel'
    }
  },
  CustomerInitOrder: {
    screen: CustomerInitOrder,
    navigationOptions: {
      title: 'Objednať vozidlo do servisu'
    }
  },
  CustomerServiceOptions: {
    screen: CustomerServiceOptions,
    navigationOptions: {
      title: 'Zvoľte požadované úkony'
    }
  },
  CustomerImageUpload: {
    screen: CustomerImageUpload,
    navigationOptions: {
      title: 'Nahrajte fotografiu auta'
    }
  },
  TechnicianProfile: {
    screen: TechnicianProfile,
    navigationOptions: {
      title: 'Môj pracovný profil'
    }
  },
  TechnicianOrders: {
    screen: TechnicianOrders,
    navigationOptions: {
      title: 'Moje aktuálne zákazky'
    }
  },
  TechnicianOrderHistory: {
    screen: TechnicianOrderHistory,
    navigationOptions: {
      title: 'História opravených vozidiel'
    }
  },
};

// home stack navigator screens
const ScreenStack = createStackNavigator(screens);

export default createAppContainer(ScreenStack);
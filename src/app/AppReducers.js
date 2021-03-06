import LoginReducer from '../view/login/LoginReducer';
import ProfileReducer from '../view/profile/ProfileReducer';
import MessengerReducer from '../view/messenger/MessengerReducer';
import OverviewReducer from '../view/overview/OverviewReducer';
import AccountReducer from '../view/account/AccountReducer';
import CardReducer from '../view/card/CardReducer';
import JournalReducer from '../view/journal/JournalReducer';
import ContactReducer from '../view/contact/ContactReducer';
import ContactDetailsReducer from '../view/contactDetails/ContactDetailsReducer';
import TransferReducer from '../view/transfer/TransferReducer';
import MenuReducer from '../view/menu/MenuReducer';


export default {
    login : LoginReducer,
    profile : ProfileReducer,
    messenger : MessengerReducer,
    overview : OverviewReducer,
    account : AccountReducer,
    card : CardReducer,
    journal : JournalReducer,
    contact : ContactReducer,
    contactdetails : ContactDetailsReducer,
    transfer : TransferReducer,
    menu : MenuReducer
};

import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import EmplyeeFormReducer from './EmployeeFormReducer';
import EmployeeReducer from './EmployeeReducer';

export default combineReducers({
  auth: AuthReducer,
  employeeForm: EmplyeeFormReducer,
  employees: EmployeeReducer
});

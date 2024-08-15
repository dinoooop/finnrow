import "./styles/grid.css";
import "./styles/responsive.css";
import "./styles/admin.css";
import "./styles/modal.scss";
import "./styles/front.scss";
import "./styles/front-responsive.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./front/pages/HomeScreen";
import ModuleIndexScreen from "./admin/module/ModuleIndexScreen";
import ModuleCreateScreen from "./admin/module/ModuleCreateScreen";
import ModuleEditScreen from "./admin/module/ModuleEditScreen";
import ModuleGenerateScreen from "./admin/module/ModuleGenerateScreen";

import FlushScreen from "./admin/general/FlushScreen";

import UserIndexScreen from "./admin/user/UserIndexScreen";
import UserCreateScreen from "./admin/user/UserCreateScreen";
import UserEditScreen from "./admin/user/UserEditScreen";

import AuthLoginScreen from "./admin/auth/AuthLoginScreen";
import AuthRegisterScreen from "./admin/auth/AuthRegisterScreen";
import AuthVerifyScreen from "./admin/auth/AuthVerifyScreen";
import AuthForgotPasswordScreen from "./admin/auth/AuthForgotPasswordScreen";
import AuthResetPasswordScreen from "./admin/auth/AuthResetPasswordScreen";
import AuthProfileScreen from "./admin/auth/AuthProfileScreen";
import AuthSecurityScreen from "./admin/auth/AuthSecurityScreen";
import AuthWelcomeScreen from "./admin/auth/AuthWelcomeScreen";

import AccountIndexScreen from "./admin/account/AccountIndexScreen";
import AccountCreateScreen from "./admin/account/AccountCreateScreen";
import AccountEditScreen from "./admin/account/AccountEditScreen";
import EntryCreateScreen from "./admin/entry/EntryCreateScreen";
import EntryIndexScreen from "./admin/entry/EntryIndexScreen";
import EntryEditScreen from "./admin/entry/EntryEditScreen";

import CategoryIndexScreen from "./admin/category/CategoryIndexScreen";
import CategoryCreateScreen from "./admin/category/CategoryCreateScreen";
import CategoryEditScreen from "./admin/category/CategoryEditScreen";

import QnoteIndexScreen from "./admin/qnote/QnoteIndexScreen";
import QnoteCreateScreen from "./admin/qnote/QnoteCreateScreen";
import QnoteEditScreen from "./admin/qnote/QnoteEditScreen";

import ReportCreateScreen from "./admin/report/ReportCreateScreen";
import ReportEditScreen from "./admin/report/ReportEditScreen";
import AccountYearReport from "./admin/report/AccountYearReport";
import AccountMonthReport from "./admin/report/AccountMonthReport";
import AccountTillReport from "./admin/report/AccountTillReport";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/login' element={<AuthLoginScreen />} />
          <Route path='/register' element={<AuthRegisterScreen />} />
          <Route path="/forgot-password" element={<AuthForgotPasswordScreen />} />
          <Route path="/reset-password/:process_link" element={<AuthResetPasswordScreen />} />
          <Route path="/welcome/:process_link" element={<AuthWelcomeScreen />} />

          <Route path='/admin/modules' element={<ModuleIndexScreen />} />
          <Route path='/admin/modules/create' element={<ModuleCreateScreen />} />
          <Route path='/admin/modules/:id' element={<ModuleEditScreen />} />
          <Route path='/admin/generate/:id' element={<ModuleGenerateScreen />} />

          <Route path='/admin/flush' element={<FlushScreen />} />

          <Route path='/admin/users' element={<UserIndexScreen />} />
          <Route path='/admin/users/create' element={<UserCreateScreen />} />
          <Route path='/admin/users/:id' element={<UserEditScreen />} />
          <Route path='/admin/profile' element={<AuthProfileScreen />} />
          <Route path='/admin/security' element={<AuthSecurityScreen />} />
          <Route path='/verify/:id' element={<AuthVerifyScreen />} />

          <Route path='/admin/accounts' element={<AccountIndexScreen />} />
          <Route path='/admin/accounts/create' element={<AccountCreateScreen />} />
          <Route path='/admin/accounts/:id' element={<AccountEditScreen />} />

          <Route path='/admin/entries' element={<EntryIndexScreen />} />
          <Route path='/admin/entries/create' element={<EntryCreateScreen />} />
          <Route path='/admin/entries/:id' element={<EntryEditScreen />} />

          <Route path='/admin/categories' element={<CategoryIndexScreen />} />
          <Route path='/admin/categories/create' element={<CategoryCreateScreen />} />
          <Route path='/admin/categories/:id' element={<CategoryEditScreen />} />

          <Route path='/admin/qnotes' element={<QnoteIndexScreen />} />
          <Route path='/admin/qnotes/create' element={<QnoteCreateScreen />} />
          <Route path='/admin/qnotes/:id' element={<QnoteEditScreen />} />

          <Route path='/admin/account-year-report' element={<AccountYearReport />} />
          <Route path='/admin/account-month-report' element={<AccountMonthReport />} />
          <Route path='/admin/account-till-report' element={<AccountTillReport />} />
          <Route path='/admin/reports/create' element={<ReportCreateScreen />} />
          <Route path='/admin/reports/:id' element={<ReportEditScreen />} />

        </Routes>
      </Router>
    </>

  );
}

export default App;

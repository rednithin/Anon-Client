import {
  configure,
  observable,
  action,
  get,
  flow,
  decorate,
  toJS,
  runInAction
} from "mobx";
import { GraphQLClient } from "graphql-request";
import jsCookie from "js-cookie";
import NProgress from "nprogress";
import {
  SIGNIN,
  SIGNUP,
  ADD_QUESTION,
  GET_QUESTION,
  ME,
  ADD_RESPONSE
} from "./queries";
import { DangerToaster, SuccessToaster } from "../components/Toaster";

const client = new GraphQLClient("http://localhost:4444", {
  credentials: "include",
  mode: "cors"
});

configure({ enforceActions: "observed" });
NProgress.configure({ showSpinner: false });

class Store {
  company = null;

  refresh = async () => {
    try {
      NProgress.start();
      const response = await client.request(ME);
      console.log(response);
      runInAction(() => {
        this.company = response.me;
      });
      SuccessToaster("Refreshed!");
    } catch (e) {
      DangerToaster(e.response.errors[0].message);
    } finally {
      NProgress.done();
    }
  };

  signin = async values => {
    try {
      NProgress.start();
      const response = await client.request(SIGNIN, values);
      console.log(response);
      runInAction(() => {
        this.company = response.signin;
      });
      SuccessToaster("Signed in!");
    } catch (e) {
      DangerToaster(e.response.errors[0].message);
    } finally {
      NProgress.done();
    }
  };

  signup = async values => {
    try {
      NProgress.start();
      const response = await client.request(SIGNUP, values);
      console.log(response);
      runInAction(() => {
        this.company = response.signup;
      });
      SuccessToaster("Signed up!");
    } catch (e) {
      DangerToaster(e.response.errors[0].message);
    } finally {
      NProgress.done();
    }
  };

  addQuestion = async values => {
    try {
      NProgress.start();
      await client.request(ADD_QUESTION, values);
      SuccessToaster("Question added!");
    } catch (e) {
      DangerToaster(e.response.errors[0].message);
    } finally {
      NProgress.done();
    }
  };

  addResponse = async values => {
    try {
      NProgress.start();
      await client.request(ADD_RESPONSE, values);
      SuccessToaster("Response added!");
    } catch (e) {
      DangerToaster(e.response.errors[0].message);
    } finally {
      NProgress.done();
    }
  };
  getQuestion = async values => {
    try {
      NProgress.start();
      const response = await client.request(GET_QUESTION, values);
      console.log(response);
      SuccessToaster("Responses fetched!");
      return response;
    } catch (e) {
      DangerToaster(e.response.errors[0].message);
      return null;
    } finally {
      NProgress.done();
    }
  };

  logout = () => {
    jsCookie.remove("token");
    this.company = null;
  };
}

decorate(Store, { company: observable, logout: action });

export default new Store();

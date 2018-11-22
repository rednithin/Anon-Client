import { decorate, toJS } from "mobx";

class Store {}

decorate(Store, {});

export default new Store();

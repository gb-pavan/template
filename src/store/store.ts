import { makeAutoObservable } from "mobx";

class Store {
  sidebarOpen = false;
  selectedItem = "";

  constructor() {
    makeAutoObservable(this);
  }

  toggleSidebar = () => {
    this.sidebarOpen = !this.sidebarOpen;
  };

  setSelectedItem = (item: string) => {
    this.selectedItem = item;
  };

  // Custom method to get the initial state
  getInitialState() {
    return {
      sidebarOpen: this.sidebarOpen,
      selectedItem: this.selectedItem,
    };
  }

  // Hydrate store with server-side state
  hydrate(data: Partial<Store>) {
    if (data.sidebarOpen !== undefined) this.sidebarOpen = data.sidebarOpen;
    if (data.selectedItem !== undefined) this.selectedItem = data.selectedItem;
  }
}

const store = new Store();
export default store;

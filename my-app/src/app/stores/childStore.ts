import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Child } from "../models/Child";
import { Parent } from "../models/Parent";

export default class ChildStore {
  childRegistry = new Map<string, Child>();
  selectedChild: Child | undefined = undefined;
  createdChild: Child | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  parentList: Child[] = []; // Add the authorList property
  searchResults: Child[] = [];


  constructor() {
    makeAutoObservable(this);
  }

  get children() {
    return Array.from(this.childRegistry.values());
  }

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  }

  // Inside your BookStore class
  loadChildren = async () => {
    try {
      const response = await agent.Children.list();
      runInAction(() => {
        this.childRegistry.clear(); // Clear existing books in the registry
        response.forEach((child: Child) => {
          this.setChild(child);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      this.loadingInitial = false;
      console.error(error);
    }
  };
  

  loadChild = async (id: string) => {
    this.loadingInitial = true;
    try {
      const child = await agent.Children.details(id);
      if (child) {
        this.selectedChild = child;
        this.loadingInitial = false;
        return child;
      } else {
        this.loading = true;
        const response = await agent.Children.details(id);
        runInAction(() => {
          this.selectedChild = response.data.data as Child;
          this.loadingInitial = false;
        });
        return response.data.data as Child;
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };

  
  createChild = async (child: Child) => {
    this.loading = true;
    try {
      const response = await agent.Children.create(child);
      runInAction(() => {
        if (response.data.data != null) {
          this.createdChild = response.data.data as Child;
          this.childRegistry.set(this.createdChild.id!, this.createdChild);
        }
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateChild = async (child: Child) => {
    this.loading = true;
    try {
      const response = await agent.Children.update(child.id, child);
      runInAction(() => {
        if (response.data.data != null) {
          const updatedChild = response.data.data as Child;
          this.childRegistry.set(updatedChild.id!, updatedChild);
          if (this.selectedChild && this.selectedChild.id === updatedChild.id) {
            this.selectedChild = updatedChild;
          }
        }
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteChild = async (id: string) => {
    this.loading = true;
    try {
      await agent.Children.delete(id);
      runInAction(() => {
        this.childRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  searchParentsByName = async (name: string) => {
    this.loadingInitial = true;
    try {
      const response = await agent.Children.searchByName(name);
      runInAction(() => {
        this.searchResults = response.data.data as Child[];
        this.loadingInitial = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };


 // Inside ChildStore class
searchChildrenByParentName = async (parentName: string) => {
    this.loadingInitial = true;
    try {
      const response = await agent.Children.searchByParentName(parentName);
      runInAction(() => {
        this.searchResults = response.data.data as Child[];
        this.loadingInitial = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };
  

  private setChild = (child: Child) => {
    this.childRegistry.set(child.id!, child);
  };
}

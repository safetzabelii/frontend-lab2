import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Parent } from "../models/Parent"; // Import Parent model
import { Child } from "../models/Child"; // Import Child model

export default class ParentStore {
  parentRegistry = new Map<string, Parent>();
  selectedParent: Parent | undefined = undefined;
  createdParent: Parent | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  parentList: Parent[] = []; // Define the parentList property
  searchResults: Parent[] = [];


  constructor() {
    makeAutoObservable(this);
  }

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  }

  get parents() {
    return Array.from(this.parentRegistry.values());
  }

  loadParent = async (id: string) => {
    this.loadingInitial = true;
    try {
      const parent = this.getParent(id);
      if (parent) {
        this.selectedParent = parent;
        this.loadingInitial = false;
        return parent;
      } else {
        this.loading = true;
        const response = await agent.Parents.details(id);
        runInAction(() => {
          this.selectedParent = response.data.data as Parent;
          this.loadingInitial = false;
        });
        return response.data.data as Parent;
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };
  
  loadParents = async () => {
  try {
    const result = await agent.Parents.list();
    if (Array.isArray(result)) { // Check if result is an array
      result.forEach((parent: Parent) => {
        this.setParent(parent);
      });
      runInAction(() => {
        this.parentList = result; // Populate the parentList property
      });
      this.setLoadingInitial(false);
    } else {
      console.error("Invalid API response:", result);
      this.setLoadingInitial(false);
    }
  } catch (error) {
    this.setLoadingInitial(false);
    console.log(error);
  }
};

  

  createParent = async (parent: Parent) => {
    this.loading = true;
    try {
      const response = await agent.Parents.create(parent);
      runInAction(() => {
        if (response.data.data != null) {
          this.createdParent = response.data.data as Parent;
          this.parentRegistry.set(this.createdParent.id.toString()!, this.createdParent);
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

  updateParent = async (parent: Parent) => {
    this.loading = true;
    try {
      const response = await agent.Parents.update(parent.id, parent);
      runInAction(() => {
        if (response.data.data != null) {
          const updatedParent = response.data.data as Parent;
          
          this.parentRegistry.set(updatedParent.id.toString()!, updatedParent);
          
          if (this.selectedParent && this.selectedParent.id === updatedParent.id) {
            this.selectedParent = updatedParent;
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

  deleteParent = async (id: string) => {
    this.loading = true;
    try {
      await agent.Parents.delete(id);
      runInAction(() => {
        this.parentRegistry.delete(id);
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
      const response = await agent.Parents.searchByName(name);
      runInAction(() => {
        this.searchResults = response.data.data as Parent[];
        this.loadingInitial = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };

  private getParent = (id: string) => {
    return this.parentRegistry.get(id);
  };

  private setParent = (parent: Parent) => {
    this.parentRegistry.set(parent.id, parent);
  };
}

export interface ResourceType {
    ResourceID: string;
    ResourceType: string;
  }
  
  export interface Slot {
    Slot: string;
  }
  
  export interface ResourceResponse {
    ResourceType: ResourceType[];
  }
  
  export interface SlotResponse {
    newResourceSlotList: Slot[];
  }
  
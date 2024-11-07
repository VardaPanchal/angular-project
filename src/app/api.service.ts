import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://apim.quickwork.co/employeelogin/ng/version'; 

  constructor() {}


  getAvailableResources(): Promise<any> {
    return fetch(`${this.apiUrl}/get`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'ApiKey': 'bgbuAhSnaPPERAG2Mc6JDqeazTyGguN9',
      },
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error fetching available resources:', error);
        throw error;
      });
  }


  getAvailableSlots(resourceType: string): Promise<any> {
    return fetch(`${this.apiUrl}/slot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ApiKey': 'bgbuAhSnaPPERAG2Mc6JDqeazTyGguN9',
      },
      body: JSON.stringify({ ResourceType: resourceType }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error fetching available slots:', error);
        throw error;
      });
  }


  bookSlot(data: any): Promise<any> {
    return fetch(`${this.apiUrl}/book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ApiKey': 'bgbuAhSnaPPERAG2Mc6JDqeazTyGguN9',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error booking slot:', error);
        throw error;
      });
  }


  cancelBooking(data: { Name: string; Email: string }): Promise<any> {
    return fetch(`${this.apiUrl}/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ApiKey': 'bgbuAhSnaPPERAG2Mc6JDqeazTyGguN9',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error canceling booking:', error);
        throw error;
      });
  }
  searchBooking(data: { Name: string; Email: string }): Promise<any> {
    return fetch(`${this.apiUrl}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ApiKey': 'bgbuAhSnaPPERAG2Mc6JDqeazTyGguN9',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error searching for booking:', error);
        throw error;
      });
  }

  // Update a booking
  updateBooking(data: { Name: string; Email: string }): Promise<any> {
    return fetch(`${this.apiUrl}/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ApiKey': 'bgbuAhSnaPPERAG2Mc6JDqeazTyGguN9',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error updating booking:', error);
        throw error;
      });
  }
}


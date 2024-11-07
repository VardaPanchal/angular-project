import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';  
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Resource {
  ResourceType: string;
  text: string;
  value: string | number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, FormsModule],
})
export class AppComponent implements OnInit {
  resources: Resource[] = [];
  slots: string[] = [];
  selectedResource: string = '';
  selectedSlot: string = '';
  formSubmitted: boolean = false;

  form: { name: string; email: string } = { name: '', email: '' };
  deleteForm: { name: string; email: string } = { name: '', email: '' };
  updateForm: { name: string; email: string } = { name: '', email: '' };

  showUpdateForm: boolean = false;
  existingName: string = '';

  currentForm: 'booking' | 'delete' | 'update' = 'booking';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadResources();
  }

  loadResources(): void {
    this.apiService.getAvailableResources().then((data: any) => {
      this.resources = data.ResourceType.map((item: any) => ({
        value: item.text,
        text: item.text,
      }));
    }).catch((error: Error) => {
      console.error('Error fetching available resources:', error);
    });
  }

  onSubmit(): void {
    const payload = {
      ResourceType: this.selectedResource,
      Slot: this.selectedSlot,
      Name: this.form.name,
      Email: this.form.email,
    };

    this.apiService.bookSlot(payload).then((response: any) => {
      this.formSubmitted = true;
    }).catch((error: Error) => {
      console.error('Error booking slot:', error);
    });
  }

  onResourceTypeChange(event: Event): void {
    const resourceType = (event.target as HTMLSelectElement).value;
    this.selectedResource = resourceType;

    this.apiService.getAvailableSlots(resourceType).then((data: any) => {
      this.slots = data.newResourceSlotList.map((slot: any) => slot.value);
    }).catch((error: Error) => {
      console.error('Error fetching available slots:', error);
    });
  }

  onNameChange(event: Event): void {
    this.form.name = (event.target as HTMLInputElement).value;
  }

  onEmailChange(event: Event): void {
    this.form.email = (event.target as HTMLInputElement).value;
  }

  onSlotChange(event: Event): void {
    this.selectedSlot = (event.target as HTMLSelectElement).value;
  }

  onDeleteBooking(): void {
    const { name, email } = this.deleteForm;
    if (name && email) {
      const payload = { Name: name, Email: email };

      this.apiService.cancelBooking(payload).then((response: any) => {
        console.log('Booking deleted:', response);
      }).catch((error: Error) => {
        console.error('Error deleting booking:', error);
      });
    } else {
      console.error('Name and Email are required for deletion.');
    }
  }

  onCheckBooking(): void {
    const { name, email } = this.form;
    if (name && email) {
      const payload = { Name: name, Email: email };


      this.apiService.searchBooking(payload).then((response: any) => {
        console.log('Search Booking Response:', response); 

        if (response.status === 'success') {
          this.showUpdateForm = true;  
          alert('Booking found. You can now update the email.');
        } else {
          alert('No booking found for the provided name and email.');
        }
      }).catch((error: Error) => {
        console.error('Error searching booking:', error);
        alert('Error occurred while searching booking.');
      });
    } else {
      alert('Please provide both name and email to check the booking.');
    }
  }


  onUpdateBooking(): void {
    const { email } = this.updateForm;
    const { name } = this.form; 

    if (email && name) {  
      const payload = { Name: name, Email: email };

      this.apiService.updateBooking(payload).then((updateResponse: any) => {
        if (updateResponse.status === 'success') {
          alert('Booking updated successfully!');
          this.showUpdateForm = false;  
        } else {
          alert('Error updating booking.');
        }
      }).catch((error: Error) => {
        console.error('Error updating booking:', error);
        alert('Error occurred while updating booking.');
      });
    } else {
      alert('Please provide a valid email to update the booking.');
    }
  }


  switchForm(form: 'booking' | 'delete' | 'update'): void {
    this.currentForm = form;
    this.showUpdateForm = false; 
  }
}

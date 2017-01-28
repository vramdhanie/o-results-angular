import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {

  // List of status types
  statuses: string[] = ['Registered', 'Checked-In', 'On-Course', 'Completed'];
  // The current status of the student, defaults to 'Registered'
  @Output() currentStatus: string = this.statuses[0];
  // Property to represent the CSS class for each status type
  currentBackgroundClass: string = this.currentStatus.toLowerCase();
  // Counter to determine the index number of the status in the array
  statusNumber: number = 0;

  // Method to update the status when clicked
  updateStatus(e) {
    e.preventDefault();
    // Increment the index on each click
    this.statusNumber = (this.statusNumber + 1) % 4;
    this.currentStatus = this.statuses[this.statusNumber];
    // Update the status property of the result for the student

    // Change the CSS class when the status changes
    this.currentBackgroundClass = this.currentStatus.toLowerCase();
  }

}

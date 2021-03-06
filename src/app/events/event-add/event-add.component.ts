import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Event } from '../../models/event.model';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.scss']
})
export class EventAddComponent implements OnInit {

  event: Event;
  placeholders: any = {
    name: null,
    location: null,
    date: null
  };
  eventAddForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private eventService: EventService
  ) { }

  formatDate(date: Date): string {
    let year: number = date.getFullYear();

    let month: string | number = date.getMonth();
    if (month < 10) {
      month = '0' + month;
    }
    let day: string | number = date.getDate();
    if (day < 10) {
      day = '0' + day;
    }
    return `${year}-${month}-${day}`;
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      // Route params are always strings
      let id: string = params['id'];
      if (id) {
        // Get event from service
        this.event = this.eventService.getEventById(id);
        this.placeholders = {
          name: this.event.name,
          location: this.event.location,
          date: this.formatDate(new Date(this.event.date))
        };
        console.log(this.event);
      }
    });
    this.eventAddForm = new FormGroup({
      name: new FormControl(this.placeholders.name, Validators.required),
      location: new FormControl(this.placeholders.location, Validators.required),
      date: new FormControl(this.placeholders.date, Validators.required)
    });
  }

  onSubmit(): void {
    console.log(this.eventAddForm.value);
    if (!this.event) {
      this.eventService.addEvent(this.eventAddForm.value)
        .subscribe(
        data => console.log(data),
        error => console.log(error)
        );
    } else {
      Object.assign(this.event, this.eventAddForm.value);
      this.eventService.updateEvent(this.event)
        .subscribe(
        data => console.log(data),
        error => console.log(error)
        );
    }
    this.eventAddForm.reset();
    this.router.navigate(['/dashboard']);
  }

  goBack(link) {
    this.location.back();
  }

}

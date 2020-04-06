import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from 'src/app/dialog/dialog/dialog.component';

export interface DialogInput {
  minWidth: string;
  data: {
    title: string,
    type: string,
    displayFooter: boolean,
    displayTitle: boolean,
    objectId?: string;
    recordId?: string
  }
}
export interface ToasterData {
  message: string;
  type?: string;
  title?: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('login', { static: false }) loginElement: ElementRef;
  @ViewChild('modal', { static: false }) modalEle: ElementRef;
  @ViewChild('contactForm', { static: false }) contactForm: ElementRef;
  @ViewChild('messageForm', { static: false }) messageForm: ElementRef;
  @ViewChild('reviewForm', { static: false }) reviewForm: ElementRef;
  @ViewChild('logout', { static: false }) logout: ElementRef;
  @ViewChild('tabsList', { static: false }) tabsList: ElementRef;
  @ViewChild('manageGrid', { static: false }) manageGrid: ElementRef;
  @ViewChild('meetingsView', { static: false }) meetingsView: ElementRef;

  isAboutYou = true;
  isContact = false;
  isUserLoginSuccess = false;
  isProfile = false;
  isEmployee = false;
  canAddEmployee = false;
  isVisitor = false;
  isMeeting = true;
  canAddMeeting = true;
  isManageMeeting = false;
  isMeetingType = false;
  canAddMeetingType = false;
  isLeadContact = false;
  todayView = true;
  tomorrowView = false;
  allView = false;
  lastSevenDaysView = false;
  showToaster = false;
  toasterData: ToasterData;
  previewMeetingObjectId: string;
  previewMeetingRecordId: string;

  userId: string;
  userRole: string;
  meetingObjectId: string;
  columnMeta = `first_name:First name:STRING:true:false@|@last_name:Last name:true:false`;
  meetingColumnMeta = `visitor_record:Visitor:LOOKUP:true:false@|@status:Status:PICK_LIST:true:false@|@meeting_with:Meeting with:LOOKUP:true:false@|@schedule_at:Schedule at:DATETIME:true:false`;
  leadContactColumnMeta = `first_name:Name:STRING:true:false@|@email:Email:EMAIL:true:false@|@subject:Subject:STRING:true:false@|@message:Message:STRING:true:false`;
  css = ``;
  viewId: string;
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  userLogin() {
    const dialogInput = {
      minWidth: '28%',
      data: {
        type: 'login-form',
        title: 'Please Login',
        displayFooter: false,
        displayTitle: false
      }
    };
    this.openDialog(dialogInput).subscribe(data => {
      if (data && data['profile']['fullName']) {
        this.userRole = data['userLegacyData']['current_role_name'] ? data['userLegacyData']['current_role_name'] : '';
        this.isUserLoginSuccess = true;
        this.userId = (data['userCustomFields'] && data['userCustomFields']['employee_id']) ? data['userCustomFields']['employee_id'] : '';
        setTimeout(() => {
          if (this.userRole === 'Employee') {
            this.viewId = 'e581a8415ad046d88b8ec46cd860fe0f';
            this.meetingObjectId = '663cf612431049dbb9ba4ecd46dd32f1';
          } else {
            this.viewId = '3abd133ab3d74aedbc4713c664de4a47';
            this.meetingObjectId = '663cf612431049dbb9ba4ecd46dd32f1';
          }
        }, 0);
      }
    });
  }
  openDialog(dialogInput: DialogInput) {
    const dialogRef = this.dialog.open(DialogComponent, dialogInput);
    return dialogRef.afterClosed();
  }
  scroll(el: HTMLElement, containerName: string) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    switch (containerName) {
      case 'about':
        this.isAboutYou = true;
        this.isContact = false;
        break;
      case 'contact':
        this.isContact = true;
        this.isAboutYou = false;
        break;
      default:
        break;
    }
  }
  openProfile() {
    this.isProfile = true;
    this.isAboutYou = false;
    this.isContact = false;
  }
  tableSelectionChangeHandler(eve) {
  }
  viewRecords(viewid: string, day: string) {
    if (this.userRole === 'Employee' && day === 'today') {
      this.viewId = 'e581a8415ad046d88b8ec46cd860fe0f';
    }
    if (this.userRole === 'Employee' && day === 'tomorrow') {
      this.viewId = '0ceb3f3041124f1ba70d295c0a6b99e2';
    }
    if (this.userRole === 'Employee' && day === 'all') {
      this.viewId = '523b3982552c4f6199299b92ab04259a';
    }
    if (this.userRole === 'Employee' && day === 'lastSeven') {
      this.viewId = '9817a95ad113447f889525de9056e132';
    }
    if (this.userRole === 'Employee' && day === 'upcoming') {
      this.viewId = '734d07e0faeb4f978a3f50438351588b';
    }
    this.viewId = viewid;
    switch (day) {
      case 'today':
        this.todayView = true;
        this.tomorrowView = false;
        this.lastSevenDaysView = false;
        this.allView = false;
        break;
      case 'tomorrow':
        this.tomorrowView = true;
        this.todayView = false;
        this.lastSevenDaysView = false;
        this.allView = false;
        break;
      case 'upcoming':
        this.allView = true;
        this.todayView = false;
        this.tomorrowView = false;
        this.lastSevenDaysView = false;
        break;
      case 'lastSeven':
        this.lastSevenDaysView = true;
        this.todayView = false;
        this.tomorrowView = false;
        this.allView = false;
        break;
      default:
        break;
    }
  }
  addEmployee(titleStr: string, objectName: string) {
    const dialogInput = {
      minWidth: '40%',
      data: {
        title: titleStr,
        type: 'object-form',
        displayFooter: true,
        displayTitle: true,
        recordId: '-1'
      }
    }
    this.openDialog(dialogInput).subscribe(data => {
      if (data && data['showToaster']) {
        if (data['toasterData']) {
          this.toasterData = data['toasterData'];
        } else {
          this.toasterData = {
            message: 'A new ' + objectName + ' created successfully!',
            title: 'Success!'
          };
          if (objectName === 'meeting' && this.viewId === '3abd133ab3d74aedbc4713c664de4a47') {
            this.viewId = '';
            setTimeout(function () {
              this.viewId = '3abd133ab3d74aedbc4713c664de4a47';
            }.bind(this), 100);
          }
          if (objectName === 'meeting' && this.viewId === '18fe868e6c44404db0d14ffdf0cb3edb') {
            this.viewId = '';
            setTimeout(function () {
              this.viewId = '18fe868e6c44404db0d14ffdf0cb3edb';
            }.bind(this), 100);
          }
          if (objectName === 'meeting' && this.viewId === '7c134d718eba4d5f8b4cdd3177095112') {
            this.viewId = '';
            setTimeout(function () {
              this.viewId = '7c134d718eba4d5f8b4cdd3177095112';
            }.bind(this), 100);
          }
          this.showToaster = data['showToaster'];
        }
      }
    });
  }
  saveContactForm() {
    const contactData = this.contactForm.nativeElement.getRecordData();
    this.reviewForm.nativeElement.setRecordData(contactData);
    const messageData = this.messageForm.nativeElement.getRecordData();
    this.reviewForm.nativeElement.setRecordData(messageData);

    if (this.contactForm.nativeElement.isValid() && this.messageForm.nativeElement.getRecordData()) {
      this.reviewForm.nativeElement.saveRecord();
    }
    this.reviewForm.nativeElement.addEventListener('save', (event) => {
      if (event && event['detail']['status'] && event['detail']['status'] === 'success') {
        this.toasterData = {
          message: 'Thank you for contact us!'
        };
        this.showToaster = true;
        this.reviewForm.nativeElement.resetRecord();
      } else {

      }
    });
  }
  userLogout(eve) {
    if (eve) {
      window.location.href = '/';
    }
  }
  tabInfo(tabsList) {
    this.tabsList.nativeElement.addEventListener('selectionChange', (eventData) => {
      const recordData = eventData['detail'];
      if (recordData['id'] === '663cf612431049dbb9ba4ecd46dd32f1') {
        // meeting
        setTimeout(() => {
          if (this.userRole === 'Employee') {
            this.viewId = 'e581a8415ad046d88b8ec46cd860fe0f';
          } else {
            this.viewId = '3abd133ab3d74aedbc4713c664de4a47';
          }
        }, 0);
        this.isMeeting = true;
        this.canAddMeeting = recordData['canAdd'];
        this.isEmployee = false;
        this.isVisitor = false;
        this.isMeetingType = false;
        this.isManageMeeting = false;
        this.isLeadContact = false;
      }
      if (recordData['id'] === 'd833a62f32da4fbd92ec1a028da54b91') {
        // employee
        this.isMeeting = false;
        this.isEmployee = true;
        this.canAddEmployee = recordData['canAdd'];
        this.isVisitor = false;
        this.isMeetingType = false;
        this.isManageMeeting = false;
        this.isLeadContact = false;
      }
      if (recordData['id'] === 'f69b030f855046a4b498024c2d2ff7ed') {
        // visitors
        this.isVisitor = true;
        this.isEmployee = false;
        this.isMeeting = false;
        this.isMeetingType = false;
        this.isManageMeeting = false;
        this.isLeadContact = false;
      }
      if (recordData['id'] === '17cdf6290e724168a04ff525fc86661e') {
        // meeting type
        this.isMeetingType = true;
        this.canAddMeetingType = recordData['canAdd'];
        this.isEmployee = false;
        this.isMeeting = false;
        this.isVisitor = false;
        this.isManageMeeting = false;
        this.isLeadContact = false;
      }
      if (recordData['id'] === 'd98579c0ce254dfc905b5dccf033437c') {
        // lead contact
        this.isLeadContact = true;
        this.isMeetingType = false;
        this.isEmployee = false;
        this.isMeeting = false;
        this.isVisitor = false;
        this.isManageMeeting = false;
      }
    });
    let callbackFn = function () { };
    this.tabsList.nativeElement.removeEventListener('selectionChange', callbackFn);
  }
  manageList(type: string) {
    if (type === 'meeting') {
      this.isManageMeeting = true;
      this.isMeeting = false;
      this.isEmployee = false;
      this.isMeetingType = false;
      this.isProfile = false;
      this.isVisitor = false;
    }
  }
  onMacroExecution(eve) {
    if (eve['detail']['type'] === 'Successful') {
      this.manageGrid.nativeElement.inputFilter = '';
    }
  }
  onMeetingSelection(event) {
    if (event && event['detail']) {
      this.previewMeetingObjectId = event['detail']['objectId'];
      this.previewMeetingRecordId = event['detail']['recordId'];
      const dialogInput = {
        minWidth: '40%',
        data: {
          title: 'Manage meeting',
          type: 'object-form',
          displayFooter: false,
          displayTitle: true,
          recordId: this.previewMeetingRecordId
        }
      }
      this.openDialog(dialogInput).subscribe(data => {
        if (data) {
          if (this.viewId === '3abd133ab3d74aedbc4713c664de4a47') {
            this.viewId = '';
            setTimeout(function () {
              this.viewId = '3abd133ab3d74aedbc4713c664de4a47';
            }.bind(this), 100);
          }
          if (this.viewId === '18fe868e6c44404db0d14ffdf0cb3edb') {
            this.viewId = '';
            setTimeout(function () {
              this.viewId = '18fe868e6c44404db0d14ffdf0cb3edb';
            }.bind(this), 100);
          }
          if (this.viewId === '7c134d718eba4d5f8b4cdd3177095112') {
            this.viewId = '';
            setTimeout(function () {
              this.viewId = '7c134d718eba4d5f8b4cdd3177095112';
            }.bind(this), 100);
          }
          if (data['toasterMessage']) {
            this.showToaster = data['showToaster'];
            this.toasterData = {
              message: data['toasterMessage']
            };
          }
        }
      });
    }
  }
  resetTheToaster(showToaster) {
    this.showToaster = !showToaster;
  }
}

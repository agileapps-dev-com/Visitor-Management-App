import { Component, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  title: string;
  data: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  @ViewChild('meeting', { static: false }) meeting: ElementRef;

  meetingRecordId: string;
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.meetingRecordId = data['recordId'] ? data['recordId'] : '';
  }

  closeDialog(data): void {
    this.dialogRef.close(data);
  }
  loginSuccessHandler(eve) {
    this.closeDialog(eve['detail'] ? eve['detail'] : {});
  }
  loginFailureHandler(eve) {
  }
  saveRecord(type: ElementRef) {
    this.meeting.nativeElement.saveRecord();
    this.meeting.nativeElement.addEventListener('save', (event) => {
      if (event && event['detail']['status'] && event['detail']['status'] === 'success') {
        const data = {
          recordData: event['detail']['data']['record'],
          showToaster: true
        };
        this.closeDialog(data);
      } else {

      }
    });
  }
  getPrint() {
    const url = '/networking/RelationalsDocPreview.pdf?contact_id=&t=498&total_records=&doc_id=0c042d50395444cca5d211004925e94d&print_form_id=&c_id=1752128868&offline=0&scheduled=0&mass_operation_layout_id=&background=0&reference_type=663cf612431049dbb9ba4ecd46dd32f1&view_id=663cf612431049dbb9ba4ecd46dd32f1&object_id=663cf612431049dbb9ba4ecd46dd32f1&reference_id=461553558&id=' + this.meetingRecordId + '&landscape=0&pdf_format=0&y.pdf'
    window.open(url, '_blank');
    this.closeDialog({});
  }
  whenActionIsPerformed(eve) {
    if (eve['detail']['status'] === 'Success') {
      const data = {
        showToaster: true,
        toasterData: {
          'title': 'Success!'
        }
      };
      switch (eve['detail']['id']) {
        case '8ac553c584a0447faa2d43923850b852':
          data['toasterMessage'] = 'Check-in updated successfully!';
          break;
        case '49c410db6a8e40faa8e97f9136c12b3e':
          data['toasterMessage'] = 'Check-out time updated successfully!';
          break;
        case 'e364c63369974d0a91416ef3055b3ee9':
          data['toasterMessage'] = 'Scheduled meeting has been cancelled!';
          break;
        default:
          break;
      }
      
      this.closeDialog(data);
    }
  }
}

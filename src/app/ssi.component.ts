import {Component} from '@angular/core';
import {LoadDummyInformationService} from './load-dummy-information.service';

@Component({
  selector: 'ssi-root',
  templateUrl: './ssi.component.html',
  styleUrls: ['./ssi.component.scss']
})
export class SsiComponent {

  constructor(private _loadDummyEmployeesService: LoadDummyInformationService) {

  }
}

import {Component, Input} from '@angular/core';

@Component({
  selector: 'ub-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  name = 'Fiona';
  userpicpath = 'https://scontent-frx5-1.xx.fbcdn.net/v/t1.0-9/23843516_1963815103906683' +
    '_3028246563239139756_n.jpg?oh=763e984561b6767458eecaaa75385e9d&oe=5AFC14C9';

}

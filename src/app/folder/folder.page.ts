import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { sharedService } from '../services/shared.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  user: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sharedService: sharedService
  ) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.getCredentials();
  }
  getCredentials() {
    const data = this.sharedService.getCredentials();
    this.user = data ? data : {};
    console.log(`data is `, data);
  }
}

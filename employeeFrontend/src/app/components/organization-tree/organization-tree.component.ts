import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-organization-tree',
  templateUrl: './organization-tree.component.html',
  styleUrls: ['./organization-tree.component.css']
})
export class OrganizationTreeComponent implements OnInit {

  constructor( private backend:BackendService) { }
  companyId = localStorage.getItem('CompId');
  tree: TreeNode[] = [];
  


  ngOnInit(): void {
    this.getOrgData()
  }

  getOrgData(): void {
    this.backend.getOrganizationTree(this.companyId).subscribe((data:any) => {
      this.tree = this.mapToTreeNodes(data);
    
    });
  }

  mapToTreeNodes(data: any[]): TreeNode[] {
    return data.map(manager => {
      const children = manager.childerns || [];
      const mappedChildren = this.mapToTreeNodes(children);
      const treeNode: TreeNode = {
        label: manager.name,
        data: manager,
        expanded: true,
        type:'v',
        styleClass:'bg-red text-black',
        children: mappedChildren
      };
      return treeNode;
    });
  }
  
 
}







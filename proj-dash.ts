import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Project {
  projectName: string;
  projectOwner: number;
  startDate: string;
  endDate: string;
}

interface Issue {
  id: number;
  assignee: number;
  createdOn: string;
  description: string;
  lastUpdated: string;
  priority: string;
  project: number;
  status: string;
  summary: string;
  createdBy: number;
  sprint: string;
  storyPoint: number;
  tags: string;
  type: string;
}

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrl: './project-dashboard.component.css'
})
export class ProjectDashboardComponent implements OnInit {
  ownerId: number = 1003; // This would typically come from a login service
  projects: Project[] = [];
  issues: Issue[] = [];
  selectedProject: Project | null = null;
  filteredIssues: Issue[] = [];
  assigneeFilter: string = '';
  priorityFilter: string = '';
  searchTerm: string = '';

  statusColumns: string[] = ['TO-DO', 'DEVELOPMENT', 'TESTING', 'COMPLETED'];
 
  constructor(private datePipe: DatePipe) {}
  ngOnInit() {
    this.loadProjects();
    this.loadIssues();
  }
  formatDate(date: string | undefined): string {
    return date ? (this.datePipe.transform(date, 'dd-MM-yyyy') || date) : 'N/A';
  }

  // Add this new method
  getProjectOwner(): string {
    return this.selectedProject ? this.selectedProject.projectOwner.toString() : 'N/A';
  }


  loadProjects() {
    // This would typically be an API call
    this.projects = [
      {
        projectName: "Devops",
        projectOwner: 1003,
        startDate: "2024-01-01",
        endDate: "2024-01-01"
      }
    ].filter(project => project.projectOwner === this.ownerId);

    if (this.projects.length > 0) {
      this.selectedProject = this.projects[0];
    }
  }

  loadIssues() {
    // This would typically be an API call
    this.issues = [
      {
        id: 1,
        assignee: 1004,
        createdOn: "2024-01-01",
        description: "sample",
        lastUpdated: "2024-01-01",
        priority: "HIGH",
        project: 1003,
        status: "DEVELOPMENT",
        summary: "Sample issue",
        createdBy: 1003,
        sprint: "Sprint 1",
        storyPoint: 5,
        tags: "bug",
        type: "BUG"
      }
    ];
    this.filterIssues();
  }

  onProjectChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedProject = this.projects.find(p => p.projectName === selectElement.value) || null;
    this.filterIssues();
  }

  filterIssues() {
    if (this.selectedProject) {
      this.filteredIssues = this.issues.filter(issue => 
        issue.project === this.selectedProject!.projectOwner &&
        (this.assigneeFilter === '' || issue.assignee.toString() === this.assigneeFilter) &&
        (this.priorityFilter === '' || issue.priority === this.priorityFilter) &&
        (this.searchTerm === '' || 
          issue.summary.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          issue.description.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    }
  }

  getIssuesByStatus(status: string): Issue[] {
    return this.filteredIssues.filter(issue => issue.status === status);
  }

  onSearch() {
    // Implement your search functionality here
    this.filterIssues();
  }

  onAssigneeFilterChange(event: Event) {
    this.assigneeFilter = (event.target as HTMLInputElement).value;
    this.filterIssues();
  }

  onPriorityFilterChange(event: Event) {
    this.priorityFilter = (event.target as HTMLSelectElement).value;
    this.filterIssues();
  }
}

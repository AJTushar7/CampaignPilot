import { Component, OnInit } from '@angular/core';

interface AISuggestion {
  icon: string;
  title: string;
  description: string;
  action: string;
  color: 'green' | 'orange' | 'blue';
}

@Component({
  selector: 'app-ai-suggestions',
  templateUrl: './ai-suggestions.component.html',
  styleUrls: ['./ai-suggestions.component.scss']
})
export class AiSuggestionsComponent implements OnInit {
  suggestions: AISuggestion[] = [
    {
      icon: 'pi-chart-line',
      title: 'Optimization Opportunity',
      description: 'Sending emails at 2 PM instead of 10 AM could increase open rates by 23%',
      action: 'Apply Suggestion',
      color: 'green'
    },
    {
      icon: 'pi-users',
      title: 'Audience Insight',
      description: 'Mobile users show 45% higher engagement. Consider mobile-first content.',
      action: 'View Analysis',
      color: 'orange'
    },
    {
      icon: 'pi-cog',
      title: 'Smart Automation',
      description: 'Set up automated follow-up campaigns to recover 15% of inactive users.',
      action: 'Configure Now',
      color: 'blue'
    }
  ];

  constructor() { }

  ngOnInit(): void { }

  applySuggestion(suggestion: AISuggestion): void {
    console.log('Applying suggestion:', suggestion.title);
  }
}
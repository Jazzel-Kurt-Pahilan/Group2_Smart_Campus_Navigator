// BUSINESS LAYER: rules for what to tell the user for each location problem.
import { LocationIssue } from '../types';

export type IssueAction = 'retry' | 'settings';

export type IssueContent = {
  title: string;
  message: string;
  actionLabel: string;
  action: IssueAction;
};

export function getIssueContent(issue: LocationIssue): IssueContent {
  switch (issue) {
    case 'denied':
      return {
        title: 'Location permission needed',
        message:
          'We use your location to show where you are on the USTP campus map. Please allow access to continue.',
        actionLabel: 'Try again',
        action: 'retry',
      };
    case 'blocked':
      return {
        title: 'Location access is turned off',
        message:
          'Permission was denied and the phone will not ask again. Open settings, tap Permissions, then allow Location.',
        actionLabel: 'Open settings',
        action: 'settings',
      };
    case 'servicesOff':
      return {
        title: 'Location is switched off',
        message: 'Turn on Location in your phone settings, then come back and try again.',
        actionLabel: 'Try again',
        action: 'retry',
      };
    default:
      return {
        title: 'Could not get your location',
        message: 'Move to an open area and try again. GPS can be slow indoors.',
        actionLabel: 'Try again',
        action: 'retry',
      };
  }
}
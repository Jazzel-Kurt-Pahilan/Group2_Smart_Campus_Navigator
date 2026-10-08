// PRESENTATION LAYER: shown when location can't be used.
// It reads the reason from the route, asks the Business layer what to say,
// and reacts to the buttons.
import { useEffect } from 'react';
import { AppState, Linking } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ErrorView from '../components/common/ErrorView';
import { useLocationPermission } from '../hooks/useLocationPermission';
import { getIssueContent } from '../utils/permissionMessages';
import { LocationIssue } from '../types';

export default function DeniedScreen() {
  const router = useRouter();
  const { reason } = useLocalSearchParams<{ reason?: LocationIssue }>();
  const { requestAccess, recheckAccess } = useLocationPermission();

  const issue: LocationIssue = reason ?? 'denied';
  const content = getIssueContent(issue);

  // When the user comes back from settings, check again quietly and continue if fixed.
  useEffect(() => {
    const subscription = AppState.addEventListener('change', async (nextState) => {
      if (nextState === 'active') {
        const result = await recheckAccess();
        if (result === null) router.replace('/map');
      }
    });
    return () => subscription.remove();
  }, []);

  const handleAction = async () => {
    if (content.action === 'settings') {
      Linking.openSettings();
      return;
    }
    const result = await requestAccess();
    if (result === null) {
      router.replace('/map');
    } else {
      router.replace({ pathname: '/denied', params: { reason: result } });
    }
  };

  return (
    <ErrorView
      title={content.title}
      message={content.message}
      actionLabel={content.actionLabel}
      onAction={handleAction}
      secondaryLabel="Back to home"
      onSecondary={() => router.replace('/')}
    />
  );
}
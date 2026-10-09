
import LocationStatus from '@/components/location/LocationStatus';
import {
  ensureLocationPermission,
  openLocationSettings,
} from '@/services/CampusPermissionService';
import { getIssueContent } from '@/utils/permissionMessages';
import { CircleCheck } from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function LocationStatusScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [permissionBlocked, setPermissionBlocked] = useState(false);

  const loadLocationPermission = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setPermissionBlocked(false);

      const permission = await ensureLocationPermission();

      if (permission.status !== 'granted') {
        const blocked = !permission.canAskAgain;

        setPermissionBlocked(blocked);
        setError(getIssueContent(blocked ? 'blocked' : 'denied').message);
      }
    } catch {
  setError(getIssueContent('unavailable').message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadLocationPermission();
  }, [loadLocationPermission]);

  if (loading || error) {
    return (
      <LocationStatus
        loading={loading}
        error={error}
        onRetry={loadLocationPermission}
        permissionBlocked={permissionBlocked}
        onOpenSettings={openLocationSettings}
      />
    );
  }

  return (
    <View style={styles.container}>
      <CircleCheck size={48} color="#F5B014" style={{ marginBottom: 16 }} />

      <Text style={styles.title}>
        Location Permission Granted
      </Text>

      <Text style={styles.message}>
        Your location permission is ready.
      </Text>

      <Text style={styles.note}>
        Current GPS location will be connected to
        the campus navigator.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  icon: {
    fontSize: 48,
    color: '#F5B014',
    marginBottom: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  message: {
    color: '#E2E8F0',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
  },
  note: {
    color: '#94A3B8',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    maxWidth: 340,
  },
});
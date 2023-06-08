import { NativeModules } from 'react-native';

export interface UsageStats {
  packageName: string;
  appName: string;
  usageTime: number;
}

interface UsageStatsModule {
  getAppUsage(startTime: number, endTime: number): Promise<UsageStats[]>;
}

const { UsageStatsModule } = NativeModules;

export default UsageStatsModule as UsageStatsModule;
import {NativeModules} from 'react-native';

export interface UsageStats {
  packageName: string;
  appName: string;
  usageTime: number;
  icon: string;
}

interface UsageStatsModule {
  getAppUsage(startTime: string, endTime: string): Promise<UsageStats[]>;
}

const {UsageStatsModule} = NativeModules;

export default UsageStatsModule as UsageStatsModule;

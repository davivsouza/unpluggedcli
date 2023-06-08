package com.unpluggedcli;

import android.app.usage.UsageStats;
import android.app.usage.UsageStatsManager;
import android.content.Context;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.util.Calendar;
import java.util.List;

public class UsageStatsModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    public UsageStatsModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "UsageStatsModule";
    }

    @ReactMethod
    public void getAppUsage(long startTime, long endTime, Promise promise) {
        UsageStatsManager usageStatsManager = (UsageStatsManager) reactContext.getSystemService(Context.USAGE_STATS_SERVICE);
        List<UsageStats> statsList = usageStatsManager.queryUsageStats(UsageStatsManager.INTERVAL_DAILY, startTime, endTime);

        WritableArray appUsageArray = Arguments.createArray();
        if (statsList != null) {
            for (UsageStats usageStats : statsList) {
                WritableMap appUsageMap = Arguments.createMap();
                appUsageMap.putString("packageName", usageStats.getPackageName());
                appUsageMap.putString("appName", getAppName(usageStats.getPackageName()));
                appUsageMap.putDouble("usageTime", usageStats.getTotalTimeInForeground() / 1000); // Em segundos

                appUsageArray.pushMap(appUsageMap);
            }
        }

        promise.resolve(appUsageArray);
    }

    private String getAppName(String packageName) {
        try {
            return reactContext.getPackageManager().getApplicationLabel(reactContext.getPackageManager().getApplicationInfo(packageName, 0)).toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }
}

/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {FlatList,  SafeAreaView, Text, View} from 'react-native';
import UsageStatsModule, {UsageStats} from '../../UsageStatsModule';

function UsageApp(): JSX.Element {
  const [statsLog, setStats] = useState<UsageStats[]>();
  function checkSeconds(seconds: number) {
    if (seconds > 60) {
      const minutes = Math.round(seconds / 60);
      if (minutes > 60) {
        const hours = Math.round(minutes / 60);
        return `${hours} Horas`;
      }
      return `${minutes} minutos`;
    }

    return `${seconds} segundos`;
  }
  useEffect(() => {
    const fetchUsageStats = async () => {
      try {
        const startTime = String(Date.now() - 24 * 60 * 60 * 1000); // Exemplo: 24 horas atrás
        const endTime = String(Date.now()); // Exemplo: momento atual

        const stats: UsageStats[] = await UsageStatsModule.getAppUsage(
          startTime,
          endTime,
        );
        const statsFiltered = stats.filter(stat => stat.usageTime > 1);
        setStats(statsFiltered);

        // Processar as estatísticas de uso de aplicativos
      } catch (error) {
        console.log(error);
        // Lidar com erros
      }
    };

    fetchUsageStats();
  }, []);

  return (
    <SafeAreaView
      style={{
        padding: 12,
        backgroundColor: '#333',
      }}>
      <Text>Bem Estar Digital - Unplugged</Text>
      <FlatList
        data={statsLog}
        contentContainerStyle={{padding: 24}}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => String(Math.random() * 10 + item.usageTime)}
        renderItem={({item}) => (
          <View
            style={{
              backgroundColor: '#ccc',
              padding: 10,
              marginVertical: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 20,
                }}>
                {item.appName}
              </Text>
            </View>
            <Text
              style={{
                color: '#000',
                fontSize: 15,
              }}>
              Tempo de uso: {checkSeconds(item.usageTime)}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

export default UsageApp;

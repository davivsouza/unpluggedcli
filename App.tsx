import React, {useEffect} from 'react';
import {SafeAreaView, Text} from 'react-native';
import UsageStatsModule, {UsageStats} from './UsageStatsModule';

function App(): JSX.Element {
  useEffect(() => {
    const fetchUsageStats = async () => {
      try {
        const startTime = new Date().getTime() - 24 * 60 * 60 * 1000; // 24 horas atrás
        const endTime = new Date().getTime(); // tempo atual

        const stats: UsageStats[] = await UsageStatsModule.getAppUsage(
          startTime,
          endTime,
        );
        console.log(stats);
        // Processar as estatísticas de uso de aplicativos
      } catch (error) {
        console.log(error);
        // Lidar com erros
      }
    };

    fetchUsageStats();
  }, []);

  return (
    <SafeAreaView>
      <Text>Exemplo de uso do UsageStatsModule</Text>
    </SafeAreaView>
  );
}

export default App;

import { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import styles from './popularjobs.style';
import { COLORS, SIZES } from '../../../constants';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import useFetch from '../../../hook/useFetch';

const Popularjobs = () => {
  const router = useRouter(); // Initializing useRouter hook
  const { data, isLoading, error } = useFetch('search', {
    // Initializing useFetch hook with API endpoint and query parameters
    query: 'React developer',
    num_pages: '1',
  });
  console.log('data in popularJobs', data);

  const [selectedJob, setSelectedJob] = useState(); // Initializing state for selected job

  const handleCardPress = (item) => {
    // Function to handle job card press
    router.push(`/job-details/\${item.job_id}`); // Navigating to job details page
    setSelectedJob(item.job_id); // Setting selected job
  };

  return (
    // Container for the component
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      {/* Container for job cards */}
      <View style={styles.cardsContainer}>
        {/* Conditionally rendering activity indicator */}
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          // Conditionally rendering error message
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={data} // Passing data to FlatList
            renderItem={(
              { item } // Rendering each job card
            ) => (
              <PopularJobCard
                item={item}
                // selectedJob={selectedJob}
                // handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={(item) => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;

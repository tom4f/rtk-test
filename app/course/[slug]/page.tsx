'use client';

import { useParams } from 'next/navigation';
import { CoursePageContainer } from '@/modules/course/CoursePageContainer';
import { useMemo } from 'react';

const playlistIds = {
  java: 'PLYPjPMiw3_YsVockWfuuhoP86YPDUXp4f',
  'free-code-camp': 'UU8butISFwT-Wl7EV0hUK0BQ',
  'ten-days-of-javascript': 'PLpcSpRrAaOaoIqHQddZOdbRrzr5dJtgSs',
  'fk-2024-e': 'PLnXfazh66kVfUsfw9Oh5rBttZHaJe6HKB',
  'fk-2024-p': 'PLnXfazh66kVd0jXpYliCLAreHc4TDwnTf',
  'fk-2024-f': 'PLnXfazh66kVc8TRx1qmK3wshWs330_xsK',
} as const;

export default function Course() {
  const params = useParams();

  // Memoize playlistId lookup to avoid unnecessary recalculations
  const playlistId = useMemo(
    () => playlistIds[params.slug as keyof typeof playlistIds],
    [params.slug]
  );

  return <CoursePageContainer playlistId={playlistId} />;
}

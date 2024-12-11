import React from 'react';
import styles from './job-card.module.scss';
import { Job } from '@/app/constants/types';
import Image from 'next/image';

type TJobCard = {
  job: Job
  onAddFilter: (filter: string) => void;
}

const JobCard = ({job, onAddFilter}: TJobCard) => {

  const handleTagClick = (tag: string) => {
    onAddFilter(tag);
  };

  return (
    <div className={styles.jobCard} style={job.featured ? { borderLeft: '5px solid #5ba4a4' } : {}} key={job.id}>
      <div className={styles.jobLeft}>
        <Image src={job.logo} priority width={100} height={100} alt='logo'/>
        <div className={styles.jobDetails}>
          <div className={styles.jobIntro}>
            <p className={styles.company}>{job.company}</p>
            {job.new && <span className={styles.new}>NEW!</span>}
            {job.featured && <span className={styles.featured}>FEATURED</span>}
          </div>
          <p className={styles.position}>{job.position}</p>
          <div className={styles.jobInfo}>
            <p>{job.postedAt}</p>
            &#183;
            <p>{job.contract}</p>
            &#183;
            <p>{job.location}</p>
          </div>
        </div>
      </div>
      <div className={styles.jobRight}>
        <p className={styles.tag} onClick={() => handleTagClick(job.role)}>{job.role}</p>
        <p className={styles.tag} onClick={() => handleTagClick(job.level)}>{job.level}</p>
        {job.languages.map((tag, index) => (
          <p className={styles.tag} key={index} onClick={() => handleTagClick(tag)}>{tag}</p>
        ))}
      </div>
    </div>
  )
}

export default JobCard
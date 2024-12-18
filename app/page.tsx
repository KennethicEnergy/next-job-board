"use client"

import { useEffect, useState } from "react";

import FilterBar from "./components/filter-bar/filter-bar";
import Header from "./components/header/header";
import { Job } from "./constants/types";
import JobCard from "./components/job-card/job-card";
import styles from "./page.module.scss";

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState<string[]>([
    "Front-End", "CSS", "JavaScript"
  ]);

  const filterJobs = () => {
    return jobs.filter((job) => {
      return filters.every((filter) => {
        return (
          job.languages.includes(filter) ||
          job.tools.includes(filter) ||
          job.role === filter ||
          job.level === filter
        );
      });
    });
  };

  const addFilter = (filter: string) => {
    if (!filters.includes(filter)) {
      setFilters((prevFilters) => [...prevFilters, filter]);
    }
  };

  const removeFilter = (filter: string) => {
    setFilters((prevFilters) => prevFilters.filter((f) => f !== filter));
  };

  const clearFilters = () => {
    setFilters([]);
  };

  const filteredJobs = filterJobs();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/data/data.json');
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    console.log(jobs);
  }, [jobs]);

  return (
    <div className={styles.page}>
      <Header backgroundImage="/images/bg-header-desktop.svg"/>
      <div className={styles.container}>
        <FilterBar
          filters={filters}
          onRemoveFilter={removeFilter}
          onClearFilters={clearFilters}
          onAddFilter={addFilter}/>
        <div className={styles.jobCards} style={filteredJobs.length < 0 ? { paddingTop: 'unset' } : { paddingTop: '2rem' }}>
          {filteredJobs.length === 0 ? (
            <div className={styles.noResults}>No results found</div>
          ) : (
            filteredJobs.map((job: Job, index) => (
              <JobCard key={index} job={job} onAddFilter={addFilter} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

import React from 'react'
import styles from './filter-bar.module.scss';

type TFilterBarProps = {
  filters: string[];
  onRemoveFilter: (filter: string) => void;
  onClearFilters: () => void;
  onAddFilter: (filter: string) => void;
};

const FilterBar = ({filters,
  onRemoveFilter,
  onClearFilters,
}: TFilterBarProps) => {
  return (
    <>
      {filters.length > 0 && <div className={styles.filterBar}>
        <div className={styles.filterItems}>
          {filters.map((filter, index) => (
            <div key={index} className={styles.item}>
              <span className={styles.filter}>{filter}</span>
              <span className={styles.removeFilter} onClick={() => onRemoveFilter(filter)}>&times;</span>
            </div>
          ))}
        </div>
        <div className={styles.clearFilters} onClick={onClearFilters}>Clear</div>
      </div>}
    </>
  )
}

export default FilterBar
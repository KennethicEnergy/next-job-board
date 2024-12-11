import React from 'react';
import Image from 'next/image';
import styles from './header.module.scss';

const Header = ({backgroundImage}: {backgroundImage: string}) => {
  return (
    <div className={styles.header}>
      <Image
        src={backgroundImage}
        className={styles.bgImage}
        alt="Header Desktop"
        layout="fill"
        objectFit="cover"
        priority
      />
    </div>
  )
}

export default Header
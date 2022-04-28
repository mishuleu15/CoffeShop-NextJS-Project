import Link from 'next/link';
import Image from 'next/image';
// import cls from 'classnames';

import styles from './card.module.css';

const Card = ({ name, imgUrl, href }) => {
  return (
    <Link href={href}>
      <a>
        <h1>{name}</h1>

        <Image
          className={styles.img}
          src={imgUrl}
          alt=''
          width={260}
          height={160}
        />
      </a>
    </Link>
  );
};

export default Card;

import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import cls from 'classnames';

import { useContext, useState, useEffect } from 'react';

import { useRouter } from 'next/router';
import { fetchCoffeeStores } from '../../lib/coffee-stores';

import { StoreContext } from '../_app';

import styles from '../../styles/coffee-store.module.css';
import { isEmpty } from '../../utils';

export async function getStaticProps({ params }) {
  const data = await fetchCoffeeStores();
  const findCoffeeStoreById = data.find((coffeeStore) => {
    return coffeeStore.fsq_id.toString() === params.id;
  });

  return {
    props: {
      coffeeStores: findCoffeeStoreById ? findCoffeeStoreById : {},
    }, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  const data = await fetchCoffeeStores();

  const paths = data.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.fsq_id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

const CoffeeStore = (initialProps) => {
  const router = useRouter();

  const { id } = router.query;

  const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStores);
  const {
    state: { coffeeStores },
  } = useContext(StoreContext);

  useEffect(() => {
    if (isEmpty(initialProps.coffeeStores)) {
      if (coffeeStores.length > 0) {
        const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
          return coffeeStore.fsq_id.toString() === id;
        });
        setCoffeeStore(findCoffeeStoreById);
      }
    }
  }, [id]);

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  const { location, name, imgUrl } = coffeeStore;

  const handleUpvoteButton = () => {
    //
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href='/'>
              <a> 🡰 Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={
              imgUrl ||
              'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
            }
            width={600}
            height={460}
            className={styles.storeImg}
            alt={name}
          />
        </div>
        <div className={cls('glass', styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src='/static/icons/places.svg'
              width='24'
              height='24'
              alt='icon'
            />
            <p className={styles.text}>{location?.address}</p>
          </div>
          {location?.neighborhood && (
            <div className={styles.iconWrapper}>
              <Image
                src='/static/icons/nearMe.svg'
                width='24'
                height='24'
                alt='icon'
              />
              <p className={styles.text}>{location.neighborhood}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image
              src='/static/icons/star.svg'
              width='24'
              height='24'
              alt='icon'
            />
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
